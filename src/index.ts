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
  // app.use(morgan('tiny'));
  // app.use(express.static('public'));
  app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));

  // app.get('/', (_req, res, _next) => {
  //   res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
  // });
  // app.get('/login', (_req, res, _next) => {
  //   const form =
  //     '<h1>Login Page</h1><form method="POST" action="/auth/login">\
  //   Enter Username:<br><input type="text" name="email">\
  //   <br>Enter Password:<br><input type="password" name="password">\
  //   <br><br><input type="submit" value="Submit"></form>';

  //   res.send(form);
  // });

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
    console.log(req.user);
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
