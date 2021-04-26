import 'reflect-metadata';
import { createConnection } from 'typeorm';

import express, { Application } from 'express';

import session from 'express-session';

import dbConfig from './config/database';
import router from './routes';
import cors from 'cors';

const PORT = process.env.PORT || 8000;

const main = async () => {
  await createConnection(dbConfig)
    .then((_connection) => {})
    .catch((err) => {
      console.log('Unable to connect to db', err);
      process.exit(1);
    });

  const app: Application = express();
  app.use(express.json());

  app.use(
    session({
      name: 'qid',
      secret: 'secret_____SDfsdkjfsdof',
      resave: false,
      saveUninitialized: false,

      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 10,
      },
    }),
  );

  app.use(cors());

  app.use((req, _res, next) => {
    console.log(req.session);

    next();
  });

  app.use(router);
  app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
  });
};

main().catch((err) => {
  console.error(err);
});
