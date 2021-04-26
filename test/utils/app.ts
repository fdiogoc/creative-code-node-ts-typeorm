import express, { Application } from 'express';

import session from 'express-session';

import router from '../../src/routes';
import cors from 'cors';

export const app: Application = express();
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
