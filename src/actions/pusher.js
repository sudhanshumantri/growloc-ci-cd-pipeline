import { FETCH_SENSOR_DATA_PUSHER_REQUEST,FETCH_SENSOR_DATA_PUSHER_SUCCESS,FETCH_SENSOR_DATA_PUSHER_FAILURE } from "./actionTypes";

export function fetchPusherRequest(data) {
    return {
      type: FETCH_SENSOR_DATA_PUSHER_REQUEST,
      data,
    };
  }
  export function fetchPusherSuccess(data) {
    return {
      type: FETCH_SENSOR_DATA_PUSHER_SUCCESS,
      data,
    };
  }
  export function fetchPusherFailure(data) {
    return {
      type: FETCH_SENSOR_DATA_PUSHER_FAILURE,
      data,
    };
  }