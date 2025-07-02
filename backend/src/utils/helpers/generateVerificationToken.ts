import crypto from "crypto";
import { MAX_VERIFICATION_TOKEN_AGE } from "../constants";

export const generateVerificationToken = () => {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const expiryDate: number = Date.now() + MAX_VERIFICATION_TOKEN_AGE;
  const verificationTokenExpiry: Date = new Date(expiryDate);

  return { verificationToken, verificationTokenExpiry };
};
