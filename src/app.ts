import express from 'express';
import mongoose from 'mongoose';
import { auth } from './middlewares/auth';
import { router } from './routers/router';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(auth);
app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
});
