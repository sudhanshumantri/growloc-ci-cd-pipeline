import React from "react";
import { connect } from "react-redux";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { fetchFarmRequest,saveFarmRequest,updateFarmRequest,deleteFarmRequest  } from "../../actions/farm";
import { fetchCropRequest,fetchFarmCropsRequest} from "../../actions/crops";
import Farm from "../../components/farm";
import {
    selectFarmList,
    selectIsFarmListLoading,
    selectFarmListError,
    selectAddFarmError,
    selectIsAddFarmLoading,
    selectIsUpdateFarmLoading,
    selectIsDeleteFarmLoading,
} from "../../selectors/farm";
import {
  selectCropList,
} from "../../selectors/crops";

const mapStateToProps = createStructuredSelector({
    farmList: selectFarmList(),
    isFarmListLoading: selectIsFarmListLoading(),
    FarmListError: selectFarmListError(),
    // addFarmError: selectAddFarmError(),
    // isAddFarmLoading: selectIsAddFarmLoading(),
    isdeleteFarmLoading:selectIsDeleteFarmLoading(),
    // isUpdateFarmLoading:selectIsUpdateFarmLoading()
    cropList: selectCropList(),


});
const mapDispatchToProps = {
  fetchFarm: fetchFarmRequest,
  // addFarm: saveFarmRequest,
  // updateFarm: updateFarmRequest,
  deleteFarm:deleteFarmRequest,
  // fetchCrop: fetchCropRequest,
  fecthCropFarm:fetchFarmCropsRequest,




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
  connect(mapStateToProps, mapDispatchToProps)(Farm)
);
