import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { fetchFarmReportsRequest,fetchFarmReportsFarmAverageMortalityRequest,fetchFarmReportsFarmTatTaskCategoriesRequest } from "../../actions/reports";
// import ManageItem from "../../components/inventory/manageitem"
import FarmEfficiency from "../../components/reports/farmefficiency";
import {
    selectFarmReportsList,
    selectIsFarmReportsListLoading,
    selectFarmReportsListError,
    selectFarmReportsFarmAverageMortalityList,
    selectIsFarmReportsFarmAverageMortalityListLoading,
    selectFarmReportsFarmAverageMortalityError,
    selectFarmReportsFarmTatTaskCategoriesListList,
    selectIsFarmReportsFarmTatTaskCategoriesListLoading,
    selectFarmReportsFarmTatTaskCategoriesListError
} from "../../selectors/reports";
const mapStateToProps = createStructuredSelector({
    farmReportsList:selectFarmReportsList(),
    isFarmReportsListLoading:selectIsFarmReportsListLoading(),
    farmReportsListError:selectFarmReportsListError(),
    isFarmReportsFarmAverageMortalityListLoading: selectIsFarmReportsFarmAverageMortalityListLoading(),
  farmReportsFarmAverageMortalityList:selectFarmReportsFarmAverageMortalityList(),
  farmReportsFarmAverageMortalityError: selectFarmReportsFarmAverageMortalityError(),
  isFarmReportsFarmTatTaskCategoriesListLoading: selectIsFarmReportsFarmTatTaskCategoriesListLoading(),
  farmReportsFarmTatTaskCategoriesListList: selectFarmReportsFarmTatTaskCategoriesListList(),
  farmReportsFarmTatTaskCategoriesListError: selectFarmReportsFarmTatTaskCategoriesListError(),

});
const mapDispatchToProps = {
   fetchFarmReports:fetchFarmReportsRequest,
   fetchFarmReportsFarmAverageMorality:fetchFarmReportsFarmAverageMortalityRequest,
   fetchFarmReportFarmTatTaskCategories:fetchFarmReportsFarmTatTaskCategoriesRequest,
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
  connect(mapStateToProps, mapDispatchToProps)(FarmEfficiency)
);
