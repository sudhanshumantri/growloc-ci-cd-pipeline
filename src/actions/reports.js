import {
  FETCH_ALL_FARM_REPORTS_DATA_REQUEST,
  FETCH_ALL_FARM_REPORTS_DATA_SUCCESS,
  FETCH_ALL_FARM_REPORTS_DATA_FAILURE,
  FETCH_FARM_REPORTS_FARM_AVERAGE_MORTALITY_REQUEST,
  FETCH_FARM_REPORTS_FARM_AVERAGE_MORTALITY_SUCCESS,
  FETCH_FARM_REPORTS_FARM_AVERAGE_MORTALITY_FAILURE,
  FETCH_FARM_REPORTS_FARM_TAT_TASK_CATEGORIES_REQUEST,
  FETCH_FARM_REPORTS_FARM_TAT_TASK_CATEGORIES_SUCCESS,
  FETCH_FARM_REPORTS_FARM_TAT_TASK_CATEGORIES_FAILURE
} from './actionTypes'

export function fetchFarmReportsRequest (data) {
  return {
    type: FETCH_ALL_FARM_REPORTS_DATA_REQUEST,
    data
  }
}
export function fetchFarmReportsSuccess (data) {
  return {
    type: FETCH_ALL_FARM_REPORTS_DATA_SUCCESS,
    data
  }
}
export function fetchFarmReportsFailure (error) {
  return {
    type: FETCH_ALL_FARM_REPORTS_DATA_FAILURE,
    error
  }
}
export function fetchFarmReportsFarmAverageMortalityRequest (data) {
  return {
    type: FETCH_FARM_REPORTS_FARM_AVERAGE_MORTALITY_REQUEST,
    data
  }
}
export function fetchFarmReportsFarmAverageMortalitySuccess (data) {
  return {
    type: FETCH_FARM_REPORTS_FARM_AVERAGE_MORTALITY_SUCCESS,
    data
  }
}
export function fetchFarmReportsFarmAverageMortalityFailure (error) {
  return {
    type: FETCH_FARM_REPORTS_FARM_AVERAGE_MORTALITY_FAILURE,
    error
  }
}
export function fetchFarmReportsFarmTatTaskCategoriesRequest (data) {
  return {
    type: FETCH_FARM_REPORTS_FARM_TAT_TASK_CATEGORIES_REQUEST,
    data
  }
}
export function fetchFarmReportsFarmTatTaskCategoriesSuccess (data) {
  return {
    type: FETCH_FARM_REPORTS_FARM_TAT_TASK_CATEGORIES_SUCCESS,
    data
  }
}
export function fetchFarmReportsFarmTatTaskCategoriesFailure (error) {
  return {
    type: FETCH_FARM_REPORTS_FARM_TAT_TASK_CATEGORIES_FAILURE,
    error
  }
}
