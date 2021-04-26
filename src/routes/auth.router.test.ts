import { createServer } from '../server';
import { Application } from 'express';

import request from 'supertest';

jest.mock('typeorm');

let server: Application;

beforeAll(async () => {
  server = await createServer();
});

describe('auth failure', () => {
  it('should return 401 & valid response if auth rejects with an error', async (done) => {
    request(server)
      .post(`/auth/login`)
      .set('Authorization', 'Bearer fakeToken')
      .expect(401)
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
