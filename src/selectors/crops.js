import { createSelector } from "reselect";
const selectCrop = (state) => state.get("crops");

export const selectCropList = () =>
  createSelector(selectCrop, (services) => services.toJS()["cropList"]);
export const selectIsCropListLoading = () =>
  createSelector(
    selectCrop,
    (services) => services.toJS()["isCropListLoading"]
  );
export const selectCropListError = () =>
  createSelector(selectCrop, (services) => services.toJS()["cropListError"]);

export const selectAddCropError = () =>
  createSelector(selectCrop, (services) => services.toJS()["addCropError"]);
export const selectIsAddCropLoading = () =>
  createSelector(selectCrop, (services) => services.toJS()["isAddCropLoading"]);

export const selectCropFarmList = () =>
  createSelector(selectCrop, (services) => services.toJS()["cropFarmList"]);
export const selectisFarmCropListLoading = () =>
  createSelector(
    selectCrop,
    (services) => services.toJS()["isFarmCropListLoading"]
  );
export const selectCropFarmListError = () =>
  createSelector(selectCrop, (services) => services.toJS()["farmListError"]);
