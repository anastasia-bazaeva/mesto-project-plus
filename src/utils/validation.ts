import { celebrate, Joi } from 'celebrate';
import { linkRegExp } from './utils';

const passwordJoi = Joi.string().required().min(3).max(50);
const linkJoi = Joi.string().pattern(linkRegExp);
const nameJoi = Joi.string().min(2).max(30);
const aboutJoi = Joi.string().min(2).max(200);
const idReqJoi = Joi.string().length(24).hex().required();

export const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: passwordJoi,
  }),
});

export const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: passwordJoi,
    name: nameJoi,
    about: aboutJoi,
    avatar: linkJoi,
  }),
});

export const userInfoValidation = celebrate({
  params: Joi.object().keys({
    userId: idReqJoi,
  }),
});

export const userUpdateValidation = celebrate({
  body: Joi.object().keys({
    name: nameJoi,
    about: aboutJoi,
  }),
});

export const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: linkJoi.required(),
  }),
});

export const postCardValidation = celebrate({
  body: Joi.object().keys({
    name: nameJoi.required(),
    link: linkJoi.required(),
  }),
});

export const deleteCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: idReqJoi,
  }),
});

export const likesValidation = celebrate({
  params: Joi.object().keys({
    cardId: idReqJoi,
  }),
});
