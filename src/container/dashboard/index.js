import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { fetchDashboardFarmRequest, fetchDashboardHarvestRequest, addTaskSheduleTaskRequest } from "../../actions/dashboard";
import { fetchUsersRequest } from "../../actions/users";
import { fetchFarmInventoryRequest } from "../../actions/inventory";

import FarmDashboard from "../../components/dashboard/farm";
import {
  selectFarmDashboardList,
  selectIsFarmDashboardListLoading,
  selectFarmDashboardListError,
  selectIsFarmDashboardHarvestListLoading,
  selectFarmDashboardHarvestListError,
  selectFarmDashboardHarvestList,
  selectIsTaskScheduleTaskLoading,
  selectTaskScheduleTaskListError

} from "../../selectors/dashboard";
import {
  selectUsersList
} from "../../selectors/users"
import {
  selectFarmInventoryList,
} from "../../selectors/inventory";
import {
  selectLoginObject
} from "../../selectors/login";

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
  
});
const mapDispatchToProps = {
  fetchFarmDashboard: fetchDashboardFarmRequest,
  fetchFarmDashboardHarvest: fetchDashboardHarvestRequest,
  fetchUsers: fetchUsersRequest,
  addTaskScheduleTask: addTaskSheduleTaskRequest,
  fetchFarmInventory: fetchFarmInventoryRequest,
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
