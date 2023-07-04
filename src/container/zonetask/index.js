import React from 'react'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import {
  fetchZoneTaskRequest,
  addZoneTaskCommentRequest
} from '../../actions/zone'
import ManageZoneTasks from '../../components/zone/task'
import {
  selectZoneTaskList,
  selectIsZoneTaskListLoading,
  selectZoneTaskListError,
  selectIsZoneTaskCommentLoading,
  selectZoneTaskCommentError
} from '../../selectors/zone'

const mapStateToProps = createStructuredSelector({
  zoneTaskList: selectZoneTaskList(),
  isZoneTaskListLoading: selectIsZoneTaskListLoading(),
  zoneTaskListError: selectZoneTaskListError(),
  isZoneTaskCommentLoading: selectIsZoneTaskCommentLoading(),
  zoneTaskCommentError: selectZoneTaskCommentError()
})
const mapDispatchToProps = {
  fetchZoneTask: fetchZoneTaskRequest,
  addZoneTaskComment: addZoneTaskCommentRequest
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
  connect(mapStateToProps, mapDispatchToProps)(ManageZoneTasks)
)
