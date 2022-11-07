import {
    FETCH_ALL_FARM_REQUEST,
    FETCH_ALL_FARM_SUCCESS,
    FETCH_ALL_FARM_FAILURE,
    ADD_FARM_REQUEST,
    ADD_FARM_SUCCESS,
    ADD_FARM_FAILURE,
    UPDATE_FARM_REQUEST,
    UPDATE_FARM_SUCCESS,
    UPDATE_FARM_FAILURE,
    DELETE_FARM_REQUEST,
    DELETE_FARM_SUCCESS,
    DELETE_FARM_FAILURE,
    } from './actionTypes';
export function fetchFarmRequest(data) {
    return {
        type: FETCH_ALL_FARM_REQUEST,
        data
    };
}
export function fetchFarmSuccess(data) {
    return {
        type: FETCH_ALL_FARM_SUCCESS,
        data
    };
}
export function fetchFarmFailure(data) {
    return {
        type: FETCH_ALL_FARM_FAILURE,
        data
    };
}

export function saveFarmRequest(data) {
    return {
      type: ADD_FARM_REQUEST,
      data,
    };
  }
  export function saveFarmSuccess(data) {
    return {
      type: ADD_FARM_SUCCESS,
      data,
    };
  }
  export function saveFarmFailure(error) {
    return {
      type: ADD_FARM_FAILURE,
      error,
    };
  }

  //
  export function deleteFarmRequest(data) {
    return {
        type: DELETE_FARM_REQUEST,
        data
    };
}
export function deleteFarmSuccess(data) {
    return {
        type: DELETE_FARM_SUCCESS,
        data
    };
}
export function deleteFarmFailure(error) {
    return {
        type: DELETE_FARM_FAILURE,
        error
    };
}

export function updateFarmRequest(data) {
    return {
        type: UPDATE_FARM_REQUEST,
        data
    };
}
export function updateFarmSuccess(data) {
    return {
        type: UPDATE_FARM_SUCCESS,
        data
    };
}
export function updateFarmFailure(error) {
    return {
        type: UPDATE_FARM_FAILURE,
        error
    };
}
  

