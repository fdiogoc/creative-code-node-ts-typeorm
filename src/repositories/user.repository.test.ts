import * as UserRepository from './user.repository';
import { getRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';
import { Request } from 'express';
import {
  generateUserData,
  generateUserPayload,
  generateUsersData,
} from '../../test/utils/generate';
import { getMockReq } from '@jest-mock/express';
import { Session } from 'express-session';
import { app } from '../../test/utils/app';
import {} from 'supertest';
jest.mock('typeorm');

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}));

beforeEach(() => {
  request(app);
  mockedGetRepo.find.mockClear();
  mockedGetRepo.save.mockClear();
  mockedGetRepo.findOne.mockClear();
});

describe('UserRepository', () => {
  describe('getUsers', () => {
    test('should return empty array', async () => {
      mockedGetRepo.find.mockResolvedValue([]);
      const users = await UserRepository.getUsers();
      expect(users).toEqual([]);
      expect(mockedGetRepo.find).toHaveBeenCalledWith();
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
    });

    test('should return user list', async () => {
      const usersData = generateUsersData(2);
      mockedGetRepo.find.mockResolvedValue(usersData);
      const users = await UserRepository.getUsers();
      expect(users).toEqual(usersData);
      expect(mockedGetRepo.find).toHaveBeenCalledWith();
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
    });

    describe('addUser', () => {
      test('should add user to the database', async () => {
        const payload = generateUserPayload();
        const userData = generateUserData(payload);
        mockedGetRepo.save.mockResolvedValue(userData);
        const user = await UserRepository.createUser(payload);
        expect(user).toMatchObject(payload);
        expect(user).toEqual(userData);
        expect(mockedGetRepo.save).toHaveBeenCalledWith(payload);
        expect(mockedGetRepo.save).toHaveBeenCalledTimes(1);
      });
    });
    describe('CreateUser', () => {
      test('should create user', async () => {
        const payload = generateUserPayload();
        const userData = generateUserData(payload);
        mockedGetRepo.save.mockResolvedValue(userData);
        const user = await UserRepository.createUser(payload);
        expect(user).toMatchObject(payload);
        expect(user).toEqual(userData);
        expect(mockedGetRepo.save).toHaveBeenCalledWith(payload);
        expect(mockedGetRepo.save).toHaveBeenCalledTimes(1);
      });
    });

    describe('RegisterUser', () => {
      test('should register user', async () => {
        const payload = generateUserPayload();
        const userData = generateUserData(payload);

        const req: Request & {
          session: Session & { userId?: number };
        } = getMockReq();
        req.session.userId = 123123;

        app;
        mockedGetRepo.save.mockResolvedValue(userData);
        const user = await UserRepository.register(payload, req);
        expect(user).toMatchObject(payload);
        expect(user).toEqual(userData);
        expect(mockedGetRepo.save).toHaveBeenCalledWith(payload);
        expect(mockedGetRepo.save).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('getUser', () => {
    test('should return user from the database', async () => {
      const id = 1;
      const userData = generateUserData({ id });
      mockedGetRepo.findOne.mockResolvedValue(userData);
      const user = await UserRepository.getUser(id);
      expect(user).toEqual(userData);
      expect(user?.id).toBe(id);
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({ id });
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1);
    });

    test('should return null if user not found', async () => {
      const id = 1;
      mockedGetRepo.findOne.mockResolvedValue(null);
      const user = await UserRepository.getUser(id);
      expect(user).toBeNull();
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({ id });

      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1);
    });
  });
  describe('getUserByEmail', () => {
    test('should return user from the database', async () => {
      const id = 1;
      const userData = generateUserData({ id });
      mockedGetRepo.findOne.mockResolvedValue(userData);
      const user = await UserRepository.getByEmail(userData.email);
      expect(user).toEqual(userData);
      expect(user?.id).toBe(id);
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({
        email: userData.email,
      });
      expect(user?.id).toBe(id);
      expect(user?.email).toBe(userData.email);
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1);
    });

    test('should return null if user not found', async () => {
      const id = 1;
      mockedGetRepo.findOne.mockResolvedValue(null);
      const user = await UserRepository.getUser(id);
      expect(user).toBeNull();
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({ id });
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
