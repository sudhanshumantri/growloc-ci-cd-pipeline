import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {fetchFarmZoneRequest,fetchFarmZoneDashboardRequest,fetchFarmZoneDashboardHarvestRequest,addFarmDashboardZoneTaskRequest,addFarmDashboardZoneTaskCommentRequest } from "../../actions/zone";
// import ManageItem from "../../components/inventory/manageitem"
// import ZoneDetails from "../../components/Zone";
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
});
const mapDispatchToProps = {
   fetchFarmZone:fetchFarmZoneRequest,
   fetchFarmDashboard: fetchFarmZoneDashboardRequest,
   fetchFarmDashboardHarvest: fetchFarmZoneDashboardHarvestRequest,
   addFarmDashboardZoneTaskComment: addFarmDashboardZoneTaskRequest,
   addFarmDashboardZoneTask: addFarmDashboardZoneTaskCommentRequest,
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
