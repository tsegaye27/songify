import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IPlaylist,
  ICreatePlaylistData,
  IUpdatePlaylistData,
} from "../../app/models/playlist";

export interface PlaylistState {
  list: IPlaylist[];
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
    fetchPlaylistsSuccess(state, action: PayloadAction<IPlaylist[]>) {
      state.list = action.payload;
      state.loading = false;
    },
    fetchPlaylistsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addPlaylistStart(state, action: PayloadAction<ICreatePlaylistData>) {
      state.loading = true;
      state.error = null;
      void action.payload;
    },
    addPlaylistSuccess(state, action: PayloadAction<IPlaylist>) {
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
      void action.payload;
    },
    deletePlaylistSuccess(state, action: PayloadAction<string>) {
      state.list = state.list.filter(
        (playlist) => playlist._id !== action.payload,
      );
      state.loading = false;
    },
    deletePlaylistFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePlaylistStart(state, action: PayloadAction<IUpdatePlaylistData>) {
      state.loading = true;
      void action.payload;
      state.error = null;
    },
    updatePlaylistSuccess(state, action: PayloadAction<IPlaylist>) {
      state.list = state.list.map((playlist) =>
        playlist._id === action.payload._id ? action.payload : playlist,
      );
      state.loading = false;
    },
    updatePlaylistFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addSongToPlaylistStart(
      state,
      action: PayloadAction<{ playlistId: string; songId: string }>,
    ) {
      state.loading = true;
      state.error = null;
      void action.payload;
    },
    addSongToPlaylistSuccess(state, action: PayloadAction<IPlaylist>) {
      state.loading = false;
      state.list = state.list.map((playlist) =>
        playlist._id === action.payload._id ? action.payload : playlist,
      );
    },
    addSongToPlaylistFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    removeSongFromPlaylistStart(
      state,
      action: PayloadAction<{ playlistId: string; songId: string }>,
    ) {
      state.loading = true;
      void action.payload;
      state.error = null;
    },
    removeSongFromPlaylistSuccess(state, action: PayloadAction<IPlaylist>) {
      state.loading = false;
      state.list = state.list.map((playlist) =>
        playlist._id === action.payload._id ? action.payload : playlist,
      );
    },
    removeSongFromPlaylistFailure(state, action: PayloadAction<string>) {
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
  removeSongFromPlaylistStart,
  removeSongFromPlaylistSuccess,
  removeSongFromPlaylistFailure,
} = playlistsSlice.actions;

export default playlistsSlice.reducer;
