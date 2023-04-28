import { verify, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../controllers/login';
import Unauthorized from '../utils/unauthorized';

export interface RequestWithUserRole extends Request {
  user?: {
    _id: JwtPayload
  }
}

export const auth = (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  const { cookie } = req.headers;
  if (!cookie) throw new Unauthorized('Неавторизованный пользователь');

  const token = cookie.replace('Bearer ', '');
  let payload;
  try {
    payload = verify(token, JWT_SECRET);
  } catch (err) {
    throw new Unauthorized('Неавторизованный пользователь');
  }
  req.user = payload as { _id: JwtPayload };
  next();
};
