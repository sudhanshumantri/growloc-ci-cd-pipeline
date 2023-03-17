import { fromJS } from "immutable";
import {
  FETCH_ALL_FARM_ZONE_REQUEST,
  FETCH_ALL_FARM_ZONE_SUCCESS,
  FETCH_ALL_FARM_ZONE_FAILURE,
  FETCH_ALL_FARM_ZONE_DASHBOARD_REQUEST,
  FETCH_ALL_FARM_ZONE_DASHBOARD_SUCCESS,
  FETCH_ALL_FARM_ZONE_DASHBOARD_FAILURE,
  FETCH_ALL_FARM_ZONE_DASHBOARD_HARVEST_REQUEST,
  FETCH_ALL_FARM_ZONE_DASHBOARD_HARVEST_SUCCESS,
  FETCH_ALL_FARM_ZONE_DASHBOARD_HARVEST_FAILURE,
  ADD_FARM_DASHBOARD_ZONE_TASK_REQUEST,
  ADD_FARM_DASHBOARD_ZONE_TASK_SUCCESS,
  ADD_FARM_DASHBOARD_ZONE_TASK_FAILURE,
  ADD_FARM_DASHOBARD_ZONE_TASKS_COMMENT_REQUEST,
  ADD_FARM_DASHOBARD_ZONE_TASKS_COMMENT_SUCCESS,
  ADD_FARM_DASHOBARD_ZONE_TASKS_COMMENT_FAILURE,
  FETCH_RECENT_ZONE_SENSOR_DATA_REQUEST,
  FETCH_RECENT_ZONE_SENSOR_DATA_SUCCESS,
  FETCH_RECENT_ZONE_SENSOR_DATA_FAILURE,
} from "../actions/actionTypes";

const INITIAL_STATE = fromJS({
  isFarmZoneLoading: false,
  farmZoneList: [],
  farmZoneError: null,
  isFarmZoneDashboardListLoading: false,
  farmZoneDashboardListError: null,
  farmZoneDashboardList: [],
  farmZoneDashboardHarvestList: [],
  isFarmZoneDashboardHarvestListLoading: false,
  farmZoneDashboardHarvestListError: false,
  isFarmDashboardZoneTaskLoading: false,
  farmDashboardZoneTaskError: null,
  isFarmDashboardZoneCommetLoading: false,
  farmDashboardZoneCommetError: null,
  isRecentZoneSensorDataLoading: false,
  recentZoneSensorData: {},
  recentZoneSensorDataError: null,
});

export default function zoneReducer(state = INITIAL_STATE, action = {}) {
  let farmZoneDashboardList = state.toJS()["farmZoneDashboardList"];
  const { farmdDetails } = farmZoneDashboardList;
  const AUTH_OBJECT = JSON.parse(localStorage.getItem("AUTH_OBJECT"));

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
    //
    case FETCH_ALL_FARM_ZONE_DASHBOARD_REQUEST:
      return state
        .set("isFarmZoneDashboardListLoading", true)
        .set("farmZoneDashboardList", [])
        .set("farmZoneDashboardListError", null);
    case FETCH_ALL_FARM_ZONE_DASHBOARD_SUCCESS:
      return state
        .set("isFarmZoneDashboardListLoading", false)
        .set("farmZoneDashboardList", action.data)
        .set("farmZoneDashboardListError", null);
    case FETCH_ALL_FARM_ZONE_DASHBOARD_FAILURE:
      return state
        .set("isFarmZoneDashboardListLoading", false)
        .set("farmZoneDashboardList", [])
        .set("farmZoneDashboardListError", action.error);
    //
    case FETCH_ALL_FARM_ZONE_DASHBOARD_HARVEST_REQUEST:
      return state
        .set("isFarmZoneDashboardHarvestListLoading", true)
        .set("farmZoneDashboardHarvestList", [])
        .set("farmZoneDashboardHarvestListError", null);
    case FETCH_ALL_FARM_ZONE_DASHBOARD_HARVEST_SUCCESS:
      return state
        .set("isFarmZoneDashboardHarvestListLoading", false)
        .set("farmZoneDashboardHarvestList", action.data)
        .set("farmZoneDashboardHarvestListError", null);
    case FETCH_ALL_FARM_ZONE_DASHBOARD_HARVEST_FAILURE:
      return state
        .set("isFarmZoneDashboardHarvestListLoading", false)
        .set("farmZoneDashboardHarvestList", [])
        .set("farmZoneDashboardHarvestListError", action.error);
    //
    case ADD_FARM_DASHBOARD_ZONE_TASK_REQUEST:
      return state
        .set("isFarmDashboardZoneTaskLoading", true)
        .set("farmDashboardZoneTaskError", null);
    case ADD_FARM_DASHBOARD_ZONE_TASK_SUCCESS:
      const createdByProfile = AUTH_OBJECT.profile
      farmdDetails.Tasks.push({ ...action.data, createdByProfile });
      return state
        .set("isFarmDashboardZoneTaskLoading", false)
        .set("farmZoneDashboardList", farmZoneDashboardList)
        .set("farmDashboardZoneTaskError", null);
    case ADD_FARM_DASHBOARD_ZONE_TASK_FAILURE:
      return state
        .set("isFarmDashboardZoneTaskLoading", false)
        .set("farmDashboardZoneTaskError", action.error);
    //
    case ADD_FARM_DASHOBARD_ZONE_TASKS_COMMENT_REQUEST:
      return state
        .set("isFarmDashboardZoneCommetLoading", true)
        .set("farmDashboardZoneCommetError", null);
    case ADD_FARM_DASHOBARD_ZONE_TASKS_COMMENT_SUCCESS:
      const zoneTaskRow = farmdDetails.Tasks.findIndex(
        (zone) => zone.id == action.data.taskId
      );
      const user = AUTH_OBJECT.profile;
      farmdDetails.Tasks[zoneTaskRow].TasksHistory.push({ ...action.data, user });
      return state
        .set("isFarmDashboardZoneCommetLoading", false)
        .set("farmZoneDashboardList", farmZoneDashboardList)
        .set("farmDashboardZoneCommetError", null);
    case ADD_FARM_DASHOBARD_ZONE_TASKS_COMMENT_FAILURE:
      return state
        .set("isFarmDashboardZoneCommetLoading", false)
        .set("farmDashboardZoneCommetError", action.error);
    //
    case FETCH_RECENT_ZONE_SENSOR_DATA_REQUEST:
     
      return state
        .set("isRecentZoneSensorDataLoading", true)
        .set("recentZoneSensorData", {})
        .set("recentZoneSensorDataError", null);
    case FETCH_RECENT_ZONE_SENSOR_DATA_SUCCESS:
     
      return state
        .set("isRecentZoneSensorDataLoading", false)
        .set("recentZoneSensorData", action.data)
        .set("recentZoneSensorDataError", null);
    case FETCH_RECENT_ZONE_SENSOR_DATA_FAILURE:
      return state
        .set("isRecentZoneSensorDataLoading", false)
        .set("recentZoneSensorData", {})
        .set("recentZoneSensorDataError", action.error);
    default:
      return state;
  }
}
