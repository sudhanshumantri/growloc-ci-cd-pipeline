import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,

  } from "./actionTypes";
  
  export function fetchUsersRequest(data) {
    return {
      type: FETCH_USERS_REQUEST,
      data
    };
  }
  export function fetchUsersSuccess(data) {
    return {
      type: FETCH_USERS_SUCCESS,
      data,
    };
  }
  export function fetchUsersFailure(error) {
    return {
      type: FETCH_USERS_FAILURE,
      error,
    };
  }
  
  //
  export function addUserRequest(data) {
    return {
      type: ADD_USER_REQUEST,
      data
    };
  }
  export function addUserSuccess(data) {
    return {
      type: ADD_USER_SUCCESS,
      data,
    };
  }
  export function addUserFailure(error) {
    return {
      type: ADD_USER_FAILURE,
      error,
    };
  }


  export function deleteUserRequest(data) {
    return {
        type: DELETE_USER_REQUEST,
        data
    };
}
export function deleteUserSuccess(data) {
    return {
        type: DELETE_USER_SUCCESS,
        data
    };
}
export function deleteUserFailure(error) {
    return {
        type: DELETE_USER_FAILURE,
        error
    };
}
export function updateUserRequest(data) {
    return {
        type: UPDATE_USER_REQUEST,
        data
    };
}
export function updateUserSuccess(data) {
    return {
        type:UPDATE_USER_SUCCESS,
        data
    };
}
export function updateUserFailure(error) {
    return {
        type: UPDATE_USER_FAILURE,
        error
    };
}
  