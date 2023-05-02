import express from 'express';
import mongoose from 'mongoose';
import { celebrate, Joi } from 'celebrate';
import cookieParser from 'cookie-parser';
import { auth } from './middlewares/auth';
import router from './routers/router';
import login from './controllers/login';
import { createUser } from './controllers/user';
import errorHandler from './middlewares/errors';
import { errorLogger, requestLogger } from './middlewares/logger';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(50),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(50),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
    avatar: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/),
  }),
}), createUser);
app.use(auth);
app.use('/', router);

app.use(errorHandler);
app.use(errorLogger);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
