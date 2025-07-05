import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IStatistics {
  totals: {
    songs: number;
    artists: number;
    albums: number;
    genres: number;
  };
  songsByGenre: Array<{ genre: string; count: number }>;
  songsByArtist: Array<{
    artist: string;
    songCount: number;
    albumCount: number;
  }>;
  songsByAlbum: Array<{ album: string; artist: string; songCount: number }>;
}

export interface StatisticsState {
  statistics: IStatistics | null;
  loading: boolean;
  error: string | null;
}

const initialState: StatisticsState = {
  statistics: null,
  loading: false,
  error: null,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    fetchStatisticsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStatisticsSuccess: (state, action: PayloadAction<IStatistics>) => {
      state.statistics = action.payload;
      state.loading = false;
    },
    fetchStatisticsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchStatisticsStart,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
  clearError,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
