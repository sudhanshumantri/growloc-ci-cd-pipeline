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
//

export const selectFarmReportsFarmAverageMortalityList = () =>
createSelector(
  selectReports,
  (services) => services.toJS()["farmReportsFarmAverageMortalityList"]
);
export const selectIsFarmReportsFarmAverageMortalityListLoading = () =>
createSelector(
  selectReports,
  (services) => services.toJS()["isFarmReportsFarmAverageMortalityListLoading"]
);

export const selectFarmReportsFarmAverageMortalityError = () =>
createSelector(
  selectReports,
  (services) => services.toJS()["farmReportsFarmAverageMortalityError"]
);


export const selectFarmReportsFarmTatTaskCategoriesListList = () =>
createSelector(
  selectReports,
  (services) => services.toJS()["farmReportsFarmTatTaskCategoriesListList"]
);
export const selectIsFarmReportsFarmTatTaskCategoriesListLoading = () =>
createSelector(
  selectReports,
  (services) => services.toJS()["isFarmReportsFarmTatTaskCategoriesListLoading"]
);

export const selectFarmReportsFarmTatTaskCategoriesListError = () =>
createSelector(
  selectReports,
  (services) => services.toJS()["farmReportsFarmTatTaskCategoriesListError"]
);


