import User from "../models/user";
import { NextFunction, Request, Response } from "express";
import { MAX_COOKIE_AGE } from "../utils/constants";
import { UserInterface } from "../models/user/types";
import { NodeEnv, Status } from "../utils/enums";
import httpStatus from "http-status";
import { responseMessages } from "../utils/messages/responseMessages";
import AppError from "../errors/appErrors";
import { errorMessages } from "../utils/messages/errorMessages";

const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, passwordConfirm } = req.body;
    const newUser = {
      email,
      password,
      passwordConfirm,
    } as Omit<UserInterface, "_id">;

    const createdUser = await User.signUpUser(newUser);
    const loginToken = createdUser.generateAuthToken();

    res.cookie("jwt", loginToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === NodeEnv.Production,
      sameSite: "lax",
      maxAge: MAX_COOKIE_AGE,
    });

    res.status(httpStatus.CREATED).json({
      status: Status.Success,
      message: responseMessages.userApi.signUp,
      data: {
        user: {
          id: createdUser._id,
          email: createdUser.email,
          role: createdUser.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const logOutUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as UserInterface;

  if (!user) {
    return next(
      new AppError(errorMessages.authFailed, httpStatus.UNAUTHORIZED),
    );
  }

  res.clearCookie("jwt");

  res.status(httpStatus.OK).send({
    status: Status.Success,
    message: responseMessages.userApi.logout,
  });
};

const getMyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user as UserInterface;

  if (!user) {
    return next(
      new AppError(errorMessages.authFailed, httpStatus.UNAUTHORIZED),
    );
  }

  res.status(httpStatus.OK).json({
    status: Status.Success,
    data: {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    },
  });
};

export default logOutUser;

export { signUpUser, logOutUser, getMyProfile };
