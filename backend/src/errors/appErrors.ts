import { Status } from "../utils/enums";
import { ErrorDetail } from "./types";

class AppError extends Error {
  public statusCode: number;
  public errors: (string | ErrorDetail)[];
  public status: Status;
  public isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    errors: (string | ErrorDetail)[] = [],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.status = `${statusCode}`.startsWith("4") ? Status.Fail : Status.Error;
    this.isOperational = true;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export default AppError;
