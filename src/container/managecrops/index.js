import React from "react";
import { connect } from "react-redux";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { fetchCropRequest, saveCropRequest,fetchCropFarmRequest } from "../../actions/crops";
import ManageCrop from "../../components/crop/managecorp";
import {
  selectCropList,
  selectIsCropListLoading,
  selectCropListError,
  selectAddCropError,
  selectIsAddCropLoading,
  selectCropFarmList,
  selectIsCropFarmListLoading,
  selectCropFarmListError
} from "../../selectors/crops";

const mapStateToProps = createStructuredSelector({
  cropList: selectCropList(),
  isCropListLoading: selectIsCropListLoading(),
  cropListError: selectCropListError(),
  addCropError: selectAddCropError(),
  isAddCropLoading: selectIsAddCropLoading(),
  cropFarmList:selectCropFarmList(),
  isCropFarmListLoading :selectIsCropFarmListLoading(),
  selectCropFarmListError:selectCropFarmListError(),

});
const mapDispatchToProps = {
  fetchCrop: fetchCropRequest,
  addCrop: saveCropRequest,
  fecthCropFarm:fetchCropFarmRequest,



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
  connect(mapStateToProps, mapDispatchToProps)(ManageCrop)
);
