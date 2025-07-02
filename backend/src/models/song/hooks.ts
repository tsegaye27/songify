import { NextFunction } from "express";
import { SongInterface } from "./types";
import { Schema } from "mongoose";

const preValidateHook = async function (
  this: SongInterface,
  next: NextFunction,
) {
  if (this.title) this.title = this.title.trim();
  if (this.artist) this.artist = this.artist.trim();
  if (this.album) this.album = this.album.trim();
  if (this.genre) this.genre = this.genre.trim();

  next();
};

export const registerHooks = (songSchema: Schema<SongInterface>) => {
  songSchema.pre("validate", preValidateHook as any);
  songSchema.pre("findOneAndUpdate", function () {
    this.set({ updatedAt: new Date() });
  });
};
