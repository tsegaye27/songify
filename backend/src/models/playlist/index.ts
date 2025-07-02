import mongoose from "mongoose";
import playlistSchema from "@/models/playlist/schema";
import { PlaylistInterface, PlaylistModelInterface } from "./types";

const Playlist = mongoose.model<PlaylistInterface, PlaylistModelInterface>(
  "Playlist",
  playlistSchema,
);

export default Playlist;
