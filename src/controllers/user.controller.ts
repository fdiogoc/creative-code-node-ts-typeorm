import { Usuario } from '../entities/Usuario';
import {
  getUsers,
  createUser,
  IUsuarioPayload,
  getUser,
} from '../repositories/user.repository';

export default class UserController {
  public async getUsers(): Promise<Array<Usuario>> {
    return getUsers();
  }

  public async createUser(body: IUsuarioPayload): Promise<Usuario> {
    return createUser(body);
  }
  public async getUser(id: string): Promise<Usuario | null> {
    return getUser(Number(id));
  }
}
