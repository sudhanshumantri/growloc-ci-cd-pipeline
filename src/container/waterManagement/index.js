import React from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { updateFarmRequest, fetchFarmDetailsRequest } from '../../actions/farm'
import { createStructuredSelector } from 'reselect'
import {
  selectIsUpdateFarmLoading,
  selectIsFarmDetailsListLoading,
  selectFarmDetailsList
} from '../../selectors/farm'
import WaterManagement from '../../components/waterManagement'
const mapStateToProps = createStructuredSelector({
  isUpdateFarmLoading: selectIsUpdateFarmLoading(),
  farmDetailsList: selectFarmDetailsList(),
  isFarmDetailsListLoading: selectIsFarmDetailsListLoading()
})
const mapDispatchToProps = {
  updateFarm: updateFarmRequest,
  fecthFarmDetails: fetchFarmDetailsRequest
}
function withRouter (Component) {
  function ComponentWithRouterProp (props) {
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    return <Component {...props} router={{ location, navigate, params }} />
  }
  return ComponentWithRouterProp
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WaterManagement)
)
