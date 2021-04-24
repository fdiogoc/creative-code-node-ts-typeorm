import 'reflect-metadata';
import { createConnection } from 'typeorm';

import express, { Application } from 'express';

import session from 'express-session';
import pgCOnnection from 'connect-pg-simple';

import morgan from 'morgan';

import dbConfig from './config/database';
import router from './routes';
import cors from 'cors';

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'process.env.SECRET',
    store: new (pgCOnnection(session))(),
    resave: false,
    saveUninitialized: true,

    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
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

app.get('/', (_req, res, _next) => {
  res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});
// When you visit http://localhost:3000/login, you will see "Login Page"
app.get('/login', (_req, res, _next) => {
  const form =
    '<h1>Login Page</h1><form method="POST" action="/login">\
  Enter Username:<br><input type="text" name="username">\
  <br>Enter Password:<br><input type="password" name="password">\
  <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});

createConnection(dbConfig)
  .then((_connection) => {
    app.listen(PORT, () => {
      console.log('Server is running on port', PORT);
    });
  })
  .catch((err) => {
    console.log('Unable to connect to db', err);
    process.exit(1);
  });
