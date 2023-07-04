import React from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import {
  fetchCropRequest,
  addCropToFarmRequest,
  fetchFarmCropsRequest,
  deleteFarmCropsRequest,
  updateFarmCropsRequest
} from '../../actions/crops'
import ManageCrop from '../../components/crop/managecorp'
import {
  selectCropList,
  selectIsCropListLoading,
  selectCropListError,
  selectAddCropError,
  selectIsAddCropLoading,
  selectCropFarmList,
  selectisFarmCropListLoading,
  selectCropFarmListError,
  selectIsUpdateFarmCropsLoading,
  selectIsDeleteFarmCropsLoading
} from '../../selectors/crops'

const mapStateToProps = createStructuredSelector({
  cropList: selectCropList(),
  isCropListLoading: selectIsCropListLoading(),
  cropListError: selectCropListError(),
  addCropError: selectAddCropError(),
  isAddCropLoading: selectIsAddCropLoading(),
  cropFarmList: selectCropFarmList(),
  isFarmCropListLoading: selectisFarmCropListLoading(),
  selectCropFarmListError: selectCropFarmListError(),
  isupdateFarmCropsLoading: selectIsUpdateFarmCropsLoading(),
  isdeleteFarmCropsLoading: selectIsDeleteFarmCropsLoading()
})
const mapDispatchToProps = {
  fetchCrop: fetchCropRequest,
  addCrop: addCropToFarmRequest,
  fecthCropFarm: fetchFarmCropsRequest,
  deleteCrop: deleteFarmCropsRequest,
  updateCrop: updateFarmCropsRequest
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
  connect(mapStateToProps, mapDispatchToProps)(ManageCrop)
)
