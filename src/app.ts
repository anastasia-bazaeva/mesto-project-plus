import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import router from './routers/router';
import errorHandler from './middlewares/errors';
import { errorLogger, requestLogger } from './middlewares/logger';
import defaults from './app-config';

const { PORT = defaults.port } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use('/', router);

app.use(errorHandler);
app.use(errorLogger);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
