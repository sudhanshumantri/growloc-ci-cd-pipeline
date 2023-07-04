import { createSelector } from 'reselect'
const selectLogin = (state) => state.get('login')

export const selectToken = () =>
  createSelector(selectLogin, (services) => services.toJS().token)
export const selectLoginObject = () =>
  createSelector(selectLogin, (services) => services.toJS().loginObject)

export const isTokenLoading = () =>
  createSelector(selectLogin, (services) => services.toJS().isLoadingAuthToken)
export const isLoginLoading = () =>
  createSelector(selectLogin, (services) => services.toJS().isLoginRequested)
export const isLoginSuccess = () =>
  createSelector(selectLogin, (services) => services.toJS().isLoginRequested)
export const isLoginError = () =>
  createSelector(selectLogin, (services) => services.toJS().isLoginErr)
