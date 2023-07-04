import {
  FETCH_ALL_ADMIN_DASHBOARD_REQUEST,
  FETCH_ALL_ADMIN_DASHBOARD_SUCCESS,
  FETCH_ALL_ADMIN_DASHBOARD_FAILURE,
  ADD_ADMIN_ZONE_SENSORS_REQUEST,
  ADD_ADMIN_ZONE_SENSORS_SUCCESS,
  ADD_ADMIN_ZONE_SENSORS_FAILURE,
  DELETE_ADMIN_ZONE_SENSORS_REQUEST,
  DELETE_ADMIN_ZONE_SENSORS_SUCCESS,
  DELETE_ADMIN_ZONE_SENSORS_FAILURE
} from './actionTypes'
export function fetchAdminDashboardRequest (data) {
  return {
    type: FETCH_ALL_ADMIN_DASHBOARD_REQUEST,
    data
  }
}
export function fetchAdminDashboardSuccess (data) {
  return {
    type: FETCH_ALL_ADMIN_DASHBOARD_SUCCESS,
    data
  }
}
export function fetchAdminDashboardFailure (data) {
  return {
    type: FETCH_ALL_ADMIN_DASHBOARD_FAILURE,
    data
  }
}
export function addAdminZoneSensorsRequest (data) {
  return {
    type: ADD_ADMIN_ZONE_SENSORS_REQUEST,
    data
  }
}
export function addAdminZoneSensorsSuccess (data) {
  return {
    type: ADD_ADMIN_ZONE_SENSORS_SUCCESS,
    data
  }
}
export function addAdminZoneSensorsFailure (error) {
  return {
    type: ADD_ADMIN_ZONE_SENSORS_FAILURE,
    error
  }
}
export function deleteAdminZoneSensorsRequest (data) {
  return {
    type: DELETE_ADMIN_ZONE_SENSORS_REQUEST,
    data
  }
}
export function deleteAdminZoneSensorsSuccess (data) {
  return {
    type: DELETE_ADMIN_ZONE_SENSORS_SUCCESS,
    data
  }
}
export function deleteAdminZoneSensorsFailure (error) {
  return {
    type: DELETE_ADMIN_ZONE_SENSORS_FAILURE,
    error
  }
}
