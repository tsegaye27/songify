import { createAction } from "@reduxjs/toolkit";
import { Song } from "./types";

export const fetchSongs = createAction("songs/fetch");
export const fetchSongsSuccess = createAction<Song[]>("songs/fetchSuccess");
export const addSong = createAction<Song[]>("songs/add");
export const updateSong = createAction<Song[]>("songs/update");
export const deleteSong = createAction<Song[]>("songs/delete");
