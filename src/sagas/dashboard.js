import { call, all, put, takeLatest } from "redux-saga/effects";
import {
  callFetchDashboardFarmList,
  callFetchDashboardHarvestList,
  callAddTaskScheduleTask,
  callAddFarmTaskComment,
  callAddFarmDashboardZone,
  callFetchFarmDashboardZoneList,
  callUpdateFarmDashboardZoneList,
  callDeleteFarmDashboardZoneList
} from "../utils/api";
import {
  fetchDashboardFarmSuccess,
  fetchDashboardFarmFailure,
  fetchDashboardHarvestSuccess,
  fetchDashboardHarvestFailure,
  addTaskSheduleTaskSuccess,
  addTaskSheduleTaskFailure,
  addFarmTaskCommentSuccess,
  addFarmTaskCommentFailure,
  addFarmDashboardZoneSuccess,
  addFarmDashboardZoneFailure,
  fetchFarmDashboardZoneSuccess,
  fetchFarmDashboardZoneFailure,
  updateFarmDashboardZoneSuccess,
  updateFarmDashboardZoneFailure,
  deleteFarmDashboardZoneSuccess,
  deleteFarmDashboardZoneFailure,
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

export function* addFarmDashboardZone({ data }) {
  let responseData = yield call(callAddFarmDashboardZone, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(addFarmDashboardZoneSuccess(responseData.data.data));
  } else {
    yield put(addFarmDashboardZoneFailure("Something went wrong"));
  }
}

export function* fetchFarmDashboardZoneList({ data }) {
  let responseData = yield call(callFetchFarmDashboardZoneList, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchFarmDashboardZoneSuccess(responseData.data.data));
  } else {
    yield put(fetchFarmDashboardZoneFailure("Something went wrong"));
  }
}
//

export function* updateFarmDashboardZoneList({ data }) {
  const {payload, id} = data;
  let responseData = yield call(callUpdateFarmDashboardZoneList, payload, id);
  if (responseData?.status == 200) {
    yield put(updateFarmDashboardZoneSuccess(responseData.data));
  } else {
    yield put(updateFarmDashboardZoneFailure("Something went wrong"));
  }
}

export function* deleteFarmDashboardZoneList({ data }) {
  let responseData = yield call(callDeleteFarmDashboardZoneList, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(deleteFarmDashboardZoneSuccess(data));
  } else {
    yield put(deleteFarmDashboardZoneFailure("Something went wrong"));
  }
}



export function* farmDashboardSagas() {
  yield all([
    takeLatest("FETCH_ALL_DASHBOARD_FARM_REQUEST", fetchFarmDashboardList),
    takeLatest("FETCH_ALL_DASHBOARD_HARVEST_REQUEST", fetchFarmDashboardHarvestList),
    takeLatest("ADD_TASK_REQUEST", addTaskScheduleTask),
    takeLatest("ADD_FARM_TASKS_COMMENTS_REQUEST", addFarmTaskComment),
    takeLatest("ADD_FARM_DASHBOARD_ZONE_REQUEST", addFarmDashboardZone),
    takeLatest("FETCH_ALL_FARM_DASHBOARD_ZONE_REQUEST", fetchFarmDashboardZoneList),
    takeLatest("UPDATE_FARM_DASHBOARD_ZONE_REQUEST", updateFarmDashboardZoneList),
    takeLatest("DELETE_FARM_DASHBOARD_ZONE_REQUEST", deleteFarmDashboardZoneList),

  ]);
}
export default [farmDashboardSagas];


