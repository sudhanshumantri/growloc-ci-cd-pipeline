import { fromJS } from "immutable";
import {
    FETCH_ALL_ZONE_TASKS_REQUEST,
    FETCH_ALL_ZONE_TASKS_SUCCESS,
    FETCH_ALL_ZONE_TASKS_FAILURE,
} from "../../actions/actionTypes";
const INITIAL_STATE = fromJS({
  isZoneTaskListLoading: false,
  zoneTaskList: [],
  zoneTaskListError: null,
});
export default function zoneTaskReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_ALL_ZONE_TASKS_REQUEST:
      return state
        .set("isZoneTaskListLoading", true)
        .set("zoneTaskList", [])
        .set("FarmTaskListError", null);
    case FETCH_ALL_ZONE_TASKS_SUCCESS:
      return state
        .set("isZoneTaskListLoading", false)
        .set("zoneTaskList", action.data)
        .set("FarmTaskListError", null);
    case FETCH_ALL_ZONE_TASKS_FAILURE:
      return state
        .set("isZoneTaskListLoading", false)
        .set("zoneTaskList", [])
        .set("zoneTaskListError", action.error);
    default:
      return state;
  }
}
