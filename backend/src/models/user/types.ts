import { Document, Model } from "mongoose";
import { Profile } from "passport";

export interface UserInterface extends Document {
  _id: string;
  email: string;
  password?: string;
  passwordConfirm?: string;
  role?: string;
  googleId?: string;
  isVerified: boolean;
  verificationToken: string | undefined;
  verificationTokenExpiry: Date | undefined;
  passwordResetToken: string | undefined;
  passwordResetTokenExpiry: Date | undefined;
  generateAuthToken: () => string;
}

export interface UserModelInterface extends Model<UserInterface> {
  signUpUser(newUser: Omit<UserInterface, "_id">): Promise<UserInterface>;
  findUserByEmail(email: string): Promise<UserInterface>;
  findUserById(id: string): Promise<UserInterface>;
  findUserByGoogleId(googleId: string): Promise<UserInterface>;
  findUserByVerificationToken(
    verificationToken: string,
  ): Promise<UserInterface>;
  createUserFromGoogle(profile: Profile): Promise<UserInterface>;
  findUserByPasswordResetToken(
    passwordResetToken: string,
  ): Promise<UserInterface>;
}
