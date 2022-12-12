import { call, all, put, takeLatest } from "redux-saga/effects";
import {callfetchFarmTaskDetails} from "../utils/api";
import {
    fetchFarmTaskSuccess,
    fetchFarmTaskFailure
} from "../actions/task";
export function* fetchFarmTaskList({ data }) {
  let responseData = yield call(callfetchFarmTaskDetails, data);
  if (responseData?.status == 200 && responseData.data.status) {
    yield put(fetchFarmTaskSuccess(responseData.data.data));
  } else {
    yield put(fetchFarmTaskFailure("Something went wrong"));
  }
}
export function* taskSagas() {
    yield all([
      takeLatest("FETCH_ALL_FARM_TASKS_REQUEST", fetchFarmTaskList),
   ]);
  }
  export default [taskSagas];
  
