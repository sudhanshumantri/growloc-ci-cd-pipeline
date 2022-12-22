import {
    FETCH_ALL_FARM_ZONE_REQUEST,
    FETCH_ALL_FARM_ZONE_SUCCESS,
    FETCH_ALL_FARM_ZONE_FAILURE,
    FETCH_ALL_FARM_ZONE_DASHBOARD_REQUEST,
    FETCH_ALL_FARM_ZONE_DASHBOARD_SUCCESS,
    FETCH_ALL_FARM_ZONE_DASHBOARD_FAILURE,
    FETCH_ALL_FARM_ZONE_DASHBOARD_HARVEST_REQUEST,
    FETCH_ALL_FARM_ZONE_DASHBOARD_HARVEST_SUCCESS,
    FETCH_ALL_FARM_ZONE_DASHBOARD_HARVEST_FAILURE,
    ADD_FARM_DASHBOARD_ZONE_TASK_REQUEST,
    ADD_FARM_DASHBOARD_ZONE_TASK_SUCCESS,
    ADD_FARM_DASHBOARD_ZONE_TASK_FAILURE,
    ADD_FARM_DASHOBARD_ZONE_TASKS_COMMENT_REQUEST,
    ADD_FARM_DASHOBARD_ZONE_TASKS_COMMENT_SUCCESS,
    ADD_FARM_DASHOBARD_ZONE_TASKS_COMMENT_FAILURE

 } from "./actionTypes";
  
  export function fetchFarmZoneRequest(data) {
    return {
      type: FETCH_ALL_FARM_ZONE_REQUEST,
      data
    };
  };
  export function fetchFarmZoneSuccess(data) {
    return {
      type: FETCH_ALL_FARM_ZONE_SUCCESS,
      data,
    };
  };
  export function fetchFarmZoneFailure(error) {
    return {
      type: FETCH_ALL_FARM_ZONE_FAILURE,
      error,
    };
  };
  //

  export function fetchFarmZoneDashboardRequest(data) {
    return {
      type: FETCH_ALL_FARM_ZONE_DASHBOARD_REQUEST,
      data
    };
  };
  export function fetchFarmZoneDashboardSuccess(data) {
    return {
      type: FETCH_ALL_FARM_ZONE_DASHBOARD_SUCCESS,
      data,
    };
  };
  export function fetchFarmZoneDashboardFailure(error) {
    return {
      type: FETCH_ALL_FARM_ZONE_DASHBOARD_FAILURE,
      error,
    };
  };
  //
  export function fetchFarmZoneDashboardHarvestRequest(data) {
    return {
      type: FETCH_ALL_FARM_ZONE_DASHBOARD_HARVEST_REQUEST,
      data
    };
  };
  export function fetchFarmZoneDashboardHarvestSuccess(data) {
    return {
      type: FETCH_ALL_FARM_ZONE_DASHBOARD_HARVEST_SUCCESS,
      data,
    };
  };
  export function fetchFarmZoneDashboardHarvestFailure(error) {
    return {
      type: FETCH_ALL_FARM_ZONE_DASHBOARD_HARVEST_FAILURE,
      error,
    };
  };

  //

  export function addFarmDashboardZoneTaskRequest(data) {
    return {
      type: ADD_FARM_DASHBOARD_ZONE_TASK_REQUEST,
      data,
    };
  }
  export function addFarmDashboardZoneTaskSuccess(data) {
    return {
      type: ADD_FARM_DASHBOARD_ZONE_TASK_SUCCESS,
      data,
    };
  }
  export function addFarmDashboardZoneTaskFailure(error) {
    return {
      type: ADD_FARM_DASHBOARD_ZONE_TASK_FAILURE,
      error,
    };
  }
  
  //
  
  export function addFarmDashboardZoneTaskCommentRequest(data) {
    return {
      type: ADD_FARM_DASHOBARD_ZONE_TASKS_COMMENT_REQUEST,
      data,
    };
  }
  export function addFarmDashboardZoneTaskCommentSuccess(data) {
    return {
      type: ADD_FARM_DASHOBARD_ZONE_TASKS_COMMENT_SUCCESS,
      data,
    };
  }
  export function addFarmDashboardZoneTaskCommentFailure(error) {
    return {
      type: ADD_FARM_DASHOBARD_ZONE_TASKS_COMMENT_FAILURE,
      error,
    };
  }


  



