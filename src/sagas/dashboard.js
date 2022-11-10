import { call, all, put, takeLatest } from "redux-saga/effects";
import {
    callFetchDashboardFarmList,
    callFetchDashboardHarvestList,
} from "../utils/api";
import {
    fetchDashboardFarmSuccess,
    fetchDashboardFarmFailure,
    fetchDashboardHarvestSuccess,
    fetchDashboardHarvestFailure,
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

export function* fetchFarmDashboardHarvestList({ data }) {
    let responseData = yield call(callFetchDashboardHarvestList, data);
    if (responseData?.status == 200 && responseData.data.status) {
        yield put(fetchDashboardHarvestSuccess(responseData.data.data));
    } else {
        yield put(fetchDashboardHarvestFailure("Something went wrong"));
    }
}

export function* farmDashboardSagas() {
    yield all([
      takeLatest("FETCH_ALL_DASHBOARD_FARM_REQUEST", fetchFarmDashboardList),
      takeLatest("FETCH_ALL_DASHBOARD_HARVEST_REQUEST", fetchFarmDashboardHarvestList),
    ]);
  }
  export default [farmDashboardSagas];
  

