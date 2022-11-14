import { call, all, put, takeLatest } from "redux-saga/effects";
import { useNavigate } from "react-router-dom";

import {
  callFetchFarmList,
  callFarmCrop,
  callUpdateFarm,
  callDeleteFarm
} from "../utils/api";
import {
  fetchFarmSuccess,
  fetchFarmFailure,
  saveFarmSuccess,
  saveFarmFailure,
  updateFarmSuccess,
  updateFarmFailure,
  deleteFarmSuccess,
  deleteFarmFailure,
} from "../actions/farm";
export function* fetchFarmList({ data }) {
  let responseData = yield call(callFetchFarmList, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchFarmSuccess(responseData.data.data));
  } else {
    yield put(fetchFarmFailure("Something went wrong"));
  }
}
export function* addFarm({ data }) {

  let responseData = yield call(callFarmCrop, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(saveFarmSuccess(responseData.data.data));
    yield call(browserHistory.push, "/");
    yield call(browserHistory.go, "/");
  } else {
    yield put(saveFarmFailure("Something went wrong"));
  }
}
//
export function* updateFarm({ data }) {
  const {farmId, payload} = data;
  console.log(data,"updateFarm");
  let responseData = yield call(callUpdateFarm, payload, farmId);
  if (responseData?.status == 200) {
    yield put(updateFarmSuccess(responseData.data));

  } else {
    yield put(updateFarmFailure("Something went wrong"));
  }
}
export function* deleteFarm({ data }) {
  console.log(data,"here farmId");
  let responseData = yield call(callDeleteFarm, data);
  if (responseData?.status == 200) {
    yield put(deleteFarmSuccess(data));
  } else {
    yield put(deleteFarmFailure("Something went wrong"));
  }
}

export function* farmSagas() {
  yield all([
    takeLatest("FETCH_ALL_FARM_REQUEST", fetchFarmList),
    takeLatest("ADD_FARM_REQUEST", addFarm),
    takeLatest("UPDATE_FARM_REQUEST", updateFarm),
    takeLatest("DELETE_FARM_REQUEST", deleteFarm),
  ]);
}
export default [farmSagas];
