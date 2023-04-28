import { FORBIDDEN } from './utils';

class Unauthorized extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

export default Unauthorized;
