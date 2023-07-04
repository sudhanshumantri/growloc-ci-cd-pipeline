import { call, all, put, takeLatest } from 'redux-saga/effects'
import {
  callfetchFarmInventoryDetails,
  callAddFarmInventory,
  callUpdateFarmInventory,
  callDeleteFarmInventory
} from '../utils/api'
import {
  fetchFarmInventorySuccess,
  fetchFarmInventoryFailure,
  addFarmInventorySuccess,
  addFarmInventoryFailure,
  updateFarmInventorySuccess,
  updateFarmInventoryFailure,
  deleteFarmInventorySuccess,
  deleteFarmInventoryFailure
} from '../actions/inventory'

export function * fetchFarmInventoryList ({ data }) {
  const responseData = yield call(callfetchFarmInventoryDetails, data)
  if (responseData?.status === 200 && responseData.data.status) {
    yield put(fetchFarmInventorySuccess(responseData.data.data))
  } else {
    yield put(fetchFarmInventoryFailure('Something went wrong'))
  }
}
export function * addFarmInventory ({ data }) {
  const responseData = yield call(callAddFarmInventory, data)
  if (responseData?.status === 200 && responseData.data.status) {
    yield put(addFarmInventorySuccess(responseData.data.data))
  } else {
    yield put(addFarmInventoryFailure('Something went wrong'))
  }
}
export function * updateFarmInventory ({ data }) {
  const { payload, id } = data
  const responseData = yield call(callUpdateFarmInventory, payload, id)
  if (responseData?.status === 200) {
    yield put(updateFarmInventorySuccess(responseData.data))
  } else {
    yield put(updateFarmInventoryFailure('Something went wrong'))
  }
}

export function * deleteFarmInventory ({ data }) {
  const responseData = yield call(callDeleteFarmInventory, data)
  if (responseData?.status === 200 && responseData.data.status) {
    yield put(deleteFarmInventorySuccess(data))
  } else {
    yield put(deleteFarmInventoryFailure('Something went wrong'))
  }
}
export function * inventorySagas () {
  yield all([
    takeLatest('FETCH_FARM_ALL_INVENTORY_REQUEST', fetchFarmInventoryList),
    takeLatest('ADD_FARM_INVENTORY_REQUEST', addFarmInventory),
    takeLatest('UPDATE_FARM_INVENTORY_REQUEST', updateFarmInventory),
    takeLatest('DELETE_FARM_INVENTORY_REQUEST', deleteFarmInventory)
  ])
}
export default [inventorySagas]
