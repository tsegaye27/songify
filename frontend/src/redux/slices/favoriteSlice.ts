import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../types";

export interface FavoriteSongState {
  favList: Song[];
}

const loadToLocalStorage = (): Song[] => {
  const favList = localStorage.getItem("favorites");
  return favList ? JSON.parse(favList) : [];
};

const saveToLocalStorage = (favSong: Song[]): void => {
  localStorage.setItem("favorites", JSON.stringify(favSong));
};

const initialState: FavoriteSongState = {
  favList: loadToLocalStorage(),
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<Song>) {
      state.favList.push(action.payload);
      saveToLocalStorage(state.favList);
    },
    removeFromFavorites(state, action: PayloadAction<string>) {
      state.favList = state.favList.filter(
        (song) => song._id !== action.payload
      );
      saveToLocalStorage(state.favList);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
