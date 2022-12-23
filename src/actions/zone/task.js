import {
    FETCH_ALL_ZONE_TASKS_REQUEST,
    FETCH_ALL_ZONE_TASKS_SUCCESS,
    FETCH_ALL_ZONE_TASKS_FAILURE,
 } from "../actionTypes";
  
  export function fetchZoneTaskRequest(data) {
    return {
      type: FETCH_ALL_ZONE_TASKS_REQUEST,
      data
    };
  };
  export function fetchZoneTaskSuccess(data) {
    return {
      type: FETCH_ALL_ZONE_TASKS_SUCCESS,
      data,
    };
  };
  export function fetchZoneTaskFailure(error) {
    return {
      type: FETCH_ALL_ZONE_TASKS_FAILURE,
      error,
    };
  };