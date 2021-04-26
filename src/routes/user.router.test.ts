import { createServer } from '../server';
import { Application } from 'express';

import request from 'supertest';
import { generateUserPayload } from '../../test/utils/generate';

jest.mock('typeorm');

let server: Application;

beforeAll(async () => {
  server = await createServer();
});

describe('should register', () => {
  const payload = generateUserPayload();
  it('should register', async (done) => {
    request(server)
      .post(`/users`)

      .expect(200)
      .send({ payload })
      .end(function (err, _res) {
        if (err) return done(err);

        done();
      });
  });
});

describe('should return ok', () => {
  it('should return []', async (done) => {
    request(server)
      .get(`/users`)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        expect(res.body).toMatchObject({});
        done();
      });
  });

  // it('should return', async (done) => {
  //   const usersData = generateUsersData(2);

  //   const controller = new UserController();
  //   await controller.createUser(usersData[0]);

  //   const users = await controller.getUsers();
  //   console.log(users);
  //   request(server)
  //     .post(`/users`)
  //     .send({ ...usersData[0] })
  //     .expect(200)
  //     .end(function (err, _res) {
  //       if (err) return done(err);
  //       done();
  //     });

  //   request(server)
  //     .get(`/users`)
  //     .expect(200)
  //     .end(function (err, res) {
  //       if (err) return done(err);

  //       expect(res.body.email).toBe(usersData[0].email);
  //       done();
  //     });
  // });
});
