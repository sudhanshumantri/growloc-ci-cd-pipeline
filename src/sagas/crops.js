import { call, all, put, takeLatest } from "redux-saga/effects";
import { callFetchCropsList, callAddCrop,callFetchCropsFarmList } from "../utils/api";

import {
  fetchCropSuccess,
  fetchCropFailure,
  saveCropSuccess,
  saveCropFailure,
  fetchCropFarmSuccess,
  fetchCropFarmFailure

} from "../actions/crops";

export function* fetchCropList({ data }) {
  let responseData = yield call(callFetchCropsList, data);
  if (responseData?.status == 200) {
    yield put(fetchCropSuccess(responseData.data));
  } else {
    yield put(fetchCropFailure("Something went wrong"));
  }
}
export function* addCrop({ data }) {
  let responseData = yield call(callAddCrop, data);
  if (responseData?.status == 200) {
    yield put(saveCropSuccess(responseData.data));
  } else {
    yield put(saveCropFailure("Something went wrong"));
  }
}
export function* fetchCropFarmList({ data }) {

  let responseData = yield call(callFetchCropsFarmList, data);
  if (responseData?.status == 200) {
    yield put(fetchCropFarmSuccess(responseData.data));
  } else {
    yield put(fetchCropFarmFailure("Something went wrong"));
  }
}

export function* cropsSagas() {
  yield all([
    takeLatest("FETCH_ALL_CROPS_REQUEST", fetchCropList),
    takeLatest("ADD_CROPS_REQUEST", addCrop),
    takeLatest("FETCH_ALL_CROPS_FARM_REQUEST", fetchCropFarmList),
  ]);
}
export default [cropsSagas];
