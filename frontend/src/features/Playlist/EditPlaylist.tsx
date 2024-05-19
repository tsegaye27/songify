import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Playlist, Song } from "../../types";
import { loadPlaylists, savePlaylists } from "../../services/playlistService";

interface PlaylistState {
  list: Playlist[];
}

const initialState: PlaylistState = {
  list: loadPlaylists(),
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    addPlaylist(state, action: PayloadAction<{ title: string }>) {
      state.list.push({ title: action.payload.title, songs: [] });
      savePlaylists(state.list);
    },
    editPlaylist(
      state,
      action: PayloadAction<{ title: string; newTitle: string }>
    ) {
      const playlist = state.list.find((p) => p.title === action.payload.title);
      if (playlist) {
        playlist.title = action.payload.newTitle;
        savePlaylists(state.list);
      }
    },
    deletePlaylist(state, action: PayloadAction<string>) {
      state.list = state.list.filter(
        (playlist) => playlist.title !== action.payload
      );
      savePlaylists(state.list);
    },
    addSongToPlaylist(
      state,
      action: PayloadAction<{ title: string; song: Song }>
    ) {
      const playlist = state.list.find(
        (playlist) => playlist.title === action.payload.title
      );
      if (playlist) {
        playlist.songs.push(action.payload.song);
        savePlaylists(state.list);
      }
    },
    removeSongFromPlaylist(
      state,
      action: PayloadAction<{ title: string; songId: string }>
    ) {
      const playlist = state.list.find(
        (playlist) => playlist.title === action.payload.title
      );
      if (playlist) {
        playlist.songs = playlist.songs.filter(
          (song) => song.id !== action.payload.songId
        );
        savePlaylists(state.list);
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
