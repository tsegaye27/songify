import { call, put, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { IStatistics } from "../slices/statisticsSlice";
import {
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
} from "../slices/statisticsSlice";
import { fetchStatistics } from "../../api/statisticsAPI";

function* fetchStatisticsSaga(): SagaIterator {
  try {
    const statistics: IStatistics = yield call(fetchStatistics);
    yield put(fetchStatisticsSuccess(statistics));
  } catch (error: any) {
    yield put(
      fetchStatisticsFailure(error.message || "Failed to fetch statistics"),
    );
  }
}

export function* watchFetchStatistics(): SagaIterator {
  yield takeLatest("statistics/fetchStatisticsStart", fetchStatisticsSaga);
}
