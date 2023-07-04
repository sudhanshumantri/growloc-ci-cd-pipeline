import { call, all, put, takeLatest } from 'redux-saga/effects'
import { browserHistory } from '../store'
import { addNotification } from '../components/shared/notification'
import {
  callFetchFarmList,
  callFarmCrop,
  callUpdateFarm,
  callDeleteFarm,
  callFetchFarmDetailsList
} from '../utils/api'
import {
  fetchFarmSuccess,
  fetchFarmFailure,
  saveFarmSuccess,
  saveFarmFailure,
  updateFarmSuccess,
  updateFarmFailure,
  deleteFarmSuccess,
  deleteFarmFailure,
  fetchFarmDetailsSuccess,
  fetchFarmDetailsFailure
} from '../actions/farm'

export function * fetchFarmList ({ data }) {
  const responseData = yield call(callFetchFarmList, data)
  if (responseData?.status === 200 && responseData.data.status) {
    yield put(fetchFarmSuccess(responseData.data.data))
  } else {
    yield put(fetchFarmFailure('Something went wrong'))
  }
}
export function * addFarm ({ data }) {
  const responseData = yield call(callFarmCrop, data)
  if (responseData?.status === 200 && responseData.data.status) {
    yield put(saveFarmSuccess(responseData.data.data))
    yield call(browserHistory.push, '/')
    yield call(browserHistory.go, '/')
  } else {
    yield put(saveFarmFailure('Something went wrong'))
  }
}
export function * updateFarm ({ data }) {
  const { farmId, payload, shouldRedirect } = data
  const responseData = yield call(callUpdateFarm, payload, farmId)
  if (responseData?.status === 200) {
    yield put(updateFarmSuccess(responseData.data))
    if (shouldRedirect === false) {
      //
    } else {
      yield call(browserHistory.push, '/')
      yield call(browserHistory.go, '/')
    }
    addNotification('Farm Updated Successfully', 5000, true, 'success')
  } else {
    yield put(updateFarmFailure('Something went wrong'))
  }
}
export function * deleteFarm ({ data }) {
  const responseData = yield call(callDeleteFarm, data)
  if (responseData?.status === 200) {
    yield put(deleteFarmSuccess(data))
  } else {
    yield put(deleteFarmFailure('Something went wrong'))
  }
}
export function * fetchFarmDetailsList ({ data }) {
  const responseData = yield call(callFetchFarmDetailsList, data)
  if (responseData?.status === 200 && responseData.data.status) {
    yield put(fetchFarmDetailsSuccess(responseData.data.data))
  } else {
    yield put(fetchFarmDetailsFailure('Something went wrong'))
  }
}
export function * farmSagas () {
  yield all([
    takeLatest('FETCH_ALL_FARM_REQUEST', fetchFarmList),
    takeLatest('ADD_FARM_REQUEST', addFarm),
    takeLatest('UPDATE_FARM_REQUEST', updateFarm),
    takeLatest('DELETE_FARM_REQUEST', deleteFarm),
    takeLatest('FETCH_FARM_DETAILS_REQUEST', fetchFarmDetailsList)
  ])
}
export default [farmSagas]
