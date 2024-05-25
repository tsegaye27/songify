import { PayloadAction } from "@reduxjs/toolkit";
import { put, call, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { TypePlaylist } from "../types";
import {
  addPlaylist,
  addSongToPlaylist,
  deletePlaylist,
  fetchPlaylists,
  updatePlaylist,
} from "../../api/playlistsAPI";
import { AddPlaylistProp } from "../../api/playlistsAPI";
import {
  fetchPlaylistsFailure,
  fetchPlaylistsSuccess,
  addPlaylistFailure,
  addPlaylistSuccess,
  deletePlaylistFailure,
  deletePlaylistSuccess,
  updatePlaylistFailure,
  updatePlaylistSuccess,
} from "../slices/playlistSlice";

function* fetchPlaylistsSaga(): SagaIterator {
  try {
    const playlists: TypePlaylist[] = yield call(fetchPlaylists);
    yield put(fetchPlaylistsSuccess(playlists));
  } catch (error) {
    yield put(fetchPlaylistsFailure(`${error}`));
  }
}

export function* watchFetchPlaylists(): SagaIterator {
  yield takeLatest("playlists/fetchPlaylistsStart", fetchPlaylistsSaga);
}

function* addPlaylistSaga(
  action: PayloadAction<AddPlaylistProp>
): SagaIterator {
  try {
    const playlist: TypePlaylist = yield call(addPlaylist, action.payload);
    yield put(addPlaylistSuccess(playlist));
  } catch (error) {
    yield put(addPlaylistFailure(`${error}`));
  }
}

export function* watchAddPlaylist(): SagaIterator {
  yield takeLatest("playlists/addPlaylistStart", addPlaylistSaga);
}

function* deletePlaylistSaga(action: PayloadAction<string>): SagaIterator {
  try {
    yield call(deletePlaylist, action.payload);
    yield put(deletePlaylistSuccess(action.payload));
  } catch (error) {
    yield put(deletePlaylistFailure(`${error}`));
  }
}

export function* watchDeletePlaylist(): SagaIterator {
  yield takeLatest("playlists/deletePlaylistStart", deletePlaylistSaga);
}

function* updatePlaylistSaga(
  action: PayloadAction<TypePlaylist>
): SagaIterator {
  try {
    const playlist: TypePlaylist = yield call(updatePlaylist, action.payload);
    yield put(updatePlaylistSuccess(playlist));
  } catch (error) {
    yield put(updatePlaylistFailure(`${error}`));
  }
}

export function* watchUpdatePlaylist(): SagaIterator {
  yield takeLatest("playlists/updatePlaylistStart", updatePlaylistSaga);
}

export function* addSongToPlaylistSaga(
  action: PayloadAction<{ playlistId: string; songId: string }>
): SagaIterator {
  try {
    const playlist: TypePlaylist = yield call(
      addSongToPlaylist,
      action.payload.playlistId,
      action.payload.songId
    );
    yield put(updatePlaylistSuccess(playlist));
  } catch (error) {
    yield put(updatePlaylistFailure(`${error}`));
  }
}

export function* watchAddSongToPlaylist(): SagaIterator {
  yield takeLatest("playlists/addSongToPlaylistStart", addSongToPlaylistSaga);
}

export function* removeSongFromPlaylistSaga(
  action: PayloadAction<{ playlistId: string; songId: string }>
): SagaIterator {
  try {
    const playlist: TypePlaylist = yield call(
      addSongToPlaylist,
      action.payload.playlistId,
      action.payload.songId
    );
    yield put(updatePlaylistSuccess(playlist));
  } catch (error) {
    yield put(updatePlaylistFailure(`${error}`));
  }
}

export function* watchRemoveSongFromPlaylist(): SagaIterator {
  yield takeLatest(
    "playlists/removeSongFromPlaylistStart",
    removeSongFromPlaylistSaga
  );
}
