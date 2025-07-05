import mongoose from "mongoose";
import { SongInterface } from "./types";

const Schema = mongoose.Schema;

const songSchema = new Schema<SongInterface>(
  {
    title: {
      type: String,
      required: [true, "Song title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    artist: {
      type: String,
      required: [true, "Artist name is required"],
      trim: true,
      maxlength: [100, "Artist name cannot exceed 100 characters"],
    },
    genre: {
      type: String,
      trim: true,
      maxlength: [50, "Genre cannot exceed 50 characters"],
    },
    album: {
      type: String,
      trim: true,
      maxlength: [200, "Album name cannot exceed 200 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

songSchema.index({ title: 1 });
songSchema.index({ artist: 1 });
songSchema.index({
  title: "text",
  artist: "text",
  album: "text",
});

export default songSchema;
