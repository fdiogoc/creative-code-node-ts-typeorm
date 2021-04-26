import AuthController from './auth.controller';
import * as UserRepository from '../repositories/user.repository';
import {
  generateUserData,
  generateUserPayload,
} from '../../test/utils/generate';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { Request } from 'express';
import { Session } from 'express-session';

afterEach(() => {
  jest.resetAllMocks();
});
const { res, mockClear } = getMockRes();

beforeEach(() => {
  mockClear();
});

describe('AuthController', () => {
  describe('Auth', () => {
    test('should register', async () => {
      const payload = generateUserPayload();
      const userData = generateUserData(payload);
      const userResponseMock: UserRepository.UserResponse = {
        user: userData,
      };
      const req = getMockReq();
      const spy = jest
        .spyOn(UserRepository, 'register')
        .mockResolvedValueOnce(userResponseMock);
      const controller = new AuthController();
      const userResponse = await controller.register(
        {
          email: userData.email,
          password: userData.password,
        },
        req,
      );

      expect(userResponse.user).toEqual(userData);
      expect(userResponse.user).toMatchObject(payload);
      expect(userResponse.user).toEqual(userData);

      expect(spy).toHaveBeenCalledTimes(1);
    });
    test('should not login', async () => {
      const id = 1;
      const userData = generateUserData({ id });
      const userResponseMock: UserRepository.UserResponse = {
        errors: [
          {
            field: 'email',
            message: 'Email não encontrado',
          },
        ],
      };
      const req = getMockReq();
      const spy = jest
        .spyOn(UserRepository, 'login')
        .mockResolvedValueOnce(userResponseMock);
      const controller = new AuthController();
      const userResponse = await controller.login(
        userData.email,
        userData.password,
        req,
      );

      expect(userResponse.errors).toEqual(userResponseMock.errors);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    test('should login', async () => {
      const id = 1;
      const userData = generateUserData({ id });
      const userResponseMock: UserRepository.UserResponse = {
        user: userData,
      };
      const req = getMockReq();
      const spy = jest
        .spyOn(UserRepository, 'login')
        .mockResolvedValueOnce(userResponseMock);
      const controller = new AuthController();
      const userResponse = await controller.login(
        userData.email,
        userData.password,
        req,
      );

      expect(userResponse.user).toEqual(userData);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should not logout', async () => {
      // como mokar o session? precisa de dentro do req, para o logout funcionar
      // const id = 1;
      // const userData = generateUserData({ id });
      const req = getMockReq();

      const spy = jest
        .spyOn(UserRepository, 'logout')
        .mockResolvedValueOnce(false);
      const controller = new AuthController();
      const userResponse = await controller.logout(req, res);

      expect(userResponse).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    // Sem o res.session não funciona
    // test('should logout', async () => {
    //   const id = 1;
    //   const req: Request & {
    //     session: Session & { userId?: number };
    //   } = getMockReq();
    //   req.session.userId = id;

    //   const spy = jest
    //     .spyOn(UserRepository, 'logout')
    //     .mockResolvedValueOnce(true);
    //   const controller = new AuthController();
    //   const userResponse = await controller.logout(req, res);

    //   expect(userResponse).toEqual(true);
    //   expect(spy).toHaveBeenCalledTimes(1);
    // });
  });
});
