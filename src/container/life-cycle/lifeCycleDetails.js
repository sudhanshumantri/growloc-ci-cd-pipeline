import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchFarmCropsRequest } from "../../actions/crops";
import { fetchCropsLifecycleDetailsRequest,cropsLifecycleTransitionRequest, updateCropToLifecycleParametersRequest,updateCropToLifecycleScheduleRequest } from "../../actions/life-cycle";
import LifecycleDetails from "../../components/crop/life-cycle/lifeCycleDetails";
import { fetchUsersRequest } from "../../actions/users";
import { fetchFarmInventoryRequest } from "../../actions/inventory";
import { addTaskSheduleTaskRequest } from "../../actions/dashboard";

import {
    selectLifecycleDetails,
    selectIsLifecycleDetailsLoading,
    selectLifecycleDetailsError,
    selectIsTransitionLoading,
    selectIsLifecycleParametersLoading
} from "../../selectors/life-cycle";
import {
    selectUsersList
  } from "../../selectors/users"

  import {
    selectFarmInventoryList,
  } from "../../selectors/inventory";

  import {
    selectLoginObject
  } from "../../selectors/login";
  
import { selectCropFarmList } from "../../selectors/crops";

const mapStateToProps = createStructuredSelector({
    lifecycleDetails: selectLifecycleDetails(),
    isLifecycleDetailsLoading: selectIsLifecycleDetailsLoading(),
    lifecycleDetailsError: selectLifecycleDetailsError(),
    isTransitionLoading:selectIsTransitionLoading(),
    isAddLifecycleParametersLoading :selectIsLifecycleParametersLoading(),
    usersList: selectUsersList(),
    farmInventoryList: selectFarmInventoryList(),
    loginObject: selectLoginObject(),
});
const mapDispatchToProps = {
    fetchCropsLifecycleDetails: fetchCropsLifecycleDetailsRequest,
    cropsLifecycleTransition:cropsLifecycleTransitionRequest,
    addCropToLifecycleParameters: updateCropToLifecycleParametersRequest,
    updateCropToLifecycleSchedule:updateCropToLifecycleScheduleRequest,
    fetchUsers: fetchUsersRequest,
    fetchFarmInventory: fetchFarmInventoryRequest,
    addTaskScheduleTask: addTaskSheduleTaskRequest,

};
export default
    connect(mapStateToProps, mapDispatchToProps)(LifecycleDetails);
