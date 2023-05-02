import { EMAIL_EXIST } from './utils';

class EmailExist extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = EMAIL_EXIST;
  }
}

export default EmailExist;
