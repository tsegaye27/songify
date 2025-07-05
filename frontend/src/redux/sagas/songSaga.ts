import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { ISong, ICreateSongData, IUpdateSongData } from "../../app/models/song";
import {
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongSuccess,
  addSongFailure,
  updateSongSuccess,
  updateSongFailure,
  deleteSongSuccess,
  deleteSongFailure,
  fetchSongsStart,
} from "../slices/songSlice";
import {
  fetchSongs,
  addSong,
  updateSong,
  deleteSong,
} from "../../api/songsAPI";

interface FetchSongsParams {
  page?: number;
  limit?: number;
  search?: string;
  artist?: string;
  genre?: string;
}

function* fetchSongsSaga(
  action: PayloadAction<FetchSongsParams | undefined>,
): SagaIterator {
  try {
    const response: { songs: ISong[]; pagination?: any } = yield call(
      fetchSongs,
      action.payload || {},
    );
    yield put(fetchSongsSuccess(response));
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message || "Failed to fetch songs"));
  }
}

function* addSongSaga(action: PayloadAction<ICreateSongData>): SagaIterator {
  try {
    const song: ISong = yield call(addSong, action.payload);
    yield put(addSongSuccess(song));
    yield put(fetchSongsStart({ page: 1, limit: 10 }));
  } catch (error: any) {
    yield put(addSongFailure(error.message || "Failed to add song"));
  }
}

function* updateSongSaga(action: PayloadAction<IUpdateSongData>): SagaIterator {
  try {
    const song: ISong = yield call(updateSong, action.payload);
    yield put(updateSongSuccess(song));
  } catch (error: any) {
    yield put(updateSongFailure(error.message || "Failed to update song"));
  }
}

function* deleteSongSaga(action: PayloadAction<string>): SagaIterator {
  try {
    yield call(deleteSong, action.payload);
    yield put(deleteSongSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteSongFailure(error.message || "Failed to delete song"));
  }
}

export function* watchFetchSongs(): SagaIterator {
  yield takeLatest("songs/fetchSongsStart", fetchSongsSaga);
}

export function* watchAddSong(): SagaIterator {
  yield takeLatest("songs/addSongStart", addSongSaga);
}

export function* watchUpdateSong(): SagaIterator {
  yield takeLatest("songs/updateSongStart", updateSongSaga);
}

export function* watchDeleteSong(): SagaIterator {
  yield takeLatest("songs/deleteSongStart", deleteSongSaga);
}
