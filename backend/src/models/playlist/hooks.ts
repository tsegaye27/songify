import { NextFunction } from "express";
import { PlaylistInterface, PlaylistModelInterface } from "./types";
import { Schema } from "mongoose";

const preValidateHook = async function (
  this: PlaylistInterface,
  next: NextFunction,
) {
  if (this.name) this.name = this.name.trim();
  if (this.description) this.description = this.description.trim();

  if (this.tags) {
    this.tags = this.tags
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0);
  }

  next();
};

export const registerHooks = (
  playlistSchema: Schema<PlaylistInterface, PlaylistModelInterface>,
) => {
  playlistSchema.pre("validate", preValidateHook as any);
  playlistSchema.pre("findOneAndUpdate", function () {
    this.set({ updatedAt: new Date() });
  });
};
