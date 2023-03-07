import { FETCH_SENSOR_DATA_PUSHER } from "./actionTypes";

export function fetchPusherSensorData(data) {
    console.log("action=======",data);
    return {
        type: FETCH_SENSOR_DATA_PUSHER,
        data
    };
}