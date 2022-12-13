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

  export const selectIsTaskCommentLoading= () =>
  createSelector(
    selectTask,
    (services) => services.toJS()["isTaskCommentLoading"]
  );

export const selectTaskCommentError = () =>
  createSelector(selectTask, (services) => services.toJS()["taskCommentError"]);

