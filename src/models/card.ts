import mongoose from 'mongoose';
import validator from 'validator';
import { IUser } from './user';
import defaults from '../app-config';

interface ICard {
  name: string,
  link: string,
  owner: IUser,
  likes?: Array<IUser> | [],
  createdAt: Date
}

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url: string) => validator.isURL(url),
      message: 'Некорректная ссылка на изображение',
    },
  },
  owner: {
    type: String,
    ref: 'user',
    required: true,
  },
  likes: {
    type: Array<mongoose.Schema.Types.ObjectId>,
    default: defaults.likes,
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model<ICard>('card', cardSchema);
