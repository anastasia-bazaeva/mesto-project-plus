import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Unauthorized from '../utils/unauthorized';
import cardSchema from '../models/card';
import { RequestWithUserRole } from '../middlewares/auth';
import {
  CREATED_SUCCESSFULLY,
  SUCCESS,
} from '../utils/utils';
import InvalidID from '../utils/invalid-id';
import InvalidRequest from '../utils/invalid-request';
import NotFound from '../utils/not-found';

export const getCards = (req: Request, res: Response, next: NextFunction) => cardSchema.find({})
  .populate(['owner', 'likes'])
  .then((cards) => res.status(SUCCESS).send({ data: cards }))
  .catch(next);

export const createCard = (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  return cardSchema.create({ name, link, owner: req.user?._id })
    .then((card) => res.status(CREATED_SUCCESSFULLY).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new InvalidRequest('Введены некорректные данные'));
      }
      next(err);
    });
};

export const deleteCard = (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  cardSchema.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user?._id) {
        next(new Unauthorized('Вы не владелец карточки'));
      } else {
        res.status(SUCCESS).send(card);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFound('Карточка не найдена'));
      }
      if (err instanceof mongoose.Error.CastError) {
        next(new InvalidID('Передан неверный ID'));
      }
      next(err);
    });
};

export const toggleLike = (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  cardSchema.findByIdAndUpdate(
    req.params.cardId,
    req.method === 'PUT'
      ? { $addToSet: { likes: req.user?._id } }
      : { $pull: { likes: req.user?._id } },
    { new: true },
  )
    .then((card) => res.status(SUCCESS).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new InvalidID('Передан неверный ID'));
      }
      next(err);
    });
};
