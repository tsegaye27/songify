import jwt from "jsonwebtoken";
import { MAX_TOKEN_AGE } from "../../utils/constants";
import { JWT_SECRET } from "../../config/environments";
import { UserInterface } from "./types";

export const generateAuthToken = function (this: UserInterface) {
  return jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: MAX_TOKEN_AGE,
  });
};
