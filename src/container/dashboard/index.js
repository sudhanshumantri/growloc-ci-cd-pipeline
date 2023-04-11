import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  fetchDashboardHarvestRequest,
  addTaskSheduleTaskRequest,
  addFarmTaskCommentRequest,
  addFarmDashboardZoneRequest,
  fetchFarmDashboardZoneRequest,
  updateFarmDashboardZoneRequest,
  deleteFarmDashboardZoneRequest,
  fetchDashboardFarmInfoRequest,
  fetchFarmCropSchedulesRequest,
  fetchFarmDashboardInfoRequest,
  fetchFarmDashboardTaskRequest,
  fetchFarmDashboardUtilizationCropsRequest,
  fetchFarmDashboardUtilizationStagesRequest,
  fetchFarmDashboardZoneSensorRequest,
  fetchDashboardFarmLattestSensorDataRequest,
  fetchDashboardAllZoneDetailsRequest,
} from "../../actions/dashboard";
import { fetchUsersRequest } from "../../actions/users";
import { fetchFarmInventoryRequest } from "../../actions/inventory";
import { fetchFarmCropsRequest } from "../../actions/crops";
import {
  fetchFarmReportsRequest,
  fetchFarmReportsFarmAverageMortalityRequest,
  fetchFarmReportsFarmTatTaskCategoriesRequest,
} from "../../actions/reports";
import { fetchZoneDashboardZoneSensorRequest } from "../../actions/zone";
import {
  addCropToLifecycleRequest,
  fetchAllCropsLifecycleRequest,
} from "../../actions/life-cycle";
import FarmDashboard from "../../components/dashboard/farm";
import {
  selectIsFarmDashboardHarvestListLoading,
  selectFarmDashboardHarvestListError,
  selectFarmDashboardHarvestList,
  selectIsTaskScheduleTaskLoading,
  selectTaskScheduleTaskListError,
  selectIsisFarmTaskCommentLoading,
  selectfarmTaskCommentError,
  selectIsFarmDashboardZoneLoading,
  selectFarmDashboardZoneError,
  selectFarmDashboardZoneList,
  selectIsFarmDashboardZoneListLoading,
  selectFarmDashboardZoneListError,
  selectIsUpdataFarmDashboardZoneLoading,
  selectUpdateFarmDashboardZoneError,
  selectIsDeleteFarmDashboardZoneLoading,
  selectFarmDashboardFarmInfoList,
  selectIsDashboardFarmInfoListLoading,
  selectFarmDashboardFarmInfoListError,
  selectFarmDashboardCropSchedulesList,
  selectIsDashboardCropSchedulesListLoading,
  selectFarmDashboardCropSchedulesListError,
  selectFarmDashboardInfoList,
  selectIsDashboardInfoListLoading,
  selectFarmDashboardInfoListError,
  selectFarmDashboardTaskList,
  selectIsDashboardFarmTaskLoading,
  selectFarmDashboardTaskListError,
  selectFarmDashboardFarmUtilizationCropsList,
  selectIsFarmDashboardFarmUtilizationCropsLoading,
  selectFarmDashboardFarmUtilizationCropsError,
  selectFarmDashboardFarmUtilizationStagesList,
  selectIsFarmDashboardFarmUtilizationStagesLoading,
  selectFarmDashboardFarmUtilizationStagesError,
  selectFarmDashboardZoneSensorList,
  selectIsFarmDashboardZoneSensorLoading,
  selectFarmDashboardZoneSensorListError,
  selectIsFarmDashboardZoneLattestSensorLoading,
  selectFarmDashboardZoneLattestSensorList,
  selectFarmDashboardZoneLattestSensorListError,
  selectIsFarmDashboardAllZoneDetailsLoading,
  selectFarmDashboardAllZoneDetailsList,
  selectFarmDashboardAllZoneDetailsListError
} from "../../selectors/dashboard";
import { selectUsersList } from "../../selectors/users";
import { selectFarmInventoryList } from "../../selectors/inventory";
import {
  selectIsZoneDashboardZoneSensorLoading,
  selectZoneDashboardZoneSensorList,
  selectZoneDashboardZoneSensorError,
} from "../../selectors/zone";
import {
  selectFarmReportsList,
  selectIsFarmReportsListLoading,
  selectFarmReportsListError,
  selectFarmReportsFarmAverageMortalityList,
  selectIsFarmReportsFarmAverageMortalityListLoading,
  selectFarmReportsFarmAverageMortalityError,
  selectFarmReportsFarmTatTaskCategoriesList,
  selectIsFarmReportsFarmTatTaskCategoriesListLoading,
  selectFarmReportsFarmTatTaskCategoriesListError,
} from "../../selectors/reports";

import { selectLoginObject } from "../../selectors/login";
import {
  selectLifecycleCropsList,
  selectIsAddLifecycleLoading,
} from "../../selectors/life-cycle";
import { selectCropFarmList } from "../../selectors/crops";

const mapStateToProps = createStructuredSelector({
  isDashboardHarvestListLoading: selectIsFarmDashboardHarvestListLoading(),
  DashboardHarvestListError: selectFarmDashboardHarvestListError(),
  dashboardHarvestList: selectFarmDashboardHarvestList(),
  usersList: selectUsersList(),
  isTaskScheduleTaskLoading: selectIsTaskScheduleTaskLoading(),
  TaskScheduleTaskListError: selectTaskScheduleTaskListError(),
  farmInventoryList: selectFarmInventoryList(),
  loginObject: selectLoginObject(),
  isFarmTaskCommentLoading: selectIsisFarmTaskCommentLoading(),
  farmTaskCommentError: selectfarmTaskCommentError(),
  isFarmDashboardZoneLoading: selectIsFarmDashboardZoneLoading(),
  farmDashboardZoneError: selectFarmDashboardZoneError(),
  farmDashboardZoneList: selectFarmDashboardZoneList(),
  isFarmDashboardZoneListLoading: selectIsFarmDashboardZoneListLoading(),
  farmDashboardZoneListError: selectFarmDashboardZoneListError(),
  isUpdateFarmDashboardZoneLoading: selectIsUpdataFarmDashboardZoneLoading(),
  updateFarmDashboardZoneError: selectUpdateFarmDashboardZoneError(),
  isDeleteFarmDashboardZoneLoading: selectIsDeleteFarmDashboardZoneLoading(),
  farmCropList: selectCropFarmList(),
  lifecycleCropsList: selectLifecycleCropsList(),
  isAddLifecycleLoading: selectIsAddLifecycleLoading(),
  //
  farmDashboardFarmInfoList: selectFarmDashboardFarmInfoList(),
  isDashboardFarmInfoListLoading: selectIsDashboardFarmInfoListLoading(),
  farmDashboardFarmInfoListError: selectFarmDashboardFarmInfoListError(),
  farmDashboardCropSchedulesList: selectFarmDashboardCropSchedulesList(),
  isDashboardCropSchedulesListLoading:
    selectIsDashboardCropSchedulesListLoading(),
  farmDashboardCropSchedulesListError:
    selectFarmDashboardCropSchedulesListError(),
  isDashboardInfoListLoading: selectIsDashboardInfoListLoading(),
  farmDashboardInfoList: selectFarmDashboardInfoList(),
  farmDashboardInfoListError: selectFarmDashboardInfoListError(),
  farmDashboardTaskList: selectFarmDashboardTaskList(),
  isDashboardFarmTaskLoading: selectIsDashboardFarmTaskLoading(),
  farmDashboardTaskListError: selectFarmDashboardTaskListError(),
  //
  farmDashboardFarmUtilizationCropsList:
    selectFarmDashboardFarmUtilizationCropsList(),
  isFarmDashboardFarmUtilizationCropsLoading:
    selectIsFarmDashboardFarmUtilizationCropsLoading(),
  FarmDashboardFarmUtilizationCropsError:
    selectFarmDashboardFarmUtilizationCropsError(),
  farmDashboardFarmUtilizationStagesList:
    selectFarmDashboardFarmUtilizationStagesList(),
  isFarmDashboardFarmUtilizationStagesLoading:
    selectIsFarmDashboardFarmUtilizationStagesLoading(),
  farmDashboardFarmUtilizationStagesError:
    selectFarmDashboardFarmUtilizationStagesError(),
  //
  farmReportsList: selectFarmReportsList(),
  isFarmReportsListLoading: selectIsFarmReportsListLoading(),
  farmReportsListError: selectFarmReportsListError(),
  isFarmReportsFarmAverageMortalityListLoading:
    selectIsFarmReportsFarmAverageMortalityListLoading(),
  farmReportsFarmAverageMortalityList:
    selectFarmReportsFarmAverageMortalityList(),
  farmReportsFarmAverageMortalityError:
    selectFarmReportsFarmAverageMortalityError(),
  isFarmReportsFarmTatTaskCategoriesListLoading:
    selectIsFarmReportsFarmTatTaskCategoriesListLoading(),
  farmReportsFarmTatTaskCategoriesList:
    selectFarmReportsFarmTatTaskCategoriesList(),
  farmReportsFarmTatTaskCategoriesListError:
    selectFarmReportsFarmTatTaskCategoriesListError(),
  farmDashboardZoneSensorList: selectFarmDashboardZoneSensorList(),
  isFarmDashboardZoneSensorLoading: selectIsFarmDashboardZoneSensorLoading(),
  farmDashboardZoneSensorListError: selectFarmDashboardZoneSensorListError(),
  isZoneDashboardZoneSensorLoading: selectIsZoneDashboardZoneSensorLoading(),
  zoneDashboardZoneSensorList: selectZoneDashboardZoneSensorList(),
  zoneDashboardZoneSensorError: selectZoneDashboardZoneSensorError(),
  isZoneDashboardZoneSensorLoading: selectIsZoneDashboardZoneSensorLoading(),
  isFarmDashboardZoneLattestSensorLoading:
    selectIsFarmDashboardZoneLattestSensorLoading(),
  farmDashboardZoneLattestSensorList:
    selectFarmDashboardZoneLattestSensorList(),
  farmDashboardZoneLattestSensorListError:
    selectFarmDashboardZoneLattestSensorListError(),

  isFarmDashboardAllZoneDetailsLoading:
    selectIsFarmDashboardAllZoneDetailsLoading(),
  farmDashboardAllZoneDetailsList: selectFarmDashboardAllZoneDetailsList(),
  farmDashboardAllZoneDetailsListError:
    selectFarmDashboardAllZoneDetailsListError(),
});
const mapDispatchToProps = {
  fetchFarmDashboardHarvest: fetchDashboardHarvestRequest,
  fetchUsers: fetchUsersRequest,
  addTaskScheduleTask: addTaskSheduleTaskRequest,
  fetchFarmInventory: fetchFarmInventoryRequest,
  addFarmTaskComment: addFarmTaskCommentRequest,
  addFarmDashboardZone: addFarmDashboardZoneRequest,
  fecthFarmDashboardZone: fetchFarmDashboardZoneRequest,
  updateFarmDashboardZone: updateFarmDashboardZoneRequest,
  deleteFarmDashboardZone: deleteFarmDashboardZoneRequest,
  fecthCropFarm: fetchFarmCropsRequest,
  addCropToLifecycle: addCropToLifecycleRequest,
  fetchAllCropsLifecycle: fetchAllCropsLifecycleRequest,
  fetchFarmDashboardInfo: fetchDashboardFarmInfoRequest,
  fetchFarmDashboardCropSchedule: fetchFarmCropSchedulesRequest,
  fetchFarmDashboardFarmInfo: fetchFarmDashboardInfoRequest,
  fetchFarmDashboardFarmTask: fetchFarmDashboardTaskRequest,
  fetchFarmDashboardFarmUtilizationCrops:
    fetchFarmDashboardUtilizationCropsRequest,
  fetchFarmDashboardFarmUtilizationStages:
    fetchFarmDashboardUtilizationStagesRequest,
  fetchFarmReports: fetchFarmReportsRequest,
  fetchFarmReportsFarmAverageMorality:
    fetchFarmReportsFarmAverageMortalityRequest,
  fetchFarmReportFarmTatTaskCategories:
    fetchFarmReportsFarmTatTaskCategoriesRequest,
  fetchFarmDashboardZoneSensor: fetchFarmDashboardZoneSensorRequest,
  fetchZoneDashboardZoneSensors: fetchZoneDashboardZoneSensorRequest,
  fetchDashboardLattestSensors: fetchDashboardFarmLattestSensorDataRequest,
  fetchDashboardAllZoneDetails : fetchDashboardAllZoneDetailsRequest,
};
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    // return React.createElement(Component, {...props, router:{ location, navigate, params }})
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FarmDashboard)
);
