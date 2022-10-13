import { fromJS } from "immutable";
import {
  FETCH_ALL_FARM_REQUEST,
  FETCH_ALL_FARM_SUCCESS,
  FETCH_ALL_FARM_FAILURE,
  ADD_FARM_REQUEST,
  ADD_FARM_SUCCESS,
  ADD_FARM_FAILURE,
} from "../actions/actionTypes";
const INITIAL_STATE = fromJS({
  isFarmListLoading: false,
  isAddFarmLoading: false,
  addFarmError: null,
  farmList: [],
  FarmListError: null,
});
export default function farmReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_ALL_FARM_REQUEST:
      return state
        .set("isFarmListLoading", true)
        .set("farmList", [])
        .set("FarmListError", null);
    case FETCH_ALL_FARM_SUCCESS:
      return state
        .set("isFarmListLoading", false)
        .set("farmList", action.data)
        .set("FarmListError", null);
    case FETCH_ALL_FARM_FAILURE:
      return state
        .set("isFarmListLoading", false)
        .set("farmList", [])
        .set("FarmListError", action.error);
    case ADD_FARM_REQUEST:
      return state.set("isAddFarmLoading", true).set("addFarmError", null);
    case ADD_FARM_SUCCESS:
      return state.set("isAddFarmLoading", false).set("addFarmError", null);
    case ADD_FARM_FAILURE:
      return state
        .set("isAddFarmLoading", false)
        .set("addFarmError", action.error);
    default:
      return state;
  }
}
