import { fromJS } from "immutable";
import {
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
  DELETE_FARM_DASHBOARD_ZONE_FAILURE,
  FETCH_ALL_USER_ZONE_SENSORS_REQUEST,
  FETCH_ALL_USER_ZONE_SENSORS_SUCCESS,
  FETCH_ALL_USER_ZONE_SENSORS_FAILURE,
  FETCH_FARM_DASHBOARD_FARM_INFO_REQUEST,
  FETCH_FARM_DASHBOARD_FARM_INFO_SUCCESS,
  FETCH_FARM_DASHBOARD_FARM_INFO_FAILURE,
  FETCH_FARM_DASHBOARD_CROP_SCHEDULES_REQUEST,
  FETCH_FARM_DASHBOARD_CROP_SCHEDULES_SUCCESS,
  FETCH_FARM_DASHBOARD_CROP_SCHEDULES_FAILURE,
  FETCH_FARM_DASHBOARD_INFO_REQUEST,
  FETCH_FARM_DASHBOARD_INFO_SUCCESS,
  FETCH_FARM_DASHBOARD_INFO_FAILURE,
  FETCH_FARM_DASHBOARD_TASK_REQUEST,
  FETCH_FARM_DASHBOARD_TASK_SUCCESS,
  FETCH_FARM_DASHBOARD_TASK_FAILURE,
  FETCH_FARM_DASHBOARD_FARM_UTILIZATION_CROP_REQUEST,
  FETCH_FARM_DASHBOARD_FARM_UTILIZATION_CROP_SUCCESS,
  FETCH_FARM_DASHBOARD_FARM_UTILIZATION_CROP_FAILURE,
  FETCH_FARM_DASHBOARD_FARM_UTILIZATION_STAGES_REQUEST,
  FETCH_FARM_DASHBOARD_FARM_UTILIZATION_STAGES_SUCCESS,
  FETCH_FARM_DASHBOARD_FARM_UTILIZATION_STAGES_FAILURE,
  FETCH_FARM_DASHBOARD_ZONE_SENSOR_DATA_REQUEST,
  FETCH_FARM_DASHBOARD_ZONE_SENSOR_DATA_SUCCESS,
  FETCH_FARM_DASHBOARD_ZONE_SENSOR_DATA_FAILURE,
  FETCH_FARM_DASHBOARD_ZONE_LATTEST_SENSOR_DATA_REQUEST,
  FETCH_FARM_DASHBOARD_ZONE_LATTEST_SENSOR_DATA_SUCCESS,
  FETCH_FARM_DASHBOARD_ZONE_LATTEST_SENSOR_DATA_FAILURE,
  FETCH_FARM_DASHBOARD_ALL_ZONE_DETAILS_REQUEST,
  FETCH_FARM_DASHBOARD_ALL_ZONE_DETAILS_SUCCESS,
  FETCH_FARM_DASHBOARD_ALL_ZONE_DETAILS_FAILURE,
} from "../actions/actionTypes";
const INITIAL_STATE = fromJS({
  isDashboardHarvestListLoading: false,
  DashboardHarvestListError: null,
  dashboardHarvestList: [],
  isTaskScheduleTaskLoading: false,
  TaskScheduleTaskListError: null,
  isFarmTaskCommentLoading: false,
  farmTaskCommentError: null,
  isFarmDashboardZoneLoading: false,
  farmDashboardZoneError: null,
  farmDashboardZoneList: [],
  isFarmDashboardZoneListLoading: false,
  farmDashboardZoneListError: null,
  isUpdateFarmDashboardZoneLoading: false,
  updateFarmDashboardZoneError: null,
  isDeleteFarmDashboardZoneLoading: false,
  deleteFarmDashboardZoneError: false,
  isZoneSensorLoading: false,
  allZoneSensorList: [],
  loadingAllZoneSensorError: null,
  isDashboardFarmInfoListLoading: false,
  farmDashboardFarmInfoList: {},
  farmDashboardFarmInfoListError: null,
  isDashboardCropSchedulesListLoading: false,
  farmDashboardCropSchedulesList: [],
  farmDashboardCropSchedulesListError: null,
  isDashboardInfoListLoading: false,
  farmDashboardInfoList: {},
  farmDashboardInfoListError: null,
  isDashboardFarmTaskLoading: false,
  farmDashboardTaskList: {},
  farmDashboardTaskListError: null,
  isFarmDashboardFarmUtilizationCropsLoading: false,
  farmDashboardFarmUtilizationCropsList: {},
  FarmDashboardFarmUtilizationCropsError: null,
  isFarmDashboardFarmUtilizationStagesLoading: false,
  farmDashboardFarmUtilizationStagesList: [],
  farmDashboardFarmUtilizationStagesError: null,
  isFarmDashboardZoneSensorLoading: false,
  farmDashboardZoneSensorList: {},
  farmDashboardZoneSensorListError: false,
  isFarmDashboardZoneLattestSensorLoading: false,
  farmDashboardZoneLattestSensorList: {},
  farmDashboardZoneLattestSensorListError: false,
  isFarmDashboardAllZoneDetailsLoading:false,
  farmDashboardAllZoneDetailsList:[],
  farmDashboardAllZoneDetailsListError:false,


});
export default function dashboardReducer(state = INITIAL_STATE, action = {}) {
  let farmDashboardZoneList = state.toJS()["farmDashboardZoneList"];
  let farmDashboardTaskList = state.toJS()["farmDashboardTaskList"];
  const AUTH_OBJECT = JSON.parse(localStorage.getItem("AUTH_OBJECT"));

  switch (action.type) {
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
        .set("farmDashboardZoneList", [])
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
      const createdByProfile = AUTH_OBJECT.profile;
      farmDashboardTaskList.tasks.push({
        ...action.data,
        createdByProfile,
        TasksHistory: [],
      });
      return state
        .set("isTaskScheduleTaskLoading", false)
        .set("farmDashboardTaskList", farmDashboardTaskList)
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
      const taskRow = farmDashboardTaskList.tasks.findIndex(
        (l) => l.id == action.data.taskId
      );
      const user = AUTH_OBJECT.profile;
      farmDashboardTaskList.tasks[taskRow].TasksHistory.push({
        ...action.data,
        user,
        comments: [],
      });
      farmDashboardTaskList.tasks[taskRow].status = "In review";
      return state
        .set("isFarmTaskCommentLoading", false)
        .set("farmDashboardTaskList", farmDashboardTaskList)
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
      const newZone = { ...action.data };
      farmDashboardZoneList.zoneInformation.push(newZone);
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
      const { data } = action.data;
      const index = farmDashboardZoneList.zoneInformation.findIndex(
        (zone) => zone.zone_internal_id === data.zone_internal_id
      );
      farmDashboardZoneList.zoneInformation[index] = data;
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
      const id = action.data;
      const filteredList = farmDashboardZoneList.zoneInformation.filter(
        (zone) => zone.zone_internal_id !== id
      );
      let newfarmDashboardZoneList = {
        ...farmDashboardZoneList,
        zoneInformation: filteredList,
      };
      return state
        .set("isDeleteFarmDashboardZoneLoading", false)
        .set("farmDashboardZoneList", newfarmDashboardZoneList)
        .set("deleteFarmDashboardZoneError", null);
    case DELETE_FARM_DASHBOARD_ZONE_FAILURE:
      return state.set("farmDashboardZoneList", "");
    //
    case FETCH_ALL_USER_ZONE_SENSORS_REQUEST:
      return state
        .set("isZoneSensorLoading", true)
        .set("allZoneSensorList", [])
        .set("loadingAllZoneSensorError", null);
    case FETCH_ALL_USER_ZONE_SENSORS_SUCCESS:
      return state
        .set("isZoneSensorLoading", false)
        .set("allZoneSensorList", action.data)
        .set("loadingAllZoneSensorError", null);
    case FETCH_ALL_USER_ZONE_SENSORS_FAILURE:
      return state
        .set("isZoneSensorLoading", false)
        .set("allZoneSensorList", [])
        .set("loadingAllZoneSensorError", action.error);

    // dashboard new api
    case FETCH_FARM_DASHBOARD_FARM_INFO_REQUEST:
      return state
        .set("isDashboardFarmInfoListLoading", true)
        .set("farmDashboardFarmInfoList", {})
        .set("DashboardFarmInfoListError", null);
    case FETCH_FARM_DASHBOARD_FARM_INFO_SUCCESS:
      return state
        .set("isDashboardFarmInfoListLoading", false)
        .set("farmDashboardFarmInfoList", action.data)
        .set("DashboardFarmInfoListError", null);
    case FETCH_FARM_DASHBOARD_FARM_INFO_FAILURE:
      return state
        .set("isDashboardFarmInfoListLoading", false)
        .set("farmDashboardFarmInfoList", [])
        .set("DashboardFarmInfoListError", action.error);

    case FETCH_FARM_DASHBOARD_CROP_SCHEDULES_REQUEST:
      return state
        .set("isDashboardCropSchedulesListLoading", true)
        .set("farmDashboardCropSchedulesList", [])
        .set("farmDashboardCropSchedulesListError", null);
    case FETCH_FARM_DASHBOARD_CROP_SCHEDULES_SUCCESS:
      return state
        .set("isDashboardCropSchedulesListLoading", false)
        .set("farmDashboardCropSchedulesList", action.data)
        .set("farmDashboardCropSchedulesListError", null);
    case FETCH_FARM_DASHBOARD_CROP_SCHEDULES_FAILURE:
      return state
        .set("isDashboardCropSchedulesListLoading", false)
        .set("farmDashboardCropSchedulesList", [])
        .set("farmDashboardCropSchedulesListError", action.error);
    //
    case FETCH_FARM_DASHBOARD_INFO_REQUEST:
      return state
        .set("isDashboardInfoListLoading", true)
        .set("farmDashboardInfoList", {})
        .set("farmDashboardInfoListError", null);
    case FETCH_FARM_DASHBOARD_INFO_SUCCESS:
      return state
        .set("isDashboardInfoListLoading", false)
        .set("farmDashboardInfoList", action.data)
        .set("farmDashboardInfoListError", null);
    case FETCH_FARM_DASHBOARD_INFO_FAILURE:
      return state
        .set("isDashboardInfoListLoading", false)
        .set("farmDashboardInfoList", [])
        .set("farmDashboardInfoListError", action.error);
    //
    case FETCH_FARM_DASHBOARD_TASK_REQUEST:
      return state
        .set("isDashboardFarmTaskLoading", true)
        .set("farmDashboardTaskList", {})
        .set("farmDashboardTaskListError", null);
    case FETCH_FARM_DASHBOARD_TASK_SUCCESS:
      return state
        .set("isDashboardFarmTaskLoading", false)
        .set("farmDashboardTaskList", action.data)
        .set("farmDashboardTaskListError", null);
    case FETCH_FARM_DASHBOARD_TASK_FAILURE:
      return state
        .set("isDashboardFarmTaskLoading", false)
        .set("farmDashboardTaskList", [])
        .set("farmDashboardTaskListError", action.error);
    //

    case FETCH_FARM_DASHBOARD_FARM_UTILIZATION_CROP_REQUEST:
      return state
        .set("isFarmDashboardFarmUtilizationCropsLoading", true)
        .set("farmDashboardFarmUtilizationCropsList", {})
        .set("FarmDashboardFarmUtilizationCropsError", null);
    case FETCH_FARM_DASHBOARD_FARM_UTILIZATION_CROP_SUCCESS:
      return state
        .set("isFarmDashboardFarmUtilizationCropsLoading", false)
        .set("farmDashboardFarmUtilizationCropsList", action.data)
        .set("FarmDashboardFarmUtilizationCropsError", null);
    case FETCH_FARM_DASHBOARD_FARM_UTILIZATION_CROP_FAILURE:
      return state
        .set("isFarmDashboardFarmUtilizationCropsLoading", false)
        .set("farmDashboardFarmUtilizationCropsList", [])
        .set("FarmDashboardFarmUtilizationCropsError", action.error);
    case FETCH_FARM_DASHBOARD_FARM_UTILIZATION_STAGES_REQUEST:
      return state
        .set("isFarmDashboardFarmUtilizationStagesLoading", true)
        .set("farmDashboardFarmUtilizationStagesList", [])
        .set("farmDashboardFarmUtilizationStagesError", null);
    case FETCH_FARM_DASHBOARD_FARM_UTILIZATION_STAGES_SUCCESS:
      return state
        .set("isFarmDashboardFarmUtilizationStagesLoading", false)
        .set("farmDashboardFarmUtilizationStagesList", action.data)
        .set("farmDashboardFarmUtilizationStagesError", null);
    case FETCH_FARM_DASHBOARD_FARM_UTILIZATION_STAGES_FAILURE:
      return state
        .set("isFarmDashboardFarmUtilizationStagesLoading", false)
        .set("farmDashboardFarmUtilizationStagesList", [])
        .set("farmDashboardFarmUtilizationStagesError", action.error);
    //

    case FETCH_FARM_DASHBOARD_ZONE_SENSOR_DATA_REQUEST:
      return state
        .set("isFarmDashboardZoneSensorLoading", true)
        .set("farmDashboardZoneSensorList", {})
        .set("farmDashboardZoneSensorListError", null);
    case FETCH_FARM_DASHBOARD_ZONE_SENSOR_DATA_SUCCESS:
      return state
        .set("isFarmDashboardZoneSensorLoading", false)
        .set("farmDashboardZoneSensorList", action.data)
        .set("farmDashboardZoneSensorListError", null);
    case FETCH_FARM_DASHBOARD_ZONE_SENSOR_DATA_FAILURE:
      return state
        .set("isFarmDashboardZoneSensorLoading", false)
        .set("farmDashboardZoneSensorList", [])
        .set("farmDashboardZoneSensorListError", action.error);
    //

    case FETCH_FARM_DASHBOARD_ZONE_LATTEST_SENSOR_DATA_REQUEST:
      return state
        .set("isFarmDashboardZoneLattestSensorLoading", true)
        .set("farmDashboardZoneLattestSensorList", {})
        .set("farmDashboardZoneLattestSensorListError", null);
    case FETCH_FARM_DASHBOARD_ZONE_LATTEST_SENSOR_DATA_SUCCESS:
      return state
        .set("isFarmDashboardZoneLattestSensorLoading", false)
        .set("farmDashboardZoneLattestSensorList", action.data)
        .set("farmDashboardZoneLattestSensorListError", null);
    case FETCH_FARM_DASHBOARD_ZONE_LATTEST_SENSOR_DATA_FAILURE:
      return state
        .set("isFarmDashboardZoneLattestSensorLoading", false)
        .set("farmDashboardZoneLattestSensorList", [])
        .set("farmDashboardZoneLattestSensorListError", action.error);

        case FETCH_FARM_DASHBOARD_ALL_ZONE_DETAILS_REQUEST:
          return state
            .set("isFarmDashboardAllZoneDetailsLoading", true)
            .set("farmDashboardAllZoneDetailsList", [])
            .set("farmDashboardAllZoneDetailsListError", null);
        case FETCH_FARM_DASHBOARD_ALL_ZONE_DETAILS_SUCCESS:
          return state
            .set("isFarmDashboardAllZoneDetailsLoading", false)
            .set("farmDashboardAllZoneDetailsList", action.data)
            .set("farmDashboardAllZoneDetailsListError", null);
        case FETCH_FARM_DASHBOARD_ALL_ZONE_DETAILS_FAILURE:
          return state
            .set("isFarmDashboardAllZoneDetailsLoading", false)
            .set("farmDashboardAllZoneDetailsList", [])
            .set("farmDashboardAllZoneDetailsListError", action.error);
    
    default:
      return state;
  }
}
