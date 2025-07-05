import { PayloadAction } from "@reduxjs/toolkit";
import { put, call, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { IPlaylist, ICreatePlaylistData } from "../../app/models/playlist";
import {
  addPlaylist,
  addSongToPlaylist,
  deletePlaylist,
  fetchPlaylists,
  removeSongFromPlaylist,
  updatePlaylist,
} from "../../api/playlistsAPI";
import {
  fetchPlaylistsFailure,
  fetchPlaylistsSuccess,
  addPlaylistFailure,
  addPlaylistSuccess,
  deletePlaylistFailure,
  deletePlaylistSuccess,
  updatePlaylistFailure,
  updatePlaylistSuccess,
  addSongToPlaylistSuccess,
  addSongToPlaylistFailure,
  removeSongFromPlaylistSuccess,
  removeSongFromPlaylistFailure,
} from "../slices/playlistSlice";

function* fetchPlaylistsSaga(): SagaIterator {
  try {
    const playlists: IPlaylist[] = yield call(fetchPlaylists);
    yield put(fetchPlaylistsSuccess(playlists));
  } catch (error: any) {
    yield put(
      fetchPlaylistsFailure(error.message || "Failed to fetch playlists"),
    );
  }
}

export function* watchFetchPlaylists(): SagaIterator {
  yield takeLatest("playlists/fetchPlaylistsStart", fetchPlaylistsSaga);
}

function* addPlaylistSaga(
  action: PayloadAction<ICreatePlaylistData>,
): SagaIterator {
  try {
    const playlist: IPlaylist = yield call(addPlaylist, action.payload);
    yield put(addPlaylistSuccess(playlist));
  } catch (error: any) {
    yield put(addPlaylistFailure(error.message || "Failed to add playlist"));
  }
}

export function* watchAddPlaylist(): SagaIterator {
  yield takeLatest("playlists/addPlaylistStart", addPlaylistSaga);
}

function* deletePlaylistSaga(action: PayloadAction<string>): SagaIterator {
  try {
    yield call(deletePlaylist, action.payload);
    yield put(deletePlaylistSuccess(action.payload));
  } catch (error: any) {
    yield put(
      deletePlaylistFailure(error.message || "Failed to delete playlist"),
    );
  }
}

export function* watchDeletePlaylist(): SagaIterator {
  yield takeLatest("playlists/deletePlaylistStart", deletePlaylistSaga);
}

function* updatePlaylistSaga(action: PayloadAction<IPlaylist>): SagaIterator {
  try {
    const playlist: IPlaylist = yield call(updatePlaylist, action.payload);
    yield put(updatePlaylistSuccess(playlist));
  } catch (error: any) {
    yield put(
      updatePlaylistFailure(error.message || "Failed to update playlist"),
    );
  }
}

export function* watchUpdatePlaylist(): SagaIterator {
  yield takeLatest("playlists/updatePlaylistStart", updatePlaylistSaga);
}

export function* addSongToPlaylistSaga(
  action: PayloadAction<{ playlistId: string; songId: string }>,
): SagaIterator {
  try {
    const playlist: IPlaylist = yield call(
      addSongToPlaylist,
      action.payload.playlistId,
      action.payload.songId,
    );
    yield put(addSongToPlaylistSuccess(playlist));
  } catch (error: any) {
    yield put(
      addSongToPlaylistFailure(
        error.message || "Failed to add song to playlist",
      ),
    );
  }
}

export function* watchAddSongToPlaylist(): SagaIterator {
  yield takeLatest("playlists/addSongToPlaylistStart", addSongToPlaylistSaga);
}

export function* removeSongFromPlaylistSaga(
  action: PayloadAction<{ playlistId: string; songId: string }>,
): SagaIterator {
  try {
    const playlist: IPlaylist = yield call(
      removeSongFromPlaylist,
      action.payload.playlistId,
      action.payload.songId,
    );
    yield put(removeSongFromPlaylistSuccess(playlist));
  } catch (error: any) {
    yield put(
      removeSongFromPlaylistFailure(
        error.message || "Failed to remove song from playlist",
      ),
    );
  }
}

export function* watchRemoveSongFromPlaylist(): SagaIterator {
  yield takeLatest(
    "playlists/removeSongFromPlaylistStart",
    removeSongFromPlaylistSaga,
  );
}
