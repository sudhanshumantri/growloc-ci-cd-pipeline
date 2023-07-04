import { call, all, put, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import {
  callLoginHandler,
  callForgotPasswordHandler,
  callChangePasswordHandler,
  callRestPasswordTokenValidationHandler
} from '../utils/api'
import {
  loginSuccess,
  loginFailure,
  forgotPasswordFailure,
  forgotPasswordSuccess
} from '../actions/login'

export function * loginHandler ({ data }) {
  const { loginData, navigate } = data
  const responseData = yield call(callLoginHandler, loginData)
  console.log(responseData.status, 'status')
  if (responseData?.status === 200 && responseData.data.status) {
    if (responseData.data?.data?.profile?.role === 'supervisor') {
      navigate('/task')
    } else {
      navigate('/')
    }
    yield put(loginSuccess(responseData.data.token))
    localStorage.setItem('AUTH_TOKEN', responseData.data.token)
    localStorage.setItem('AUTH_OBJECT', JSON.stringify(responseData.data.data))
  } else {
    yield put(loginFailure('Invalid Credentials'))
  }
}

export function * logoutHandler () {
  localStorage.removeItem('AUTH_TOKEN')
  localStorage.removeItem('AUTH_OBJECT')
  yield put(push('/'))
}

export function * forgotPasswordHandler ({ data }) {
  const { type, body, token } = data
  if (type === 'send-link') {
    const responseData = yield call(callForgotPasswordHandler, body)
    if (responseData?.status === 200) {
      // console.log(responseData?.status);
    }
  } else if (type === 'verify-token') {
    const routeParams = token + '/verification'
    const responseData = yield call(
      callRestPasswordTokenValidationHandler,
      routeParams
    )
    if (responseData?.status === 200 && responseData.data.code === 1) {
      localStorage.setItem(
        'RESET_PASSWORD_TOKEN',
        JSON.stringify(responseData.data)
      )
      yield put(forgotPasswordSuccess())
    } else {
      yield put(forgotPasswordFailure('Something went wrong'))
    }
  } else if (type === 'update-password') {
    let restPasswordToken = localStorage.getItem('RESET_PASSWORD_TOKEN')
    restPasswordToken = JSON.parse(restPasswordToken)
    const routeParams = restPasswordToken.clientid
    body.user = restPasswordToken.user
    const responseData = yield call(
      callChangePasswordHandler,
      routeParams,
      body
    )
    if (responseData?.status === 200 && responseData.data.code === 1) {
      localStorage.removeItem('RESET_PASSWORD_TOKEN')
      yield put(forgotPasswordSuccess())
    } else {
      yield put(forgotPasswordFailure('Something went wrong'))
    }
  }
}

export function * loginSagas () {
  yield all([
    takeLatest('LOGIN_REQUEST', loginHandler),
    takeLatest('LOGOUT', logoutHandler),
    takeLatest('FORGOT_PASSWORD_REQUEST', forgotPasswordHandler)
  ])
}
export default [loginSagas]
