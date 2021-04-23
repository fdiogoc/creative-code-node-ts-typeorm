import UserController from './user.controller';
import * as UserRepository from '../repositories/user.repository';
import { Etnia } from '../entities/Usuario';
import { IUsuarioPayload } from '../repositories/user.repository';

describe('UserController', () => {
  describe('getUsers', () => {
    test('should return empty array', async () => {
      const spy = jest
        .spyOn(UserRepository, 'getUsers')
        .mockResolvedValueOnce([]);
      const controller = new UserController();
      const users = await controller.getUsers();
      expect(users).toEqual([]);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    test('should return user list', async () => {
      const usersList: IUsuarioPayload[] = [
        {
          email: 'email@example.com',
          senha: 'SENHA',
          peso: 115,
          idade: 26,
          telefone: 455555,
          etnia: Etnia.BRANCO,
        },
      ];
      const spy = jest
        .spyOn(UserRepository, 'getUsers')
        .mockResolvedValueOnce(usersList);
      const controller = new UserController();
      const users = await controller.getUsers();
      expect(users).toEqual(usersList);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });
  });
});
