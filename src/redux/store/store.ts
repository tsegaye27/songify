import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import songsReducer from "../slices/slice";
import {
  watchAddSong,
  watchDeleteSong,
  watchFetchSongs,
  watchUpdateSong,
} from "../saga/sagas";

function* rootSaga() {
  yield all([
    watchFetchSongs(),
    watchAddSong(),
    watchDeleteSong(),
    watchUpdateSong(),
  ]);
}

const rootReducer = combineReducers({
  songs: songsReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
