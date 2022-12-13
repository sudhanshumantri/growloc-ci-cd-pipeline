import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {saveFarmRequest,updateFarmRequest,fetchFarmDetailsRequest} from "../../actions/farm";
import { createStructuredSelector } from "reselect";
import {
    selectIsAddFarmLoading,
    selectIsUpdateFarmLoading,
    selectIsFarmDetailsListLoading,
    selectFarmDetailsListError,
    selectFarmDetailsList,
} from "../../selectors/farm";
import WaterManagement from "../../components/waterManagement";

const mapStateToProps = createStructuredSelector({
    isUpdateFarmLoading:selectIsUpdateFarmLoading(),
    farmDetailsList: selectFarmDetailsList(),
    isFarmDetailsListLoading: selectIsFarmDetailsListLoading(),
});
const mapDispatchToProps = {
    updateFarm: updateFarmRequest,
    fecthFarmDetails:fetchFarmDetailsRequest,
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
  connect(mapStateToProps, mapDispatchToProps)(WaterManagement)
);
