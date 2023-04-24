import { Request, Response, NextFunction } from 'express';

export interface RequestWithUserRole extends Request {
  user?: {
    _id: string
  }
}

export const auth = (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  req.user = {
    _id: '644693ad2f7f58f2a05f9949'
  };

  next();
};