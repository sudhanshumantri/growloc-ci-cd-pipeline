import { call, all, put, select, takeLatest,delay } from 'redux-saga/effects';
import {  callChangePasswordHandler,  callupdateChangePhone,  callupdateUserProfile } from '../utils/api';
import store, { browserHistory } from "../store";

import {
    updateUserProfileSuccess,
    updateUserProfileFailure,
    updateUserPhoneOrPasswordSuccess,
    updateUserPhoneOrPasswordFailure
} from '../actions/profile';
import { loadAuthToken } from '../actions/login'
import { addNotification } from "../components/shared/notification";


export function* updateUserProfile({ data }) {
    let responseData = yield call(callupdateUserProfile, data);
    console.log(responseData,"data");
    if (responseData?.status == 200 && responseData.data.status) {
        yield put(updateUserProfileSuccess(responseData.data.data));
        addNotification(" Updated Profile Successfully", 5000,true, "success");
    } else {
        yield put(updateUserProfileFailure("Something went wrong"));
    }
}
export function* updatePhoneNumber({ data }) {
    let responseData = yield call(callupdateChangePhone, data);
    console.log(responseData,"data");
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


// export function* updateUserProfile({ data }) {
//     let { type, body, routeParams } = data;
//     let responseData = ''
//     if (type == 'personal') {
//         responseData = yield call(callupdateUserProfile, body);
//         if (responseData?.status == 200) {
//             const token = localStorage.getItem('AUTH_TOKEN');
//             let loginObject = localStorage.getItem('AUTH_OBJECT');
//             if (loginObject) {
//                 loginObject = JSON.parse(loginObject);
//                 loginObject.name = body.name;
//                 localStorage.setItem('AUTH_OBJECT', JSON.stringify(loginObject));
//                 yield put(
//                     loadAuthToken(
//                         {
//                             token,
//                             loginObject
//                         }
//                     ))

//             }
//             yield put(
//                 updateUserProfileSuccess(
//                     responseData.data
//                 ),
//             );
//         } else {
//             yield put(
//                 updateUserProfileFailure(
//                     'Something went wrong'
//                 ),
//             );
//         }
//     } else if (type == 'update-phone') {
//         let loginObj = {
//             username,
//             password
//         }
//         responseData = yield call(callLoginHandler, loginObj);
//         if (responseData?.status == 200 && responseData.data.islogin) {
//             let emailUpdateData = {
//             }
//             responseData = yield call(callupdateChangeEmail, emailUpdateData);
//             if (responseData?.status == 200) {
//                 yield put(updateUserPhoneOrPasswordSuccess('Phone Number Updated. You would be logged out and use the new email to login again.'))
//             } else {
//                 yield put(updateUserPhoneOrPasswordFailure('Something went wrong'))
//             }

//         } else {
//             yield put(updateUserPhoneOrPasswordFailure('Invalid Credentials Provided'))
//         }
//     } else if (type == 'change-password') {
//         responseData = yield call(callChangePasswordHandler, routeParams, body);
//         if (responseData?.status == 200) {
//             yield put(updateUserPhoneOrPasswordSuccess('Password Updated. You would be logged out and use the new password to login again.'))
//         } else {
//             yield put(updateUserPhoneOrPasswordFailure('Something went wrong'))
//         }
//     }

// }

export function* profileSagas() {
    yield all([
        takeLatest('UPDATE_USER_PROFILE_DETAILS_REQUEST', updateUserProfile),
        takeLatest('UPDATE_USER_PHONE_PASSWORD_REQUEST', updatePhoneNumber),

    ]);
}

export default [profileSagas];

