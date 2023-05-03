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
        next(new NotFound('Пользователь не найден'));
      } else {
        next(err);
      }
    });
};

export function findUserInfo(req: RequestWithUserRole, res: Response, next: NextFunction) {
  const { _id } = req.params;
  return getUser(req, res, { _id }, next);
}

export function getMyInfo(req: RequestWithUserRole, res: Response, next: NextFunction) {
  return getUser(req, res, { _id: req.user?._id }, next);
}

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => userSchema.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.status(CREATED_SUCCESSFULLY).send({
        data: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
        },
      }))
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          next(new InvalidRequest('Переданы некорректные данные'));
        } else if (err.code === 11000) next(new EmailExist('Такой адрес почты уже зарегистрирован'));
        else next(err);
      }));
};

const updateUser = (
  req: RequestWithUserRole,
  res: Response,
  option: Object,
  next: NextFunction,
) => {
  userSchema.findByIdAndUpdate(
    { _id: req.user?._id },
    option,
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.status(SUCCESS).send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFound('Карточка не найдена'));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new InvalidRequest('Переданы некорректные данные'));
      } else next(err);
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
