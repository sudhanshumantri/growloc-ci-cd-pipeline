import { createSelector } from "reselect";
const selectCrop = (state) => state.get("life-cycle");

export const selectCropLifeCycleListError = () =>
  createSelector(selectCrop, (services) => services.toJS()["cropLifeCycleListError"]);
export const selectIsCropLifeCycleListLoading = () =>
  createSelector(selectCrop, (services) => services.toJS()["isCropLifeCycleListLoading"]);

export const selectAddLifecycleError = () =>
  createSelector(selectCrop, (services) => services.toJS()["addLifecycleError"]);
export const selectIsAddLifecycleLoading = () =>
  createSelector(selectCrop, (services) => services.toJS()["isAddLifecycleLoading"]);

export const selectLifecycleCropsList = () =>
  createSelector(selectCrop, (services) => services.toJS()["lifecycleCrops"]);

