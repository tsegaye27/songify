import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISong } from "../../app/models/song";
import { deleteSongSuccess } from "./songSlice";

const getFavoritesKey = (userId: string | undefined): string | null => {
  if (!userId) return null;
  return `songify_favorites_${userId}`;
};

const getFavoritesFromStorage = (userId: string | undefined): ISong[] => {
  const key = getFavoritesKey(userId);
  if (!key) return [];

  try {
    const items = window.localStorage.getItem(key);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Error reading favorites from localStorage", error);
    return [];
  }
};

const setFavoritesInStorage = (
  favorites: ISong[],
  userId: string | undefined,
) => {
  const key = getFavoritesKey(userId);
  if (!key) return;

  try {
    window.localStorage.setItem(key, JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorites to localStorage", error);
  }
};

export interface FavoritesState {
  list: ISong[];
  userId: string | null;
}

const initialState: FavoritesState = {
  list: [],
  userId: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    loadFavorites: (state, action: PayloadAction<string | undefined>) => {
      const userId = action.payload;
      state.userId = userId || null;
      state.list = getFavoritesFromStorage(userId);
    },
    toggleFavorite: (state, action: PayloadAction<ISong>) => {
      if (!state.userId) return;

      const song = action.payload;
      const isCurrentlyFavorite = state.list.some(
        (fav) => fav._id === song._id,
      );

      if (isCurrentlyFavorite) {
        state.list = state.list.filter((fav) => fav._id !== song._id);
      } else {
        state.list.push(song);
      }

      setFavoritesInStorage(state.list, state.userId);
    },
    clearFavorites: (state) => {
      state.list = [];
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteSongSuccess, (state, action) => {
      state.list = state.list.filter((f) => f._id !== action.payload);
      setFavoritesInStorage(state.list, state.userId || undefined);
    });
  },
});

export const { loadFavorites, toggleFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
