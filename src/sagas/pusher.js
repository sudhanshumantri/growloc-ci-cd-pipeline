import { put, all, takeLatest } from 'redux-saga/effects'
import { fetchPusherFailure, fetchPusherSuccess } from '../actions/pusher'

export function * fetchSensorDataPusher ({ data }) {
  if (data) {
    yield put(fetchPusherSuccess(data))
  } else {
    yield put(fetchPusherFailure('Something went wrong'))
  }
}
export function * pusherSagas () {
  yield all([
    takeLatest('FETCH_SENSOR_DATA_PUSHER_REQUEST', fetchSensorDataPusher)
  ])
}
export default [pusherSagas]
