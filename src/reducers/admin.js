import { fromJS } from "immutable";
import {
    FETCH_ALL_ADMIN_DASHBOARD_REQUEST,
    FETCH_ALL_ADMIN_DASHBOARD_SUCCESS,
    FETCH_ALL_ADMIN_DASHBOARD_FAILURE,
} from "../actions/actionTypes";
const INITIAL_STATE = fromJS({
  isAdminListLoading: false,
  adminList: [],
  adminListError: null,
  
});
export default function farmReducer(state = INITIAL_STATE, action = {}) {
  let farmList = state.toJS()["farmList"];
  switch (action.type) {
    case FETCH_ALL_ADMIN_DASHBOARD_REQUEST:
      return state
        .set("isAdminListLoading", true)
        .set("adminList", [])
        .set("adminListError", null);
    case FETCH_ALL_ADMIN_DASHBOARD_SUCCESS:
      return state
        .set("isAdminListLoading", false)
        .set("adminList", action.data)
        .set("adminListError", null);
    case FETCH_ALL_ADMIN_DASHBOARD_FAILURE:
      return state
        .set("isAdminListLoading", false)
        .set("adminList", [])
        .set("adminListError", action.error);
    default:
      return state;
  }
}
