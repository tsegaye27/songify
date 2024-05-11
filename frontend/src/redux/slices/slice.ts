import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../types";
import { AddSongProp } from "../../api/songsAPI";

interface SongPayload {
  _id: string;
  title: string;
  artist: string;
}
export interface SongState {
  list: Song[];
  loading: boolean;
  error: string | null;
}

const initialState: SongState = {
  list: [],
  loading: false,
  error: null,
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.list = action.payload;
      state.loading = false;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addSongStart(state, action: PayloadAction<AddSongProp>) {
      state.loading = true;
      state.error = null;
    },
    addSongSuccess(state, action: PayloadAction<Song>) {
      state.list.push(action.payload);
      state.loading = false;
    },
    addSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongStart(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.list = state.list.filter((song) => song._id !== action.payload);
      state.loading = false;
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateSongStart(state, action: PayloadAction<SongPayload>) {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess(state, action: PayloadAction<Song>) {
      const index = state.list.findIndex(
        (song) => song._id === action.payload._id
      );
      state.list[index] = action.payload;
      state.loading = false;
    },
    updateSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongStart,
  addSongSuccess,
  addSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
} = songsSlice.actions;

export default songsSlice.reducer;
