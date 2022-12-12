import { fromJS } from "immutable";
import {
    FETCH_ALL_FARM_TASKS_REQUEST,
    FETCH_ALL_FARM_TASKS_SUCCESS,
    FETCH_ALL_FARM_TASKS_FAILURE,
} from "../actions/actionTypes";

const INITIAL_STATE = fromJS({
  isFarmTaskListLoading: false,
  FarmTaskList: [],
  FarmTaskListError: null,
});

export default function taskReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_ALL_FARM_TASKS_REQUEST:
      return state
        .set("isFarmTaskListLoading", true)
        .set("FarmTaskList", [])
        .set("FarmTaskListError", null);
    case FETCH_ALL_FARM_TASKS_SUCCESS:
      return state
        .set("isFarmTaskListLoading", false)
        .set("FarmTaskList", action.data)
        .set("FarmTaskListError", null);
    case FETCH_ALL_FARM_TASKS_FAILURE:
      return state
        .set("isFarmTaskListLoading", false)
        .set("FarmTaskList", [])
        .set("FarmTaskListError", action.error);
    default:
      return state;
  }
}
