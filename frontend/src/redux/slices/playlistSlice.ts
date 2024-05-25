import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypePlaylist } from "../types";
import { AddPlaylistProp } from "../../api/playlistsAPI";

export interface PlaylistState {
  list: TypePlaylist[];
  loading: boolean;
  error: string | null;
}

const initialState: PlaylistState = {
  list: [],
  loading: false,
  error: null,
};

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    fetchPlaylistsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPlaylistsSuccess(state, action: PayloadAction<TypePlaylist[]>) {
      state.list = action.payload;
      state.loading = false;
    },
    fetchPlaylistsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addPlaylistStart(state, action: PayloadAction<AddPlaylistProp>) {
      state.loading = true;
      state.error = null;
    },
    addPlaylistSuccess(state, action: PayloadAction<TypePlaylist>) {
      state.list.push(action.payload);
      state.loading = false;
    },
    addPlaylistFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deletePlaylistStart(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    deletePlaylistSuccess(state, action: PayloadAction<string>) {
      state.list = state.list.filter(
        (playlist) => playlist._id !== action.payload
      );
      state.loading = false;
    },
    deletePlaylistFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePlaylistStart(state, action: PayloadAction<TypePlaylist>) {
      state.loading = true;
      state.error = null;
    },
    updatePlaylistSuccess(state, action: PayloadAction<TypePlaylist>) {
      state.list = state.list.map((playlist) =>
        playlist._id === action.payload._id ? action.payload : playlist
      );
      state.loading = false;
    },
    updatePlaylistFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addSongToPlaylistStart(state) {
      state.loading = true;
      state.error = null;
    },
    addSongToPlaylistSuccess(state, action: PayloadAction<TypePlaylist>) {
      state.loading = false;
      state.list = state.list.map((playlist) =>
        playlist._id === action.payload._id ? action.payload : playlist
      );
    },
    addSongToPlaylistFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPlaylistsStart,
  fetchPlaylistsSuccess,
  fetchPlaylistsFailure,
  addPlaylistStart,
  addPlaylistSuccess,
  addPlaylistFailure,
  deletePlaylistStart,
  deletePlaylistSuccess,
  deletePlaylistFailure,
  updatePlaylistStart,
  updatePlaylistSuccess,
  updatePlaylistFailure,
  addSongToPlaylistStart,
  addSongToPlaylistSuccess,
  addSongToPlaylistFailure,
} = playlistsSlice.actions;

export default playlistsSlice.reducer;
