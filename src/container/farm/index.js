import React from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import {
  fetchFarmRequest,
  deleteFarmRequest
} from '../../actions/farm'
import { fetchFarmCropsRequest } from '../../actions/crops'
import Farm from '../../components/farm'
import {
  selectFarmList,
  selectIsFarmListLoading,
  selectFarmListError,
  selectIsDeleteFarmLoading
} from '../../selectors/farm'

import { selectCropList } from '../../selectors/crops'

const mapStateToProps = createStructuredSelector({
  farmList: selectFarmList(),
  isFarmListLoading: selectIsFarmListLoading(),
  FarmListError: selectFarmListError(),
  isdeleteFarmLoading: selectIsDeleteFarmLoading(),
  cropList: selectCropList()
})
const mapDispatchToProps = {
  fetchFarm: fetchFarmRequest,
  deleteFarm: deleteFarmRequest,
  fecthCropFarm: fetchFarmCropsRequest
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Farm))
