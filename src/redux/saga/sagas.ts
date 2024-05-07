import { PayloadAction } from "@reduxjs/toolkit";
import { put, call, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { Song } from "../types";
import {
  addSongFailure,
  addSongSuccess,
  fetchSongsFailure,
  fetchSongsSuccess,
  deleteSongSuccess,
  deleteSongFailure,
  updateSongFailure,
  updateSongSuccess,
} from "../slices/slice";
import {
  fetchSongs as fetchSongsAPI,
  addSong,
  deleteSong,
  updateSong,
} from "../../api/songsAPI";

function* fetchSongsSaga(): SagaIterator {
  try {
    const songs = yield call(fetchSongsAPI);
    yield put(fetchSongsSuccess(songs));
  } catch (error) {
    yield put(fetchSongsFailure(`${error}`));
  }
}

export function* watchFetchSongs(): SagaIterator {
  yield takeLatest("songs/fetchSongsStart", fetchSongsSaga);
}

export function* addSongSaga(action: PayloadAction<Song>): SagaIterator {
  try {
    const song: Song = yield call(addSong, action.payload);
    yield put(addSongSuccess(song));
  } catch (error) {
    yield put(addSongFailure(`${error}`));
  }
}

export function* watchAddSong(): SagaIterator {
  yield takeLatest("songs/addSongStart", addSongSaga);
}

export function* deleteSongSaga(action: PayloadAction<number>): SagaIterator {
  try {
    yield call(deleteSong, action.payload);
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield put(deleteSongFailure(`${error}`));
  }
}

export function* watchDeleteSong(): SagaIterator {
  yield takeLatest("songs/deleteSongStart", deleteSongSaga);
}

export function* updateSongSaga(action: PayloadAction<Song>): SagaIterator {
  try {
    const song: Song = yield call(updateSong, action.payload);
    yield put(updateSongSuccess(song));
  } catch (error) {
    yield put(updateSongFailure(`${error}`));
  }
}

export function* watchUpdateSong(): SagaIterator {
  yield takeLatest("songs/updateSongStart", updateSongSaga);
}
