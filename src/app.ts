import express from 'express';
import mongoose from 'mongoose';
import {userRouter} from './routers/user';
import { auth } from './middlewares/auth';
import { cardsRouter } from './routers/cards';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
});
