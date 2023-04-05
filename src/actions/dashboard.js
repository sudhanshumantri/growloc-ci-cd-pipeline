import {

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
  FETCH_ALL_USER_ZONE_SENSORS_FAILURE,
  FETCH_FARM_DASHBOARD_FARM_INFO_REQUEST,
  FETCH_FARM_DASHBOARD_FARM_INFO_SUCCESS,
  FETCH_FARM_DASHBOARD_FARM_INFO_FAILURE,
  FETCH_FARM_DASHBOARD_CROP_SCHEDULES_REQUEST,
  FETCH_FARM_DASHBOARD_CROP_SCHEDULES_SUCCESS,
  FETCH_FARM_DASHBOARD_CROP_SCHEDULES_FAILURE,
  FETCH_FARM_DASHBOARD_INFO_REQUEST,
  FETCH_FARM_DASHBOARD_INFO_SUCCESS,
  FETCH_FARM_DASHBOARD_INFO_FAILURE,
  FETCH_FARM_DASHBOARD_TASK_REQUEST,
  FETCH_FARM_DASHBOARD_TASK_SUCCESS,
  FETCH_FARM_DASHBOARD_TASK_FAILURE,
  FETCH_FARM_DASHBOARD_FARM_UTILIZATION_CROP_REQUEST,
  FETCH_FARM_DASHBOARD_FARM_UTILIZATION_CROP_SUCCESS,
  FETCH_FARM_DASHBOARD_FARM_UTILIZATION_CROP_FAILURE,
  FETCH_FARM_DASHBOARD_FARM_UTILIZATION_STAGES_REQUEST,
  FETCH_FARM_DASHBOARD_FARM_UTILIZATION_STAGES_SUCCESS,
  FETCH_FARM_DASHBOARD_FARM_UTILIZATION_STAGES_FAILURE,
} from "./actionTypes";

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
// dashboard new api

export function fetchDashboardFarmInfoRequest(data) {
  return {
    type: FETCH_FARM_DASHBOARD_FARM_INFO_REQUEST,
    data,
  };
}
export function fetchDashboardFarmInfoSuccess(data) {
  return {
    type: FETCH_FARM_DASHBOARD_FARM_INFO_SUCCESS,
    data,
  };
}
export function fetchDashboardFarmInfoFailure(data) {
  return {
    type: FETCH_FARM_DASHBOARD_FARM_INFO_FAILURE,
    data,
  };
}
//crop schedules 


export function fetchFarmCropSchedulesRequest(data) {
  return {
    type: FETCH_FARM_DASHBOARD_CROP_SCHEDULES_REQUEST,
    data
  };
}
export function fetchFarmCropSchedulesSuccess(data) {
  return {
    type: FETCH_FARM_DASHBOARD_CROP_SCHEDULES_SUCCESS,
    data,
  };
}
export function fetchFarmCropSchedulesFailure(error) {
  return {
    type: FETCH_FARM_DASHBOARD_CROP_SCHEDULES_FAILURE,
    error,
  };
}

export function fetchFarmDashboardInfoRequest(data) {
  return {
    type: FETCH_FARM_DASHBOARD_INFO_REQUEST,
    data
  };
}
export function fetchFarmDashboardInfoSuccess(data) {
  return {
    type: FETCH_FARM_DASHBOARD_INFO_SUCCESS,
    data,
  };
}
export function fetchFarmDashboardInfoFailure(error) {
  return {
    type: FETCH_FARM_DASHBOARD_INFO_FAILURE,
    error,
  };
}


export function fetchFarmDashboardTaskRequest(data) {
  return {
    type: FETCH_FARM_DASHBOARD_TASK_REQUEST,
    data
  };
}
export function fetchFarmDashboardTaskSuccess(data) {
  return {
    type: FETCH_FARM_DASHBOARD_TASK_SUCCESS,
    data,
  };
}
export function fetchFarmDashboardTaskFailure(error) {
  return {
    type: FETCH_FARM_DASHBOARD_TASK_FAILURE,
    error,
  };
}

//

export function fetchFarmDashboardUtilizationCropsRequest(data) {
  return {
    type: FETCH_FARM_DASHBOARD_FARM_UTILIZATION_CROP_REQUEST,
    data
  };
}
export function fetchFarmDashboardUtilizationCropsSuccess(data) {
  return {
    type: FETCH_FARM_DASHBOARD_FARM_UTILIZATION_CROP_SUCCESS,
    data,
  };
}
export function fetchFarmDashboardUtilizationCropsFailure(error) {
  return {
    type: FETCH_FARM_DASHBOARD_FARM_UTILIZATION_CROP_FAILURE,
    error,
  };
}
//
export function fetchFarmDashboardUtilizationStagesRequest(data) {
  return {
    type: FETCH_FARM_DASHBOARD_FARM_UTILIZATION_STAGES_REQUEST,
    data
  };
}
export function fetchFarmDashboardUtilizationStagesSuccess(data) {
  return {
    type: FETCH_FARM_DASHBOARD_FARM_UTILIZATION_STAGES_SUCCESS,
    data,
  };
}
export function fetchFarmDashboardUtilizationStagesFailure(error) {
  return {
    type: FETCH_FARM_DASHBOARD_FARM_UTILIZATION_STAGES_FAILURE,
    error,
  };
}



