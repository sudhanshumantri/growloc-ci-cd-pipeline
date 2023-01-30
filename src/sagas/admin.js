import { call, all, put, takeLatest } from "redux-saga/effects";
import store, { browserHistory } from '../store';
import { addNotification } from "../components/shared/notification";
import {
    callFetchAdminList,
    callAddAdminsensors,
    callDeleteAdminsensors,
} from "../utils/api";
import {
    fetchAdminDashboardSuccess,
    fetchAdminDashboardFailure,
    addAdminZoneSensorsSuccess,
    addAdminZoneSensorsFailure,
    deleteAdminZoneSensorsSuccess,
    deleteAdminZoneSensorsFailure,
    fetchAdminDashboardRequest
} from "../actions/admin";
export function* fetchAdminList({ data }) {
  let responseData = yield call(callFetchAdminList, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchAdminDashboardSuccess(responseData.data.data));
  } else {
    yield put(fetchAdminDashboardFailure("Something went wrong"));
  }
};
export function* deleteAdminZoneSensors({ data }) {
  let responseData = yield call(callDeleteAdminsensors, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchAdminDashboardRequest());
  } else {
    yield put(deleteAdminZoneSensorsFailure("Something went wrong"));
  }
};
export function* addAdminZoneSensors({ data }) {
  let responseData = yield call(callAddAdminsensors, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchAdminDashboardRequest());
 } else {
    yield put(addAdminZoneSensorsFailure("Something went wrong"));
  }
};
export function* adminSagas() {
    yield all([
      takeLatest("FETCH_ALL_ADMIN_DASHBOARD_REQUEST", fetchAdminList),
      takeLatest("ADD_ADMIN_ZONE_SENSORS_REQUEST", addAdminZoneSensors),
      takeLatest("DELETE_ADMIN_ZONE_SENSORS_REQUEST", deleteAdminZoneSensors),

    ]);
  }
  export default [adminSagas];
  