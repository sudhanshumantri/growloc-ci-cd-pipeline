import { call, all, put, takeLatest } from "redux-saga/effects";
import {
  callFetchDashboardHarvestList,
  callAddTaskScheduleTask,
  callAddFarmTaskComment,
  callAddFarmDashboardZone,
  callFetchFarmDashboardZoneList,
  callUpdateFarmDashboardZoneList,
  callDeleteFarmDashboardZoneList,
  callFetchAllUserZoneSensor,
  callFetchDashboardInfoFarmList,
  callfetchFarmDashobardCropSchedulekDetails,
  callFetchDashboardFarmInfo,
  callfetchFarmDashobardTaskDetails,
  callFetchDashboardFarmUtilizationCrops,
  callFetchDashboardFarmUtilizationStages,
  callfetchFarmDashboardZoneSensorDetails,
  callfetchFarmDashboardLattestZoneSensorDetails,
  callfetchFarmDashboardAllZoneSensorDetails
} from "../utils/api";
import {
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
  fetchAllUserZoneSensorSuccess,
  fetchAllUserZoneSensorFailure,
  fetchDashboardFarmInfoSuccess,
  fetchDashboardFarmInfoFailure,
  fetchFarmCropSchedulesSuccess,
  fetchFarmCropSchedulesFailure,
  fetchFarmDashboardInfoSuccess,
  fetchFarmDashboardInfoFailure,
  fetchFarmDashboardTaskSuccess,
  fetchFarmDashboardTaskFailure,
  fetchFarmDashboardUtilizationCropsSuccess,
  fetchFarmDashboardUtilizationCropsFailure,
  fetchFarmDashboardUtilizationStagesSuccess,
  fetchFarmDashboardUtilizationStagesFailure,
  fetchFarmDashboardZoneSensorSuccess,
  fetchFarmDashboardZoneSensorFailure,
  fetchDashboardFarmLattestSensorDataSuccess,
  fetchDashboardFarmLattestSensorDataFailure,
  fetchDashboardAllZoneDetailsSuccess,
  fetchDashboardAllZoneDetailsFailure
} from "../actions/dashboard";

export function* fetchFarmDashboardHarvestList({ data }) {
  const {queryParams, ...remainingParams} = data;
  let responseData = yield call(callFetchDashboardHarvestList, remainingParams, queryParams);
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
  const {farmId, queryParams} = data;
  let responseData = yield call(callFetchFarmDashboardZoneList, farmId, queryParams);
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

export function* fetchAllUserZoneSensor({ data }) {
  let responseData = yield call(callFetchAllUserZoneSensor, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchAllUserZoneSensorSuccess(responseData.data.data));
  } else {
    yield put(fetchAllUserZoneSensorFailure("Something went wrong"));
  }
}

// dashboard new API
export function* fetchFarmDashboardInfoList({ data }) {
  let responseData = yield call(callFetchDashboardInfoFarmList, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchDashboardFarmInfoSuccess(responseData.data.data));
  } else {
    yield put(fetchDashboardFarmInfoFailure("Something went wrong"));
  }
}

  export function* fetchFarmDashboardCropScheduleList({ data }) {
    const {farmId, queryParams} = data;
    let responseData = yield call(callfetchFarmDashobardCropSchedulekDetails, farmId, queryParams);
    if (responseData?.status == 200 && responseData.data.status) {
      yield put(fetchFarmCropSchedulesSuccess(responseData.data.data));
    } else {
      yield put(fetchFarmCropSchedulesFailure("Something went wrong"));
    }
  }

  export function* fetchFarmDashboardFarmInfoList({ data }) {
    let responseData = yield call(callFetchDashboardFarmInfo, data);
    if (responseData?.status == 200 && responseData.data.status) {
      yield put(fetchFarmDashboardInfoSuccess(responseData.data.data));
    } else {
      yield put(fetchFarmDashboardInfoFailure("Something went wrong"));
    }
  }
  //

  

  export function* fetchFarmDashboardTaskList({ data }) {
    const {farmId, queryParams} = data;
    let responseData = yield call(callfetchFarmDashobardTaskDetails, farmId, queryParams);
    if (responseData?.status == 200 && responseData.data.status) {
      yield put(fetchFarmDashboardTaskSuccess(responseData.data.data));
    } else {
      yield put(fetchFarmDashboardTaskFailure("Something went wrong"));
    }
  }

  export function* fetchFarmDashboardFarmUtlizationCropList({ data }) {
    let responseData = yield call(callFetchDashboardFarmUtilizationCrops, data);
    if (responseData?.status == 200 && responseData.data.status) {
      yield put(fetchFarmDashboardUtilizationCropsSuccess(responseData.data.data));
    } else {
      yield put(fetchFarmDashboardUtilizationCropsFailure("Something went wrong"));
    }
  }
  export function* fetchFarmDashboardFarmUtlizationStagesList({ data }) {

    let responseData = yield call(callFetchDashboardFarmUtilizationStages, data);
    if (responseData?.status == 200 && responseData.data.status) {
      yield put(fetchFarmDashboardUtilizationStagesSuccess(responseData.data.data));
    } else {
      yield put(fetchFarmDashboardUtilizationStagesFailure("Something went wrong"));
    }
  }

  export function* fetchFarmDashboardZoneSensorDataList({ data }) {
    const {...id} = data;
    let responseData = yield call(callfetchFarmDashboardZoneSensorDetails, id);
    if (responseData?.status == 200 && responseData.data.status) {
      yield put(fetchFarmDashboardZoneSensorSuccess(responseData.data.data));
    } else {
      yield put(fetchFarmDashboardZoneSensorFailure("Something went wrong"));
    }
  }

  export function* fetchFarmDashboardZoneLattestSensorDataList({ data }) {
    let responseData = yield call(callfetchFarmDashboardLattestZoneSensorDetails, data);
    if (responseData?.status == 200 && responseData.data.status) {
      yield put(fetchDashboardFarmLattestSensorDataSuccess(responseData.data.data));
    } else {
      yield put(fetchDashboardFarmLattestSensorDataFailure("Something went wrong"));
    }
  }

  

  export function* fetchFarmDashboardAllZoneDataList({ data }) {
    let responseData = yield call(callfetchFarmDashboardAllZoneSensorDetails, data);
    if (responseData?.status == 200 && responseData.data.status) {
      yield put(fetchDashboardAllZoneDetailsSuccess(responseData.data.data));
    } else {
      yield put(fetchDashboardAllZoneDetailsFailure("Something went wrong"));
    }
  }



  
export function* farmDashboardSagas() {
  yield all([
    // takeLatest("FETCH_ALL_DASHBOARD_FARM_REQUEST", fetchFarmDashboardList),
    takeLatest("FETCH_ALL_DASHBOARD_HARVEST_REQUEST", fetchFarmDashboardHarvestList),
    takeLatest("ADD_TASK_REQUEST", addTaskScheduleTask),
    takeLatest("ADD_FARM_TASKS_COMMENTS_REQUEST", addFarmTaskComment),
    takeLatest("ADD_FARM_DASHBOARD_ZONE_REQUEST", addFarmDashboardZone),
    takeLatest("FETCH_ALL_FARM_DASHBOARD_ZONE_REQUEST", fetchFarmDashboardZoneList),
    takeLatest("UPDATE_FARM_DASHBOARD_ZONE_REQUEST", updateFarmDashboardZoneList),
    takeLatest("DELETE_FARM_DASHBOARD_ZONE_REQUEST", deleteFarmDashboardZoneList),
    takeLatest("FETCH_ALL_USER_ZONE_SENSORS_REQUEST", fetchAllUserZoneSensor),
    takeLatest("FETCH_FARM_DASHBOARD_FARM_INFO_REQUEST", fetchFarmDashboardInfoList),
    takeLatest("FETCH_FARM_DASHBOARD_CROP_SCHEDULES_REQUEST", fetchFarmDashboardCropScheduleList),
    takeLatest("FETCH_FARM_DASHBOARD_INFO_REQUEST", fetchFarmDashboardFarmInfoList),
    takeLatest("FETCH_FARM_DASHBOARD_TASK_REQUEST", fetchFarmDashboardTaskList),
    takeLatest("FETCH_FARM_DASHBOARD_FARM_UTILIZATION_CROP_REQUEST", fetchFarmDashboardFarmUtlizationCropList),
    takeLatest("FETCH_FARM_DASHBOARD_FARM_UTILIZATION_STAGES_REQUEST", fetchFarmDashboardFarmUtlizationStagesList),
    takeLatest("FETCH_FARM_DASHBOARD_ZONE_SENSOR_DATA_REQUEST", fetchFarmDashboardZoneSensorDataList),
    takeLatest("FETCH_FARM_DASHBOARD_ZONE_LATTEST_SENSOR_DATA_REQUEST", fetchFarmDashboardZoneLattestSensorDataList),
    takeLatest("FETCH_FARM_DASHBOARD_ALL_ZONE_DETAILS_REQUEST", fetchFarmDashboardAllZoneDataList),



  ]);
}
export default [farmDashboardSagas];


