import { call, all, put, takeLatest } from "redux-saga/effects";
import {
    callAddCropToLifecycle, callCropLifecycleTransition, callfetchAllCropsLifecycle, callfetchCropsLifecycleDetails,callAddCropCycleParameters
} from "../utils/api";

import {
    addCropToLifecycleSuccess,
    addCropToLifecycleFailure,
    fetchAllCropsLifecycleSuccess,
    fetchAllCropsLifecycleFailure,
    fetchCropsLifecycleDetailsSuccess,
    fetchCropsLifecycleDetailsFailure,
    cropsLifecycleTransitionSuccess,
    cropsLifecycleTransitionFailure,
    addCropToLifecycleParametersSuccess,
    addCropToLifecycleParametersFailure
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
export function* cropLifecycleTransition({ data }) {
    let responseData = yield call(callCropLifecycleTransition, data);
    if (responseData?.status == 200 && responseData.data.status) {
        yield put(cropsLifecycleTransitionSuccess(responseData.data.data));

    } else {
        yield put(cropsLifecycleTransitionFailure("Something went wrong"));
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
export function* addCropToLifecycleParameters({ data }) {
    let responseData = yield call(callAddCropCycleParameters, data);
    if (responseData?.status == 200 && responseData.data.status) {
        yield put(addCropToLifecycleParametersSuccess(responseData.data.data));

    } else {
        yield put(addCropToLifecycleParametersFailure("Something went wrong"));
    }
}

export function* cropLifeCycleSagas() {
    yield all([
        takeLatest("ADD_CROP_LIFECYCLE_REQUEST", addCropToLifecycle),
        takeLatest("FETCH_CROP_LIFECYCLE_REQUEST", fetchAllCropsLifecycle),
        takeLatest("FETCH_CROP_LIFECYCLE_DETAILS_REQUEST", fetchCropsLifecycleDetails),
        takeLatest("CROP_LIFECYCLE_TRANSITION_REQUEST", cropLifecycleTransition),
        takeLatest("ADD_CROP_LIFECYCLE_PARAMETERS_REQUEST", addCropToLifecycleParameters),

    ]);
}
export default [cropLifeCycleSagas];
