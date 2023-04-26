import { Router } from 'express';
import {
  getCards, createCard, deleteCard, toggleLike,
} from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.delete('/:cardId/likes', toggleLike);
cardsRouter.put('/:cardId/likes', toggleLike);
export default cardsRouter;
