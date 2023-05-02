export const SERVER_ERROR = 500;
export const NOT_FOUND = 404;
export const BAD_REQUEST = 400;
export const CREATED_SUCCESSFULLY = 201;
export const SUCCESS = 200;
export const UNAUTHORIZED = 401;
export const EMAIL_EXIST = 409;

// export const validationErrorHandler = (err: any) => ({
//   message: 'Oшибка валидации, ключи объекта errors являются поля, в которых найдены ошибки',
//   errors: err.errors,
// });

export const linkRegExp = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
