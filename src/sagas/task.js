import { call, all, put, takeLatest } from "redux-saga/effects";
import {callfetchFarmTaskDetails,callAddTaskComment} from "../utils/api";
import {
    fetchFarmTaskSuccess,
    fetchFarmTaskFailure,
    addTaskCommentSuccess,
    addTaskCommentFailure,
} from "../actions/task";
export function* fetchFarmTaskList({ data }) {
  let responseData = yield call(callfetchFarmTaskDetails, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchFarmTaskSuccess(responseData.data.data));
  } else {
    yield put(fetchFarmTaskFailure("Something went wrong"));
  }
}

export function* addTaskComment( {data} ) {
  let responseData = yield call(callAddTaskComment, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(addTaskCommentSuccess(responseData.data.data));
  } else {
    yield put(addTaskCommentFailure("Something went wrong"));
  }
}

export function* taskSagas() {
    yield all([
      takeLatest("FETCH_ALL_FARM_TASKS_REQUEST", fetchFarmTaskList),
      takeLatest("ADD_TASKS_COMMENTS_REQUEST", addTaskComment),

   ]);
  }
  export default [taskSagas];
  
