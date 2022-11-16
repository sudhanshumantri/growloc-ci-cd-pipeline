import { fromJS } from "immutable";
import {
    FETCH_ALL_DASHBOARD_FARM_REQUEST,
    FETCH_ALL_DASHBOARD_FARM_SUCCESS,
    FETCH_ALL_DASHBOARD_FARM_FAILURE,
    FETCH_ALL_DASHBOARD_HARVEST_REQUEST,
    FETCH_ALL_DASHBOARD_HARVEST_SUCCESS,
    FETCH_ALL_DASHBOARD_HARVEST_FAILURE,
} from "../actions/actionTypes";
const INITIAL_STATE = fromJS({
  isDashboardFarmListLoading: false,
  dashboardFarmList: {},
  DashboardFarmListError: null,
  isDashboardHarvestListLoading:false,
  DashboardHarvestListError:null,
  dashboardHarvestList : [],
});
export default function dashboardReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_ALL_DASHBOARD_FARM_REQUEST:
      return state
        .set("isDashboardFarmListLoading", true)
        .set("dashboardFarmList", [])
        .set("DashboardFarmListError", null);
    case FETCH_ALL_DASHBOARD_FARM_SUCCESS:
      return state
        .set("isDashboardFarmListLoading", false)
        .set("dashboardFarmList", action.data)
        .set("DashboardFarmListError", null);
    case FETCH_ALL_DASHBOARD_FARM_FAILURE:
      return state
        .set("isDashboardFarmListLoading", false)
        .set("dashboardFarmList", [])
        .set("DashboardFarmListError", action.error);
//
        case FETCH_ALL_DASHBOARD_HARVEST_REQUEST:
          return state
            .set("isDashboardHarvestListLoading", true)
            .set("dashboardHarvestList", [])
            .set("DashboardHarvestListError", null);
        case FETCH_ALL_DASHBOARD_HARVEST_SUCCESS:
          return state
            .set("isDashboardHarvestListLoading", false)
            .set("dashboardHarvestList", action.data)
            .set("DashboardHarvestListError", null);
        case FETCH_ALL_DASHBOARD_HARVEST_FAILURE:
          return state
            .set("isDashboardHarvestListLoading", false)
            .set("dashboardHarvestList", [])
            .set("DashboardHarvestListError", action.error);
  
    default:
      return state;
  }
}