import { Request, Response, NextFunction } from 'express';
import { Session } from 'express-session';

export const isAuth = (
  req: Request & { session: Session & { userId?: number } },
  _res: Response,
  next: NextFunction,
) => {
  if (!req.session.userId) {
    throw new Error('Não autenticado!');
  }

  return next();
};
