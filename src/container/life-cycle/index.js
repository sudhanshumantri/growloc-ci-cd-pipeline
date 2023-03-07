import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchFarmCropsRequest } from "../../actions/crops";
import { addCropToLifecycleRequest, fetchAllCropsLifecycleRequest } from "../../actions/life-cycle";
import { fetchPusherSensorData } from "../../actions/pusher";
import Lifecycle from "../../components/crop/life-cycle";
import {
  selectAddLifecycleError,
  selectIsAddLifecycleLoading,
  selectLifecycleCropsList,
  selectCropLifeCycleListError,
  selectIsCropLifeCycleListLoading,
} from "../../selectors/life-cycle";
import { selectCropFarmList } from "../../selectors/crops";
import { selectSensorDataPusher } from "../../selectors/pucher";
const mapStateToProps = createStructuredSelector({
  cropLifeCycleListError:selectCropLifeCycleListError(),
  isCropLifeCycleListLoading:selectIsCropLifeCycleListLoading(),
  farmCropList: selectCropFarmList(),
  lifecycleCropsList: selectLifecycleCropsList(),
  isAddLifecycleLoading: selectIsAddLifecycleLoading(),
  addLifecycleError: selectAddLifecycleError(),
  sensorDataList : selectSensorDataPusher(),
});
const mapDispatchToProps = {
  fecthCropFarm: fetchFarmCropsRequest,
  addCropToLifecycle: addCropToLifecycleRequest,
  fetchAllCropsLifecycle: fetchAllCropsLifecycleRequest,
  fetchPusherSensorData : fetchPusherSensorData
};
export default
  connect(mapStateToProps, mapDispatchToProps)(Lifecycle);
