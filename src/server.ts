import express, { Application } from 'express';

import session from 'express-session';
import router from './routes';
import cors from 'cors';
export async function createServer(): Promise<Application> {
  const app = express();

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

  app.use(
    (
      err: any,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      res.status(err.status).json({
        error: {
          type: 'request_validation',
          message: err.message,
          errors: err.errors,
        },
      });
    },
  );

  app.use(router);
  return app;
}
