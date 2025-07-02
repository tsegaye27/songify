import mongoose from "mongoose";
import * as Statics from "./statics";
import * as Methods from "./methods";
import { registerHooks } from "./hooks";
import { UserInterface, UserModelInterface } from "./types";
import userSchema from "./schema";

userSchema.static(Statics);
userSchema.method(Methods);

registerHooks(userSchema);

const User = mongoose.model<UserInterface, UserModelInterface>(
  "User",
  userSchema,
);

export default User;
