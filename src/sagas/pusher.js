import {  put, all,takeLatest } from "redux-saga/effects";
import Pusher from 'pusher-js';
import {fetchPusherSensorData} from '../actions/pusher';

export function* fetchSensorDataPusher() {
    const pusher = new Pusher('74168d0c587988b1d7a3', {
        cluster: 'ap2',
        encrypted: true
      });
      const channel = pusher.subscribe('sensor-channel');
      channel.bind('sensor-event', data => {
        const sensorData =  data;
        console.log("data from saga pusher======",sensorData);
        localStorage.setItem("sendorData",sensorData.data);
        put(fetchPusherSensorData(sensorData.data));
      });
}
export function* pusherSagas() {
  yield all([
      takeLatest("FETCH_SENSOR_DATA_PUSHER", fetchSensorDataPusher)
      

  ]);
}
export default [pusherSagas];