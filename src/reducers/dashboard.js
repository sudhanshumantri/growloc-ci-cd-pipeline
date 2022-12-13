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
} from "../actions/actionTypes";
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
});
export default function dashboardReducer(state = INITIAL_STATE, action = {}) {
  let dashboardFarmList = state.toJS()["dashboardFarmList"];
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
    case ADD_TASK_REQUEST:
      return state
        .set("isTaskScheduleTaskLoading", true)
        .set("TaskScheduleTaskListError", null);
    case ADD_TASK_SUCCESS:
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
      const { farmdDetails } = dashboardFarmList;
      console.log(farmdDetails, "hello farm details");
      const taskRow = farmdDetails.Tasks.findIndex(
        (l) => l.id == action.data.taskId
      );
      const AUTH_OBJECT = JSON.parse(localStorage.getItem("AUTH_OBJECT"));
      const user = AUTH_OBJECT.profile;
      farmdDetails.Tasks[taskRow].TasksHistory.push({ ...action.data, user });
      return state
        .set("isFarmTaskCommentLoading", false)
        .set("dashboardFarmList", dashboardFarmList)
        .set("farmTaskCommentError", null);
    case ADD_FARM_TASKS_COMMENTS_FAILURE:
      return state
        .set("isFarmTaskCommentLoading", false)
        .set("farmTaskCommentError", action.error);
    default:
      return state;
  }
}
