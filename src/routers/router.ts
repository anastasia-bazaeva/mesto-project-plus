import { Router } from 'express';
import { auth } from '../middlewares/auth';
import login from '../controllers/login';
import { createUser } from '../controllers/user';
import userRouter from './user';
import cardsRouter from './cards';
import invalidUrl from './invalid';
import { signinValidation, signupValidation } from '../utils/validation';

const router = Router();
router.post('/signin', signinValidation, login);
router.post('/signup', signupValidation, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardsRouter);
router.use('/*', invalidUrl);
export default router;
