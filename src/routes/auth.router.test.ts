import { createServer } from '../server';
import { Application } from 'express';

import request from 'supertest';
import { generateUserPayload } from '../../test/utils/generate';

jest.mock('typeorm');

let server: Application;

beforeAll(async () => {
  server = await createServer();
});

describe('auth failure', () => {
  it('should return error', async (done) => {
    request(server)
      .post(`/auth/login`)
      .send({ email: 'email@email', password: 'pass' })
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toMatchObject({
          errors: [
            {
              field: 'email',
              message: 'Email não encontrado',
            },
          ],
        });
        done();
      });
  });
});

describe('register', () => {
  it('should register', async (done) => {
    const payload = generateUserPayload();
    request(server)
      .post(`/auth/register`)
      .send({ ...payload })
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toMatchObject({
          errors: [
            {
              field: 'email',
              message: 'Email não encontrado',
            },
          ],
        });
        done();
      });
  });
});
