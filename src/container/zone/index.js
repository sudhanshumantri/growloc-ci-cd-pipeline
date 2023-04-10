import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  fetchFarmZoneRequest,
  fetchFarmZoneDashboardRequest,
  fetchFarmZoneDashboardHarvestRequest,
  addFarmDashboardZoneTaskRequest,
  addFarmDashboardZoneTaskCommentRequest,
  fetchFarmDashboardZoneInfoRequest,
  fetchZoneDashboardZoneCropScheduleRequest,
  fetchZoneDashboardZoneTaskScheduleRequest,
  fetchZoneDashboardZoneSensorRequest,
  fetchZoneDashboardZoneUtilizationCropsRequest,
  fetchZoneDashboardZoneUtilizationStagesRequest,
  fetchZoneTaskRequest,
  addZoneTaskCommentRequest,
  fetchFarmZoneSensorDataRequest,
} from "../../actions/zone";
import {
  fetchZoneReportsRequest,
  fetchFarmReportsZoneAverageMortalityRequest,
  fetchFarmReportsZoneTatTaskCategoriesRequest,
} from "../../actions/zonereports";
import { fetchFarmDashboardZoneRequest,fetchDashboardFarmLattestSensorDataRequest } from "../../actions/dashboard";
import { fetchUsersRequest } from "../../actions/users";
import { fetchFarmInventoryRequest } from "../../actions/inventory";
import { selectFarmInventoryList } from "../../selectors/inventory";
import { selectUsersList } from "../../selectors/users";
import { selectLoginObject } from "../../selectors/login";
import { selectFarmDashboardZoneList } from "../../selectors/dashboard";
import ZoneDashboard from "../../components/Zone";
import {
  selectFarmZoneList,
  selectIsFarmZoneLoading,
  selectFarmZoneError,
  selectFarmZoneDashboardList,
  selectIsFarmZoneDashboardListLoading,
  selectFarmZoneDashboardListError,
  selectFarmZoneDashboardHarvestList,
  selectIsFarmZoneDashboardHarvestListLoading,
  selectFarmZoneDashboardHarvestListError,
  selectIsFarmDashboardZoneTaskLoading,
  selectFarmDashboardZoneTaskError,
  selectIsFarmDashboardZoneCommetLoading,
  selectFarmDashboardZoneCommetError,
  selectIsZoneDashboardZoneInfoLoading,
  selectZoneDashboardZoneInfoList,
  selectZoneDashboardZoneInfoError,
  selectZoneDashboardZoneCropSchedulesList,
  selectIsZoneDashboardZoneCropSchedulesListLoading,
  selectZoneDashboardZoneCropSchedulesListError,
  selectIsZoneDashboardZoneTaskLoading,
  selectZoneDashboardZoneTaskList,
  selectZoneDashboardZoneTaskListError,
  selectIsZoneDashboardZoneSensorLoading,
  selectZoneDashboardZoneSensorList,
  selectZoneDashboardZoneSensorError,
 selectIsZoneDashboardZoneUtilizationCropsLoading,
 selectZoneDashboardZoneUtilizationCropsList,
 selectZoneDashboardZoneUtilizationCropsError,
 selectIsZoneDashboardZoneUtilizationStagesLoading,
 selectZoneDashboardZoneUtilizationStagesList,
 selectZoneDashboardZoneUtilizationStagesError,
 selectIsFarmZoneSensorDataLoading,
  selectFarmZoneSensorDataList,
selectFarmZoneSensorDataListError,

} from "../../selectors/zone";
import {
  selectZoneReportsList,
  selectIsZoneReportsListLoading,
  selectZoneReportsListError,
  selectFarmReportsZoneAverageMortalityList,
  selectIsFarmReportsZoneAverageMortalityListLoading,
  selectFarmReportsZoneAverageMortalityError,
  selectFarmReportsZoneTatTaskCategoriesList,
  selectIsFarmReportsZoneTatTaskCategoriesListLoading,
  selectFarmReportsZoneTatTaskCategoriesError,
} from "../../selectors/zonereports";

import {
  selectIsFarmDashboardZoneLattestSensorLoading,
selectFarmDashboardZoneLattestSensorList,
selectFarmDashboardZoneLattestSensorListError
} from "../../selectors/dashboard"

const mapStateToProps = createStructuredSelector({
  farmZoneList: selectFarmZoneList(),
  isFarmZoneLoading: selectIsFarmZoneLoading(),
  farmZoneError: selectFarmZoneError(),
  farmZoneDashboardList: selectFarmZoneDashboardList(),
  isFarmZoneDashboardListLoading: selectIsFarmZoneDashboardListLoading(),
  farmZoneDashboardListError: selectFarmZoneDashboardListError(),
  farmZoneDashboardHarvestList: selectFarmZoneDashboardHarvestList(),
  isFarmZoneDashboardHarvestListLoading:
    selectIsFarmZoneDashboardHarvestListLoading(),
  farmZoneDashboardHarvestListError: selectFarmZoneDashboardHarvestListError(),
  isFarmDashboardZoneTaskLoading: selectIsFarmDashboardZoneTaskLoading(),
  farmDashboardZoneTaskError: selectFarmDashboardZoneTaskError(),
  isFarmDashboardZoneCommetLoading: selectIsFarmDashboardZoneCommetLoading(),
  farmDashboardZoneCommetError: selectFarmDashboardZoneCommetError(),
  usersList: selectUsersList(),
  loginObject: selectLoginObject(),
  farmDashboardZoneList: selectFarmDashboardZoneList(),
  farmInventoryList: selectFarmInventoryList(),
  isZoneDashboardZoneInfoLoading: selectIsZoneDashboardZoneInfoLoading(),
  zoneDashboardZoneInfoList: selectZoneDashboardZoneInfoList(),
  zoneDashboardZoneInfoError: selectZoneDashboardZoneInfoError(),
  isZoneDashboardZoneCropSchedulesListLoading:
    selectIsZoneDashboardZoneCropSchedulesListLoading(),
  zoneDashboardZoneCropSchedulesList:
    selectZoneDashboardZoneCropSchedulesList(),
  zoneDashboardZoneCropSchedulesListError:
    selectZoneDashboardZoneCropSchedulesListError(),
  isZoneDashboardZoneTaskLoading: selectIsZoneDashboardZoneTaskLoading(),
  zoneDashboardZoneTaskList: selectZoneDashboardZoneTaskList(),
  zoneDashboardZoneTaskListError: selectZoneDashboardZoneTaskListError(),
  isZoneDashboardZoneSensorLoading: selectIsZoneDashboardZoneSensorLoading(),
  zoneDashboardZoneSensorList: selectZoneDashboardZoneSensorList(),
  zoneDashboardZoneSensorError: selectZoneDashboardZoneSensorError(),
isZoneDashboardZoneUtilizationCropsLoading: selectIsZoneDashboardZoneUtilizationCropsLoading(),
zoneDashboardZoneUtilizationCropsList: selectZoneDashboardZoneUtilizationCropsList(),
zoneDashboardZoneUtilizationCropsError: selectZoneDashboardZoneUtilizationCropsError(),
isZoneDashboardZoneUtilizationStagesLoading: selectIsZoneDashboardZoneUtilizationStagesLoading(),
zoneDashboardZoneUtilizationStagesList: selectZoneDashboardZoneUtilizationStagesList(),
zoneDashboardZoneUtilizationStagesError: selectZoneDashboardZoneUtilizationStagesError(),
zoneReportsList: selectZoneReportsList(),
isZoneReportsListLoading: selectIsZoneReportsListLoading(),
zoneReportsListError: selectZoneReportsListError(),
isFarmReportsZoneAverageMortalityListLoading:
selectIsFarmReportsZoneAverageMortalityListLoading(),
farmReportsZoneAverageMortalityList:
selectFarmReportsZoneAverageMortalityList(),
farmReportsZoneAverageMortalityError:
selectFarmReportsZoneAverageMortalityError(),
isFarmReportsZoneTatTaskCategoriesListLoading:
selectIsFarmReportsZoneTatTaskCategoriesListLoading(),
farmReportsZoneTatTaskCategoriesList:
selectFarmReportsZoneTatTaskCategoriesList(),
farmReportsZoneTatTaskCategoriesError:
selectFarmReportsZoneTatTaskCategoriesError(),
isFarmZoneSensorDataLoading:selectIsFarmZoneSensorDataLoading(),
  farmZoneSensorDataList:selectFarmZoneSensorDataList(),
  farmZoneSensorDataListError:selectFarmZoneSensorDataListError(),
  isFarmDashboardZoneLattestSensorLoading:selectIsFarmDashboardZoneLattestSensorLoading(),
farmDashboardZoneLattestSensorList:selectFarmDashboardZoneLattestSensorList(),
farmDashboardZoneLattestSensorListError:selectFarmDashboardZoneLattestSensorListError(),


});
const mapDispatchToProps = {
  fetchFarmZone: fetchFarmZoneRequest,
  fetchFarmDashboardZone: fetchFarmZoneDashboardRequest,
  fetchFarmDashboardHarvest: fetchFarmZoneDashboardHarvestRequest,
  addFarmDashboardZoneTaskComment: addFarmDashboardZoneTaskCommentRequest,
  addFarmDashboardZoneTask: addFarmDashboardZoneTaskRequest,
  fetchUsers: fetchUsersRequest,
  fecthFarmDashboardZone: fetchFarmDashboardZoneRequest,
  fetchFarmInventory: fetchFarmInventoryRequest,
  fetchZoneDashoboardZoneInfo: fetchFarmDashboardZoneInfoRequest,
  fetchZoneDashboardZoneCropSchdule: fetchZoneDashboardZoneCropScheduleRequest,
  fetchZoneDashboardZoneTaskSchedule: fetchZoneDashboardZoneTaskScheduleRequest,
  fetchZoneDashboardZoneSensors:fetchZoneDashboardZoneSensorRequest,
  fetchZoneDashboardZoneUtilizationCrops:fetchZoneDashboardZoneUtilizationCropsRequest,
  fetchZoneDashboardZoneUtilizationStages:fetchZoneDashboardZoneUtilizationStagesRequest,
  fetchZoneReports: fetchZoneReportsRequest,
  fecthFarmReportsZoneAverageMortality:fetchFarmReportsZoneAverageMortalityRequest,
  fetchFarmReportsZoneTatTaskRequest:fetchFarmReportsZoneTatTaskCategoriesRequest,
  fetchFarmZoneSensorDataRequest:fetchFarmZoneSensorDataRequest,
  fetchDashboardLattestSensors:fetchDashboardFarmLattestSensorDataRequest,

};
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let navigate = useNavigate();
    let params = useParams();
    // return React.createElement(Component, {...props, router:{ location, navigate, params }})
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ZoneDashboard)
);
