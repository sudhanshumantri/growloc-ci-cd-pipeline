import { call, all, put, takeLatest } from "redux-saga/effects";
import { callFetchCropsList } from "../utils/api";

import { fetchCropSuccess, fetchCropFailure } from "../actions/crops";

export function* fetchCropList({data} ) {
  
  let responseData = yield call(callFetchCropsList, data);
  if (responseData?.status == 200) {
    yield put(fetchCropSuccess(responseData.data));
  } else {
    yield put(fetchCropFailure("Something went wrong"));
  }
}

export function* cropsSagas() {
  // Watches for PROFILE_FETCH_REQUESTED actions and calls fetchBrowse when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // yield all([takeLatest('FETCH_CREATE_SEGMENT_FILTER_DATA_REQUEST', getCreateSegmentFilter),
  // takeLatest('POST_CREATE_SEGMENT_DATA_REQUEST', postCreateSegment),
  yield all([takeLatest("FETCH_All_CROPS_REQUEST", fetchCropList)]);
}

export default cropsSagas;
