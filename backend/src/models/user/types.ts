import { Document, Model } from "mongoose";

export interface UserInterface extends Document {
  _id: string;
  email: string;
  password?: string;
  passwordConfirm?: string;
  role: string;
  generateAuthToken: () => string;
}

export interface UserModelInterface extends Model<UserInterface> {
  signUpUser(newUser: Omit<UserInterface, "_id">): Promise<UserInterface>;
  findUserByEmail(email: string): Promise<UserInterface>;
  findUserById(id: string): Promise<UserInterface>;
}
