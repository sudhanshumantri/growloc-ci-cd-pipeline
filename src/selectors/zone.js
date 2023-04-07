import { createSelector } from "reselect";
const selectZone = (state) => state.get("zone");

export const selectFarmZoneList = () =>
  createSelector(
    selectZone,
    (services) => services.toJS()["farmZoneList"]
  );
export const selectIsFarmZoneLoading = () =>
  createSelector(
    selectZone,
    (services) => services.toJS()["isFarmZoneLoading"]
  );

export const selectFarmZoneError = () =>
  createSelector(
    selectZone,
    (services) => services.toJS()["farmZoneError"]
  );

  export const selectFarmZoneDashboardList = () =>
  createSelector(selectZone, (services) => services.toJS()["farmZoneDashboardList"]);
export const selectIsFarmZoneDashboardListLoading = () =>
  createSelector(
    selectZone,
    (services) => services.toJS()["isFarmZoneDashboardListLoading"]
  );
export const selectFarmZoneDashboardListError = () =>
  createSelector(selectZone, (services) => services.toJS()["farmZoneDashboardListError"]);

//
  export const selectFarmZoneDashboardHarvestList = () =>
  createSelector(selectZone, (services) => services.toJS()["farmZoneDashboardHarvestList"]);
  
export const selectIsFarmZoneDashboardHarvestListLoading = () =>
  createSelector(
    selectZone,
    (services) => services.toJS()["isFarmZoneDashboardHarvestListLoading"]
  );
export const selectFarmZoneDashboardHarvestListError = () =>
  createSelector(selectZone, (services) => services.toJS()["farmZoneDashboardHarvestListError"]);
  //

  export const selectIsFarmDashboardZoneTaskLoading = () =>
  createSelector(
    selectZone,
    (services) => services.toJS()["isFarmDashboardZoneTaskLoading"]
  );

export const selectFarmDashboardZoneTaskError = () =>
  createSelector(selectZone, (services) => services.toJS()["farmDashboardZoneTaskError"]);

  //

  export const selectIsFarmDashboardZoneCommetLoading = () =>
  createSelector(
    selectZone,
    (services) => services.toJS()["isFarmDashboardZoneCommetLoading"]
  );

export const selectFarmDashboardZoneCommetError = () =>
  createSelector(selectZone, (services) => services.toJS()["farmDashboardZoneCommetError"]);

//
export const selectRecentZoneSensorData = () =>
  createSelector(
    selectZone,
    (services) => services.toJS()["recentZoneSensorData"]
  );
export const selectIsRecentZoneSensorDataLoading = () =>
  createSelector(
    selectZone,
    (services) => services.toJS()["isRecentZoneSensorDataLoading"]
  );

export const selectRecentZoneSensorDataError = () =>
  createSelector(
    selectZone,
    (services) => services.toJS()["recentZoneSensorDataError"]
  );

  export const selectZoneDashboardZoneInfoList = () =>
createSelector(selectZone, (services) => services.toJS()["zoneDashboardZoneInfoList"]);
export const selectIsZoneDashboardZoneInfoLoading= () =>
createSelector(
  selectZone,
  (services) => services.toJS()["isZoneDashboardZoneInfoLoading"]
);
export const selectZoneDashboardZoneInfoError = () =>
createSelector(selectZone, (services) => services.toJS()["zoneDashboardZoneInfoError"]);

export const selectZoneDashboardZoneCropSchedulesList= () =>
createSelector(selectZone, (services) => services.toJS()["zoneDashboardZoneCropSchedulesList"]);
export const selectIsZoneDashboardZoneCropSchedulesListLoading= () =>
createSelector(
  selectZone,
  (services) => services.toJS()["isZoneDashboardZoneCropSchedulesListLoading"]
);
export const selectZoneDashboardZoneCropSchedulesListError = () =>
createSelector(selectZone, (services) => services.toJS()["zoneDashboardZoneCropSchedulesListError"]);




export const selectZoneDashboardZoneTaskList= () =>
createSelector(selectZone, (services) => services.toJS()["zoneDashboardZoneTaskList"]);
export const selectIsZoneDashboardZoneTaskLoading= () =>
createSelector(
  selectZone,
  (services) => services.toJS()["isZoneDashboardZoneTaskLoading"]
);
export const selectZoneDashboardZoneTaskListError = () =>
createSelector(selectZone, (services) => services.toJS()["zoneDashboardZoneTaskListError"]);
//

export const selectZoneDashboardZoneSensorList= () =>
createSelector(selectZone, (services) => services.toJS()["zoneDashboardZoneSensorList"]);
export const selectIsZoneDashboardZoneSensorLoading= () =>
createSelector(
  selectZone,
  (services) => services.toJS()["isZoneDashboardZoneSensorLoading"]
);
export const selectZoneDashboardZoneSensorError = () =>
createSelector(selectZone, (services) => services.toJS()["zoneDashboardZoneSensorError"]);

export const selectZoneDashboardZoneUtilizationCropsList= () =>
createSelector(selectZone, (services) => services.toJS()["zoneDashboardZoneUtilizationCropsList"]);

export const selectIsZoneDashboardZoneUtilizationCropsLoading= () =>
createSelector(
  selectZone,
  (services) => services.toJS()["isZoneDashboardZoneUtilizationCropsLoading"]
);
export const selectZoneDashboardZoneUtilizationCropsError = () =>
createSelector(selectZone, (services) => services.toJS()["zoneDashboardZoneUtilizationCropsError"]);

export const selectZoneDashboardZoneUtilizationStagesList= () =>
createSelector(selectZone, (services) => services.toJS()["zoneDashboardZoneUtilizationStagesList"]);
export const selectIsZoneDashboardZoneUtilizationStagesLoading= () =>
createSelector(
  selectZone,
  (services) => services.toJS()["isZoneDashboardZoneUtilizationStagesLoading"]
);
export const selectZoneDashboardZoneUtilizationStagesError = () =>
createSelector(selectZone, (services) => services.toJS()["zoneDashboardZoneUtilizationStagesError"]);
// tasks

export const selectZoneTaskList = () =>
  createSelector(
    selectZone,
    (services) => services.toJS()["zoneTaskList"]
  );
export const selectIsZoneTaskListLoading = () =>
  createSelector(
    selectZone,
    (services) => services.toJS()["isZoneTaskListLoading"]
  );

  export const selectZoneTaskListError = () =>
  createSelector(
    selectZone,
    (services) => services.toJS()["FarmTaskListError"]
  );


  export const selectIsZoneTaskCommentLoading= () =>
  createSelector(
    selectZone,
    (services) => services.toJS()["isZoneTaskCommentLoading"]
  );

export const selectZoneTaskCommentError = () =>
  createSelector(selectZone, (services) => services.toJS()["zoneTaskCommentError"]);


  export const selectFarmZoneSensorDataList = () =>
  createSelector(
    selectZone,
    (services) => services.toJS()["farmZoneSensorDataList"]
  );
export const selectIsFarmZoneSensorDataLoading = () =>
  createSelector(
    selectZone,
    (services) => services.toJS()["isFarmZoneSensorDataLoading"]
  );

  export const selectFarmZoneSensorDataListError = () =>
  createSelector(
    selectZone,
    (services) => services.toJS()["farmZoneSensorDataListError"]
  );
