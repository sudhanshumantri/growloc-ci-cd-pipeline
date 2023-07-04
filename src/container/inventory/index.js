import React from 'react'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import {
  fetchFarmInventoryRequest,
  addFarmInventoryRequest,
  updateFarmInventoryRequest,
  deleteUFarmInventoryRequest
} from '../../actions/inventory'
import ManageItem from '../../components/inventory/manageitem'
import {
  selectFarmInventoryList,
  selectIsisFarmInventoryListLoading,
  selectFarmInventoryListError,
  selectIsAddFarmInventoryLoading,
  selectAddFarmInventoryError,
  selectIsUpdateFarmInventoryLoading,
  selectIsUpdateFarmInventoryError,
  selectIsDeleteFarmInventoryLoading
} from '../../selectors/inventory'
const mapStateToProps = createStructuredSelector({
  FarmInventoryList: selectFarmInventoryList(),
  isFarmInventoryListLoading: selectIsisFarmInventoryListLoading(),
  farmInventoryListError: selectFarmInventoryListError(),
  isAddFarmInventoryLoading: selectIsAddFarmInventoryLoading(),
  AddFarmInventoryError: selectAddFarmInventoryError(),
  isUpdateFarmInventoryLoading: selectIsUpdateFarmInventoryLoading(),
  updateFarmInventoryError: selectIsUpdateFarmInventoryError(),
  isDeleteFarmInventoryLoading: selectIsDeleteFarmInventoryLoading()
})
const mapDispatchToProps = {
  fetchFarmInventory: fetchFarmInventoryRequest,
  addFarmInventory: addFarmInventoryRequest,
  updateFarmInventory: updateFarmInventoryRequest,
  deleteFarmInventory: deleteUFarmInventoryRequest
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
  connect(mapStateToProps, mapDispatchToProps)(ManageItem)
)
