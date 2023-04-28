import { NOT_FOUND } from './utils';

class DataNotFound extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = NOT_FOUND;
    this.name = 'NotFoundError';
  }
}

export default DataNotFound;
