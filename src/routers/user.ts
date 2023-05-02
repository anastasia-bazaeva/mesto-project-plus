import { Router } from 'express';
import {
  getUsers, findUserInfo, infoUpdate, avatarUpdate, getMyInfo,
} from '../controllers/user';
import { userInfoValidation, userUpdateValidation, updateAvatarValidation } from '../utils/validation';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', userInfoValidation, findUserInfo);
userRouter.patch('/me', userUpdateValidation, infoUpdate);
userRouter.get('/me', getMyInfo);
userRouter.post('/me/avatar', updateAvatarValidation, avatarUpdate);

export default userRouter;
