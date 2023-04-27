import { BAD_REQUEST } from './utils';

class InvalidID extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

export default InvalidID;
