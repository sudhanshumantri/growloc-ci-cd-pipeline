import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {fetchZoneTaskRequest,addZoneTaskCommentRequest} from "../../actions/zone/task";

import ManageZoneTasks from "../../components/Zone/task";

import {
    selectZoneTaskList,
    selectIsZoneTaskListLoading,
    selectZoneTaskListError,
    selectIsZoneTaskCommentLoading,
    selectZoneTaskCommentError,
} from "../../selectors/zone/task";

const mapStateToProps = createStructuredSelector({
    zoneTaskList:selectZoneTaskList(),
    isZoneTaskListLoading:selectIsZoneTaskListLoading(),
    zoneTaskListError:selectZoneTaskListError(),
    isZoneTaskCommentLoading:selectIsZoneTaskCommentLoading(),
    zoneTaskCommentError:selectZoneTaskCommentError(),

});
const mapDispatchToProps = {
   fetchZoneTask:fetchZoneTaskRequest,
   addZoneTaskComment: addZoneTaskCommentRequest,
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
  connect(mapStateToProps, mapDispatchToProps)(ManageZoneTasks)
);