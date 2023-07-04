import { call, all, put, takeLatest } from 'redux-saga/effects'
import {
  callfetchZoneReportsDetails,
  callFetchDashboardFarmReportsZoneAverageMortality,
  callFetchDashboardZoneTatTaskCategories
} from '../utils/api'
import {
  fetchZoneReportsSuccess,
  fetchZoneReportsFailure,
  fetchFarmReportsZoneAverageMortalitySuccess,
  fetchFarmReportsZoneAverageMortalityFailure,
  fetchFarmReportsZoneTatTaskCategoriesSuccess,
  fetchFarmReportsZoneTatTaskCategoriesFailure
} from '../actions/zonereports'

export function * fetchZoneReportsList ({ data }) {
  const responseData = yield call(callfetchZoneReportsDetails, data)
  if (responseData?.status === 200 && responseData.data.status) {
    yield put(fetchZoneReportsSuccess(responseData.data.data))
  } else {
    yield put(fetchZoneReportsFailure('Something went wrong'))
  }
}
export function * fetchZoneReportsAverageMortalityList ({ data }) {
  const responseData = yield call(
    callFetchDashboardFarmReportsZoneAverageMortality,
    data
  )
  if (responseData?.status === 200 && responseData.data.status) {
    yield put(
      fetchFarmReportsZoneAverageMortalitySuccess(responseData.data.data)
    )
  } else {
    yield put(
      fetchFarmReportsZoneAverageMortalityFailure('Something went wrong')
    )
  }
}

export function * fetchZoneReportZoneTatCategoriesList ({ data }) {
  const responseData = yield call(
    callFetchDashboardZoneTatTaskCategories,
    data
  )
  if (responseData?.status === 200 && responseData.data.status) {
    yield put(
      fetchFarmReportsZoneTatTaskCategoriesSuccess(responseData.data.data)
    )
  } else {
    yield put(
      fetchFarmReportsZoneTatTaskCategoriesFailure('Something went wrong')
    )
  }
}

export function * zoneReportsSagas () {
  yield all([
    takeLatest(
      'FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_REQUEST',
      fetchZoneReportsList
    ),
    takeLatest(
      'FETCH_FARM_REPORTS_ZONE_AVERAGE_MORTALITY_REQUEST',
      fetchZoneReportsAverageMortalityList
    ),
    takeLatest(
      'FETCH_FARM_REPORTS_ZONE_TAT_TASK_CATEGORIES_REQUEST',
      fetchZoneReportZoneTatCategoriesList
    )
  ])
}
export default [zoneReportsSagas]
