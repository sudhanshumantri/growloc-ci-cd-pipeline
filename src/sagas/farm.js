import { call, all, put, takeLatest } from "redux-saga/effects";
import {
  callFetchFarmList,
  callFarmCrop
  } from "../utils/api";
import {
    fetchFarmSuccess,
    fetchFarmFailure,
    saveFarmSuccess,
    saveFarmFailure

} from "../actions/farm";
export function* fetchFarmList({ data }) {
  let responseData = yield call(callFetchFarmList, data);
  if (responseData?.status == 200) {
    yield put(fetchFarmSuccess(responseData.data));
  } else {
    yield put(fetchFarmFailure("Something went wrong"));
  }
}
export function* addFarm({ data }) {
  let responseData = yield call(callFarmCrop, data);
  if (responseData?.status == 200) {
    yield put(saveFarmSuccess(responseData.data));
  } else {
    yield put(saveFarmFailure("Something went wrong"));
  }
}
export function* farmSagas() {
  yield all([
    takeLatest("FETCH_ALL_FARM_REQUEST", fetchFarmList),
    takeLatest("ADD_FARM_REQUEST", addFarm),

  ]);
}
export default [farmSagas];
