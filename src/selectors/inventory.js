import { createSelector } from 'reselect'
const selectInventory = (state) => state.get('inventory')

export const selectFarmInventoryList = () =>
  createSelector(
    selectInventory,
    (services) => services.toJS().FarmInventoryList
  )
export const selectIsisFarmInventoryListLoading = () =>
  createSelector(
    selectInventory,
    (services) => services.toJS().isFarmInventoryListLoading
  )

export const selectFarmInventoryListError = () =>
  createSelector(
    selectInventory,
    (services) => services.toJS().FarmInventoryListError
  )

export const selectAddFarmInventoryError = () =>
  createSelector(
    selectInventory,
    (services) => services.toJS().AddFarmInventoryError
  )
export const selectIsAddFarmInventoryLoading = () =>
  createSelector(
    selectInventory,
    (services) => services.toJS().isAddFarmInventoryLoading
  )

export const selectIsUpdateFarmInventoryLoading = () =>
  createSelector(
    selectInventory,
    (services) => services.toJS().isUpdateFarmInventoryLoading
  )
export const selectIsUpdateFarmInventoryError = () =>
  createSelector(
    selectInventory,
    (services) => services.toJS().updateFarmInventoryError
  )

export const selectIsDeleteFarmInventoryLoading = () =>
  createSelector(
    selectInventory,
    (services) => services.toJS().isDeleteFarmInventoryLoading
  )
