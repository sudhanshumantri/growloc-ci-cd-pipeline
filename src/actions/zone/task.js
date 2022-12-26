import {
    FETCH_ALL_ZONE_TASKS_REQUEST,
    FETCH_ALL_ZONE_TASKS_SUCCESS,
    FETCH_ALL_ZONE_TASKS_FAILURE,
    ADD_ZONE_TASK_COMMENT_REQUEST,
    ADD_ZONE_TASK_COMMENT_SUCCESS,
    ADD_ZONE_TASK_COMMENT_FAILURE,
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


  export function addZoneTaskCommentRequest(data) {
    return {
      type: ADD_ZONE_TASK_COMMENT_REQUEST,
      data,
    };
  }
  export function addZoneTaskCommentSuccess(data) {
    return {
      type: ADD_ZONE_TASK_COMMENT_SUCCESS,
      data,
    };
  }
  export function addZoneTaskCommentFailure(error) {
    return {
      type: ADD_ZONE_TASK_COMMENT_FAILURE,
      error,
    };
  }
