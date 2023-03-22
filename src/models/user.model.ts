import { Schema, model } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isActive: boolean;
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

export const UserModel = model<IUser, any>("User", userSchema);