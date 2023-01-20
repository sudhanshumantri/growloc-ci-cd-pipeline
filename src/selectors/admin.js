import { createSelector } from "reselect";
const selectAdmin = (state) => state.get("admin");
export const selectAdminList = () =>
  createSelector(selectAdmin, (services) => services.toJS()["adminList"]);
export const selectIsAdminListLoading = () =>
  createSelector(
    selectAdmin,
    (services) => services.toJS()["isAdminListLoading"]
  );
export const selectAdminListError = () =>
  createSelector(selectAdmin, (services) => services.toJS()["adminListError"]);
