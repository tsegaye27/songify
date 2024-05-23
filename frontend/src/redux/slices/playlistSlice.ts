import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { Song, TypePlaylist } from "../types";
import { loadPlaylist, savePlaylist } from "../../api/playlistService";

export interface PlaylistState {
  list: TypePlaylist[];
}

const initialState: PlaylistState = {
  list: loadPlaylist(),
};

const playlistSlice: Slice<PlaylistState> = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    addPlaylist(state, action: PayloadAction<TypePlaylist>) {
      state.list.push({ name: action.payload.name, list: [] });
      savePlaylist(state.list);
    },
    editPlaylist(
      state,
      action: PayloadAction<{ name: string; newName: string }>
    ) {
      const playlist = state.list.find((p) => p.name === action.payload.name);
      if (playlist) {
        playlist.name = action.payload.newName;
        savePlaylist(state.list);
      }
    },
    deletePlaylist(state, action: PayloadAction<string>) {
      state.list = state.list.filter(
        (playlist) => playlist.name !== action.payload
      );
      savePlaylist(state.list);
    },
    addSongToPlaylist(
      state,
      action: PayloadAction<{ name: string; song: Song }>
    ) {
      const playlist = state.list.find(
        (playlist) => playlist.name === action.payload.name
      );
      if (playlist) {
        playlist.list.push(action.payload.song);
        savePlaylist(state.list);
      }
    },
    removeSongFromPlaylist(
      state,
      action: PayloadAction<{ name: string; songId: string }>
    ) {
      const playlist = state.list.find(
        (playlist) => playlist.name === action.payload.name
      );
      if (playlist) {
        playlist.list = playlist.list.filter(
          (song) => song._id !== action.payload.songId
        );
        savePlaylist(state.list);
      }
    },
  },
});

export const {
  addPlaylist,
  editPlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} = playlistSlice.actions;

export default playlistSlice.reducer;
