import mongoose from "mongoose";
import playlistSchema from "../playlist/schema";
import { PlaylistInterface, PlaylistModelInterface } from "./types";

const Playlist = mongoose.model<PlaylistInterface, PlaylistModelInterface>(
  "Playlist",
  playlistSchema,
);

export default Playlist;
