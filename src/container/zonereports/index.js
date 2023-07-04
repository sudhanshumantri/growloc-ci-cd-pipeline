import React from 'react'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import {
  fetchZoneReportsRequest,
  fetchFarmReportsZoneAverageMortalityRequest,
  fetchFarmReportsZoneTatTaskCategoriesRequest
} from '../../actions/zonereports'
import ZoneEfficiency from '../../components/zonereports/zoneefficiency'
import {
  selectZoneReportsList,
  selectIsZoneReportsListLoading,
  selectZoneReportsListError,
  selectFarmReportsZoneAverageMortalityList,
  selectIsFarmReportsZoneAverageMortalityListLoading,
  selectFarmReportsZoneAverageMortalityError,
  selectFarmReportsZoneTatTaskCategoriesList,
  selectIsFarmReportsZoneTatTaskCategoriesListLoading,
  selectFarmReportsZoneTatTaskCategoriesError
} from '../../selectors/zonereports'
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
    selectFarmReportsZoneTatTaskCategoriesError()
})
const mapDispatchToProps = {
  fetchZoneReports: fetchZoneReportsRequest,
  fecthFarmReportsZoneAverageMortality:
    fetchFarmReportsZoneAverageMortalityRequest,
  fetchFarmReportsZoneTatTasktCategerios:
    fetchFarmReportsZoneTatTaskCategoriesRequest
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
  connect(mapStateToProps, mapDispatchToProps)(ZoneEfficiency)
)
