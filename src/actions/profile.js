import {
    FETCH_USER_PROFILE_DETAILS_REQUEST,
    FETCH_USER_PROFILE_DETAILS_SUCCESS,
    FETCH_USER_PROFILE_DETAILS_FAILURE,
    UPDATE_USER_PROFILE_DETAILS_REQUEST,
    UPDATE_USER_PROFILE_DETAILS_SUCCESS,
    UPDATE_USER_PROFILE_DETAILS_FAILURE,
    UPDATE_USER_PHONE_PASSWORD_REQUEST,
    UPDATE_USER_PHONE_PASSWORD_SUCCESS,
    UPDATE_USER_PHONE_PASSWORD_FAILURE,
} from './actionTypes';

export function fetchUserProfileRequest(data) {
    return {
        type: FETCH_USER_PROFILE_DETAILS_REQUEST,
        data
    };
}
export function fetchUserProfileSuccess(data) {
    return {
        type: FETCH_USER_PROFILE_DETAILS_SUCCESS,
        data
    };
}
export function fetchUserProfileFailure(data) {
    return {
        type: FETCH_USER_PROFILE_DETAILS_FAILURE,
        data
    };
}
export function updateUserProfileRequest(data) {
    return {
        type: UPDATE_USER_PROFILE_DETAILS_REQUEST,
        data
    };
}
export function updateUserProfileSuccess(data) {
    return {
        type: UPDATE_USER_PROFILE_DETAILS_SUCCESS,
        data
    };
}
export function updateUserProfileFailure(data) {
    return {
        type: UPDATE_USER_PROFILE_DETAILS_FAILURE,
        data
    };
}
export function updateUserPhoneOrPasswordRequest(data) {
    return {
        type: UPDATE_USER_PHONE_PASSWORD_REQUEST,
        data
    };
}
export function updateUserPhoneOrPasswordSuccess(data) {
    return {
        type: UPDATE_USER_PHONE_PASSWORD_SUCCESS,
        data
    };
}
export function updateUserPhoneOrPasswordFailure(data) {
    return {
        type: UPDATE_USER_PHONE_PASSWORD_FAILURE,
        data
    };
}