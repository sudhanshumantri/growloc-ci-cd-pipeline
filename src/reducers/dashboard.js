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
  isZoneSensorLoading : false,
  allZoneSensorList: [],
  loadingAllZoneSensorError: null,
// dashboard new reducers
  isDashboardFarmInfoListLoading: false,
  farmDashboardFarmInfoList: {},
  farmDashboardFarmInfoListError: null,
  isDashboardCropSchedulesListLoading: false,
  farmDashboardCropSchedulesList: [],
  farmDashboardCropSchedulesListError: null,
  //
  isDashboardInfoListLoading: false,
  farmDashboardInfoList: {},
  farmDashboardInfoListError: null,
  //
  isDashboardFarmTaskLoading: false,
  farmDashboardTaskList: {},
  farmDashboardTaskListError: null,
  isFarmDashboardFarmUtilizationCropsLoading: false,
  farmDashboardFarmUtilizationCropsList: {},
  FarmDashboardFarmUtilizationCropsError: null,
  isFarmDashboardFarmUtilizationStagesLoading: false,
  farmDashboardFarmUtilizationStagesList: [],
  farmDashboardFarmUtilizationStagesError: null,

});
export default function dashboardReducer(state = INITIAL_STATE, action = {}) {
  let dashboardFarmList = state.toJS()["dashboardFarmList"];
  let farmDashboardZoneList = state.toJS()["farmDashboardZoneList"]
  let farmDashboardTaskList = state.toJS()["farmDashboardTaskList"]
  // const { tasks } = farmDashboardTaskList
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
      console.log(action.data,"...action.data");
      farmDashboardTaskList.tasks.push({ ...action.data, createdByProfile, TasksHistory: [] });
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
          farmDashboardZoneList.zoneInformation.push(newZone)
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
         const index = farmDashboardZoneList.zoneInformation.findIndex((zone) => zone.zone_internal_id === data.zone_internal_id);
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
            const  id = action.data;
            const filteredList = farmDashboardZoneList.zoneInformation.filter((zone) => zone.id !== id);
            return state
              .set("isDeleteFarmDashboardZoneLoading", false)
              .set("farmDashboardZoneList",filteredList)
              .set("deleteFarmDashboardZoneError", null);
          case DELETE_FARM_DASHBOARD_ZONE_FAILURE:
            return state.set("farmDashboardZoneList","");
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
  
    default:
      return state;
  }
}
