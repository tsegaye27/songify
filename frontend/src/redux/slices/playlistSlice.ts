import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SongsList } from "../types";

export interface PlaylistState {
  listOfPlaylist: SongsList[];
}

const initialState: PlaylistState = {
  listOfPlaylist: [],
};

const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    addPlaylist(state, action: PayloadAction<SongsList>) {
      state.listOfPlaylist.push(action.payload);
    },
    deletePlaylist(state, action: PayloadAction<string>) {
      state.listOfPlaylist.filter(
        (playlist) => playlist.name !== action.payload
      );
    },
    updatePlaylist(state, action: PayloadAction<SongsList>) {
      const index = state.listOfPlaylist.findIndex(
        (playlist) => playlist.name === action.payload.name
      );
      state.listOfPlaylist[index] = action.payload;
    },
  },
});

export const { addPlaylist, deletePlaylist, updatePlaylist } =
  playlistSlice.actions;

export default playlistSlice.reducer;
