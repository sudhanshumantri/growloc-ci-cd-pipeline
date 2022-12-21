import { fromJS } from "immutable";
import {
    FETCH_ALL_FARM_ZONE_REQUEST,
    FETCH_ALL_FARM_ZONE_SUCCESS,
    FETCH_ALL_FARM_ZONE_FAILURE,
} from "../actions/actionTypes";

const INITIAL_STATE = fromJS({
  isFarmZoneLoading: false,
  farmZoneList: [],
  farmZoneError: null,
});

export default function zoneReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_ALL_FARM_ZONE_REQUEST:
      return state
        .set("isFarmZoneLoading", true)
        .set("farmZoneList", [])
        .set("farmZoneError", null);
    case FETCH_ALL_FARM_ZONE_SUCCESS:
      return state
        .set("isFarmZoneLoading", false)
        .set("farmZoneList", action.data)
        .set("farmZoneError", null);
    case FETCH_ALL_FARM_ZONE_FAILURE:
      return state
        .set("isFarmZoneLoading", false)
        .set("farmZoneList", [])
        .set("farmZoneError", action.error);
    default:
      return state;
  }
}
