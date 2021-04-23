import { Etnia } from 'src/entities/Usuario';
import { getRepository } from 'typeorm';
import { Usuario } from '../entities';
export interface IUsuarioPayload {
  senha: string;
  idade: number;
  email: string;
  peso: number;
  telefone: number;
  etnia: Etnia;
}

export const getUsers = async (): Promise<Array<IUsuarioPayload>> => {
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
