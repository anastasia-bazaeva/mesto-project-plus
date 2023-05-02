import winston from 'winston';
import expressWinston from 'express-winston';
import 'winston-daily-rotate-file';

const errTransport = new winston.transports.DailyRotateFile({
  filename: 'error-%DATE%.log',
  dirname: 'logs',
  datePattern: 'YYYY-MM-DD-HH',
  maxFiles: 5,
});

const reqTransport = new winston.transports.DailyRotateFile({
  filename: 'request-%DATE%.log',
  dirname: 'logs',
  datePattern: 'YYYY-MM-DD-HH',
  maxFiles: 5,
});

export const requestLogger = expressWinston.logger({
  transports: [
    reqTransport,
  ],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    errTransport,
  ],
  format: winston.format.json(),
});
