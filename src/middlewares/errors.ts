import { Request, Response, NextFunction } from 'express';
import { SERVER_ERROR } from '../utils/utils';

type AppError = {
  statusCode: number,
  message: string,
}
const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR
      ? `На сервере произошла ошибка: ${err}`
      : message,
  });
  next();
};

export default errorHandler;
