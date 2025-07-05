import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICreateSongData, ISong, IUpdateSongData } from "../../app/models/song";

export interface SongState {
  songs: ISong[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalSongs?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
  } | null;
}

const initialState: SongState = {
  songs: [],
  loading: false,
  error: null,
  pagination: null,
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsStart: (state, _action: PayloadAction<any>) => {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess: (
      state,
      action: PayloadAction<{
        songs: ISong[];
        pagination?: any;
      }>,
    ) => {
      state.songs = action.payload.songs;
      state.pagination = action.payload.pagination || null;
      state.loading = false;
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    addSongStart: (state, _action: PayloadAction<ICreateSongData>) => {
      state.loading = true;
      state.error = null;
    },
    addSongSuccess: (state, action: PayloadAction<ISong>) => {
      state.loading = false;
    },
    addSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateSongStart: (state, _action: PayloadAction<IUpdateSongData>) => {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess: (state, action: PayloadAction<ISong>) => {
      const index = state.songs.findIndex(
        (song) => song._id === action.payload._id,
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.loading = false;
    },
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteSongStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter((song) => song._id !== action.payload);
      state.loading = false;
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
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
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
  clearError,
} = songSlice.actions;

export default songSlice.reducer;
