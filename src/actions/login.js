import {
    LOAD_AUTH_TOKEN,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE

} from './actionTypes';
export function loadAuthToken(data) {
    return {
        type: LOAD_AUTH_TOKEN,
        data
    };
}
export function loginRequest(data) {
    return {
        type: LOGIN_REQUEST,
        data
    };
}
export function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        data
    };
}
export function loginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        error
    };
}

export function logout() {
    return {
        type: LOGOUT
    };
};

export function forgotPasswordRequest(data) {
    return {
        type: FORGOT_PASSWORD_REQUEST,
        data
    };
}
export function forgotPasswordSuccess(data) {
    return {
        type: FORGOT_PASSWORD_SUCCESS,
        data
    };
}
export function forgotPasswordFailure(error) {
    return {
        type: FORGOT_PASSWORD_FAILURE,
        error
    };
}
