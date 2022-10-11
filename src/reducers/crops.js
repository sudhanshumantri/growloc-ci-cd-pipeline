import { fromJS } from "immutable";
import {
  FETCH_ALL_CROPS_REQUEST,
  FETCH_ALL_CROPS_SUCCESS,
  FETCH_ALL_CROPS_FAILURE,
} from "../actions/actionTypes";
const INITIAL_STATE = fromJS({
  isCropListLoading: true,
  cropList: [],
  cropListError: null,
});
export default function cropsReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_ALL_CROPS_REQUEST:
      return state
        .set("isCropListLoading", true)
        .set("cropList", [])
        .set("cropListError", null);
    case FETCH_ALL_CROPS_SUCCESS:
      return state
        .set("isCropListLoading", false)
        .set("cropList", action.data)
        .set("cropListError", null);
    case FETCH_ALL_CROPS_FAILURE:
      return state
        .set("isCropListLoading", false)
        .set("cropList", [])
        .set("cropListError", action.error);
    default:
      return state;
  }
}
