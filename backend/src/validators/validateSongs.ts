import { Request, Response, NextFunction } from "express";
import Joi, { Schema, ValidationErrorItem } from "joi";
import AppError from "../errors/appErrors";
import httpStatus from "http-status";
import { errorMessages } from "../utils/messages/errorMessages";

const validateSchema = (
  schema: Schema,
  req: Request,
  next: NextFunction,
): void => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errorsDetails = error.details.map((detail: ValidationErrorItem) => ({
      field: detail.context?.label,
      message: detail.message,
    }));

    return next(
      new AppError(
        errorMessages.validationFailed,
        httpStatus.BAD_REQUEST,
        errorsDetails,
      ),
    );
  }

  next();
};

const songSchema = Joi.object({
  title: Joi.string().trim().max(200).required().messages({
    "string.empty": "Artist is required",
    "string.max": "Artist cannot exceed 100 characters",
    "any.required": "Artist is required",
  }),
  artist: Joi.string().trim().max(100).required().messages({
    "string.empty": "Artist is required",
    "string.max": "Artist cannot exceed 100 characters",
    "any.required": "Artist is required",
  }),
  genre: Joi.string().trim().max(50).optional().messages({
    "string.max": "Genre cannot exceed 50 characters",
  }),
  album: Joi.string().trim().max(200).optional().messages({
    "string.max": "Album cannot exceed 200 characters",
  }),
});

const updateSongSchema = Joi.object({
  title: Joi.string().trim().max(200).optional(),
  artist: Joi.string().trim().max(100).optional(),
  genre: Joi.string().trim().max(50).optional(),
  album: Joi.string().trim().max(200).optional(),
});

export const validateCreateSong = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  validateSchema(songSchema, req, next);
};

export const validateUpdateSong = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  validateSchema(updateSongSchema, req, next);
};
