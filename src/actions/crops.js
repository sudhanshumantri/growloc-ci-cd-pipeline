import {
  FETCH_All_CROPS_REQUEST,
  FETCH_ALL_CROPS_SUCCESS,
  FETCH_ALL_CROPS_FAILURE,
} from "./actionTypes";

export function fetchCropRequest() {
  return {
    type: FETCH_All_CROPS_REQUEST,
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
