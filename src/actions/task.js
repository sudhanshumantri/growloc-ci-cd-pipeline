import {
    FETCH_ALL_FARM_TASKS_REQUEST,
    FETCH_ALL_FARM_TASKS_SUCCESS,
    FETCH_ALL_FARM_TASKS_FAILURE,
   
 } from "./actionTypes";
  
  export function fetchFarmTaskRequest(data) {
    return {
      type: FETCH_ALL_FARM_TASKS_REQUEST,
      data
    };
  }
  export function fetchFarmTaskSuccess(data) {
    return {
      type: FETCH_ALL_FARM_TASKS_SUCCESS,
      data,
    };
  }
  export function fetchFarmTaskFailure(error) {
    return {
      type: FETCH_ALL_FARM_TASKS_FAILURE,
      error,
    };
  }