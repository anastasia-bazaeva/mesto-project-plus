import { UNAUTHORIZED } from './utils';

class Unauthorized extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

export default Unauthorized;
