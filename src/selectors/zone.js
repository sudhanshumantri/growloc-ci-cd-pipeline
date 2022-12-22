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

