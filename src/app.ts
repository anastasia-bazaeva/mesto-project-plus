import express from 'express';
import mongoose from 'mongoose';
import { auth } from './middlewares/auth';
import router from './routers/router';
import login from './controllers/login';
import { createUser } from './controllers/user';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(auth);
app.use('/', router);
app.post('/signin', login);
app.post('/signup', createUser);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
