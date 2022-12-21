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