import { fromJS } from "immutable";
import {
    FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_REQUEST,
    FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_SUCCESS,
    FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_FAILURE,
} from "../actions/actionTypes";

const INITIAL_STATE = fromJS({
  isZoneReportsListLoading: false,
  zoneReportsList: [],
  zoneReportsListError: null,
  
});

export default function zoneReportsReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_REQUEST:
      return state
        .set("isZoneReportsListLoading", true)
        .set("zoneReportsList", [])
        .set("zoneReportsListError", null);
    case FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_SUCCESS:
      return state
        .set("isZoneReportsListLoading", false)
        .set("zoneReportsList", action.data)
        .set("zoneReportsListError", null);
    case FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_FAILURE:
      return state
        .set("isZoneReportsListLoading", false)
        .set("zoneReportsList", [])
        .set("zoneReportsListError", action.error);
    default:
      return state;
  }
}
