import {
    FETCH_ALL_FARM_ZONE_REQUEST,
    FETCH_ALL_FARM_ZONE_SUCCESS,
    FETCH_ALL_FARM_ZONE_FAILURE
 } from "./actionTypes";
  
  export function fetchFarmZoneRequest(data) {
    return {
      type: FETCH_ALL_FARM_ZONE_REQUEST,
      data
    };
  }
  export function fetchFarmZoneSuccess(data) {
    return {
      type: FETCH_ALL_FARM_ZONE_SUCCESS,
      data,
    };
  }
  export function fetchFarmZoneFailure(error) {
    return {
      type: FETCH_ALL_FARM_ZONE_FAILURE,
      error,
    };
  }