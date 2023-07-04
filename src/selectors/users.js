import { createSelector } from 'reselect'
const selectUsers = (state) => state.get('users')
export const selectUsersList = () =>
  createSelector(selectUsers, (services) => services.toJS().usersList)
export const selectIsUsersListLoading = () =>
  createSelector(selectUsers, (services) => services.toJS().isUsersListLoading)

export const selectUsersListError = () =>
  createSelector(selectUsers, (services) => services.toJS().UsersListError)

export const selectIsAddUserLoading = () =>
  createSelector(selectUsers, (services) => services.toJS().isAddUserLoading)

export const selectAddUserError = () =>
  createSelector(selectUsers, (services) => services.toJS().addUserError)

export const selectIsUpdateUserLoading = () =>
  createSelector(
    selectUsers,
    (services) => services.toJS().isUpdateUserLoading
  )
export const selectIsUpdateUserError = () =>
  createSelector(selectUsers, (services) => services.toJS().updateUserError)

export const selectIsDeleteUserLoading = () =>
  createSelector(
    selectUsers,
    (services) => services.toJS().isdeleteUserLoading
  )
