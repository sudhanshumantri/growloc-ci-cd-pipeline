import { call, all, put, takeLatest } from "redux-saga/effects";
import {
  callFetchDashboardFarmList,
  callFetchDashboardHarvestList,
  callAddTaskScheduleTask,
  callAddFarmTaskComment,
} from "../utils/api";
import {
  fetchDashboardFarmSuccess,
  fetchDashboardFarmFailure,
  fetchDashboardHarvestSuccess,
  fetchDashboardHarvestFailure,
  addTaskSheduleTaskSuccess,
  addTaskSheduleTaskFailure,
  addFarmTaskCommentSuccess,
  addFarmTaskCommentFailure
} from "../actions/dashboard";

export function* fetchFarmDashboardList({ data }) {
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

export function* addTaskScheduleTask({ data }) {
  let responseData = yield call(callAddTaskScheduleTask, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(addTaskSheduleTaskSuccess(responseData.data.data));
  } else {
    yield put(addTaskSheduleTaskFailure("Something went wrong"));
  }
}

export function* addFarmTaskComment( {data} ) {
  let responseData = yield call(callAddFarmTaskComment, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(addFarmTaskCommentSuccess(responseData.data.data));
  } else {
    yield put(addFarmTaskCommentFailure("Something went wrong"));
  }
}

export function* farmDashboardSagas() {
  yield all([
    takeLatest("FETCH_ALL_DASHBOARD_FARM_REQUEST", fetchFarmDashboardList),
    takeLatest("FETCH_ALL_DASHBOARD_HARVEST_REQUEST", fetchFarmDashboardHarvestList),
    takeLatest("ADD_TASK_REQUEST", addTaskScheduleTask),
    takeLatest("ADD_FARM_TASKS_COMMENTS_REQUEST", addFarmTaskComment),
  ]);
}
export default [farmDashboardSagas];


