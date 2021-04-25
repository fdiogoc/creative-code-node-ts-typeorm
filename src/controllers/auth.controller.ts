import { Session } from 'express-session';
import {
  register,
  login,
  logout,
  UserResponse,
  IUsuarioPayload,
} from '../repositories/user.repository';
import { Request, Response } from 'express';

export default class AuthController {
  public async register(
    body: Partial<IUsuarioPayload>,
    req: any,
  ): Promise<UserResponse> {
    return register(body, req);
  }

  public async login(
    email: string,
    password: string,
    req: Request & { session: Session & { userId?: number } },
  ): Promise<UserResponse> {
    return login(email, password, req);
  }

  public async logout(
    req: Request & { session: Session & { userId?: number } },
    res: Response,
  ): Promise<boolean> {
    return logout(req, res);
  }
}
