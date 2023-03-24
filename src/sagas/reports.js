import { call, all, put, takeLatest } from "redux-saga/effects";
import { callfetchFarmReportsDetails,callFetchDashboardFarmReportsFarmAverageMortality,callFetchDashboardFarmTatTaskCategories} from "../utils/api";
import {
    fetchFarmReportsSuccess,
    fetchFarmReportsFailure,
    fetchFarmReportsFarmAverageMortalitySuccess,
    fetchFarmReportsFarmAverageMortalityFailure,
} from "../actions/reports";

export function* fetchFarmReportsList({ data }) {
  console.log(data,"data");
  let responseData = yield call(callfetchFarmReportsDetails, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchFarmReportsSuccess(responseData.data.data));
  } else {
    yield put(fetchFarmReportsFailure("Something went wrong"));
  }
}
export function* fetchFarmReportsFarmAverageMortality({ data }) {
  console.log(data,"data");
  let responseData = yield call(callFetchDashboardFarmReportsFarmAverageMortality, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchFarmReportsFarmAverageMortalitySuccess(responseData.data.data));
  } else {
    yield put(fetchFarmReportsFarmAverageMortalityFailure("Something went wrong"));
  }
}

export function* fetchFarmReportsFarmTatTaskCategories({ data }) {
  console.log(data,"data");
  let responseData = yield call(callFetchDashboardFarmTatTaskCategories, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchFarmReportsFarmAverageMortalitySuccess(responseData.data.data));
  } else {
    yield put(fetchFarmReportsFarmAverageMortalityFailure("Something went wrong"));
  }
}


export function* reportsSagas() {
  yield all([
    takeLatest("FETCH_ALL_FARM_REPORTS_DATA_REQUEST", fetchFarmReportsList),
    takeLatest("FETCH_FARM_REPORTS_FARM_AVERAGE_MORTALITY_REQUEST", fetchFarmReportsFarmAverageMortality),
    takeLatest("FETCH_FARM_REPORTS_FARM_TAT_TASK_CATEGORIES_REQUEST", fetchFarmReportsFarmTatTaskCategories),


 ]);
}
export default [reportsSagas];
