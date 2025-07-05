import express, { Router } from "express";
import { validateUserSignup } from "../validators/validateUsers";
import {
  logOutUser,
  getMyProfile,
  signUpUser,
} from "../controllers/authController";
import { authErrorHandler } from "../middlewares/authErrorHandler";
import { authenticateLocal } from "../middlewares/passport/authenticateLocal";
import { authenticateJwt } from "../middlewares/passport/authenticateJwt";

const router: Router = express.Router();

router.post("/sign-up", validateUserSignup, signUpUser, authErrorHandler);

router.post("/log-in", authenticateLocal, authErrorHandler);

router.get("/log-out", authenticateJwt, logOutUser);

router.get("/me", authenticateJwt, getMyProfile);

export default router;
