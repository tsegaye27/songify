import { NextFunction, Request, Response } from "express";
import AppError from "../errors/appErrors";
import { errorMessages } from "../utils/messages/errorMessages";
import httpStatus from "http-status";

export const authErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.code === 11000) {
    const duplicateField = "email";

    const errors = [
      {
        field: duplicateField,
        message: errorMessages.duplicateEmailError(duplicateField),
      },
    ];

    return next(
      new AppError(
        errorMessages.validationFailed,
        httpStatus.BAD_REQUEST,
        errors,
      ),
    );
  }

  next(err);
};
