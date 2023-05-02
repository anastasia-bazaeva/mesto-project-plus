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
    next(new Unauthorized('Неавторизованный пользователь'));
  }
  const token = cookie?.replace('Bearer ', '');
  let payload: JwtPayload | string;
  try {
    if (token) {
      payload = verify(token, JWT_SECRET);
      req.user = { _id: payload };
    } else {
      next(new Unauthorized('Неавторизованный пользователь'));
    }
  } catch (err) {
    next(err);
  }
  next();
};
