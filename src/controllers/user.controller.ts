import { Usuario } from '@App/entities';
import { Get, Route, Post, Body, Path } from 'tsoa';
import {
  getUsers,
  createUser,
  IUsuarioPayload,
  getUser,
} from '../repositories/user.repository';

@Route('users')
export default class UserController {
  @Get('/')
  public async getUsers(): Promise<Array<Usuario>> {
    return getUsers();
  }

  @Post('/')
  public async createUser(@Body() body: IUsuarioPayload): Promise<Usuario> {
    return createUser(body);
  }

  @Get('/:id')
  public async getUser(@Path() id: string): Promise<Usuario | null> {
    return getUser(Number(id));
  }
}
