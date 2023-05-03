import { Request, Response, NextFunction } from 'express';
import NotFound from '../utils/not-found';

const invalidUrlHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFound('Запрашиваемого ресурса не существует'));
};
export default invalidUrlHandler;
