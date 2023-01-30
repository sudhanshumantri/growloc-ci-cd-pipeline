import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {fetchFarmZoneRequest,fetchFarmZoneDashboardRequest,fetchFarmZoneDashboardHarvestRequest,addFarmDashboardZoneTaskRequest,addFarmDashboardZoneTaskCommentRequest } from "../../actions/zone";
import {fetchFarmDashboardZoneRequest } from "../../actions/dashboard";
import { fetchUsersRequest } from "../../actions/users";
import { fetchFarmInventoryRequest } from "../../actions/inventory";

import {
  selectFarmInventoryList,
} from "../../selectors/inventory";

import {
  selectUsersList
} from "../../selectors/users"
import {
  selectLoginObject
} from "../../selectors/login";
import {
  selectFarmDashboardZoneList,
} from "../../selectors/dashboard";

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
} from "../../selectors/zone";
const mapStateToProps = createStructuredSelector({
    farmZoneList:selectFarmZoneList(),
    isFarmZoneLoading:selectIsFarmZoneLoading(),
    farmZoneError:selectFarmZoneError(),
    farmZoneDashboardList:selectFarmZoneDashboardList(),
    isFarmZoneDashboardListLoading:selectIsFarmZoneDashboardListLoading(),
    farmZoneDashboardListError:selectFarmZoneDashboardListError(),
    farmZoneDashboardHarvestList:selectFarmZoneDashboardHarvestList(),
    isFarmZoneDashboardHarvestListLoading:selectIsFarmZoneDashboardHarvestListLoading(),
    farmZoneDashboardHarvestListError:selectFarmZoneDashboardHarvestListError(),
    isFarmDashboardZoneTaskLoading:selectIsFarmDashboardZoneTaskLoading(),
    farmDashboardZoneTaskError:selectFarmDashboardZoneTaskError(),
    isFarmDashboardZoneCommetLoading:selectIsFarmDashboardZoneCommetLoading(),
    farmDashboardZoneCommetError:selectFarmDashboardZoneCommetError(),
    usersList: selectUsersList(),
    loginObject: selectLoginObject(),
    farmDashboardZoneList:selectFarmDashboardZoneList(),
    farmInventoryList: selectFarmInventoryList(),

});
const mapDispatchToProps = {
   fetchFarmZone:fetchFarmZoneRequest,
   fetchFarmDashboardZone: fetchFarmZoneDashboardRequest,
   fetchFarmDashboardHarvest: fetchFarmZoneDashboardHarvestRequest,
   addFarmDashboardZoneTaskComment: addFarmDashboardZoneTaskCommentRequest,
   addFarmDashboardZoneTask: addFarmDashboardZoneTaskRequest,
   fetchUsers: fetchUsersRequest,
   fecthFarmDashboardZone:fetchFarmDashboardZoneRequest,
   fetchFarmInventory: fetchFarmInventoryRequest,



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
