import { call, all, put, select, takeLatest } from 'redux-saga/effects';
import { callLoginHandler, callRegisterHandler } from '../utils/api';
import store, { browserHistory } from '../store';
import { addNotification } from "../components/shared/notification";

import {
    registerSuccess, registerFailure
} from '../actions/register'
export function* registerHandler({ data }) {
    let responseData = yield call(callRegisterHandler, data);
    if (responseData?.status == 200 && responseData.data.status ) {
        addNotification("Account sucessfully created. Kindly Login", 5000,true, "success");
        // yield call(browserHistory.push, "/login");
        // yield call(browserHistory.go, "/login");
        yield put(
            registerSuccess(),
        );

    } else {
        let errorMessage=responseData.data?.error?responseData.data?.error:'Something went wrong'
        addNotification(errorMessage, 5000,true, "danger");
        yield put(
            registerFailure(
                'Somethign went wrong'
            ),
        );
    }
    // ////console.log(data)
}

export function* registerSagas() {
    // Watches for PROFILE_FETCH_REQUESTED actions and calls fetchBrowse when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // yield all([takeLatest('FETCH_CREATE_SEGMENT_FILTER_DATA_REQUEST', getCreateSegmentFilter),
    // takeLatest('POST_CREATE_SEGMENT_DATA_REQUEST', postCreateSegment),
    yield all([
        takeLatest('REGISTER_REQUEST', registerHandler),
    ]);

}

export default [registerSagas];


