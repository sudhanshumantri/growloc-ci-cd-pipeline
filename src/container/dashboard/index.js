import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { fetchDashboardFarmRequest,fetchDashboardHarvestRequest } from "../../actions/dashboard";
import { fetchUsersRequest} from "../../actions/users";
import FarmDashboard from "../../components/dashboard/farm";
import {
  selectFarmDashboardList,
  selectIsFarmDashboardListLoading,
  selectFarmDashboardListError,
  selectIsFarmDashboardHarvestListLoading,
  selectFarmDashboardHarvestListError,
  selectFarmDashboardHarvestList,
} from "../../selectors/dashboard";
import {
  selectUsersList
} from "../../selectors/users"
const mapStateToProps = createStructuredSelector({
  dashboardFarmList: selectFarmDashboardList(),
  isDashboardFarmListLoading: selectIsFarmDashboardListLoading(),
  DashboardFarmListError: selectFarmDashboardListError(),
  isDashboardHarvestListLoading:selectIsFarmDashboardHarvestListLoading(),
  DashboardHarvestListError:selectFarmDashboardHarvestListError(),
  dashboardHarvestList:selectFarmDashboardHarvestList(),
  usersList: selectUsersList(),


});
const mapDispatchToProps = {
  fetchFarmDashboard: fetchDashboardFarmRequest,
  fetchFarmDashboardHarvest:fetchDashboardHarvestRequest,
  fetchUsers: fetchUsersRequest,

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
