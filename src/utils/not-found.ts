import { NOT_FOUND } from './utils';

class NotFound extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

export default NotFound;
