import mongoose from "mongoose";
import { PlaylistInterface, PlaylistModelInterface } from "./types";
import * as Statics from "./statics";
import * as Methods from "./methods";
import { registerHooks } from "./hooks";

const Schema = mongoose.Schema;

const playlistSchema = new Schema<PlaylistInterface, PlaylistModelInterface>(
  {
    name: {
      type: String,
      required: [true, "Playlist name is required"],
      trim: true,
      maxlength: [100, "Playlist name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Playlist owner is required"],
    },
    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    isPublic: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [30, "Tag cannot exceed 30 characters"],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

playlistSchema.virtual("songCount").get(function (this: PlaylistInterface) {
  return this.songs.length;
});

playlistSchema.index({ name: 1 });
playlistSchema.index({ owner: 1 });
playlistSchema.index({ isPublic: 1 });
playlistSchema.index({ name: "text", description: "text", tags: "text" });

playlistSchema.static(Statics);
playlistSchema.method(Methods);
registerHooks(playlistSchema);

export default playlistSchema;
