import {
    LOAD_AUTH_TOKEN,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
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
