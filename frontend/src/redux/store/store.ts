import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import songReducer from "../slices/songSlice";
import playlistReducer from "../slices/playlistSlice";
import authReducer from "../slices/authSlice";
import statisticsReducer from "../slices/statisticsSlice";
import favoritesReducer from "../slices/favoritesSlice";

import {
  watchFetchSongs,
  watchAddSong,
  watchUpdateSong,
  watchDeleteSong,
} from "../sagas/songSaga";
import {
  watchFetchPlaylists,
  watchAddPlaylist,
  watchUpdatePlaylist,
  watchDeletePlaylist,
  watchAddSongToPlaylist,
  watchRemoveSongFromPlaylist,
} from "../sagas/playlistSaga";
import { watchAuth } from "../sagas/authSaga";
import { watchFetchStatistics } from "../sagas/statisticsSaga";

function* rootSaga() {
  yield all([
    watchAuth(),

    watchFetchSongs(),
    watchAddSong(),
    watchUpdateSong(),
    watchDeleteSong(),

    watchFetchPlaylists(),
    watchAddPlaylist(),
    watchUpdatePlaylist(),
    watchDeletePlaylist(),
    watchAddSongToPlaylist(),
    watchRemoveSongFromPlaylist(),

    watchFetchStatistics(),
  ]);
}

const rootReducer = combineReducers({
  songs: songReducer,
  playlists: playlistReducer,
  auth: authReducer,
  statistics: statisticsReducer,
  favorites: favoritesReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
