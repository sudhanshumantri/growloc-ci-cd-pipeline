import {
    FETCH_ALL_DASHBOARD_FARM_REQUEST,
    FETCH_ALL_DASHBOARD_FARM_SUCCESS,
    FETCH_ALL_DASHBOARD_FARM_FAILURE,
    FETCH_ALL_DASHBOARD_HARVEST_REQUEST,
    FETCH_ALL_DASHBOARD_HARVEST_SUCCESS,
    FETCH_ALL_DASHBOARD_HARVEST_FAILURE,
   
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
//
export function fetchDashboardHarvestRequest(data) {
    return {
        type: FETCH_ALL_DASHBOARD_HARVEST_REQUEST,
        data
    };
}
export function fetchDashboardHarvestSuccess(data) {
    return {
        type: FETCH_ALL_DASHBOARD_HARVEST_SUCCESS,
        data
    };
}
export function fetchDashboardHarvestFailure(data) {
    return {
        type: FETCH_ALL_DASHBOARD_HARVEST_FAILURE,
        data
    };
}
