import { createSelector } from "reselect";
const selectReports = (state) => state.get("reports");

export const selectFarmReportsList = () =>
  createSelector(
    selectReports,
    (services) => services.toJS()["farmReportsList"]
  );
export const selectIsFarmReportsListLoading = () =>
  createSelector(
    selectReports,
    (services) => services.toJS()["isFarmReportsListLoading"]
  );

export const selectFarmReportsListError = () =>
  createSelector(
    selectReports,
    (services) => services.toJS()["farmReportsListError"]
  );
