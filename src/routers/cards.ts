import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getCards, createCard, deleteCard, toggleLike,
} from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/),
  }),
}), createCard);
cardsRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required(),
  }),
}), deleteCard);
cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required(),
  }),
}), toggleLike);
cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required(),
  }),
}), toggleLike);
export default cardsRouter;
