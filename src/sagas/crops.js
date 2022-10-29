import { call, all, put, takeLatest } from "redux-saga/effects";
import {
  callFetchCropsList,
  callAddCropToFarm,
  callFetchFarmCropsList,
  callUpdateFarmCrop,
  callDeleteFarmCrop,
} from "../utils/api";

import {

  fetchCropSuccess,
  fetchCropFailure,
  addCropToFarmSuccess,
  addCropToFarmFailure,
  fetchFarmCropsSuccess,
  fetchFarmCropsRequest,
  fetchFarmCropsFailure,
  updateFarmCropsSuccess,
  updateFarmCropsFailure,
  deleteFarmCropsSuccess,
  deleteFarmCropsFailure,
} from "../actions/crops";

export function* fetchCropList({ data }) {
  let responseData = yield call(callFetchCropsList, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchCropSuccess(responseData.data.data));
  } else {
    yield put(fetchCropFailure("Something went wrong"));
  }
}
export function* addCropToFarm({ data }) {
  let responseData = yield call(callAddCropToFarm, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(addCropToFarmSuccess(responseData.data.data));
    //call the fetch sagas here :
    yield put(fetchFarmCropsRequest({ farmId: data.farmId }))

  } else {
    yield put(addCropToFarmFailure("Something went wrong"));
  }
}

export function* fetchFarmCropsList({ data }) {
  let responseData = yield call(callFetchFarmCropsList, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchFarmCropsSuccess(responseData.data.data));
  } else {
    yield put(fetchFarmCropsFailure("Something went wrong"));
  }
}

export function* updateFarmCrops({ data }) {
  let responseData = yield call(callUpdateFarmCrop, data);
  if (responseData?.status == 200) {
    yield put(updateFarmCropsSuccess(responseData.data));
  } else {
    yield put(updateFarmCropsFailure("Something went wrong"));
  }
}
export function* deleteFarmCrops({ data }) {
  let responseData = yield call(callDeleteFarmCrop, data);
  if (responseData?.status == 200) {
    yield put(deleteFarmCropsSuccess(data));
  } else {
    yield put(deleteFarmCropsFailure("Something went wrong"));
  }
}

export function* cropsSagas() {
  yield all([
    takeLatest("FETCH_ALL_CROPS_REQUEST", fetchCropList),
    takeLatest("ADD_CROP_TO_FARM_REQUEST", addCropToFarm),
    takeLatest("FETCH_FARM_ALL_CROPS_REQUEST", fetchFarmCropsList),
    takeLatest("UPDATE_MANAGE_CROP_REQUEST", updateFarmCrops),
    takeLatest("DELETE_MANAGE_CROP_REQUEST", deleteFarmCrops),
  ]);
}
export default [cropsSagas];
