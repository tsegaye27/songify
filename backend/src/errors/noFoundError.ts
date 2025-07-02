import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import AppError from "../errors/appErrors";
import { errorMessages } from "../utils/messages/errorMessages";

const notFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const notFoundError = new AppError(
    errorMessages.noEndpoint,
    httpStatus.NOT_FOUND,
  );
  next(notFoundError);
};

export default notFoundErrorHandler;
