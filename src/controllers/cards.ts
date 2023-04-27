import { Request, Response } from 'express';
import mongoose from 'mongoose';
import cardSchema from '../models/card';
import { RequestWithUserRole } from '../middlewares/auth';
import {
  BAD_REQUEST,
  CREATED_SUCCESSFULLY,
  SERVER_ERROR,
  SUCCESS,
  validationErrorHandler,
} from '../utils/utils';
import DataNotFound from '../utils/data-not-found';
import InvalidID from '../utils/invalid-id';

export const getCards = (req: Request, res: Response) => cardSchema.find({})
  .populate(['owner', 'likes'])
  .then((cards) => res.status(SUCCESS).send({ data: cards }))
  .catch(() => {
    res.status(SERVER_ERROR).send({ message: 'Произошла ошибка при загрузке карточек' });
  });

export const createCard = (req: RequestWithUserRole, res: Response) => {
  const { name, link } = req.body;
  if (!req.user?._id) throw new InvalidID('Авторизованный пользователь не найден');

  return cardSchema.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED_SUCCESSFULLY).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(BAD_REQUEST).send(validationErrorHandler(err));
      }
      return res.status(SERVER_ERROR).send({ message: `Произошла ошибка при создании карточки: ${err.message}` });
    });
};

export const deleteCard = (req: Request, res: Response) => {
  cardSchema.findByIdAndRemove(req.params.cardId)
    .orFail(() => new DataNotFound('Карточка с таким ID не найдена'))
    .then((card) => res.status(SUCCESS).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res.status(BAD_REQUEST).send({ message: 'Передан неверный ID' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка при удалении карточки' });
    });
};

export const toggleLike = (req: RequestWithUserRole, res: Response) => {
  if (!req.user?._id) throw new InvalidID('Авторизованный пользователь не найден');
  cardSchema.findByIdAndUpdate(
    req.params.cardId,
    req.method === 'PUT'
      ? { $addToSet: { likes: req.user._id } }
      : { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(SUCCESS).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res.status(BAD_REQUEST).send({ message: 'Передан неверный ID' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка при нажатии на лайк' });
    });
};
