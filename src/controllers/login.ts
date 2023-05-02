import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userSchema from '../models/user';

export const { JWT_SECRET = 'secret-key' } = process.env;

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return userSchema.findOne({ email }).select('+password')
    .orFail()
    .then((user) => {
      if (!user) next(new Error('Пользователь не авторизован'));
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) next(new Error('Пароли не совпадают'));
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          res.cookie('authorization-token', token, { httpOnly: true, maxAge: 3600000 * 24 * 7 }).end();
        });
    })
    .catch(next);
};

export default login;
