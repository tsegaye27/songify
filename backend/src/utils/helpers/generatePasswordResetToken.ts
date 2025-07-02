import crypto from "crypto";
import { MAX_VERIFICATION_TOKEN_AGE } from "../constants";

export const generatePasswordResetToken = () => {
  const passwordResetToken = crypto.randomBytes(32).toString("hex");
  const expiryDate: number = Date.now() + MAX_VERIFICATION_TOKEN_AGE;
  const passwordResetTokenExpiry: Date = new Date(expiryDate);

  return { passwordResetToken, passwordResetTokenExpiry };
};
