import { call, all, put, select, takeLatest,delay } from 'redux-saga/effects';
import {  callChangePasswordHandler,  callupdateChangePhone,  callupdateUserProfile } from '../utils/api';
import store, { browserHistory } from "../store";

import {
    updateUserProfileSuccess,
    updateUserProfileFailure,
    updateUserPhoneOrPasswordSuccess,
    updateUserPhoneOrPasswordFailure,
    updateUserNewPasswordSuccess,
    updateUserNewPasswordFailure
} from '../actions/profile';
import { loadAuthToken } from '../actions/login'
import { addNotification } from "../components/shared/notification";
export function* updateUserProfile({ data }) {
    const {callback, ...remaingData} = data;
    let responseData = yield call(callupdateUserProfile, remaingData);
    if (responseData?.status == 200 && responseData.data.status) {
        const token = localStorage.getItem('AUTH_TOKEN');
        let loginObject = localStorage.getItem('AUTH_OBJECT');
              if (loginObject) {
               loginObject = JSON.parse(loginObject);
               const {profile} = loginObject;
               profile.name = responseData.data.data.name;
               profile.email = responseData.data.data.email;
               profile.address= responseData.data.data.address
               localStorage.setItem('AUTH_OBJECT', JSON.stringify(loginObject));
           yield put(
                loadAuthToken({
                          token,
                            loginObject
                        }
                    ))
          }
         yield put(updateUserProfileSuccess(responseData.data.data));
        addNotification(" Updated Profile Successfully", 5000,true, "success");
    } else {
        yield put(updateUserProfileFailure("Something went wrong"));
    }
}



export function* updatePhoneNumber({ data }) {
    let responseData = yield call(callupdateChangePhone, data);
    if (responseData?.status == 200 && responseData.data.status) {
        yield put(updateUserPhoneOrPasswordSuccess(responseData.data.data));
        addNotification(" Phone Number Updated. You would be logged out and use the new Phone Number to login again.", 5000,true, "success");
        localStorage.removeItem("AUTH_TOKEN");
        localStorage.removeItem("AUTH_OBJECT");
        yield delay(1000);
        yield call(browserHistory.push, "/login");
        yield call(browserHistory.go, "/login");
    } else {
        yield put(updateUserPhoneOrPasswordFailure("Something went wrong"));
    }
}
export function* updatePassword({ data }) {
    let responseData = yield call(callChangePasswordHandler, data);
    if (responseData?.status == 200 && responseData.data.status) {
        yield put(updateUserNewPasswordSuccess(responseData.data.data));
        addNotification(" Password Updated. You would be logged out and use the new password to login again.", 5000,true, "success");
        localStorage.removeItem("AUTH_TOKEN");
        localStorage.removeItem("AUTH_OBJECT");
        yield delay(1000);
        yield call(browserHistory.push, "/login");
        yield call(browserHistory.go, "/login");
    } else {
        
        yield put(updateUserNewPasswordFailure("Something went wrong"));
    }
}

export function* profileSagas() {
    yield all([
        takeLatest('UPDATE_USER_PROFILE_DETAILS_REQUEST', updateUserProfile),
        takeLatest('UPDATE_USER_PHONE_PASSWORD_REQUEST', updatePhoneNumber),
        takeLatest('UPDATE_USER_PASSWORD_REQUEST', updatePassword),

    ]);
}

export default [profileSagas];

