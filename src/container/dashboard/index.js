import React from "react";
import { connect } from "react-redux";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { fetchFarmRequest,saveFarmRequest  } from "../../actions/farm";
import DashBoard from "../../components/dashboard";
import {
    selectFarmList,
    selectIsFarmListLoading,
    selectFarmListError,
    selectAddFarmError,
    selectIsAddFarmLoading

} from "../../selectors/farm";

const mapStateToProps = createStructuredSelector({
    farmList: selectFarmList(),
    isFarmListLoading: selectIsFarmListLoading(),
    FarmListError: selectFarmListError(),
    addFarmError: selectAddFarmError(),
    isAddFarmLoading: selectIsAddFarmLoading(),
  

});
const mapDispatchToProps = {
  fetchFarm: fetchFarmRequest,
  addFarm: saveFarmRequest,

};
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
  connect(mapStateToProps, mapDispatchToProps)(DashBoard)
);
