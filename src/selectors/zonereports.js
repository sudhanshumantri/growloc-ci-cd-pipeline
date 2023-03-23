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

  export const selectFarmReportsZoneAverageMortalityList = () =>
  createSelector(
    selectZoneReports,
    (services) => services.toJS()["farmReportsZoneAverageMortalityList"]
  );
export const selectIsFarmReportsZoneAverageMortalityListLoading = () =>
  createSelector(
    selectZoneReports,
    (services) => services.toJS()["isFarmReportsZoneAverageMortalityListLoading"]
  );

export const selectFarmReportsZoneAverageMortalityError = () =>
  createSelector(
    selectZoneReports,
    (services) => services.toJS()["farmReportsZoneAverageMortalityError"]
  );
  
  export const selectFarmReportsZoneTatTaskCategoriesList = () =>
  createSelector(
    selectZoneReports,
    (services) => services.toJS()["farmReportsZoneTatTaskCategoriesList"]
  );
export const selectIsFarmReportsZoneTatTaskCategoriesListLoading = () =>
  createSelector(
    selectZoneReports,
    (services) => services.toJS()["isFarmReportsZoneTatTaskCategoriesListLoading"]
  );

export const selectFarmReportsZoneTatTaskCategoriesError = () =>
  createSelector(
    selectZoneReports,
    (services) => services.toJS()["farmReportsZoneTatTaskCategoriesError"]
  );
