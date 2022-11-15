import { createSelector } from "reselect";
const selectFarm = (state) => state.get("farm");
export const selectFarmList = () =>
  createSelector(selectFarm, (services) => services.toJS()["farmList"]);
export const selectIsFarmListLoading = () =>
  createSelector(
    selectFarm,
    (services) => services.toJS()["isFarmListLoading"]
  );
export const selectFarmListError = () =>
  createSelector(selectFarm, (services) => services.toJS()["FarmListError"]);

  export const selectAddFarmError = () =>
  createSelector(selectFarm, (services) => services.toJS()["addFarmError"]);
export const selectIsAddFarmLoading = () =>
  createSelector(selectFarm, (services) => services.toJS()["isAddFarmLoading"]);
  //
  export const selectIsUpdateFarmLoading = () =>
  createSelector(
    selectFarm,(services) => services.toJS()["isUpdateFarmLoading"]
  );
export const selectIsUpdateFarmError = () =>
  createSelector(selectFarm, (services) => services.toJS()["isupdateFarmError"]);

  export const selectIsDeleteFarmLoading = () =>
  createSelector(
    selectFarm,(services) => services.toJS()["isdeleteFarmLoading"]


  );

  //
  export const selectFarmDetailsList = () =>
  createSelector(selectFarm, (services) => services.toJS()["farmDetailsList"]);
  export const selectIsFarmDetailsListLoading = () =>
  createSelector(
    selectFarm,
    (services) => services.toJS()["isFarmDetailsListLoading"]
  );
   export const selectFarmDetailsListError = () =>
  createSelector(selectFarm, (services) => services.toJS()["addFarmDetailsError"]);



  


