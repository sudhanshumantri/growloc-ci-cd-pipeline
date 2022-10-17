import {
  FETCH_ALL_CROPS_REQUEST,
  FETCH_ALL_CROPS_SUCCESS,
  FETCH_ALL_CROPS_FAILURE,
  ADD_CROP_TO_FARM_REQUEST,
  ADD_CROP_TO_FARM_SUCCESS,
  ADD_CROP_TO_FARM_FAILURE,
  FETCH_FARM_ALL_CROPS_REQUEST,
  FETCH_FARM_ALL_CROPS_SUCCESS,
  FETCH_FARM_ALL_CROPS_FAILURE
} from "./actionTypes";

export function fetchCropRequest() {
  return {
    type: FETCH_ALL_CROPS_REQUEST,
  };
}
export function fetchCropSuccess(data) {
  return {
    type: FETCH_ALL_CROPS_SUCCESS,
    data,
  };
}
export function fetchCropFailure(error) {
  return {
    type: FETCH_ALL_CROPS_FAILURE,
    error,
  };
}

export function addCropToFarmRequest(data) {
  return {
    type: ADD_CROP_TO_FARM_REQUEST,
    data,
  };
}
export function addCropToFarmSuccess(data) {
  return {
    type: ADD_CROP_TO_FARM_SUCCESS,
    data,
  };
}
export function addCropToFarmFailure(error) {
  return {
    type: ADD_CROP_TO_FARM_FAILURE,
    error,
  };
}
export function fetchFarmCropsRequest(data) {
  return {
    type: FETCH_FARM_ALL_CROPS_REQUEST,
    data
  };
}
export function fetchFarmCropsSuccess(data) {
  return {
    type: FETCH_FARM_ALL_CROPS_SUCCESS,
    data,
  };
}
export function fetchFarmCropsFailure(error) {
  return {
    type: FETCH_FARM_ALL_CROPS_FAILURE,
    error,
  };
}



