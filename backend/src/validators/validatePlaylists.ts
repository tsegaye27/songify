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

const playlistSchema = Joi.object({
  name: Joi.string().trim().max(100).required().messages({
    "string.empty": "Playlist name is required",
    "string.max": "Playlist name cannot exceed 100 characters",
    "any.required": "Playlist name is required",
  }),
  description: Joi.string().trim().max(500).optional().messages({
    "string.max": "Description cannot exceed 500 characters",
  }),
  isPublic: Joi.boolean().optional().default(false),
  tags: Joi.array()
    .items(
      Joi.string().trim().max(30).messages({
        "string.max": "Tag cannot exceed 30 characters",
      }),
    )
    .optional(),
});

const updatePlaylistSchema = Joi.object({
  name: Joi.string().trim().max(100).optional(),
  description: Joi.string().trim().max(500).optional().allow(""),
  isPublic: Joi.boolean().optional(),
  tags: Joi.array().items(Joi.string().trim().max(30)).optional(),
});

const addSongSchema = Joi.object({
  songId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid song ID format",
      "any.required": "Song ID is required",
    }),
});

export const validateCreatePlaylist = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  validateSchema(playlistSchema, req, next);
};

export const validateUpdatePlaylist = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  validateSchema(updatePlaylistSchema, req, next);
};

export const validateAddSong = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  validateSchema(addSongSchema, req, next);
};
