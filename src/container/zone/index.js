import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {fetchFarmZoneRequest } from "../../actions/zone";
// import ManageItem from "../../components/inventory/manageitem"
// import ZoneDetails from "../../components/Zone";
import ZoneDashboard from "../../components/Zone";
import {
    selectFarmZoneList,
    selectIsFarmZoneLoading,
    selectFarmZoneError,
} from "../../selectors/zone";
const mapStateToProps = createStructuredSelector({
    farmZoneList:selectFarmZoneList(),
    isFarmZoneLoading:selectIsFarmZoneLoading(),
    farmZoneError:selectFarmZoneError(),
});
const mapDispatchToProps = {
   fetchFarmZone:fetchFarmZoneRequest,
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
