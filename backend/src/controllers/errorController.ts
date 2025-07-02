import { Request, Response, NextFunction } from "express";
import logger from "../config/winston";
import AppError from "../errors/appErrors";
import httpStatus from "http-status";
import { errorMessages } from "../utils/messages/errorMessages";

export const globalErrorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const defaultErrorMessage = errorMessages.internalServerError;

  logger.error("Error 💥", err);

  res.status(statusCode).json({
    status: err.status,
    message: err.message || defaultErrorMessage,
    errors: err.errors,
  });
};
