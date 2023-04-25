import { Request, Response } from 'express';
import userSchema from '../models/user';
import { RequestWithUserRole } from '../middlewares/auth';
import { BAD_REQUEST, CREATED_SUCCESSFULLY, NOT_FOUND, SERVER_ERROR, SUCCESS } from '../utils/utils';

export const getUsers = (req: Request, res: Response) => {
  return userSchema.find({})
    .then(users => res.status(SUCCESS).send({ data: users }))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Произошла ошибка при загрузке пользователей' }))
}

export const getUser = (req: Request, res: Response) => {
  const { _id } = req.body;

  return userSchema.find({_id})
    .then(user => res.status(SUCCESS).send({ data: user }))
    .catch((err) => {
      err.name === 'CastError'
      ? res.status(NOT_FOUND).send({ message: 'Пользователь не найден' })
      : res.status(SERVER_ERROR).send({ message: 'Произошла ошибка при загрузке пользователя' })
    })
}

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return userSchema.create({ name, about, avatar })
    .then(user => res.status(CREATED_SUCCESSFULLY).send({ data: user }))
    .catch((err) => {
      err.name === 'ValidationError'
      ? res.status(BAD_REQUEST).send({ message: 'Переданы неверные данные пользователя' })
      : res.status(SERVER_ERROR).send({ message: 'Произошла ошибка при создании пользователя' })
  })
}

export const updateUserInfo = (req: RequestWithUserRole, res: Response) => {
  const { name, about } = req.body;
  return userSchema.findByIdAndUpdate({ _id: req.user?._id }, { name, about })
    .then(user => res.status(SUCCESS).send({ data: user }))
    .catch((err) => {
      if(err.name === 'CastError') {
        return res.status(NOT_FOUND).send({ message: 'Пользователь не найден' })
      }
      if(err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы неверные данные' })
      }
      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка при обновлении данных профиля' })
    })
}

export const updateAvatar = (req: RequestWithUserRole, res: Response) => {
  const { avatar } = req.body;
  return userSchema.findByIdAndUpdate({ _id: req.user?._id }, { avatar })
    .then(user => res.status(SUCCESS).send({ data: user }))
    .catch((err) => {
      if(err.name === 'CastError') {
        return res.status(NOT_FOUND).send({ message: 'Пользователь не найден' })
      }
      if(err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы неверные данные' })
      }
      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка при обновлении аватара' })
    })
}