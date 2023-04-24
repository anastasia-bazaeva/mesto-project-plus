import { Router } from 'express';
import { getUsers, getUser, createUser } from '../controllers/user';

export const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.post('/', createUser);
