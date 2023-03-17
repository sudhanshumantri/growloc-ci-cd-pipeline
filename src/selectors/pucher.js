import { createSelector } from "reselect";
const selectPusherSensorData = (state) => state.get("pusherData");

export const selectPusherData = () =>
  createSelector(selectPusherSensorData, (services) => services.toJS()["pusherData"]);
export const selectIsPusherDataLoading = () =>
  createSelector(
    selectPusherSensorData,
    (services) => services.toJS()["isPusherDataLoading"]
  );
export const selectPusherDataLoadingError = () =>
  createSelector(selectPusherSensorData, (services) => services.toJS()["pusherDataLoadingError"]);
