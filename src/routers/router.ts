import { Router } from 'express';
import userRouter from './user';
import cardsRouter from './cards';
import invalidUrl from './invalid';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardsRouter);
router.use('/*', invalidUrl);
export default router;
