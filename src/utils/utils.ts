export const SERVER_ERROR = 500;
export const NOT_FOUND = 404;
export const BAD_REQUEST = 400;
export const CREATED_SUCCESSFULLY = 201;
export const SUCCESS = 200;

export const validationErrorHandler = (err: any) => {
  return {
    message: 'Произошла ошибка валидации, ключами объекта errors являются поля, в которых найдены ошибки',
    errors: err.errors,
  }
}