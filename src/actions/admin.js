import {
    FETCH_ALL_ADMIN_DASHBOARD_REQUEST,
    FETCH_ALL_ADMIN_DASHBOARD_SUCCESS,
    FETCH_ALL_ADMIN_DASHBOARD_FAILURE
} from './actionTypes';

export function fetchAdminDashboardRequest(data) {
    return {
        type: FETCH_ALL_ADMIN_DASHBOARD_REQUEST,
        data
    };
}
export function fetchAdminDashboardSuccess(data) {
    return {
        type: FETCH_ALL_ADMIN_DASHBOARD_SUCCESS,
        data
    };
}
export function fetchAdminDashboardFailure(data) {
    return {
        type: FETCH_ALL_ADMIN_DASHBOARD_FAILURE,
        data
    };
}