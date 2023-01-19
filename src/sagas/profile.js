import { call, all, put, select, takeLatest } from 'redux-saga/effects';
import {  callChangePasswordHandler,  callupdateChangeEmail,  callupdateUserProfile } from '../utils/api';
import {
    fetchUserProfileFailure,
    fetchUserProfileSuccess,
    updateUserProfileSuccess,
    updateUserProfileFailure,
    updateUserPhoneOrPasswordSuccess,
    updateUserPhoneOrPasswordFailure,
} from '../actions/profile';
import { loadAuthToken } from '../actions/login'

export function* fetchUserProfile({ data }) {
    let responseData = yield call(callfetchUserProfile, data);
    if (responseData?.status == 200) {
        yield put(
            fetchUserProfileSuccess(responseData.data),
        );

    } else {
        yield put(
            fetchUserProfileFailure(
                'Something went wrong'
            ),
        );
    }
}

export function* updateUserProfile({ data }) {
    let { type, body, routeParams } = data;
    let responseData = ''
    if (type == 'personal') {
        responseData = yield call(callupdateUserProfile, body);
        if (responseData?.status == 200) {
            const token = localStorage.getItem('AUTH_TOKEN');
            let loginObject = localStorage.getItem('AUTH_OBJECT');
            if (loginObject) {
                loginObject = JSON.parse(loginObject);
                loginObject.name = body.name;
                localStorage.setItem('AUTH_OBJECT', JSON.stringify(loginObject));
                yield put(
                    loadAuthToken(
                        {
                            token,
                            loginObject
                        }
                    ))

            }
            yield put(
                updateUserProfileSuccess(
                    responseData.data
                ),
            );
        } else {
            yield put(
                updateUserProfileFailure(
                    'Something went wrong'
                ),
            );
        }
    } else if (type == 'update-phone') {
        let loginObj = {
            username,
            password
        }
        responseData = yield call(callLoginHandler, loginObj);
        if (responseData?.status == 200 && responseData.data.islogin) {
            let emailUpdateData = {
            }
            responseData = yield call(callupdateChangeEmail, emailUpdateData);
            if (responseData?.status == 200) {
                yield put(updateUserPhoneOrPasswordSuccess('Phone Number Updated. You would be logged out and use the new email to login again.'))
            } else {
                yield put(updateUserPhoneOrPasswordFailure('Something went wrong'))
            }

        } else {
            yield put(updateUserPhoneOrPasswordFailure('Invalid Credentials Provided'))
        }
    } else if (type == 'change-password') {
        responseData = yield call(callChangePasswordHandler, routeParams, body);
        if (responseData?.status == 200) {
            yield put(updateUserPhoneOrPasswordSuccess('Password Updated. You would be logged out and use the new password to login again.'))
        } else {
            yield put(updateUserPhoneOrPasswordFailure('Something went wrong'))
        }
    }

}

export function* profileSagas() {
    yield all([
        takeLatest('FETCH_USER_PROFILE_DETAILS_REQUEST', fetchUserProfile),
        takeLatest('UPDATE_USER_PROFILE_DETAILS_REQUEST', updateUserProfile),
        takeLatest('UPDATE_USER_PHONE_PASSWORD_REQUEST', updateUserProfile),
    ]);
}

export default [profileSagas];

