import mongoose from "mongoose";
import songSchema from "./schema";
import * as Statics from "./statics";
import { registerHooks } from "./hooks";
import { SongInterface, SongModelInterface } from "./types";

songSchema.static(Statics);

registerHooks(songSchema);

const Song = mongoose.model<SongInterface, SongModelInterface>(
  "Song",
  songSchema,
);

export default Song;
