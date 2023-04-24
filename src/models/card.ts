import mongoose from 'mongoose';
import { IUser } from './user';

interface ICard {
  name: string,
  link: string,
  owner: IUser | {_id: string},
  likes?: Array<IUser> | [],
  _id?: string

}

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    ref: 'user',
    required: true
  },
  likes: {
    type: Array<mongoose.Schema.Types.ObjectId>,
    default: [],
    ref: 'user'
  },
  _id: {
    type: String
  }
})
export default mongoose.model<ICard>('card', cardSchema);