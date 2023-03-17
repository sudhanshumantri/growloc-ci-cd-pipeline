import {
  FETCH_ALL_DASHBOARD_FARM_REQUEST,
  FETCH_ALL_DASHBOARD_FARM_SUCCESS,
  FETCH_ALL_DASHBOARD_FARM_FAILURE,
  FETCH_ALL_DASHBOARD_HARVEST_REQUEST,
  FETCH_ALL_DASHBOARD_HARVEST_SUCCESS,
  FETCH_ALL_DASHBOARD_HARVEST_FAILURE,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  ADD_FARM_TASKS_COMMENTS_REQUEST,
  ADD_FARM_TASKS_COMMENTS_SUCCESS,
  ADD_FARM_TASKS_COMMENTS_FAILURE,
  ADD_FARM_DASHBOARD_ZONE_REQUEST,
  ADD_FARM_DASHBOARD_ZONE_SUCCESS,
  ADD_FARM_DASHBOARD_ZONE_FAILURE,
  FETCH_ALL_FARM_DASHBOARD_ZONE_REQUEST,
  FETCH_ALL_FARM_DASHBOARD_ZONE_SUCCESS,
  FETCH_ALL_FARM_DASHBOARD_ZONE_FAILURE,
  UPDATE_FARM_DASHBOARD_ZONE_REQUEST,
  UPDATE_FARM_DASHBOARD_ZONE_SUCCESS,
  UPDATE_FARM_DASHBOARD_ZONE_FAILURE,
  DELETE_FARM_DASHBOARD_ZONE_REQUEST,
  DELETE_FARM_DASHBOARD_ZONE_SUCCESS,
  DELETE_FARM_DASHBOARD_ZONE_FAILURE,
  FETCH_ALL_USER_ZONE_SENSORS_REQUEST,
  FETCH_ALL_USER_ZONE_SENSORS_SUCCESS,
  FETCH_ALL_USER_ZONE_SENSORS_FAILURE
} from "./actionTypes";
export function fetchDashboardFarmRequest(data) {
  return {
    type: FETCH_ALL_DASHBOARD_FARM_REQUEST,
    data,
  };
}
export function fetchDashboardFarmSuccess(data) {
  return {
    type: FETCH_ALL_DASHBOARD_FARM_SUCCESS,
    data,
  };
}
export function fetchDashboardFarmFailure(data) {
  return {
    type: FETCH_ALL_DASHBOARD_FARM_FAILURE,
    data,
  };
}
//
export function fetchDashboardHarvestRequest(data) {
  return {
    type: FETCH_ALL_DASHBOARD_HARVEST_REQUEST,
    data,
  };
}
export function fetchDashboardHarvestSuccess(data) {
  return {
    type: FETCH_ALL_DASHBOARD_HARVEST_SUCCESS,
    data,
  };
}
export function fetchDashboardHarvestFailure(data) {
  return {
    type: FETCH_ALL_DASHBOARD_HARVEST_FAILURE,
    data,
  };
}

//

export function fetchFarmDashboardZoneRequest(data) {
  return {
    type: FETCH_ALL_FARM_DASHBOARD_ZONE_REQUEST,
    data,
  };
}
export function fetchFarmDashboardZoneSuccess(data) {
  return {
    type: FETCH_ALL_FARM_DASHBOARD_ZONE_SUCCESS,
    data,
  };
}
export function fetchFarmDashboardZoneFailure(data) {
  return {
    type: FETCH_ALL_FARM_DASHBOARD_ZONE_FAILURE,
    data,
  };
}




export function addTaskSheduleTaskRequest(data) {
  return {
    type: ADD_TASK_REQUEST,
    data,
  };
}
export function addTaskSheduleTaskSuccess(data) {
  return {
    type: ADD_TASK_SUCCESS,
    data,
  };
}
export function addTaskSheduleTaskFailure(error) {
  return {
    type: ADD_TASK_FAILURE,
    error,
  };
}

//

export function addFarmTaskCommentRequest(data) {
  return {
    type: ADD_FARM_TASKS_COMMENTS_REQUEST,
    data,
  };
}
export function addFarmTaskCommentSuccess(data) {
  return {
    type: ADD_FARM_TASKS_COMMENTS_SUCCESS,
    data,
  };
}
export function addFarmTaskCommentFailure(error) {
  return {
    type: ADD_FARM_TASKS_COMMENTS_FAILURE,
    error,
  };
}
//
export function addFarmDashboardZoneRequest(data) {
  return {
    type: ADD_FARM_DASHBOARD_ZONE_REQUEST,
    data,
  };
}
export function addFarmDashboardZoneSuccess(data) {
  return {
    type: ADD_FARM_DASHBOARD_ZONE_SUCCESS,
    data,
  };
}
export function addFarmDashboardZoneFailure(error) {
  return {
    type: ADD_FARM_DASHBOARD_ZONE_FAILURE,
    error,
  };
}
//

export function updateFarmDashboardZoneRequest(data) {
  return {
      type: UPDATE_FARM_DASHBOARD_ZONE_REQUEST,
      data
  };
}
export function updateFarmDashboardZoneSuccess(data) {
  return {
      type: UPDATE_FARM_DASHBOARD_ZONE_SUCCESS,
      data
  };
}
export function updateFarmDashboardZoneFailure(error) {
  return {
      type: UPDATE_FARM_DASHBOARD_ZONE_FAILURE,
      error
  };
}
//

export function deleteFarmDashboardZoneRequest(data) {
  return {
      type: DELETE_FARM_DASHBOARD_ZONE_REQUEST,
      data
  };
}
export function deleteFarmDashboardZoneSuccess(data) {
  return {
      type: DELETE_FARM_DASHBOARD_ZONE_SUCCESS,
      data
  };
}
export function deleteFarmDashboardZoneFailure(error) {
  return {
      type: DELETE_FARM_DASHBOARD_ZONE_FAILURE,
      error
  };
}

//
export function fetchAllUserZoneSensorRequest(data) {
  return {
    type: FETCH_ALL_USER_ZONE_SENSORS_REQUEST,
    data,
  };
}
export function fetchAllUserZoneSensorSuccess(data) {
  return {
    type: FETCH_ALL_USER_ZONE_SENSORS_SUCCESS,
    data,
  };
}
export function fetchAllUserZoneSensorFailure(data) {
  return {
    type: FETCH_ALL_USER_ZONE_SENSORS_FAILURE,
    data,
  };
}

