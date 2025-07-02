import mongoose from "mongoose";
import songSchema from "./schema";
import * as Statics from "./statics";
import * as Methods from "./methods";
import { registerHooks } from "./hooks";
import { SongInterface, SongModelInterface } from "./types";

songSchema.static(Statics);
songSchema.method(Methods);

registerHooks(songSchema);

const Song = mongoose.model<SongInterface, SongModelInterface>(
  "Song",
  songSchema,
);

export default Song;
