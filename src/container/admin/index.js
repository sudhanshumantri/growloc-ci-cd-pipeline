import React from 'react'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import {
  fetchAdminDashboardRequest,
  addAdminZoneSensorsRequest,
  deleteAdminZoneSensorsRequest
} from '../../actions/admin'
import { AdminDashboard } from '../../components/admin/adminDashboard'
import {
  selectAdminList,
  selectIsAdminListLoading,
  selectAdminListError,
  selectIsAddAdminZoneSensorsLoading,
  selectAddAdminZoneSensorsError,
  selectIsDeleteAdminZoneSensorsLoading
} from '../../selectors/admin'
const mapStateToProps = createStructuredSelector({
  adminList: selectAdminList(),
  isAdminListLoading: selectIsAdminListLoading(),
  adminListError: selectAdminListError(),
  isAddAdminZoneSensorsLoading: selectIsAddAdminZoneSensorsLoading(),
  addAdminZoneSensorsError: selectAddAdminZoneSensorsError(),
  isDeleteAdminZoneSensorsError: selectIsDeleteAdminZoneSensorsLoading()
})
const mapDispatchToProps = {
  fetchAdminList: fetchAdminDashboardRequest,
  addAdminZoneSensors: addAdminZoneSensorsRequest,
  deleteAdminZoneSensors: deleteAdminZoneSensorsRequest
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
  connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)
)
