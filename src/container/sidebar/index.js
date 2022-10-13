

import React from "react";
import { connect } from "react-redux";
import SideBar from "../../components/shared/sidebar";

import { useLocation, useNavigate, useParams } from "react-router-dom";

const mapStateToProps = null;
const mapDispatchToProps = {};
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    // return React.createElement(Component, {...props, router:{ location, navigate, params }})
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SideBar)
);
