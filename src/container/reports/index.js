import React from 'react'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import {
  fetchFarmReportsRequest,
  fetchFarmReportsFarmAverageMortalityRequest,
  fetchFarmReportsFarmTatTaskCategoriesRequest
} from '../../actions/reports'
import FarmEfficiency from '../../components/reports/farmefficiency'
import {
  selectFarmReportsList,
  selectIsFarmReportsListLoading,
  selectFarmReportsListError,
  selectFarmReportsFarmAverageMortalityList,
  selectIsFarmReportsFarmAverageMortalityListLoading,
  selectFarmReportsFarmAverageMortalityError,
  selectFarmReportsFarmTatTaskCategoriesList,
  selectIsFarmReportsFarmTatTaskCategoriesListLoading,
  selectFarmReportsFarmTatTaskCategoriesListError
} from '../../selectors/reports'
const mapStateToProps = createStructuredSelector({
  farmReportsList: selectFarmReportsList(),
  isFarmReportsListLoading: selectIsFarmReportsListLoading(),
  farmReportsListError: selectFarmReportsListError(),
  isFarmReportsFarmAverageMortalityListLoading:
    selectIsFarmReportsFarmAverageMortalityListLoading(),
  farmReportsFarmAverageMortalityList:
    selectFarmReportsFarmAverageMortalityList(),
  farmReportsFarmAverageMortalityError:
    selectFarmReportsFarmAverageMortalityError(),
  isFarmReportsFarmTatTaskCategoriesListLoading:
    selectIsFarmReportsFarmTatTaskCategoriesListLoading(),
  farmReportsFarmTatTaskCategoriesList:
    selectFarmReportsFarmTatTaskCategoriesList(),
  farmReportsFarmTatTaskCategoriesListError:
    selectFarmReportsFarmTatTaskCategoriesListError()
})
const mapDispatchToProps = {
  fetchFarmReports: fetchFarmReportsRequest,
  fetchFarmReportsFarmAverageMorality:
    fetchFarmReportsFarmAverageMortalityRequest,
  fetchFarmReportFarmTatTaskCategories:
    fetchFarmReportsFarmTatTaskCategoriesRequest
}
function withRouter (Component) {
  function ComponentWithRouterProp (props) {
    const navigate = useNavigate()
    const params = useParams()
    return <Component {...props} router={{ navigate, params }} />
  }
  return ComponentWithRouterProp
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FarmEfficiency)
)
