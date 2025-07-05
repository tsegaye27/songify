import Joi, { ValidationErrorItem, Schema } from "joi";
import { Request, Response, NextFunction } from "express";
import AppError from "../errors/appErrors";
import httpStatus from "http-status";
import { errorMessages } from "../utils/messages/errorMessages";

const validateSchema = (
  schema: Schema,
  req: Request,
  next: NextFunction,
): void => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorDetails = error.details.map((detail: ValidationErrorItem) => ({
      field: detail.context?.label,
      message: detail.message,
    }));

    return next(
      new AppError(
        errorMessages.validationFailed,
        httpStatus.BAD_REQUEST,
        errorDetails,
      ),
    );
  }

  next();
};

const emailField = Joi.string().email().required().lowercase().messages({
  "string.email": "Please enter a valid email",
  "any.required": "Email is required",
  "string.lowercase": "Email must be lowercase",
});

const passwordField = Joi.string()
  .min(8)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$])(?=.*\d)[A-Za-z\d!@#$]{8,}$/)
  .required()
  .messages({
    "string.min": "Password must be at least 8 characters long",
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!,@,#,$)",
    "any.required": "Password is required",
  });

const passwordConfirmField = Joi.string()
  .valid(Joi.ref("password"))
  .required()
  .messages({
    "any.only": "Password confirmation must match password.",
    "any.required": "Password confirmation is required.",
  });

const userSignupSchema = Joi.object({
  email: emailField,
  password: passwordField,
  passwordConfirm: passwordConfirmField,
});

export const validateUserSignup = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  validateSchema(userSignupSchema, req, next);
};
