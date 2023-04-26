import { Request, Response } from 'express';

export const invalidUrlHandler = (req: Request, res: Response) => {
  res.status(404).send({ message: "Запрашиваемого ресурса не существует" })
}