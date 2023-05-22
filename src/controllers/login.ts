import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userSchema from '../models/user';
import Unauthorized from '../utils/unauthorized';
import InvalidRequest from '../utils/invalid-request';

export const { JWT_SECRET = 'secret-key' } = process.env;

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return userSchema.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) return next(new Unauthorized('Пользователь не авторизован'));
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return next(new InvalidRequest('Пароли не совпадают'));
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          return res.cookie('auth', token, { httpOnly: true, maxAge: 3600000 * 24 * 7 }).end();
        });
    })
    .catch(next);
};

export default login;
