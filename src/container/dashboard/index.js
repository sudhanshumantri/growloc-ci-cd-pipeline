import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  fetchDashboardFarmRequest,
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
  fetchFarmDashboardUtilizationStagesRequest
} from "../../actions/dashboard";
import { fetchUsersRequest } from "../../actions/users";
import { fetchFarmInventoryRequest } from "../../actions/inventory";
import { fetchFarmCropsRequest } from "../../actions/crops";
import {
  addCropToLifecycleRequest,
  fetchAllCropsLifecycleRequest,
} from "../../actions/life-cycle";
import FarmDashboard from "../../components/dashboard/farm";
import {
  selectFarmDashboardList,
  selectIsFarmDashboardListLoading,
  selectFarmDashboardListError,
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
} from "../../selectors/dashboard";
import { selectUsersList } from "../../selectors/users";
import { selectFarmInventoryList } from "../../selectors/inventory";
import { selectLoginObject } from "../../selectors/login";
import {
  selectLifecycleCropsList,
  selectIsAddLifecycleLoading,
} from "../../selectors/life-cycle";
import { selectCropFarmList } from "../../selectors/crops";

const mapStateToProps = createStructuredSelector({
  dashboardFarmList: selectFarmDashboardList(),
  isDashboardFarmListLoading: selectIsFarmDashboardListLoading(),
  DashboardFarmListError: selectFarmDashboardListError(),
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
});
const mapDispatchToProps = {
  fetchFarmDashboard: fetchDashboardFarmRequest,
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
  fetchFarmDashboardFarmUtilizationCrops: fetchFarmDashboardUtilizationCropsRequest,
  fetchFarmDashboardFarmUtilizationStages:fetchFarmDashboardUtilizationStagesRequest

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
