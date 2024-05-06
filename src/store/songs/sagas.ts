import { put, call, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { fetchSongsSuccess, fetchSongs } from "./actions";
import { fetchSongs as fetchSongsAPI } from "../../api/songs";

function* handleFetchedSongs(): SagaIterator {
  try {
    const songs = yield call(fetchSongsAPI);
    yield put(fetchSongsSuccess(songs));
  } catch (error) {
    console.error(`Error while fetching songs: ${error}`);
  }
}

export function* songsSaga(): SagaIterator {
  yield takeLatest(fetchSongs.type, handleFetchedSongs);
}
