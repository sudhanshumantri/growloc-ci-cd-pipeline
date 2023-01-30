import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { fetchAdminDashboardRequest,addAdminZoneSensorsRequest,deleteAdminZoneSensorsRequest } from "../../actions/admin";
import {AdminDashboard} from "../../components/admin/adminDashboard";
import {
    selectAdminList,
    selectIsAdminListLoading,
    selectAdminListError,
    selectIsAddAdminZoneSensorsLoading,
    selectAddAdminZoneSensorsError,
    selectIsDeleteAdminZoneSensorsLoading,
} from "../../selectors/admin";
const mapStateToProps = createStructuredSelector({
    adminList:selectAdminList(),
    isAdminListLoading:selectIsAdminListLoading(),
    adminListError:selectAdminListError(),
    isAddAdminZoneSensorsLoading:selectIsAddAdminZoneSensorsLoading(),
    addAdminZoneSensorsError:selectAddAdminZoneSensorsError(),
    isDeleteAdminZoneSensorsError:selectIsDeleteAdminZoneSensorsLoading(),
});
const mapDispatchToProps = {
   fetchAdminList:fetchAdminDashboardRequest,
   addAdminZoneSensors:addAdminZoneSensorsRequest,
   deleteAdminZoneSensors : deleteAdminZoneSensorsRequest,
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
  connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)
);
