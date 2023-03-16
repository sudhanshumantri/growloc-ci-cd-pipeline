import { call, all, put, takeLatest } from "redux-saga/effects";
import { callfetchFarmReportsDetails,} from "../utils/api";
import {
    fetchFarmReportsSuccess,
    fetchFarmReportsFailure,
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
export function* reportsSagas() {
  yield all([
    takeLatest("FETCH_ALL_FARM_REPORTS_DATA_REQUEST", fetchFarmReportsList),
 ]);
}
export default [reportsSagas];
