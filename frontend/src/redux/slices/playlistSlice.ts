import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypePlaylist } from "../types";

export interface PlaylistState {
  playlist: TypePlaylist[];
}

const loadPlaylist = (): TypePlaylist[] => {
  const playlists = localStorage.getItem("playlists");
  return playlists ? JSON.parse(playlists) : [];
};

const savePlaylist = (playlists: TypePlaylist[]): void => {
  localStorage.setItem("playlists", JSON.stringify(playlists));
};

const initialState: PlaylistState = {
  playlist: loadPlaylist(),
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    createPlaylist(state, action: PayloadAction<TypePlaylist>) {
      state.playlist.push(action.payload);
      savePlaylist(state.playlist);
    },
    deletePlaylist(state, action: PayloadAction<string>) {
      state.playlist = state.playlist.filter(
        (playlist) => playlist.name !== action.payload
      );
      savePlaylist(state.playlist);
    },
    updatePlaylist(state, action: PayloadAction<TypePlaylist>) {
      const index = state.playlist.findIndex(
        (playlist) => playlist.name === action.payload.name
      );
      if (index !== -1) {
        state.playlist[index] = action.payload;
        savePlaylist(state.playlist);
      }
    },
  },
});

export const { createPlaylist, deletePlaylist, updatePlaylist } =
  playlistSlice.actions;

export default playlistSlice.reducer;
