import express, { Router } from "express";
import {
  validateUserForgetPassword,
  validateUserResetPassword,
  validateUserSignup,
} from "../validators/validateUsers";
import logOutUser, {
  forgetPassword,
  resetPassword,
  signUpUser,
  verifyEmail,
} from "../controllers/authController";
import { authErrorHandler } from "../middlewares/authErrorHandler";
import { authenticateGoogle } from "../middlewares/passport/authenticateGoogle";
import { googleAuthCallback } from "../middlewares/passport/googleAuthCallback";
import { authenticateLocal } from "../middlewares/passport/authenticateLocal";
import { authenticateJwt } from "../middlewares/passport/authenticateJwt";

const router: Router = express.Router();

router.post("/sign-up", validateUserSignup, signUpUser, authErrorHandler);

router.post("/log-in", authenticateLocal, authErrorHandler);

router.get("/log-out", authenticateJwt, logOutUser);

router.get("/google", authenticateGoogle);

router.get("/google/callback", googleAuthCallback);

router.get("/verify-email", verifyEmail);

router.post("/forget-password", validateUserForgetPassword, forgetPassword);

router.patch("/reset-password", validateUserResetPassword, resetPassword);

export default router;
