import { call, all, put, takeLatest } from "redux-saga/effects";
import {callfetchZoneTaskDetails} from "../../utils/api";
import {
    fetchZoneTaskSuccess,
    fetchZoneTaskFailure
} from "../../actions/zone/task";
export function* fetchZoneTaskList({ data }) {
  const {zoneId, queryParams} = data;
  let responseData = yield call(callfetchZoneTaskDetails, zoneId, queryParams);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchZoneTaskSuccess(responseData.data.data));
  } else {
    yield put(fetchZoneTaskFailure("Something went wrong"));
  }
}

export function* zoneTaskSagas() {
    yield all([
      takeLatest("FETCH_ALL_ZONE_TASKS_REQUEST", fetchZoneTaskList),
   ]);
  }
  export default [zoneTaskSagas];
  
