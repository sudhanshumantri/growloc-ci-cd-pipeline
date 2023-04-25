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
  FETCH_ZONE_DASHBOARD_ZONE_INFO_REQUEST,
  FETCH_FARM_DASHBOARD_ZONE_INFO_SUCCESS,
  FETCH_FARM_DASHBOARD_ZONE_INFO_FAILURE,
  FETCH_ZONE_DASHBOARD_CROP_SCHEDULES_REQUEST,
  FETCH_ZONE_DASHBOARD_CROP_SCHEDULES_SUCCESS,
  FETCH_ZONE_DASHBOARD_CROP_SCHEDULES_FAILURE,
  FETCH_ZONE_DASHBOARD_ZONE_TASK_SCHEDULES_REQUEST,
  FETCH_ZONE_DASHBOARD_ZONE_TASK_SCHEDULES_SUCCESS,
  FETCH_ZONE_DASHBOARD_ZONE_TASK_SCHEDULES_FAILURE,
  FETCH_ZONE_DASHBOARD_ZONE_SENSOR_REQUEST,
  FETCH_ZONE_DASHBOARD_ZONE_SENSOR_SUCCESS,
  FETCH_ZONE_DASHBOARD_ZONE_SENSOR_FAILURE,
  FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_CROP_REQUEST,
  FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_CROP_SUCCESS,
  FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_CROP_FAILURE,
  FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_STAGES_REQUEST,
  FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_STAGES_SUCCESS,
  FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_STAGES_FAILURE,
  FETCH_ALL_ZONE_TASKS_REQUEST,
  FETCH_ALL_ZONE_TASKS_SUCCESS,
  FETCH_ALL_ZONE_TASKS_FAILURE,
  ADD_ZONE_TASK_COMMENT_REQUEST,
  ADD_ZONE_TASK_COMMENT_SUCCESS,
  ADD_ZONE_TASK_COMMENT_FAILURE,
  FETCH_FARM_ZONE_SENSOR_DATA_REQUEST,
  FETCH_FARM_ZONE_SENSOR_DATA_SUCCESS,
  FETCH_FARM_ZONE_SENSOR_DATA_FAILURE


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

  isZoneDashboardZoneInfoLoading: false,
  zoneDashboardZoneInfoList: {},
  zoneDashboardZoneInfoError: null,

  isZoneDashboardZoneCropSchedulesListLoading: false,
  zoneDashboardZoneCropSchedulesList: [],
  zoneDashboardZoneCropSchedulesListError: null,
  isZoneDashboardZoneTaskLoading: false,
  zoneDashboardZoneTaskList: {},
  zoneDashboardZoneTaskListError: null,
  isZoneDashboardZoneTaskLoading: false,
  // zoneDashboardZoneTaskList: {},
  // zoneDashboardZoneTaskListError: null,
  isZoneDashboardZoneSensorLoading: false,
  zoneDashboardZoneSensorList: [],
  zoneDashboardZoneSensorError: null,
  isZoneDashboardZoneUtilizationCropsLoading: false,
  zoneDashboardZoneUtilizationCropsList: {},
  zoneDashboardZoneUtilizationCropsError: null,
  isZoneDashboardZoneUtilizationStagesLoading: false,
  zoneDashboardZoneUtilizationStagesList: [],
  zoneDashboardZoneUtilizationStagesError: null,
  //task
  isZoneTaskListLoading: false,
  zoneTaskList: [],
  zoneTaskListError: null,
  isZoneTaskCommentLoading:false,
  zoneTaskCommentError:null,
isFarmZoneSensorDataLoading:false,
farmZoneSensorDataList:{},
farmZoneSensorDataListError:false,

});
export default function zoneReducer(state = INITIAL_STATE, action = {}) {
  let zoneDashboardZoneTaskList = state.toJS()["zoneDashboardZoneTaskList"];
  let zoneTaskList = state.toJS()["zoneTaskList"];
  const AUTH_OBJECT = JSON.parse(localStorage.getItem("AUTH_OBJECT"));
  const user = AUTH_OBJECT?.profile;
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
      const createdByProfile = AUTH_OBJECT.profile;
      zoneDashboardZoneTaskList.tasks.push({
        ...action.data,
        createdByProfile,
        TasksHistory:[]
      });
      return state
        .set("isFarmDashboardZoneTaskLoading", false)
        .set("zoneDashboardZoneTaskList", zoneDashboardZoneTaskList)
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
      const zoneTaskRow = zoneDashboardZoneTaskList.tasks.findIndex(
        (zone) => zone.id == action.data.taskId
      );
      zoneDashboardZoneTaskList.tasks[zoneTaskRow].TasksHistory.push({
        ...action.data,
        user,
        comments:[]
      });
      return state
        .set("isFarmDashboardZoneCommetLoading", false)
        .set("zoneDashboardZoneTaskList", zoneDashboardZoneTaskList)
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

    case FETCH_ZONE_DASHBOARD_ZONE_INFO_REQUEST:
      return state
        .set("isZoneDashboardZoneInfoLoading", true)
        .set("zoneDashboardZoneInfoList", {})
        .set("zoneDashboardZoneInfoError", null);
    case FETCH_FARM_DASHBOARD_ZONE_INFO_SUCCESS:
      return state
        .set("isZoneDashboardZoneInfoLoading", false)
        .set("zoneDashboardZoneInfoList", action.data)
        .set("zoneDashboardZoneInfoError", null);
    case FETCH_FARM_DASHBOARD_ZONE_INFO_FAILURE:
      return state
        .set("isZoneDashboardZoneInfoLoading", false)
        .set("zoneDashboardZoneInfoList", [])
        .set("zoneDashboardZoneInfoError", action.error);

    case FETCH_ZONE_DASHBOARD_CROP_SCHEDULES_REQUEST:
      return state
        .set("isZoneDashboardZoneCropSchedulesListLoading", true)
        .set("zoneDashboardZoneCropSchedulesList", [])
        .set("zoneDashboardZoneCropSchedulesListError", null);
    case FETCH_ZONE_DASHBOARD_CROP_SCHEDULES_SUCCESS:
      return state
        .set("isZoneDashboardZoneCropSchedulesListLoading", false)
        .set("zoneDashboardZoneCropSchedulesList", action.data)
        .set("zoneDashboardZoneCropSchedulesListError", null);
    case FETCH_ZONE_DASHBOARD_CROP_SCHEDULES_FAILURE:
      return state
        .set("isZoneDashboardZoneCropSchedulesListLoading", false)
        .set("zoneDashboardZoneCropSchedulesList", [])
        .set("zoneDashboardZoneCropSchedulesListError", action.error);

    case FETCH_ZONE_DASHBOARD_ZONE_TASK_SCHEDULES_REQUEST:
      return state
        .set("isZoneDashboardZoneTaskLoading", true)
        .set("zoneDashboardZoneTaskList", {})
        .set("zoneDashboardZoneTaskListError", null);
    case FETCH_ZONE_DASHBOARD_ZONE_TASK_SCHEDULES_SUCCESS:
      return state
        .set("isZoneDashboardZoneTaskLoading", false)
        .set("zoneDashboardZoneTaskList", action.data)
        .set("zoneDashboardZoneTaskListError", null);
    case FETCH_ZONE_DASHBOARD_ZONE_TASK_SCHEDULES_FAILURE:
      return state
        .set("isZoneDashboardZoneTaskLoading", false)
        .set("zoneDashboardZoneTaskList", [])
        .set("zoneDashboardZoneTaskListError", action.error);

    case FETCH_ZONE_DASHBOARD_ZONE_SENSOR_REQUEST:
      return state
        .set("isZoneDashboardZoneSensorLoading", true)
        .set("zoneDashboardZoneSensorList", [])
        .set("zoneDashboardZoneSensorError", null);
    case FETCH_ZONE_DASHBOARD_ZONE_SENSOR_SUCCESS:
      return state
        .set("isZoneDashboardZoneSensorLoading", false)
        .set("zoneDashboardZoneSensorList", action.data)
        .set("zoneDashboardZoneSensorError", null);
    case FETCH_ZONE_DASHBOARD_ZONE_SENSOR_FAILURE:
      return state
        .set("isZoneDashboardZoneSensorLoading", false)
        .set("zoneDashboardZoneSensorList", [])
        .set("zoneDashboardZoneSensorError", action.error);
        //

      
        case FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_CROP_REQUEST:
          return state
            .set("isZoneDashboardZoneUtilizationCropsLoading", true)
            .set("zoneDashboardZoneUtilizationCropsList", {})
            .set("zoneDashboardZoneInfoError", null);
        case FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_CROP_SUCCESS:
          return state
            .set("isZoneDashboardZoneUtilizationCropsLoading", false)
            .set("zoneDashboardZoneUtilizationCropsList", action.data)
            .set("zoneDashboardZoneInfoError", null);
        case FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_CROP_FAILURE:
          return state
            .set("isZoneDashboardZoneUtilizationCropsLoading", false)
            .set("zoneDashboardZoneUtilizationCropsList", [])
            .set("zoneDashboardZoneInfoError", action.error);

            //
            case FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_STAGES_REQUEST:
              return state
                .set("isZoneDashboardZoneUtilizationStagesLoading", true)
                .set("zoneDashboardZoneUtilizationStagesList", {})
                .set("zoneDashboardZoneUtilizationStagesError", null);
            case FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_STAGES_SUCCESS:
              return state
                .set("isZoneDashboardZoneUtilizationStagesLoading", false)
                .set("zoneDashboardZoneUtilizationStagesList", action.data)
                .set("zoneDashboardZoneUtilizationStagesError", null);
            case FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_STAGES_FAILURE:
              return state
                .set("isZoneDashboardZoneUtilizationStagesLoading", false)
                .set("zoneDashboardZoneUtilizationStagesList", [])
                .set("zoneDashboardZoneUtilizationStagesError", action.error);
                //zone task 
                case FETCH_ALL_ZONE_TASKS_REQUEST:
                  return state
                    .set("isZoneTaskListLoading", true)
                    .set("zoneTaskList", [])
                    .set("FarmTaskListError", null);
                case FETCH_ALL_ZONE_TASKS_SUCCESS:
                  return state
                    .set("isZoneTaskListLoading", false)
                    .set("zoneTaskList", action.data)
                    .set("FarmTaskListError", null);
                case FETCH_ALL_ZONE_TASKS_FAILURE:
                  return state
                    .set("isZoneTaskListLoading", false)
                    .set("zoneTaskList", [])  
                    .set("zoneTaskListError", action.error);
                    //
  
                    case ADD_ZONE_TASK_COMMENT_REQUEST:
                      return state
                        .set("isZoneTaskCommentLoading", true)
                        .set("zoneTaskCommentError", null);
                    case ADD_ZONE_TASK_COMMENT_SUCCESS:
                  const ZoneTaskRowIndex = zoneTaskList.tasks.findIndex(
                    (l) => l.id == action.data.taskId
                  );
                  zoneTaskList.tasks[ZoneTaskRowIndex].TasksHistory.push({ ...action.data, user });
                      return state
                        .set("isZoneTaskCommentLoading", false)
                        .set("zoneTaskList", zoneTaskList)
                        .set("zoneTaskCommentError", null);
                    case ADD_ZONE_TASK_COMMENT_FAILURE:
                      return state
                        .set("isZoneTaskCommentLoading", false)
                        .set("zoneTaskCommentError", action.error);

                        //
    case FETCH_FARM_ZONE_SENSOR_DATA_REQUEST:
      return state
        .set("isFarmZoneSensorDataLoading", true)
        .set("farmZoneSensorDataList", {})
        .set("farmZoneSensorDataListError", null);
    case FETCH_FARM_ZONE_SENSOR_DATA_SUCCESS:
      return state
        .set("isFarmZoneSensorDataLoading", false)
        .set("farmZoneSensorDataList", action.data)
        .set("farmZoneSensorDataListError", null);
    case FETCH_FARM_ZONE_SENSOR_DATA_FAILURE:
      return state
        .set("isFarmZoneSensorDataLoading", false)
        .set("farmZoneSensorDataList", {})
        .set("farmZoneSensorDataListError", action.error);     
    default:
      return state;
  }
}
