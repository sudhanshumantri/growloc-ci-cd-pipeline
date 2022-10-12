import {
  FETCH_ALL_CROPS_REQUEST,
  FETCH_ALL_CROPS_SUCCESS,
  FETCH_ALL_CROPS_FAILURE,
  ADD_CROPS_REQUEST,
  ADD_CROPS_SUCCESS,
  ADD_CROPS_FAILURE,
  FETCH_ALL_CROPS_FARM_REQUEST,
  FETCH_ALL_CROPS_FARM_SUCCESS,
  FETCH_ALL_CROPS_FARM_FAILURE,
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

export function saveCropRequest(data) {
  return {
    type: ADD_CROPS_REQUEST,
    data,
  };
}
export function saveCropSuccess(data) {
  return {
    type: ADD_CROPS_SUCCESS,
    data,
  };
}
export function saveCropFailure(error) {
  return {
    type: ADD_CROPS_FAILURE,
    error,
  };
}

export function fetchCropFarmRequest() {
  return {
    type: FETCH_ALL_CROPS_FARM_REQUEST,
  };
}
export function fetchCropFarmSuccess(data) {
  return {
    type: FETCH_ALL_CROPS_FARM_SUCCESS,
    data,
  };
}
export function fetchCropFarmFailure(error) {
  return {
    type: FETCH_ALL_CROPS_FARM_FAILURE,
    error,
  };
}
