import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../types";

export interface FavoriteSongState {
  favList: Song[];
}

const initialState: FavoriteSongState = {
  favList: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<Song>) {
      state.favList.push(action.payload);
    },
    removeFromFavorites(state, action: PayloadAction<string>) {
      state.favList = state.favList.filter(
        (song) => song._id !== action.payload
      );
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
