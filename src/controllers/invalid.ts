import { Request, Response } from 'express';
import { NOT_FOUND } from '../utils/utils';

const invalidUrlHandler = (req: Request, res: Response) => res.status(NOT_FOUND)
  .send({ message: 'Запрашиваемого ресурса не существует' });
export default invalidUrlHandler;
