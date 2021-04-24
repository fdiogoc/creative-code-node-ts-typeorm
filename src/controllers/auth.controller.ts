import { Session } from 'express-session';
import { Route, Post, Body } from 'tsoa';
import {
  register,
  login,
  UserResponse,
  IUsuarioPayload,
} from '../repositories/user.repository';
import { Request } from 'express';

@Route('auth')
export default class AuthController {
  @Post('/register')
  public async register(
    @Body() body: IUsuarioPayload,
    req: any,
  ): Promise<UserResponse> {
    return register(body, req);
  }

  @Post('/login')
  public async login(
    @Body() email: string,
    @Body() password: string,
    req: Request & { session: Session & { userId?: number } },
  ): Promise<UserResponse> {
    return login(email, password, req);
  }
}
