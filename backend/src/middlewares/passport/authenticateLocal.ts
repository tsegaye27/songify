import passport from "passport";
import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/appErrors";
import logger from "../../config/winston";
import { UserInterface } from "../../models/user/types";
import httpStatus from "http-status";
import { errorMessages } from "../../utils/messages/errorMessages";
import { logMessages } from "../../utils/messages/logMessages";
import { responseMessages } from "../../utils/messages/responseMessages";
import { MAX_COOKIE_AGE } from "../../utils/constants";
import { AuthenticationStrategy, Status } from "../../utils/enums";

export const authenticateLocal = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    AuthenticationStrategy.Local,
    { session: false },
    async (err: Error | null, user: UserInterface | null, info: any) => {
      try {
        if (err) {
          logger.error(errorMessages.localAuthError(err.message));
          return next(
            new AppError(
              errorMessages.internalServerError,
              httpStatus.INTERNAL_SERVER_ERROR,
            ),
          );
        }

        if (!user) {
          logger.warn(
            errorMessages.localAuthFailed(
              info?.message || errorMessages.authFailed,
            ),
          );

          return next(
            new AppError(
              errorMessages.invalidCredentials,
              httpStatus.BAD_REQUEST,
            ),
          );
        }

        logger.info(logMessages.userApi.login(user.email));

        const token = user.generateAuthToken();

        res.cookie("jwt", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: MAX_COOKIE_AGE,
        });

        res.status(httpStatus.OK).json({
          status: Status.Success,
          message: responseMessages.userApi.login,
          data: {
            user: {
              id: user._id,
              email: user.email,
            },
          },
        });
      } catch (catchErr) {
        logger.error(errorMessages.internalServerError, catchErr);
        return next(
          new AppError(
            errorMessages.internalServerError,
            httpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      }
    },
  )(req, res, next);
};
