import { call, all, put, takeLatest } from "redux-saga/effects";
import { callfetchFarmZoneDetails,callFetchDashboardFarmZoneList,callFetchFarmDashboardZoneHarvestList,callAddFarmDashboardZoneTask,callAddFarmDashboardZoneTaskComment,callfetchRecenzoneSensorData} from "../utils/api";
import {
    fetchFarmZoneSuccess,
    fetchFarmZoneFailure,
    fetchFarmZoneDashboardSuccess,
    fetchFarmZoneDashboardFailure,
    fetchFarmZoneDashboardHarvestSuccess,
    fetchFarmZoneDashboardHarvestFailure,
    addFarmDashboardZoneTaskSuccess,
    addFarmDashboardZoneTaskFailure,
    addFarmDashboardZoneTaskCommentSuccess,
    addFarmDashboardZoneTaskCommentFailure,
    getRecentZoneSensorDataFailure,
    getRecentZoneSensorDataRequest,
    getRecentZoneSensorDataSuccess
} from "../actions/zone";

export function* fetchFarmZoneList({ data }) {
  let responseData = yield call(callfetchFarmZoneDetails, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchFarmZoneSuccess(responseData.data.data));
  } else {
    yield put(fetchFarmZoneFailure("Something went wrong"));
  }
}

export function* fetchFarmZoneDashboardList({ data }) {
  let responseData = yield call(callFetchDashboardFarmZoneList, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchFarmZoneDashboardSuccess(responseData.data.data));
  } else {
    yield put(fetchFarmZoneDashboardFailure("Something went wrong"));
  }
}

export function* fetchFarmZoneDashboardHarvestList({ data }) {
  let responseData = yield call(callFetchFarmDashboardZoneHarvestList, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchFarmZoneDashboardHarvestSuccess(responseData.data.data));
  } else {
    yield put(fetchFarmZoneDashboardHarvestFailure("Something went wrong"));
  }
}

export function* addFarmDashboardZoneTask({ data }) {
  let responseData = yield call(callAddFarmDashboardZoneTask, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(addFarmDashboardZoneTaskSuccess(responseData.data.data));
  } else {
    yield put(addFarmDashboardZoneTaskFailure("Something went wrong"));
  }
}

export function* addFarmDashboardZoneComment( {data} ) {
  let responseData = yield call(callAddFarmDashboardZoneTaskComment, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(addFarmDashboardZoneTaskCommentSuccess(responseData.data.data));
  } else {
    yield put(addFarmDashboardZoneTaskCommentFailure("Something went wrong"));
  }
}
export function* fetchRecentZoneSensorData({ data }) {
  let responseData = yield call(callfetchRecenzoneSensorData, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(getRecentZoneSensorDataSuccess(responseData.data.data));
  } else {
    yield put(getRecentZoneSensorDataFailure("Something went wrong"));
  }
}

export function* zoneSagas() {
  yield all([
    takeLatest("FETCH_ALL_FARM_ZONE_REQUEST", fetchFarmZoneList),
    takeLatest("FETCH_ALL_FARM_ZONE_DASHBOARD_REQUEST", fetchFarmZoneDashboardList),
    takeLatest("FETCH_ALL_FARM_ZONE_DASHBOARD_HARVEST_REQUEST", fetchFarmZoneDashboardHarvestList),
    takeLatest("ADD_FARM_DASHBOARD_ZONE_TASK_REQUEST", addFarmDashboardZoneTask),
    takeLatest("ADD_FARM_DASHOBARD_ZONE_TASKS_COMMENT_REQUEST", addFarmDashboardZoneComment),
    takeLatest("FETCH_RECENT_ZONE_SENSOR_DATA_REQUEST", fetchRecentZoneSensorData),
 ]);
}
export default [zoneSagas];
