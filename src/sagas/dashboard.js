import { call, all, put, takeLatest } from "redux-saga/effects";
import {
    callFetchDashboardFarmList
} from "../utils/api";
import {
    fetchDashboardFarmSuccess,
    fetchDashboardFarmFailure,
} from "../actions/dashboard";
export function* fetchFarmDashboardList({ data }) {
    console.log("hello", data);

    let responseData = yield call(callFetchDashboardFarmList, data);
    if (responseData?.status == 200 && responseData.data.status) {
        yield put(fetchDashboardFarmSuccess(responseData.data.data));

    } else {
        yield put(fetchDashboardFarmFailure("Something went wrong"));
    }
}
export function* farmDashboardSagas() {
    yield all([
      takeLatest("FETCH_ALL_DASHBOARD_FARM_REQUEST", fetchFarmDashboardList),
      
    ]);
  }
  export default [farmDashboardSagas];
  

