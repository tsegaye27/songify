import { Model } from "mongoose";
import { UserInterface } from "./types";
import { Profile } from "passport";

export async function signUpUser(
  this: Model<UserInterface>,
  newUser: UserInterface,
) {
  return this.create(newUser);
}

export async function findUserById(this: Model<UserInterface>, id: string) {
  return await this.findById(id);
}

export async function findUserByEmail(
  this: Model<UserInterface>,
  email: string,
) {
  return await this.findOne({ email });
}

export async function findUserByGoogleId(
  this: Model<UserInterface>,
  googleId: string,
) {
  return await this.findOne({ googleId });
}

export async function findUserByVerificationToken(
  this: Model<UserInterface>,
  verificationToken: string,
) {
  return await this.findOne({
    verificationToken,
  });
}

export async function deleteUser(this: Model<UserInterface>, id: string) {
  return this.findByIdAndDelete(id);
}

export async function updateUser(
  this: Model<UserInterface>,
  id: string,
  user: UserInterface,
) {
  return this.findByIdAndUpdate(id, user, { new: true });
}

export async function createUserFromGoogle(
  this: Model<UserInterface>,
  profile: Profile,
) {
  const { emails, id: googleId } = profile;
  const email = emails && emails.length > 0 ? emails[0].value : undefined;

  let user = await this.findOne({ $or: [{ googleId }, { email }] });

  if (user) {
    if (!user.googleId) {
      user.googleId = googleId;
      return await user.save();
    }

    return user;
  }

  const newUser = {
    email,
    googleId,
    password: undefined,
    isVerified: true,
  };

  return await this.create(newUser);
}

export async function findUserByPasswordResetToken(
  this: Model<UserInterface>,
  passwordResetToken: string,
) {
  return await this.findOne({
    passwordResetToken,
  });
}
