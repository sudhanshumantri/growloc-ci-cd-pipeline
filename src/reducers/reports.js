import { fromJS } from "immutable";
import {
    FETCH_ALL_FARM_REPORTS_DATA_REQUEST,
    FETCH_ALL_FARM_REPORTS_DATA_SUCCESS,
    FETCH_ALL_FARM_REPORTS_DATA_FAILURE,
  
} from "../actions/actionTypes";

const INITIAL_STATE = fromJS({
  isFarmReportsListLoading: false,
  farmReportsList: [],
  farmReportsListError: null,
  
});

export default function reportsReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_ALL_FARM_REPORTS_DATA_REQUEST:
      return state
        .set("isFarmReportsListLoading", true)
        .set("farmReportsList", [])
        .set("farmReportsListError", null);
    case FETCH_ALL_FARM_REPORTS_DATA_SUCCESS:
      return state
        .set("isFarmReportsListLoading", false)
        .set("farmReportsList", action.data)
        .set("farmReportsListError", null);
    case FETCH_ALL_FARM_REPORTS_DATA_FAILURE:
      return state
        .set("isFarmReportsListLoading", false)
        .set("farmReportsList", [])
        .set("farmReportsListError", action.error);
    default:
      return state;
  }
}
