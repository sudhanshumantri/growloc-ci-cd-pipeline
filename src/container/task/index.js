import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {fetchFarmTaskRequest,addTaskCommentRequest} from "../../actions/task";
import ManageTasks from "../../components/task";
import {
    selectFarmTaskList,
    selectIsisFarmTaskListLoading,
    selectFarmTaskListError,
    selectIsTaskCommentLoading,
    selectTaskCommentError,
} from "../../selectors/task";
const mapStateToProps = createStructuredSelector({
    FarmTaskList:selectFarmTaskList(),
    isFarmTaskListLoading:selectIsisFarmTaskListLoading(),
    FarmTaskListError:selectFarmTaskListError(),
    isTaskCommentLoading:selectIsTaskCommentLoading(),
    taskCommentError:selectTaskCommentError(),
});
const mapDispatchToProps = {
   fetchFarmTask:fetchFarmTaskRequest,
   addTaskComment: addTaskCommentRequest,
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
  connect(mapStateToProps, mapDispatchToProps)(ManageTasks)
);
