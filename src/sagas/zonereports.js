import { call, all, put, takeLatest } from "redux-saga/effects";
import { callfetchZoneReportsDetails,} from "../utils/api";
import {
    fetchZoneReportsSuccess,
    fetchZoneReportsFailure,
} from "../actions/zonereports";

export function* fetchZoneReportsList({ data }) {
  console.log(data,"data");
  let responseData = yield call(callfetchZoneReportsDetails, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchZoneReportsSuccess(responseData.data.data));
  } else {
    yield put(fetchZoneReportsFailure("Something went wrong"));
  }
}
export function* zoneReportsSagas() {
  yield all([
    takeLatest("FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_REQUEST", fetchZoneReportsList),
 ]);
}
export default [zoneReportsSagas];
