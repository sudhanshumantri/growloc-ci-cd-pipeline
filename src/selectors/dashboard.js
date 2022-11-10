import { createSelector } from "reselect";
const selectFarmDashboard = (state) => state.get("dashboard");
export const selectFarmDashboardList = () =>
  createSelector(selectFarmDashboard, (services) => services.toJS()["dashboardFarmList"]);
export const selectIsFarmDashboardListLoading = () =>
  createSelector(
    selectFarmDashboard,
    (services) => services.toJS()["isDashboardFarmListLoading"]
  );
export const selectFarmDashboardListError = () =>
  createSelector(selectFarmDashboard, (services) => services.toJS()["DashboardFarmListError"]);

//
  export const selectFarmDashboardHarvestList = () =>
  createSelector(selectFarmDashboard, (services) => services.toJS()["dashboardHarvestList"]);
  
export const selectIsFarmDashboardHarvestListLoading = () =>
  createSelector(
    selectFarmDashboard,
    (services) => services.toJS()["isDashboardHarvestListLoading"]
  );
export const selectFarmDashboardHarvestListError = () =>
  createSelector(selectFarmDashboard, (services) => services.toJS()["DashboardHarvestListError"]);

