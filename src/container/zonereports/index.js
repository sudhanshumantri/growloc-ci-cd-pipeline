import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  fetchZoneReportsRequest,
  fetchFarmReportsZoneAverageMortalityRequest,
} from "../../actions/zonereports";
import ZoneEfficiency from "../../components/zonereports/zoneefficiency";
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
const mapStateToProps = createStructuredSelector({
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
});
const mapDispatchToProps = {
  fetchZoneReports: fetchZoneReportsRequest,
  fecthFarmReportsZoneAverageMortality:
    fetchFarmReportsZoneAverageMortalityRequest,
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
