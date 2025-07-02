import mongoose from "mongoose";
import { UserInterface } from "./types";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function (this: UserInterface) {
        return !this.googleId;
      },
    },
    passwordConfirm: {
      type: String,
      required: function (this: UserInterface) {
        return !this.googleId;
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiry: {
      type: Date,
    },
    passwordResetToken: String,
    passwordResetTokenExpiry: Date,
  },

  {
    timestamps: true,
  },
);

export default userSchema;
