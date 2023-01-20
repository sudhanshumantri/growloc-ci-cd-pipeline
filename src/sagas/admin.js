import { call, all, put, takeLatest } from "redux-saga/effects";
import store, { browserHistory } from '../store';
import { addNotification } from "../components/shared/notification";
import {
    callFetchAdminList,
  
} from "../utils/api";
import {
    fetchAdminDashboardSuccess,
    fetchAdminDashboardFailure,
} from "../actions/admin";

export function* fetchAdminList({ data }) {
  let responseData = yield call(callFetchAdminList, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchAdminDashboardSuccess(responseData.data.data));
  } else {
    yield put(fetchAdminDashboardFailure("Something went wrong"));
  }
}

export function* adminSagas() {
    yield all([
      takeLatest("FETCH_ALL_ADMIN_DASHBOARD_REQUEST", fetchAdminList),
     
    ]);
  }
  export default [adminSagas];
  