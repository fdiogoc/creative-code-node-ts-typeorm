import { createServer } from '../server';
import { Application } from 'express';

import request from 'supertest';
import { generateAddressPayload } from '../../test/utils/generate';

jest.mock('typeorm');

let server: Application;

beforeAll(async () => {
  server = await createServer();
});

describe('addres failure', () => {
  const payload = generateAddressPayload();
  it('should return not authorized', async (done) => {
    request(server)
      .post(`/address`)

      .expect(500)
      .send({ payload })
      .end(function (err, _res) {
        if (err) return done(err);

        done();
      });
  });
});
