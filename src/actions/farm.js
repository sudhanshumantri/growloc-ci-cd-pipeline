import {
    FETCH_ALL_FARM_REQUEST,
    FETCH_ALL_FARM_SUCCESS,
    FETCH_ALL_FARM_FAILURE,
    ADD_FARM_REQUEST,
    ADD_FARM_SUCCESS,
    ADD_FARM_FAILURE,
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
  

