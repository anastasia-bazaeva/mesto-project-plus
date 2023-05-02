import mongoose from 'mongoose';
import validator from 'validator';
import defaults from '../app-config';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}
const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: defaults.username,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: defaults.userDescript,
  },
  avatar: {
    type: String,
    validate: {
      validator: (url: string) => validator.isURL(url),
      message: 'Некорректная ссылка на изображение',
    },
    default: defaults.userAvatar,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: 'Некорректный адрес почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
export default mongoose.model<IUser>('user', userSchema);
