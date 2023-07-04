import { call, all, put, takeLatest, delay } from 'redux-saga/effects'
import { callRegisterHandler } from '../utils/api'
import { browserHistory } from '../store'
import { addNotification } from '../components/shared/notification'
import { registerSuccess, registerFailure } from '../actions/register'
export function * registerHandler ({ data }) {
  const responseData = yield call(callRegisterHandler, data)
  if (responseData?.status === 200 && responseData.data.status) {
    addNotification(
      'Account sucessfully created. Kindly Login',
      5000,
      true,
      'success'
    )
    yield delay(1000)
    yield call(browserHistory.push, '/login')
    yield call(browserHistory.go, '/login')
    yield put(registerSuccess())
  } else {
    const errorMessage = responseData.data?.error
      ? responseData.data?.error
      : 'Something went wrong'
    addNotification(errorMessage, 5000, true, 'danger')
    yield put(registerFailure('Somethign went wrong'))
  }
}

export function * registerSagas () {
  yield all([takeLatest('REGISTER_REQUEST', registerHandler)])
}

export default [registerSagas]
