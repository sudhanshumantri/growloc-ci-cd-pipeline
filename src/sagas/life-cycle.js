import { call, all, put, takeLatest } from "redux-saga/effects";
import {
    callAddCropToLifecycle, callfetchAllCropsLifecycle, callfetchCropsLifecycleDetails
} from "../utils/api";

import {
    addCropToLifecycleSuccess,
    addCropToLifecycleFailure,
    fetchAllCropsLifecycleSuccess,
    fetchAllCropsLifecycleFailure,
    fetchCropsLifecycleDetailsSuccess,
    fetchCropsLifecycleDetailsFailure
} from "../actions/life-cycle";

export function* fetchAllCropsLifecycle({ data }) {
    let responseData = yield call(callfetchAllCropsLifecycle, data);
    if (responseData?.status == 200 && responseData.data.status) {
        yield put(fetchAllCropsLifecycleSuccess(responseData.data.data));

    } else {
        yield put(fetchAllCropsLifecycleFailure("Something went wrong"));
    }
}
export function* addCropToLifecycle({ data }) {
    let responseData = yield call(callAddCropToLifecycle, data);
    if (responseData?.status == 200 && responseData.data.status) {
        yield put(addCropToLifecycleSuccess(responseData.data.data));

    } else {
        yield put(addCropToLifecycleFailure("Something went wrong"));
    }
}
export function* fetchCropsLifecycleDetails({ data }) {
    let responseData = yield call(callfetchCropsLifecycleDetails, data);
    if (responseData?.status == 200 && responseData.data.status) {
        yield put(fetchCropsLifecycleDetailsSuccess(responseData.data.data));

    } else {
        yield put(fetchCropsLifecycleDetailsFailure("Something went wrong"));
    }
}
export function* cropLifeCycleSagas() {
    yield all([
        takeLatest("ADD_CROP_LIFECYCLE_REQUEST", addCropToLifecycle),
        takeLatest("FETCH_CROP_LIFECYCLE_REQUEST", fetchAllCropsLifecycle),
        takeLatest("FETCH_CROP_LIFECYCLE_DETAILS_REQUEST", fetchCropsLifecycleDetails),
    ]);
}
export default [cropLifeCycleSagas];
