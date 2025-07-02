import User from "../models/user";
import { NextFunction, Request, Response } from "express";
import { ENVIRONMENT, MAX_COOKIE_AGE } from "../utils/constants";
import { UserInterface } from "../models/user/types";
import { NodeEnv, Status } from "../utils/enums";
import httpStatus from "http-status";
import { responseMessages } from "../utils/messages/responseMessages";
import AppError from "../errors/appErrors";
import { errorMessages } from "../utils/messages/errorMessages";
import { generateVerificationToken } from "../utils/helpers/generateVerificationToken";
import { generatePasswordResetToken } from "../utils/helpers/generatePasswordResetToken";

const signUpUser = async (req: Request, res: Response, _next: NextFunction) => {
  const { email, password, passwordConfirm } = req.body;
  const newUser = { email, password, passwordConfirm } as Omit<
    UserInterface,
    "_id"
  >;

  const { verificationToken, verificationTokenExpiry } =
    generateVerificationToken();

  const createdUser = await User.signUpUser({
    ...newUser,
    verificationToken,
    verificationTokenExpiry,
  });

  res.status(httpStatus.CREATED).json({
    status: Status.Success,
    message: responseMessages.userApi.signUp,
    data: {
      user: {
        id: createdUser._id,
        email: createdUser.email,
        isVerified: createdUser.isVerified,
      },
    },
  });
};

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    return next(
      new AppError(errorMessages.invalidToken, httpStatus.BAD_REQUEST),
    );
  }

  try {
    const user = await User.findUserByVerificationToken(token);

    if (!user) {
      return next(new AppError(errorMessages.noToken, httpStatus.NOT_FOUND));
    }

    if (
      user.verificationTokenExpiry &&
      Date.now() > user.verificationTokenExpiry.getTime()
    ) {
      return next(
        new AppError(errorMessages.expiredToken, httpStatus.UNAUTHORIZED),
      );
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save({ validateBeforeSave: false });

    const loginToken = user.generateAuthToken();
    res.cookie("jwt", loginToken, {
      httpOnly: true,
      secure: ENVIRONMENT === NodeEnv.Production,
      sameSite: "strict",
      maxAge: MAX_COOKIE_AGE,
    });

    res.status(httpStatus.OK).json({
      status: Status.Success,
      message: responseMessages.userApi.verifyEmail,
      data: {
        user: {
          id: user._id,
          email: user.email,
          isVerified: user.isVerified,
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

const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return next(
      new AppError(errorMessages.unauthorized, httpStatus.BAD_REQUEST),
    );
  }

  try {
    const user = await User.findUserByEmail(email);
    if (!user) {
      return next(
        new AppError(errorMessages.unauthorized, httpStatus.NOT_FOUND),
      );
    }

    const { passwordResetTokenExpiry, passwordResetToken } =
      generatePasswordResetToken();
    user.passwordResetToken = passwordResetToken;
    user.passwordResetTokenExpiry = passwordResetTokenExpiry;

    await user.save({ validateBeforeSave: false });

    res.status(httpStatus.OK).json({
      status: Status.Success,
      message: responseMessages.userApi.passwordReset,
    });
  } catch (error: any) {
    next(error);
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    return next(
      new AppError(errorMessages.invalidToken, httpStatus.BAD_REQUEST),
    );
  }

  try {
    const user = await User.findUserByPasswordResetToken(token);

    if (!user) {
      return next(new AppError(errorMessages.noToken, httpStatus.NOT_FOUND));
    }

    if (
      user.passwordResetTokenExpiry &&
      Date.now() > user.passwordResetTokenExpiry.getTime()
    ) {
      return next(
        new AppError(errorMessages.expiredToken, httpStatus.UNAUTHORIZED),
      );
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    await user.save();

    const loginToken = user.generateAuthToken();
    res.cookie("jwt", loginToken, {
      httpOnly: true,
      secure: ENVIRONMENT === NodeEnv.Production,
      sameSite: "strict",
      maxAge: MAX_COOKIE_AGE,
    });

    res.status(httpStatus.OK).json({
      status: Status.Success,
      message: responseMessages.userApi.resetPasswordAndLogin,
      data: {
        user: {
          id: user._id,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export default logOutUser;

export { signUpUser, logOutUser, verifyEmail, forgetPassword, resetPassword };
