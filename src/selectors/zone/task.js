import { createSelector } from "reselect";
const selectZoneTask = (state) => state.get("zoneTask");

export const selectZoneTaskList = () =>
  createSelector(
    selectZoneTask,
    (services) => services.toJS()["zoneTaskList"]
  );
export const selectIsZoneTaskListLoading = () =>
  createSelector(
    selectZoneTask,
    (services) => services.toJS()["isZoneTaskListLoading"]
  );

  export const selectZoneTaskListError = () =>
  createSelector(
    selectZoneTask,
    (services) => services.toJS()["FarmTaskListError"]
  );
