import { Response } from 'express';
import { UNAUTHORIZED } from './utils';

class Unauthorized extends Error {
  statusCode: number;

  res: Response;

  constructor(message: string, res: Response) {
    super(message);
    this.statusCode = UNAUTHORIZED;
    this.res = res;
  }

  sendRes() {
    this.res.status(this.statusCode).send(this.message);
  }
}

export default Unauthorized;
