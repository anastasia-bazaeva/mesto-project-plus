import { verify, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../controllers/login';
import Unauthorized from '../utils/unauthorized';

export interface RequestWithUserRole extends Request {
  user?: {
    _id: JwtPayload | string;
  }
}

export const auth = (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  const cookie = req.cookies.auth;
  if (!cookie) {
    return next(new Unauthorized('Неавторизованный пользователь'));
  }
  const token = cookie.replace();
  let payload: string | JwtPayload | any;
  try {
    payload = verify(token, JWT_SECRET);
    const { _id } = payload;
    req.user = { _id };
  } catch (err) {
    next(err);
  }
  return next();
};
