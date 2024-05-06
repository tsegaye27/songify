import { createReducer } from "@reduxjs/toolkit";
import { fetchSongsSuccess, addSong, updateSong, deleteSong } from "./actions";
import { Song } from "./types";

interface SongState {
  list: Song[];
}

const initialState: SongState = {
  list: [],
};

export const songsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchSongsSuccess, (state, action) => {
      state.list = action.payload;
    })
    .addCase(addSong, (state, action) => {
      state.list.push(action.payload);
    })
    .addCase(updateSong, (state, action) => {
      const index = state.list.findIndex(
        (song) => song.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    })
    .addCase(deleteSong, (state, action) => {
      state.list = state.list.filter((song) => song.id !== action.payload);
    });
});
