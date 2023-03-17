import { fromJS } from "immutable";
import { FETCH_SENSOR_DATA_PUSHER_REQUEST, FETCH_SENSOR_DATA_PUSHER_FAILURE, FETCH_SENSOR_DATA_PUSHER_SUCCESS } from "../actions/actionTypes";
const INITIAL_STATE = fromJS({
  pusherData: [],
  isPusherDataLoading: false,
  pusherDataLoadingError: null
});

export default function pusherReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_SENSOR_DATA_PUSHER_REQUEST:
      return state
        .set("isPusherDataLoading", true)
        .set("pusherDataLoadingError", null);
    case FETCH_SENSOR_DATA_PUSHER_SUCCESS:
      let sensorData = state.toJS()["pusherData"];
      let idx = sensorData.findIndex((obj) => obj.device_id === action.data.device_id);
      if(idx>-1){
        sensorData[idx] = action.data;
      }else{
        sensorData.push(action.data);
      }
      return state
        .set("isPusherDataLoading", false)
        .set("pusherData", sensorData)
        .set("pusherDataLoadingError", null);
    case FETCH_SENSOR_DATA_PUSHER_FAILURE:
      return state
        .set("isPusherDataLoading", false)
        .set("pusherDataLoadingError", action.error);

    default:
      return state;
  }
}