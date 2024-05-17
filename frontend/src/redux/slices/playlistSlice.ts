import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SongsList } from "../types";

export interface PlaylistState {
  listOfPlaylist: SongsList[];
}

const loadToLocalStorage = (): SongsList[] => {
  const listOfPlaylists = localStorage.getItem("playlists");
  return listOfPlaylists ? JSON.parse(listOfPlaylists) : [];
};

const saveToLocalStorage = (listOfPlaylists: SongsList[]): void => {
  localStorage.setItem("playlists", JSON.stringify(listOfPlaylists));
};

const initialState: PlaylistState = {
  listOfPlaylist: loadToLocalStorage(),
};

const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    createPlaylist(state, action: PayloadAction<SongsList>) {
      state.listOfPlaylist.push(action.payload);
      saveToLocalStorage(state.listOfPlaylist);
    },
    deletePlaylist(state, action: PayloadAction<string>) {
      state.listOfPlaylist.filter(
        (playlist) => playlist.name !== action.payload
      );
      saveToLocalStorage(state.listOfPlaylist);
    },
    updatePlaylist(state, action: PayloadAction<SongsList>) {
      const index = state.listOfPlaylist.findIndex(
        (playlist) => playlist.name === action.payload.name
      );
      state.listOfPlaylist[index] = action.payload;
      saveToLocalStorage(state.listOfPlaylist);
    },
  },
});

export const { createPlaylist, deletePlaylist, updatePlaylist } =
  playlistSlice.actions;

export default playlistSlice.reducer;
