import {
  FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_REQUEST,
  FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_SUCCESS,
  FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_FAILURE,
  FETCH_FARM_REPORTS_ZONE_AVERAGE_MORTALITY_REQUEST,
  FETCH_FARM_REPORTS_ZONE_AVERAGE_MORTALITY_SUCCESS,
  FETCH_FARM_REPORTS_ZONE_AVERAGE_MORTALITY_FAILURE,
  FETCH_FARM_REPORTS_ZONE_TAT_TASK_CATEGORIES_REQUEST,
  FETCH_FARM_REPORTS_ZONE_TAT_TASK_CATEGORIES_SUCCESS,
  FETCH_FARM_REPORTS_ZONE_TAT_TASK_CATEGORIES_FAILURE
} from './actionTypes'

export function fetchZoneReportsRequest (data) {
  return {
    type: FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_REQUEST,
    data
  }
}
export function fetchZoneReportsSuccess (data) {
  return {
    type: FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_SUCCESS,
    data
  }
}
export function fetchZoneReportsFailure (error) {
  return {
    type: FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_FAILURE,
    error
  }
}
export function fetchFarmReportsZoneAverageMortalityRequest (data) {
  return {
    type: FETCH_FARM_REPORTS_ZONE_AVERAGE_MORTALITY_REQUEST,
    data
  }
}
export function fetchFarmReportsZoneAverageMortalitySuccess (data) {
  return {
    type: FETCH_FARM_REPORTS_ZONE_AVERAGE_MORTALITY_SUCCESS,
    data
  }
}
export function fetchFarmReportsZoneAverageMortalityFailure (error) {
  return {
    type: FETCH_FARM_REPORTS_ZONE_AVERAGE_MORTALITY_FAILURE,
    error
  }
}
export function fetchFarmReportsZoneTatTaskCategoriesRequest (data) {
  return {
    type: FETCH_FARM_REPORTS_ZONE_TAT_TASK_CATEGORIES_REQUEST,
    data
  }
}
export function fetchFarmReportsZoneTatTaskCategoriesSuccess (data) {
  return {
    type: FETCH_FARM_REPORTS_ZONE_TAT_TASK_CATEGORIES_SUCCESS,
    data
  }
}
export function fetchFarmReportsZoneTatTaskCategoriesFailure (error) {
  return {
    type: FETCH_FARM_REPORTS_ZONE_TAT_TASK_CATEGORIES_FAILURE,
    error
  }
}
