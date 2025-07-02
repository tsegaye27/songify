import bcrypt from "bcryptjs";
import { NextFunction } from "express";
import { SALT_ROUNDS } from "../../utils/constants";
import { UserInterface } from "./types";
import { Schema } from "mongoose";

const preSaveHook = async function (this: UserInterface, next: NextFunction) {
  if (this.isModified("password") && this.password) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm = undefined;
  }

  next();
};

export const registerHooks = (userSchema: Schema<UserInterface>) => {
  userSchema.pre("save", preSaveHook as any);
};
