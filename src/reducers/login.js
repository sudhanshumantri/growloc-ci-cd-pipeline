import { fromJS } from 'immutable'
import {
  LOAD_AUTH_TOKEN,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGOUT,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE
} from '../actions/actionTypes'
const INITIAL_STATE = fromJS({
  userData: {},
  isLoginRequested: false,
  isLoginErr: null,
  token: null,
  isLoadingAuthToken: true,
  success: false
})
export default function loginReducer (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LOAD_AUTH_TOKEN:
      return state
        .set('isLoadingAuthToken', false)
        .set('token', action.data.token)
        .set('loginObject', action.data.loginObject)
    case FORGOT_PASSWORD_REQUEST:
      return state
        .set('isLoginRequested', true)
        .set('success', false)
        .set('isLoginErr', null)
    case FORGOT_PASSWORD_SUCCESS:
      return state
        .set('success', true)
        .set('isLoginRequested', false)
        .set('isLoginErr', null)
    case FORGOT_PASSWORD_FAILURE:
      return state
        .set('isLoginRequested', false)
        .set('success', false)
        .set('isLoginErr', action.error)
    case LOGIN_REQUEST:
      return state.set('isLoginRequested', true).set('isLoginErr', null)
    case LOGIN_SUCCESS:
      return state
        .set('isLoginRequested', false)
        .set('isLoginErr', null)
        .set('token', action.data)
    case LOGIN_FAILURE:
      return state
        .set('isLoginRequested', false)
        .set('isLoginErr', action.error)
    case LOGOUT:
      return state
        .set('isLoginRequested', false)
        .set('isLoadingAuthToken', false)
        .set('token', null)
        .set('userData', {})
        .set('err', null)
    default:
      return state
  }
}
