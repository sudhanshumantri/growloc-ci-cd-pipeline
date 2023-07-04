import { createSelector } from 'reselect'
const selectLogin = (state) => state.get('register')

export const selectisLoading = () =>
  createSelector(selectLogin, (services) => services.toJS().isLoading)
export const selecisSucess = () =>
  createSelector(selectLogin, (services) => services.toJS().isSucess)
