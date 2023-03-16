import { createSelector } from "reselect";
const selectZoneReports = (state) => state.get("zoneReports");

export const selectZoneReportsList = () =>
  createSelector(
    selectZoneReports,
    (services) => services.toJS()["zoneReportsList"]
  );
export const selectIsZoneReportsListLoading = () =>
  createSelector(
    selectZoneReports,
    (services) => services.toJS()["isZoneReportsListLoading"]
  );

export const selectZoneReportsListError = () =>
  createSelector(
    selectZoneReports,
    (services) => services.toJS()["zoneReportsListError"]
  );
