import { call, all, put, takeLatest } from "redux-saga/effects";
import {
    callAddCropToLifecycle, callfetchAllCropsLifecycle
} from "../utils/api";

import {
    addCropToLifecycleSuccess,
    addCropToLifecycleFailure,
    fetchAllCropsLifecycleSuccess,
    fetchAllCropsLifecycleFailure
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
export function* cropsSagas() {
    yield all([
        takeLatest("ADD_CROP_LIFECYCLE_REQUEST", addCropToLifecycle),
        takeLatest("FETCH_CROP_LIFECYCLE_REQUEST", fetchAllCropsLifecycle),
        // takeLatest("FETCH_FARM_ALL_CROPS_REQUEST", fetchFarmCropsList),
    ]);
}
export default [cropsSagas];
