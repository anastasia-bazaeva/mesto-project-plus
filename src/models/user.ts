import mongoose from 'mongoose';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  _id?: string;
}
const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200
  },
  avatar: {
    type: String,
    required: true
  },
  _id: {
    type: String,
  }
});
export default mongoose.model<IUser>('user', userSchema);