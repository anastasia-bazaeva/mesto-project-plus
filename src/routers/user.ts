import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUsers, findUserInfo, infoUpdate, avatarUpdate, getMyInfo,
} from '../controllers/user';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().required(),
  }),
}), findUserInfo);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),
}), infoUpdate);
userRouter.get('/me', getMyInfo);
userRouter.post('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/),
  }),
}), avatarUpdate);

export default userRouter;
