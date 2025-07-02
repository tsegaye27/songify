import passport from "passport";
import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/appErrors";
import logger from "../../config/winston";
import { UserInterface } from "../../models/user/types";
import { JwtInfo } from "./types";
import { errorMessages } from "../../utils/messages/errorMessages";
import httpStatus from "http-status";
import { AuthenticationStrategy, JwtInfoName } from "../../utils/enums";

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    AuthenticationStrategy.Jwt,
    { session: false },
    (err: Error | null, user: UserInterface | null, info: JwtInfo) => {
      if (err) {
        logger.error(errorMessages.retrievingUser(err.message));
        return next(
          new AppError(
            errorMessages.internalServerError,
            httpStatus.INTERNAL_SERVER_ERROR
          )
        );
      }

      if (!user) {
        if (info && info.name === JwtInfoName.JsonWebTokenError) {
          return next(
            new AppError(errorMessages.invalidToken, httpStatus.UNAUTHORIZED)
          );
        } else if (info && info.name === JwtInfoName.TokenExpiredError) {
          return next(
            new AppError(errorMessages.expiredToken, httpStatus.UNAUTHORIZED)
          );
        } else {
          return next(
            new AppError(errorMessages.noToken, httpStatus.UNAUTHORIZED)
          );
        }
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};
