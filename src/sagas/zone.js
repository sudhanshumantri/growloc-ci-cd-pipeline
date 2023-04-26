import { call, all, put, takeLatest } from "redux-saga/effects";
import { callfetchFarmZoneDetails,callFetchDashboardFarmZoneList,callFetchFarmDashboardZoneHarvestList,callAddFarmDashboardZoneTask,callAddFarmDashboardZoneTaskComment,callfetchRecenzoneSensorData,callFetchZoneDashboardZoneInfoList,callfetchZoneDashobardZoneCropSchedulekDetails,callfetchZoneDashobardZoneTaskDetails,callfetchZoneDashobardZoneSensorsDetails,callFetchDashboardFarmZoneUtilizationCrops,callFetchDashboardFarmZoneUtilizationStages,callfetchZoneTaskDetails,callAddZoneTaskComment,callfetchFarmZoneSensorDetails
} from "../utils/api";
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
    getRecentZoneSensorDataSuccess,
    fetchFarmDashboardZoneInfoSuccess,
    fetchFarmDashboardZoneInfoFailure,
    fetchZoneDashboardZoneCropScheduleSuccess,
    fetchZoneDashboardZoneCropScheduleFailure,
    fetchZoneDashboardZoneTakScheduleSuccess,
    fetchZoneDashboardZoneTaskScheduleFailure,
    fetchZoneDashboardZoneSensorSuccess,
    fetchZoneDashboardZoneSensorFailure,
    fetchZoneDashboardZoneUtilizationCropsSuccess,
    fetchZoneDashboardZoneUtilizationCropsFailure,
    fetchZoneDashboardZoneUtilizationStagesSuccess,
    fetchZoneDashboardZoneUtilizationStagesFailure,
    fetchZoneTaskSuccess,
    fetchZoneTaskFailure,
    addZoneTaskCommentSuccess,
    addZoneTaskCommentFailure,
    fetchFarmZoneSensorDataSuccess,
    fetchFarmZoneSensorDataFailure
  } from "../actions/zone";
import { addNotification } from "../components/shared/notification";

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
    addNotification("Task sucessfully created", 5000,true, "success");
    yield put(addFarmDashboardZoneTaskSuccess(responseData.data.data));
  } else {
    addNotification("Something went wrong", 5000,true, "danger");
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

export function* fetchZoneDashboardZoneInfoList({ data }) {
  let responseData = yield call(callFetchZoneDashboardZoneInfoList, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchFarmDashboardZoneInfoSuccess(responseData.data.data));
  } else {
    yield put(fetchFarmDashboardZoneInfoFailure("Something went wrong"));
  }
}

export function* fetchZoneDashboardZoneCropScheduleList({ data }) {
  const {zoneId, queryParams} = data;
  let responseData = yield call(callfetchZoneDashobardZoneCropSchedulekDetails, zoneId, queryParams);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchZoneDashboardZoneCropScheduleSuccess(responseData.data.data));
  } else {
    yield put(fetchZoneDashboardZoneCropScheduleFailure("Something went wrong"));
  }
}
export function* fetchZoneDashboardZoneTaskScheduleList({ data }) {
  const {zoneId, queryParams} = data;
  let responseData = yield call(callfetchZoneDashobardZoneTaskDetails, zoneId, queryParams);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchZoneDashboardZoneTakScheduleSuccess(responseData.data.data));
  } else {
    yield put(fetchZoneDashboardZoneTaskScheduleFailure("Something went wrong"));
  }
}

export function* fetchZoneDashboardZoneSensorScheduleList({ data }) {
  let responseData = yield call(callfetchZoneDashobardZoneSensorsDetails,data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchZoneDashboardZoneSensorSuccess(responseData.data.data));
  } else {
    yield put(fetchZoneDashboardZoneSensorFailure("Something went wrong"));
  }
}

export function* fetchZoneDashboardZoneUtilizationCropsList({ data }) {
  
  let responseData = yield call(callFetchDashboardFarmZoneUtilizationCrops, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchZoneDashboardZoneUtilizationCropsSuccess(responseData.data.data));
  } else {
    yield put(fetchZoneDashboardZoneUtilizationCropsFailure("Something went wrong"));
  }
}

export function* fetchZoneDashboardZoneUtilizationStagesList({ data }) {
  let responseData = yield call(callFetchDashboardFarmZoneUtilizationStages, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchZoneDashboardZoneUtilizationStagesSuccess(responseData.data.data));
  } else {
    yield put(fetchZoneDashboardZoneUtilizationStagesFailure("Something went wrong"));
  }
}
// tasks 
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

//
export function* fetchFarmZoneSensorDataList({ data }) {
  const {...remaingData} = data;
  let responseData = yield call(callfetchFarmZoneSensorDetails, remaingData);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchFarmZoneSensorDataSuccess(responseData.data.data));
  } else {
    yield put(fetchFarmZoneSensorDataFailure("Something went wrong"));
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
    takeLatest("FETCH_ZONE_DASHBOARD_ZONE_INFO_REQUEST", fetchZoneDashboardZoneInfoList),
    takeLatest("FETCH_ZONE_DASHBOARD_CROP_SCHEDULES_REQUEST", fetchZoneDashboardZoneCropScheduleList),
    takeLatest("FETCH_ZONE_DASHBOARD_ZONE_TASK_SCHEDULES_REQUEST", fetchZoneDashboardZoneTaskScheduleList),
    takeLatest("FETCH_ZONE_DASHBOARD_ZONE_SENSOR_REQUEST", fetchZoneDashboardZoneSensorScheduleList),
    takeLatest("FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_CROP_REQUEST", fetchZoneDashboardZoneUtilizationCropsList),
    takeLatest("FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_STAGES_REQUEST", fetchZoneDashboardZoneUtilizationStagesList),
    takeLatest("FETCH_ALL_ZONE_TASKS_REQUEST", fetchZoneTaskList),
    takeLatest("ADD_ZONE_TASK_COMMENT_REQUEST", addZoneTaskComment),
    takeLatest("FETCH_FARM_ZONE_SENSOR_DATA_REQUEST", fetchFarmZoneSensorDataList),

 ]);
}
export default [zoneSagas];
