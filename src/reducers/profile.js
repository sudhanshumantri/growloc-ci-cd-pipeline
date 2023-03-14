import { fromJS, List } from 'immutable';
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
    UPDATE_USER_PASSWORD_REQUEST,
    UPDATE_USER_PASSWORD_SUCCESS,
    UPDATE_USER_PASSWORD_FAILURE
} from '../actions/actionTypes'

const INITIAL_STATE = fromJS({
    isLoading: false,
    profileInfo: null,
    error: false,
    isSuccess: true,
});
export default function profileReducer(state = INITIAL_STATE, action = {}) {
    const AUTH_OBJECT = JSON.parse(localStorage.getItem("AUTH_OBJECT"));
    console.log(AUTH_OBJECT,"AUTH_OBJECT");
    switch (action.type) {
        case FETCH_USER_PROFILE_DETAILS_REQUEST:
            return state
                .set('isLoading', true)
                .set('isSuccess', false)
        case FETCH_USER_PROFILE_DETAILS_SUCCESS:
            return state
                .set('isLoading', false)
                .set('profileInfo', action.data)
        case FETCH_USER_PROFILE_DETAILS_FAILURE:
            return state
                .set('profileInfo', null)
        case UPDATE_USER_PROFILE_DETAILS_REQUEST:
            return state
                .set('isLoading', true)
                .set('isSuccess', false)
        case UPDATE_USER_PROFILE_DETAILS_SUCCESS:
            return state
                .set('isLoading', false)
        case UPDATE_USER_PROFILE_DETAILS_FAILURE:
            return state
                .set('error', action.data)
        case UPDATE_USER_PHONE_PASSWORD_REQUEST:
            return state
                .set('isLoading', true)
                .set('isSuccess', false)
                .set('error', false)
        case UPDATE_USER_PHONE_PASSWORD_SUCCESS:
            return state
                .set('isSuccess', action.data)
                .set('isLoading', false)
                .set('error', false)
        case  UPDATE_USER_PHONE_PASSWORD_FAILURE:
            return state
                .set('isSuccess', false)
                .set('error', action.data)
                .set('isLoading', false)
        //
        case UPDATE_USER_PASSWORD_REQUEST:
            return state
                .set('isLoading', true)
                .set('isSuccess', false)
                .set('error', false)
        case UPDATE_USER_PASSWORD_SUCCESS:
            return state
                .set('isSuccess', action.data)
                .set('isLoading', false)
                .set('error', false)
        case  UPDATE_USER_PASSWORD_FAILURE:
            return state
                .set('isSuccess', false)
                .set('error', action.data)
                .set('isLoading', false)



        default:
            return state;

    }
}