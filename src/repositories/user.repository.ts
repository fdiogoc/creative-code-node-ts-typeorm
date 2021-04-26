import { Etnia, Usuario } from '../entities/Usuario';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import { Session } from 'express-session';
import * as argon2 from 'argon2';
import { validate, ValidationError } from 'class-validator';
export interface IUsuarioPayload {
  id: number;
  password: string;
  idade: number;
  email: string;
  peso: number;
  telefone: string;
  etnia: Etnia;
}
export class EmailPasswordInput {
  email: string;
  password: string;
}
class FieldError {
  field: string;
  message: string;
}
export class UserResponse {
  errors?: FieldError[] | ValidationError[];
  user?: Usuario;
}

export const getUsers = async (): Promise<Array<Usuario>> => {
  const userRepository = getRepository(Usuario);
  return userRepository.find();
};

export const createUser = async (
  payload: IUsuarioPayload,
): Promise<Usuario> => {
  const userRepository = getRepository(Usuario);
  const user = new Usuario();
  return userRepository.save({
    ...user,
    ...payload,
  });
};

export const getUser = async (id: number): Promise<Usuario | null> => {
  const userRepository = getRepository(Usuario);
  const user = await userRepository.findOne({ id: id });
  if (!user) return null;
  return user;
};

export const getByEmail = async (email: string): Promise<Usuario | null> => {
  const userRepository = getRepository(Usuario);
  const user = await userRepository.findOne({ email });
  if (!user) return null;
  return user;
};

export const register = async (
  options: Partial<IUsuarioPayload>,
  req: Request & { session: Session & { userId?: number } },
): Promise<UserResponse> => {
  try {
    const userRepository = getRepository(Usuario);

    // ERRO NO JEST AO TESTAR NAO EXISTE ESTE METODO
    // const user = userRepository.create({ ...options });
    let user = new Usuario();
    user.email = options.email!;
    user.password = options.password!;

    if (!user) {
      throw new Error('Erro ao criar usuario');
    }
    options.password = await argon2.hash(options.password!);
    const errors = await validate(user);
    if (errors.length > 0) {
      console.log('validation failed. errors: ', errors);

      return {
        errors,
      };
    } else {
      const results = await userRepository.save(user);
      req.session.userId = results.id;
      return {
        user: results,
      };
    }
  } catch (error) {
    return error;
  }
};

export const login = async (
  email: string,
  password: string,
  req: Request & { session: Session & { userId?: number } },
): Promise<UserResponse> => {
  const userRepository = getRepository(Usuario);

  const user = await userRepository.findOne({ email });

  if (!user) {
    return {
      errors: [
        {
          field: 'email',
          message: 'Email não encontrado',
        },
      ],
    };
  }

  try {
    if (await argon2.verify(user.password, password)) {
      req.session.userId = user.id;
    } else {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      };
    }
  } catch (err) {
    // internal failure
  }

  return {
    user,
  };
};

export const logout = async (
  req: Request & { session: Session & { userId?: number } },
  res: Response,
): Promise<boolean> => {
  return new Promise((resolve) =>
    req.session.destroy((err) => {
      res.clearCookie('qid');
      if (err) {
        resolve(false);
        return;
      }
      resolve(true);
    }),
  );
};
