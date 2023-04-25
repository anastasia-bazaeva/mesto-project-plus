import { Router } from 'express';
import { getUsers, getUser, createUser, updateUserInfo, updateAvatar } from '../controllers/user';

export const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUserInfo);
userRouter.post('/me/avatar', updateAvatar);
