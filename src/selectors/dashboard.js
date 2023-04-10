import { createSelector } from "reselect";
const selectFarmDashboard = (state) => state.get("dashboard");

  export const selectFarmDashboardHarvestList = () =>
  createSelector(selectFarmDashboard, (services) => services.toJS()["dashboardHarvestList"]);
  
export const selectIsFarmDashboardHarvestListLoading = () =>
  createSelector(
    selectFarmDashboard,
    (services) => services.toJS()["isDashboardHarvestListLoading"]
  );
export const selectFarmDashboardHarvestListError = () =>
  createSelector(selectFarmDashboard, (services) => services.toJS()["DashboardHarvestListError"]);

  //
  export const selectIsTaskScheduleTaskLoading = () =>
  createSelector(
    selectFarmDashboard,
    (services) => services.toJS()["isTaskScheduleTaskLoading"]
  );

export const selectTaskScheduleTaskListError = () =>
  createSelector(selectFarmDashboard, (services) => services.toJS()["TaskScheduleTaskListError"]);

  //

  export const selectIsisFarmTaskCommentLoading = () =>
  createSelector(
    selectFarmDashboard,
    (services) => services.toJS()["isFarmTaskCommentLoading"]
  );

export const selectfarmTaskCommentError = () =>
  createSelector(selectFarmDashboard, (services) => services.toJS()["farmTaskCommentError"]);


  export const selectIsFarmDashboardZoneLoading = () =>
  createSelector(
    selectFarmDashboard,
    (services) => services.toJS()["isFarmDashboardZoneLoading"]
  );

export const selectFarmDashboardZoneError = () =>
  createSelector(selectFarmDashboard, (services) => services.toJS()["farmDashboardZoneError"]);

  //

  export const selectFarmDashboardZoneList = () =>
  createSelector(selectFarmDashboard, (services) => services.toJS()["farmDashboardZoneList"]);
export const selectIsFarmDashboardZoneListLoading = () =>
  createSelector(
    selectFarmDashboard,
    (services) => services.toJS()["isFarmDashboardZoneListLoading"]
  );
export const selectFarmDashboardZoneListError = () =>
  createSelector(selectFarmDashboard, (services) => services.toJS()["farmDashboardZoneListError"]);


  //

  export const selectIsUpdataFarmDashboardZoneLoading = () =>
  createSelector(
    selectFarmDashboard,
    (services) => services.toJS()["isUpdateFarmDashboardZoneLoading"]
  );
export const selectUpdateFarmDashboardZoneError = () =>
  createSelector(selectFarmDashboard, (services) => services.toJS()["updateFarmDashboardZoneError"]);


  export const selectIsDeleteFarmDashboardZoneLoading = () =>
  createSelector(
    selectFarmDashboard,
    (services) => services.toJS()["isDeleteFarmDashboardZoneLoading"]
  );
//
export const selectAllUserZoneSensor = () =>
  createSelector(selectFarmDashboard, (services) => services.toJS()["allZoneSensorList"]);
export const selectIsZoneSensorLoading = () =>
  createSelector(
    selectFarmDashboard,
    (services) => services.toJS()["isZoneSensorLoading"]
  );
export const selectLoadingAllZoneSensorError = () =>
  createSelector(selectFarmDashboard, (services) => services.toJS()["loadingAllZoneSensorError"]);


  /// new dasboard api

  export const selectFarmDashboardFarmInfoList = () =>
  createSelector(selectFarmDashboard, (services) => services.toJS()["farmDashboardFarmInfoList"]);
export const selectIsDashboardFarmInfoListLoading= () =>
  createSelector(
    selectFarmDashboard,
    (services) => services.toJS()["isDashboardFarmInfoListLoading"]
  );
export const selectFarmDashboardFarmInfoListError = () =>
  createSelector(selectFarmDashboard, (services) => services.toJS()["farmDashboardFarmInfoListError"]);

//
export const selectFarmDashboardCropSchedulesList = () =>
createSelector(selectFarmDashboard, (services) => services.toJS()["farmDashboardCropSchedulesList"]);
export const selectIsDashboardCropSchedulesListLoading= () =>
createSelector(
  selectFarmDashboard,
  (services) => services.toJS()["isDashboardCropSchedulesListLoading"]
);
export const selectFarmDashboardCropSchedulesListError = () =>
createSelector(selectFarmDashboard, (services) => services.toJS()["farmDashboardCropSchedulesListError"]);

//
export const selectFarmDashboardInfoList = () =>
createSelector(selectFarmDashboard, (services) => services.toJS()["farmDashboardInfoList"]);
export const selectIsDashboardInfoListLoading= () =>
createSelector(
  selectFarmDashboard,
  (services) => services.toJS()["isDashboardInfoListLoading"]
);
export const selectFarmDashboardInfoListError = () =>
createSelector(selectFarmDashboard, (services) => services.toJS()["farmDashboardInfoListError"]);

//
export const selectFarmDashboardTaskList = () =>
createSelector(selectFarmDashboard, (services) => services.toJS()["farmDashboardTaskList"]);
export const selectIsDashboardFarmTaskLoading= () =>
createSelector(
  selectFarmDashboard,
  (services) => services.toJS()["isDashboardFarmTaskLoading"]
);
export const selectFarmDashboardTaskListError = () =>
createSelector(selectFarmDashboard, (services) => services.toJS()["farmDashboardTaskListError"]);

//
export const selectFarmDashboardFarmUtilizationCropsList = () =>
createSelector(selectFarmDashboard, (services) => services.toJS()["farmDashboardFarmUtilizationCropsList"]);
export const selectIsFarmDashboardFarmUtilizationCropsLoading= () =>
createSelector(
  selectFarmDashboard,
  (services) => services.toJS()["isFarmDashboardFarmUtilizationCropsLoading"]
);
export const selectFarmDashboardFarmUtilizationCropsError = () =>
createSelector(selectFarmDashboard, (services) => services.toJS()["FarmDashboardFarmUtilizationCropsError"]);
//
export const selectFarmDashboardFarmUtilizationStagesList = () =>
createSelector(selectFarmDashboard, (services) => services.toJS()["farmDashboardFarmUtilizationStagesList"]);
export const selectIsFarmDashboardFarmUtilizationStagesLoading= () =>
createSelector(
  selectFarmDashboard,
  (services) => services.toJS()["isFarmDashboardFarmUtilizationStagesLoading"]
);
export const selectFarmDashboardFarmUtilizationStagesError = () =>
createSelector(selectFarmDashboard, (services) => services.toJS()["farmDashboardFarmUtilizationStagesError"]);


export const selectFarmDashboardZoneSensorList = () =>
createSelector(selectFarmDashboard, (services) => services.toJS()["farmDashboardZoneSensorList"]);
export const selectIsFarmDashboardZoneSensorLoading= () =>
createSelector(
  selectFarmDashboard,
  (services) => services.toJS()["isFarmDashboardZoneSensorLoading"]
);
export const selectFarmDashboardZoneSensorListError = () =>
createSelector(selectFarmDashboard, (services) => services.toJS()["farmDashboardZoneSensorListError"]);





export const selectFarmDashboardZoneLattestSensorList = () =>
createSelector(selectFarmDashboard, (services) => services.toJS()["farmDashboardZoneLattestSensorList"]);
export const selectIsFarmDashboardZoneLattestSensorLoading= () =>
createSelector(
  selectFarmDashboard,
  (services) => services.toJS()["isFarmDashboardZoneLattestSensorLoading"]
);
export const selectFarmDashboardZoneLattestSensorListError = () =>
createSelector(selectFarmDashboard, (services) => services.toJS()["farmDashboardZoneLattestSensorListError"]);







