import { Request, Response } from 'express';
import cardSchema from '../models/card';
import { RequestWithUserRole } from '../middlewares/auth';


export const getCards = (req: Request, res: Response) => {
  return cardSchema.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при загрузке карточек' }))
}

export const createCard = (req: RequestWithUserRole, res: Response) => {
  const { name, link } = req.body;

  return cardSchema.create({ name, link, owner: req.user?._id })
    .then(card => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Неверные поля при создании карточки' })
      }
      res.status(500).send({ message: 'Произошла ошибка при создании карточки' })})
}

export const deleteCard = (req: Request, res: Response) => {
  return cardSchema.findByIdAndRemove(req.params.cardId)
    .then(card => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при создании карточки' }))
}