import { createSelector } from "reselect";
const selectTask = (state) => state.get("task");

export const selectFarmTaskList = () =>
  createSelector(
    selectTask,
    (services) => services.toJS()["FarmTaskList"]
  );
export const selectIsisFarmTaskListLoading = () =>
  createSelector(
    selectTask,
    (services) => services.toJS()["isFarmTaskListLoading"]
  );

export const selectFarmTaskListError = () =>
  createSelector(
    selectTask,
    (services) => services.toJS()["FarmTaskListError"]
  );
