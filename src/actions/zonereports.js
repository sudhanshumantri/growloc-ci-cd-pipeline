import {
    FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_REQUEST,
    FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_SUCCESS,
    FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_FAILURE,
 } from "./actionTypes";
  
  export function fetchZoneReportsRequest(data) {
    return {
      type: FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_REQUEST,
      data
    };
  }
  export function fetchZoneReportsSuccess(data) {
    return {
      type: FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_SUCCESS,
      data,
    };
  }
  export function fetchZoneReportsFailure(error) {
    return {
      type: FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_FAILURE,
      error,
    };
  }

  