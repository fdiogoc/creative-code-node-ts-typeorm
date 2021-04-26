import { createServer } from '../server';
import { Application } from 'express';

import request from 'supertest';
import { generateAddressPayload } from '../../test/utils/generate';

jest.mock('typeorm');

let server: Application;

beforeAll(async () => {
  server = await createServer();
});

// precisa criar o sesion, e salvar os dados para testar o resto

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

  it('should return not authorized', async (done) => {
    request(server)
      .get(`/address`)

      .expect(500)
      .send({ payload })
      .end(function (err, _res) {
        if (err) return done(err);

        done();
      });
  });

  it('should return not authorized', async (done) => {
    request(server)
      .get(`/address/1231`)

      .expect(500)
      .send({ payload })
      .end(function (err, _res) {
        if (err) return done(err);

        done();
      });
  });

  it('should return not authorized', async (done) => {
    request(server)
      .get(`/address/byCEP/1231`)

      .expect(500)
      .send({ payload })
      .end(function (err, _res) {
        if (err) return done(err);

        done();
      });
  });
});
