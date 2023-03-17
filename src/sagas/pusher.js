import { put, all, takeLatest, call } from "redux-saga/effects";
import Pusher from 'pusher-js';
import { fetchPusherFailure, fetchPusherSuccess } from '../actions/pusher';
import { getPusherData } from "../utils/pusher";

export function* fetchSensorDataPusher({ data }) {
   if(data){
    yield put(fetchPusherSuccess(data));
   }else{
    yield put(fetchPusherFailure("Something went wrong"));
   }

}
export function* pusherSagas() {
  yield all([
    takeLatest("FETCH_SENSOR_DATA_PUSHER_REQUEST", fetchSensorDataPusher)


  ]);
}
export default [pusherSagas];