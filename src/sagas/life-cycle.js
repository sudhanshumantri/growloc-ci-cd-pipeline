import { call, all, put, takeLatest } from "redux-saga/effects";
import {
    callAddCropToLifecycle, callCropLifecycleTransition, callfetchAllCropsLifecycle, callfetchCropsLifecycleDetails, callUpdateCropCycleParameters, callUpdateCropCycleDetails,callUpdateCropToLifecycleSchedule
} from "../utils/api";
import { addNotification } from "../components/shared/notification";
import {
    addCropToLifecycleSuccess,
    addCropToLifecycleFailure,
    fetchAllCropsLifecycleSuccess,
    fetchAllCropsLifecycleFailure,
    fetchCropsLifecycleDetailsSuccess,
    fetchCropsLifecycleDetailsFailure,
    cropsLifecycleTransitionSuccess,
    cropsLifecycleTransitionFailure,
    updateCropToLifecycleParametersSuccess,
    updateCropToLifecycleParametersFailure,
    updateCropToLifecycleScheduleSuccess,
    updateCropToLifecycleScheduleFailure,
    updateCropToLifecycleDetailsSuccess,
    updateCropToLifecycleDetailsFailure,
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
        addNotification("Add Crop Lifecyle Added Successfully", 5000,true, "success");

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
export function* updateCropToLifecycleParameters({ data }) {
    let responseData = yield call(callUpdateCropCycleParameters, data);
    if (responseData?.status == 200 && responseData.data.status) {
        yield put(updateCropToLifecycleParametersSuccess(responseData.data.data));

    } else {
        yield put(updateCropToLifecycleParametersFailure("Something went wrong"));
    }
}

export function* updateCropToLifecycleSchedule({ data }) {
    let responseData = yield call(callUpdateCropToLifecycleSchedule, data);
    if (responseData?.status == 200 && responseData.data.status) {
        yield put(updateCropToLifecycleScheduleSuccess(responseData.data.data));
    } else {
        yield put(updateCropToLifecycleScheduleFailure("Something went wrong"));
    }
}

export function* updateCropToLifecycleDetails({ data }) {
    let responseData = yield call(callUpdateCropCycleDetails, data);
    if (responseData?.status == 200 && responseData.data.status) {
        yield put(updateCropToLifecycleDetailsSuccess(responseData.data.data));

    } else {
        yield put(updateCropToLifecycleDetailsFailure("Something went wrong"));
    }
}

export function* cropLifeCycleSagas() {
    yield all([
        takeLatest("ADD_CROP_LIFECYCLE_REQUEST", addCropToLifecycle),
        takeLatest("FETCH_CROP_LIFECYCLE_REQUEST", fetchAllCropsLifecycle),
        takeLatest("FETCH_CROP_LIFECYCLE_DETAILS_REQUEST", fetchCropsLifecycleDetails),
        takeLatest("CROP_LIFECYCLE_TRANSITION_REQUEST", cropLifecycleTransition),
        takeLatest("UPDATE_CROP_LIFECYCLE_PARAMETERS_REQUEST", updateCropToLifecycleParameters),
        takeLatest("UPDATE_CROP_LIFECYCLE_SCHEDULE_REQUEST", updateCropToLifecycleSchedule),
        takeLatest("UPDATE_CROP_LIFECYCLE_DETAILS_REQUEST", updateCropToLifecycleDetails),


    ]);
}
export default [cropLifeCycleSagas];
