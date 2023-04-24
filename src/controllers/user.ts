import { Request, Response } from 'express';
import userSchema from '../models/user';

export const getUsers = (req: Request, res: Response) => {
  return userSchema.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
}

export const getUser = (req: Request, res: Response) => {
  const { _id } = req.body;

  return userSchema.find({_id})
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
}

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return userSchema.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
}