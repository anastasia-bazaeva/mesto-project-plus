import { Request, Response } from 'express';
import mongoose from 'mongoose';
import userSchema from '../models/user';
import { RequestWithUserRole } from '../middlewares/auth';
import {
  BAD_REQUEST, CREATED_SUCCESSFULLY, NOT_FOUND, SERVER_ERROR, SUCCESS, validationErrorHandler,
} from '../utils/utils';

export const getUsers = (req: Request, res: Response) => userSchema.find({})
  .then((users) => res.status(SUCCESS).send({ data: users }))
  .catch((err) => {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return res.status(NOT_FOUND).send({ message: 'Данные не найдены' });
    }
    return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка при загрузке пользователей' });
  });

export const getUser = (req: Request, res: Response) => {
  const { _id } = req.body;

  return userSchema.find({ _id })
    .then((user) => res.status(SUCCESS).send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка при загрузке пользователя' });
    });
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return userSchema.create({ name, about, avatar })
    .then((user) => res.status(CREATED_SUCCESSFULLY).send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(BAD_REQUEST).send(validationErrorHandler(err));
      }
      return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка при создании пользователя' });
    });
};

const updateUser = (req: RequestWithUserRole, res: Response, option: Object) => {
  userSchema.findByIdAndUpdate(
    { _id: req.user?._id },
    option,
    { new: true, runValidators: true },
  )
    .then((user) => res.status(SUCCESS).send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(BAD_REQUEST).send(validationErrorHandler(err));
      }
      return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка при обновлении данных профиля' });
    });
};

export function infoUpdate(req: RequestWithUserRole, res: Response) {
  const { name, about } = req.body;
  return updateUser(req, res, { name, about });
}

export function avatarUpdate(req: RequestWithUserRole, res: Response) {
  const { avatar } = req.body;
  return updateUser(req, res, { avatar });
}
