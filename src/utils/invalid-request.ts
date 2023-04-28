import { BAD_REQUEST } from './utils';

class InvalidRequest extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

export default InvalidRequest;
