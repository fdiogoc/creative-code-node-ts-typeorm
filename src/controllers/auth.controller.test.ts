import AuthController from './auth.controller';
import * as UserRepository from '../repositories/user.repository';
import {
  generateUserData,
  generateUserPayload,
} from '../../test/utils/generate';
import { getMockReq } from '@jest-mock/express';
afterEach(() => {
  jest.resetAllMocks();
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
      console.log(userResponse.errors);
      expect(userResponse.errors).toEqual(userResponse.errors);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
