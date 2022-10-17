import {
    ADD_CROP_LIFECYCLE_REQUEST,
    ADD_CROP_LIFECYCLE_SUCCESS,
    ADD_CROP_LIFECYCLE_FAILURE,
    FETCH_CROP_LIFECYCLE_REQUEST,
    FETCH_CROP_LIFECYCLE_SUCCESS,
    FETCH_CROP_LIFECYCLE_FAILURE
  } from "./actionTypes";

  export function fetchAllCropsLifecycleRequest(data) {
    return {
      type: FETCH_CROP_LIFECYCLE_REQUEST,
      data
    };
  }
  export function fetchAllCropsLifecycleSuccess(data) {
    return {
      type: FETCH_CROP_LIFECYCLE_SUCCESS,
      data,
    };
  }
  export function fetchAllCropsLifecycleFailure(error) {
    return {
      type: FETCH_CROP_LIFECYCLE_FAILURE,
      error,
    };
  }

export function addCropToLifecycleRequest(data) {
    return {
      type: ADD_CROP_LIFECYCLE_REQUEST,
      data
    };
  }
  export function addCropToLifecycleSuccess(data) {
    return {
      type: ADD_CROP_LIFECYCLE_SUCCESS,
      data,
    };
  }
  export function addCropToLifecycleFailure(error) {
    return {
      type: ADD_CROP_LIFECYCLE_FAILURE,
      error,
    };
  }