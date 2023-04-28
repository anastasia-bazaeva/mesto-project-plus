import { Router } from 'express';
import {
  getUsers, getUser, infoUpdate, avatarUpdate,
} from '../controllers/user';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.patch('/me', infoUpdate);
userRouter.post('/me/avatar', avatarUpdate);

export default userRouter;
