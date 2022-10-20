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

/**
 * Life Cycle Details 
 */
export const selectLifecycleDetailsError = () =>
  createSelector(selectCrop, (services) => services.toJS()["lifeCycleDetailsError"]);
export const selectIsLifecycleDetailsLoading = () =>
  createSelector(selectCrop, (services) => services.toJS()["isLifeCycleDetailsLoading"]);

export const selectLifecycleDetails = () =>
  createSelector(selectCrop, (services) => services.toJS()["lifecycleDetails"]);


  export const selectIsTransitionLoading = () =>
  createSelector(selectCrop, (services) => services.toJS()["isTransitionLoading"]);
