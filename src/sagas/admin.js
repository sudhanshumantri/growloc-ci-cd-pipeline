import { call, all, put, takeLatest } from 'redux-saga/effects'
import {
  callFetchAdminList,
  callAddAdminsensors,
  callDeleteAdminsensors
} from '../utils/api'
import {
  fetchAdminDashboardSuccess,
  fetchAdminDashboardFailure,
  addAdminZoneSensorsFailure,
  deleteAdminZoneSensorsFailure,
  fetchAdminDashboardRequest
} from '../actions/admin'
export function * fetchAdminList ({ data }) {
  const responseData = yield call(callFetchAdminList, data)
  if (responseData?.status === 200 && responseData.data.status) {
    yield put(fetchAdminDashboardSuccess(responseData.data.data))
  } else {
    yield put(fetchAdminDashboardFailure('Something went wrong'))
  }
}
export function * deleteAdminZoneSensors ({ data }) {
  const responseData = yield call(callDeleteAdminsensors, data)
  if (responseData?.status === 200 && responseData.data.status) {
    yield put(fetchAdminDashboardRequest())
  } else {
    yield put(deleteAdminZoneSensorsFailure('Something went wrong'))
  }
}
export function * addAdminZoneSensors ({ data }) {
  const responseData = yield call(callAddAdminsensors, data)
  if (responseData?.status === 200 && responseData.data.status) {
    yield put(fetchAdminDashboardRequest())
  } else {
    yield put(addAdminZoneSensorsFailure('Something went wrong'))
  }
}
export function * adminSagas () {
  yield all([
    takeLatest('FETCH_ALL_ADMIN_DASHBOARD_REQUEST', fetchAdminList),
    takeLatest('ADD_ADMIN_ZONE_SENSORS_REQUEST', addAdminZoneSensors),
    takeLatest('DELETE_ADMIN_ZONE_SENSORS_REQUEST', deleteAdminZoneSensors)
  ])
}
export default [adminSagas]
