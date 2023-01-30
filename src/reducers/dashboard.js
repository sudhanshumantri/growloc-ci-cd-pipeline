import { fromJS } from "immutable";
import {
  FETCH_ALL_DASHBOARD_FARM_REQUEST,
  FETCH_ALL_DASHBOARD_FARM_SUCCESS,
  FETCH_ALL_DASHBOARD_FARM_FAILURE,
  FETCH_ALL_DASHBOARD_HARVEST_REQUEST,
  FETCH_ALL_DASHBOARD_HARVEST_SUCCESS,
  FETCH_ALL_DASHBOARD_HARVEST_FAILURE,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  ADD_FARM_TASKS_COMMENTS_REQUEST,
  ADD_FARM_TASKS_COMMENTS_SUCCESS,
  ADD_FARM_TASKS_COMMENTS_FAILURE,
  ADD_FARM_DASHBOARD_ZONE_REQUEST,
  ADD_FARM_DASHBOARD_ZONE_SUCCESS,
  ADD_FARM_DASHBOARD_ZONE_FAILURE,
  FETCH_ALL_FARM_DASHBOARD_ZONE_REQUEST,
  FETCH_ALL_FARM_DASHBOARD_ZONE_SUCCESS,
  FETCH_ALL_FARM_DASHBOARD_ZONE_FAILURE,
  UPDATE_FARM_DASHBOARD_ZONE_REQUEST,
  UPDATE_FARM_DASHBOARD_ZONE_SUCCESS,
  UPDATE_FARM_DASHBOARD_ZONE_FAILURE,
  DELETE_FARM_DASHBOARD_ZONE_REQUEST,
  DELETE_FARM_DASHBOARD_ZONE_SUCCESS,
  DELETE_FARM_DASHBOARD_ZONE_FAILURE
} from "../actions/actionTypes";
import login from "../sagas/login";
const INITIAL_STATE = fromJS({
  isDashboardFarmListLoading: false,
  dashboardFarmList: {},
  DashboardFarmListError: null,
  isDashboardHarvestListLoading: false,
  DashboardHarvestListError: null,
  dashboardHarvestList: [],
  isTaskScheduleTaskLoading: false,
  TaskScheduleTaskListError: null,
  isFarmTaskCommentLoading: false,
  farmTaskCommentError: null,
  isFarmDashboardZoneLoading:false,
  farmDashboardZoneError:null,
  farmDashboardZoneList:[],
  isFarmDashboardZoneListLoading:false,
  farmDashboardZoneListError:null,
  isUpdateFarmDashboardZoneLoading:false,
  updateFarmDashboardZoneError:null,
  isDeleteFarmDashboardZoneLoading:false,
  deleteFarmDashboardZoneError:false,
});
export default function dashboardReducer(state = INITIAL_STATE, action = {}) {
  let dashboardFarmList = state.toJS()["dashboardFarmList"];
  let farmDashboardZoneList = state.toJS()["farmDashboardZoneList"]
  const { farmdDetails } = dashboardFarmList;
  const AUTH_OBJECT = JSON.parse(localStorage.getItem("AUTH_OBJECT"));

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
    //
    case FETCH_ALL_FARM_DASHBOARD_ZONE_REQUEST:
      return state
        .set("isFarmDashboardZoneListLoading", true)
        .set("farmDashboardZoneList",[])
        .set("farmDashboardZoneListError", null);
    case FETCH_ALL_FARM_DASHBOARD_ZONE_SUCCESS:
      return state
        .set("isFarmDashboardZoneListLoading", false)
        .set("farmDashboardZoneList", action.data)
        .set("farmDashboardZoneListError", null);
    case FETCH_ALL_FARM_DASHBOARD_ZONE_FAILURE:
      return state
        .set("isFarmDashboardZoneListLoading", false)
        .set("farmDashboardZoneList", {})
        .set("farmDashboardZoneListError", action.error);
    //
    case ADD_TASK_REQUEST:
      return state
        .set("isTaskScheduleTaskLoading", true)
        .set("TaskScheduleTaskListError", null);
    case ADD_TASK_SUCCESS:
      const createdByProfile = AUTH_OBJECT.profile
      farmdDetails.Tasks.push({ ...action.data, createdByProfile, TasksHistory: [] });
      return state
        .set("isTaskScheduleTaskLoading", false)
        .set("dashboardFarmList", dashboardFarmList)
        .set("TaskScheduleTaskListError", null);
    case ADD_TASK_FAILURE:
      return state
        .set("isTaskScheduleTaskLoading", false)
        .set("TaskScheduleTaskListError", action.error);
    //
    case ADD_FARM_TASKS_COMMENTS_REQUEST:
      return state
        .set("isFarmTaskCommentLoading", true)
        .set("farmTaskCommentError", null);
    case ADD_FARM_TASKS_COMMENTS_SUCCESS:
      const taskRow = farmdDetails.Tasks.findIndex(
        (l) => l.id == action.data.taskId
      );
      const user = AUTH_OBJECT.profile;
      farmdDetails.Tasks[taskRow].TasksHistory.push({ ...action.data, user, comments:[] });
      return state
        .set("isFarmTaskCommentLoading", false)
        .set("dashboardFarmList", dashboardFarmList)
        .set("farmTaskCommentError", null);
      case ADD_FARM_TASKS_COMMENTS_FAILURE:
      return state
        .set("isFarmTaskCommentLoading", false)
        .set("farmTaskCommentError", action.error);
        //
        case ADD_FARM_DASHBOARD_ZONE_REQUEST:
          return state
            .set("isFarmDashboardZoneLoading", true)
            .set("farmDashboardZoneError", null);
        case ADD_FARM_DASHBOARD_ZONE_SUCCESS:
          const newZone = {...action.data}
          farmDashboardZoneList.push(newZone)
          return state
            .set("isFarmDashboardZoneLoading", false)
            .set("farmDashboardZoneList", farmDashboardZoneList)
            .set("farmDashboardZoneError", null);
        case ADD_FARM_DASHBOARD_ZONE_FAILURE:
          return state
            .set("isFarmDashboardZoneLoading", false)
            .set("farmDashboardZoneError", action.error);
          case UPDATE_FARM_DASHBOARD_ZONE_REQUEST:
            return state
              .set("isUpdateFarmDashboardZoneLoading", true)
              .set("updataFarmDashboardZoneError", null);
          case UPDATE_FARM_DASHBOARD_ZONE_SUCCESS:
            const { data} = action.data;
         const index = farmDashboardZoneList.findIndex((zone) => zone.id === data.id);
         farmDashboardZoneList[index] = data;
            return state
            .set("isUpdateFarmDashboardZoneLoading", false)
            .set("farmDashboardZoneList", farmDashboardZoneList)
            .set("updataFarmDashboardZoneError", null);
          case UPDATE_FARM_DASHBOARD_ZONE_FAILURE:
            return state
              .set("isUpdataFarmDashboardZoneLoading", false)
              .set("updataFarmDashboardZoneError", true);
          case DELETE_FARM_DASHBOARD_ZONE_REQUEST:
            return state
              .set("isDeleteFarmDashboardZoneLoading", true)
              .set("deleteFarmDashboardZoneError", null);
          case DELETE_FARM_DASHBOARD_ZONE_SUCCESS:
            const  id = action.data;
            const filteredList = farmDashboardZoneList.filter((zone) => zone.id !== id);
            return state
              .set("isDeleteFarmDashboardZoneLoading", false)
              .set("farmDashboardZoneList",filteredList)
              .set("deleteFarmDashboardZoneError", null);
          case DELETE_FARM_DASHBOARD_ZONE_FAILURE:
            return state.set("farmDashboardZoneList","");
    default:
      return state;
  }
}
