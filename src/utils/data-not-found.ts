import { NOT_FOUND } from './utils';

class DataNotFound extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

export default DataNotFound;

// нашла примеры как тут:
// https://www.geeksforgeeks.org/mongoose-query-prototype-orfail-api/
// и тут:
// http://thecodebarbarian.com/whats-new-in-mongoose-53-orfail-and-global-toobject.html ,
// где ошибка несуществующего документа обрабатывается именно на классах, надеюсь так можно
