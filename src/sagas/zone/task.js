import { call, all, put, takeLatest } from "redux-saga/effects";
import {callfetchZoneTaskDetails,callAddZoneTaskComment} from "../../utils/api";
import {
    fetchZoneTaskSuccess,
    fetchZoneTaskFailure,
    addZoneTaskCommentSuccess,
    addZoneTaskCommentFailure,
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

export function* addZoneTaskComment( {data} ) {
  let responseData = yield call(callAddZoneTaskComment, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(addZoneTaskCommentSuccess(responseData.data.data));
  } else {
    yield put(addZoneTaskCommentFailure("Something went wrong"));
  }
}

export function* zoneTaskSagas() {
    yield all([
      takeLatest("FETCH_ALL_ZONE_TASKS_REQUEST", fetchZoneTaskList),
      takeLatest("ADD_ZONE_TASK_COMMENT_REQUEST", addZoneTaskComment),

   ]);
  }
  export default [zoneTaskSagas];
  
