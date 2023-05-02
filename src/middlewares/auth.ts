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
  const { cookie } = req.headers;
  if (!cookie) {
    const AuthError = new Unauthorized('Неавторизованный пользователь', res);
    AuthError.sendRes();
    throw new Unauthorized('Неавторизованный пользователь', res);
  }

  const token = cookie.replace('Bearer ', '');
  let payload: JwtPayload | string;
  try {
    payload = verify(token, JWT_SECRET);
  } catch (err) {
    const AuthError = new Unauthorized('Неавторизованный пользователь', res);
    AuthError.sendRes();
    throw new Unauthorized('Неавторизованный пользователь', res);
  }
  req.user = { _id: payload };
  next();
};
