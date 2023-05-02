import { Router } from 'express';
import {
  getCards, createCard, deleteCard, toggleLike,
} from '../controllers/cards';
import { postCardValidation, deleteCardValidation, likesValidation } from '../utils/validation';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', postCardValidation, createCard);
cardsRouter.delete('/:cardId', deleteCardValidation, deleteCard);
cardsRouter.delete('/:cardId/likes', likesValidation, toggleLike);
cardsRouter.put('/:cardId/likes', likesValidation, toggleLike);
export default cardsRouter;
