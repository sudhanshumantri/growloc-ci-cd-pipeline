import { call, all, put, takeLatest } from "redux-saga/effects";
import { callfetchFarmZoneDetails} from "../utils/api";
import {
    fetchFarmZoneSuccess,
    fetchFarmZoneFailure,
} from "../actions/zone";

export function* fetchFarmZoneList({ data }) {
  let responseData = yield call(callfetchFarmZoneDetails, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchFarmZoneSuccess(responseData.data.data));
  } else {
    yield put(fetchFarmZoneFailure("Something went wrong"));
  }
}
export function* zoneSagas() {
  yield all([
    takeLatest("FETCH_ALL_FARM_ZONE_REQUEST", fetchFarmZoneList),
  
 ]);
}
export default [zoneSagas];
