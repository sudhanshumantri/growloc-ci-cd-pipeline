import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { fetchZoneReportsRequest } from "../../actions/zonereports";
import ZoneEfficiency from "../../components/zonereports/zoneefficiency";
import {
    selectZoneReportsList,
    selectIsZoneReportsListLoading,
    selectZoneReportsListError
} from "../../selectors/zonereports";
const mapStateToProps = createStructuredSelector({
    zoneReportsList:selectZoneReportsList(),
    isZoneReportsListLoading:selectIsZoneReportsListLoading(),
    zoneReportsListError:selectZoneReportsListError(),

    
});
const mapDispatchToProps = {
   fetchZoneReports:fetchZoneReportsRequest,
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
  connect(mapStateToProps, mapDispatchToProps)(ZoneEfficiency)
);
