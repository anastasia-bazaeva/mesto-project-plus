import { Request, Response } from 'express';
import mongoose from 'mongoose';
import cardSchema from '../models/card';
import { RequestWithUserRole } from '../middlewares/auth';
import { BAD_REQUEST, CREATED_SUCCESSFULLY, NOT_FOUND, SERVER_ERROR, SUCCESS, validationErrorHandler } from '../utils/utils';


export const getCards = (req: Request, res: Response) => {
  return cardSchema.find({})
    .populate(['owner', 'likes'])
    .then(cards => res.status(SUCCESS).send({ data: cards }))
    .catch((err) => {
      if(err instanceof mongoose.Error.DocumentNotFoundError) {
        return res.status(NOT_FOUND).send({ message: 'Данные не найдены' })
      }
      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка при загрузке карточек' })
    })
}

export const createCard = (req: RequestWithUserRole, res: Response) => {
  const { name, link } = req.body;

  return cardSchema.create({ name, link, owner: req.user?._id })
    .then(card => res.status(CREATED_SUCCESSFULLY).send(card))
    .catch((err) => {
      if(err instanceof mongoose.Error.ValidationError){
        return res.status(BAD_REQUEST).send(validationErrorHandler(err))
      }
      res.status(SERVER_ERROR).send({ message: `Произошла ошибка при создании карточки: ${err.message}` })})
}

export const deleteCard = (req: Request, res: Response) => {
  return cardSchema.findByIdAndRemove(req.params.cardId)
    .then(card => res.status(SUCCESS).send(card))
    .catch((err) => {
      if(err instanceof mongoose.Error.DocumentNotFoundError) {
        return res.status(NOT_FOUND).send({ message: 'Карточка не найдена' })
      }
      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка при удалении карточки' })
    })
}

export const toggleLike = (req: RequestWithUserRole, res: Response) => {
  return cardSchema.findByIdAndUpdate(req.params.cardId,
    req.method === "PUT"
    ? { $addToSet: { likes: req.user?._id }}
    : { $pull: { likes: req.user?._id }},
    { new: true })
    .then(card => res.status(SUCCESS).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res.status(BAD_REQUEST).send({ message: 'Передан неверный ID' })
      }
      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка при нажатии на лайк' })
  })
}