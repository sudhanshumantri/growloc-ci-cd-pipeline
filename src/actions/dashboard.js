import {
    FETCH_ALL_DASHBOARD_FARM_REQUEST,
    FETCH_ALL_DASHBOARD_FARM_SUCCESS,
    FETCH_ALL_DASHBOARD_FARM_FAILURE,
   
    } from './actionTypes';
export function fetchDashboardFarmRequest(data) {
    return {
        type: FETCH_ALL_DASHBOARD_FARM_REQUEST,
        data
    };
}
export function fetchDashboardFarmSuccess(data) {
    return {
        type: FETCH_ALL_DASHBOARD_FARM_SUCCESS,
        data
    };
}
export function fetchDashboardFarmFailure(data) {
    return {
        type: FETCH_ALL_DASHBOARD_FARM_FAILURE,
        data
    };
}
