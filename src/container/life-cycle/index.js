import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchFarmCropsRequest } from "../../actions/crops";
import { addCropToLifecycleRequest, fetchAllCropsLifecycleRequest } from "../../actions/life-cycle";
import Lifecycle from "../../components/crop/life-cycle";
import {
  selectAddLifecycleError,
  selectIsAddLifecycleLoading,
  selectLifecycleCropsList,
  selectCropLifeCycleListError,
  selectIsCropLifeCycleListLoading,
  selectIsLifecycleParametersLoading,
} from "../../selectors/life-cycle";
import { selectCropFarmList } from "../../selectors/crops";

const mapStateToProps = createStructuredSelector({
  cropLifeCycleListError:selectCropLifeCycleListError(),
  isCropLifeCycleListLoading:selectIsCropLifeCycleListLoading(),
  farmCropList: selectCropFarmList(),
  lifecycleCropsList: selectLifecycleCropsList(),
  isAddLifecycleLoading: selectIsAddLifecycleLoading(),
  addLifecycleError: selectAddLifecycleError(),
 
});
const mapDispatchToProps = {
  fecthCropFarm: fetchFarmCropsRequest,
  addCropToLifecycle: addCropToLifecycleRequest,
  fetchAllCropsLifecycle: fetchAllCropsLifecycleRequest
};
export default
  connect(mapStateToProps, mapDispatchToProps)(Lifecycle);
