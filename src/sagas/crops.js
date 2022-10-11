import { call, all, put, takeLatest } from "redux-saga/effects";
import { callFetchCropsList } from "../utils/api";

import { fetchCropSuccess, fetchCropFailure } from "../actions/crops";

export function* fetchCropList({data} ) {
  
  let responseData = yield call(callFetchCropsList, data);
  console.log(responseData);
  if (responseData?.status == 200) {
    yield put(fetchCropSuccess(responseData.data));
  } else {
    yield put(fetchCropFailure("Something went wrong"));
  }
}

export function* cropsSagas() {
  yield all([
      takeLatest("FETCH_ALL_CROPS_REQUEST", fetchCropList)
  ]);

}
export default [cropsSagas];
