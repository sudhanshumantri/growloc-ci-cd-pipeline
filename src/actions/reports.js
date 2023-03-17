import {
    FETCH_ALL_FARM_REPORTS_DATA_REQUEST,
    FETCH_ALL_FARM_REPORTS_DATA_SUCCESS,
    FETCH_ALL_FARM_REPORTS_DATA_FAILURE,
 } from "./actionTypes";
  
  export function fetchFarmReportsRequest(data) {
    return {
      type: FETCH_ALL_FARM_REPORTS_DATA_REQUEST,
      data
    };
  }
  export function fetchFarmReportsSuccess(data) {
    return {
      type: FETCH_ALL_FARM_REPORTS_DATA_SUCCESS,
      data,
    };
  }
  export function fetchFarmReportsFailure(error) {
    return {
      type: FETCH_ALL_FARM_REPORTS_DATA_FAILURE,
      error,
    };
  }

  