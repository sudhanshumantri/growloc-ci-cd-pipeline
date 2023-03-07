import { fromJS } from "immutable";
import { FETCH_SENSOR_DATA_PUSHER } from "../actions/actionTypes";
import Pusher from 'pusher-js';
const INITIAL_STATE = fromJS({
  sensorData : [],
});

export default function pusherReducer(state=INITIAL_STATE,action={}){
 
  switch (action.type) {
    case FETCH_SENSOR_DATA_PUSHER:
      console.log("reducer======",action.data,action.type);
      return state
      .set("sensorData",action.data);
  
    default:
        return state;
  }
}