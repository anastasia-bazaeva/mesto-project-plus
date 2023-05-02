import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import InvalidRequest from '../utils/invalid-request';
import userSchema from '../models/user';
import { RequestWithUserRole } from '../middlewares/auth';
import {
  CREATED_SUCCESSFULLY,
  SUCCESS,
} from '../utils/utils';
import InvalidID from '../utils/invalid-id';
import NotFound from '../utils/not-found';
import EmailExist from '../utils/email-exist';

export const getUsers = (req: Request, res: Response, next: NextFunction) => userSchema.find({})
  .then((users) => res.status(SUCCESS).send({ data: users }))
  .catch(next);

type ID = string | JwtPayload | undefined;

export const getUser = (req: Request, res: Response, option: { _id: ID }, next: NextFunction) => {
  userSchema.find(option)
    .orFail()
    .then((user) => res.status(SUCCESS).send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        throw new NotFound('Пользователь не найден');
      }
      next(err);
    });
};

export function findUserInfo(req: RequestWithUserRole, res: Response, next: NextFunction) {
  const { _id } = req.body;
  getUser(req, res, { _id }, next);
}

export function getMyInfo(req: RequestWithUserRole, res: Response, next: NextFunction) {
  getUser(req, res, { _id: req.user?._id }, next);
}

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!(email && password)) throw new InvalidRequest('Неверные данные');
  bcrypt.hash(password, 10)
    .then((hash) => userSchema.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.status(CREATED_SUCCESSFULLY).send({ data: user }))
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          throw new InvalidRequest('Переданы некорректные данные');
        }
        if (err.code === 11000) throw new EmailExist('Такой адрес почты уже зарегистрирован');
        next(err);
      }));
};

const updateUser = (
  req: RequestWithUserRole,
  res: Response,
  option: Object,
  next: NextFunction,
) => {
  if (!req.user?._id) throw new InvalidID('Авторизованный пользователь не найден');
  userSchema.findByIdAndUpdate(
    { _id: req.user._id },
    option,
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.status(SUCCESS).send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        throw new NotFound('Карточка не найдена');
      }
      if (err instanceof mongoose.Error.ValidationError) {
        throw new InvalidRequest('Переданы некорректные данные');
      }
      next(err);
    });
};

export function infoUpdate(req: RequestWithUserRole, res: Response, next: NextFunction) {
  const { name, about } = req.body;
  return updateUser(req, res, { name, about }, next);
}

export function avatarUpdate(req: RequestWithUserRole, res: Response, next: NextFunction) {
  const { avatar } = req.body;
  return updateUser(req, res, { avatar }, next);
}
