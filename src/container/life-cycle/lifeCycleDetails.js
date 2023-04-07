import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchFarmCropsRequest } from "../../actions/crops";
import { fetchCropsLifecycleDetailsRequest,cropsLifecycleTransitionRequest, updateCropToLifecycleParametersRequest,updateCropToLifecycleScheduleRequest,updateCropToLifecycleDetailsRequest} from "../../actions/life-cycle";
import { getRecentZoneSensorDataRequest } from "../../actions/zone";
import LifecycleDetails from "../../components/crop/life-cycle/lifeCycleDetails";
import { fetchUsersRequest } from "../../actions/users";
import { fetchFarmInventoryRequest } from "../../actions/inventory";
import { addFarmDashboardZoneTaskRequest } from "../../actions/zone";
import { selectPusherData } from "../../selectors/pucher";
import { selectAllUserZoneSensor,selectIsTaskScheduleTaskLoading } from "../../selectors/dashboard";
import { selectRecentZoneSensorData,selectRecentZoneSensorDataError,selectIsRecentZoneSensorDataLoading,  selectIsFarmDashboardZoneTaskLoading,
} from "../../selectors/zone";
import {
    selectLifecycleDetails,
    selectIsLifecycleDetailsLoading,
    selectLifecycleDetailsError,
    selectIsTransitionLoading,
    selectIsLifecycleParametersLoading,
    selectIsUpdateLifeCycleDetailsLoading,
    selectIsUpdateLifeCycleDetailsError
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

const mapStateToProps = createStructuredSelector({
    lifecycleDetails: selectLifecycleDetails(),
    isLifecycleDetailsLoading: selectIsLifecycleDetailsLoading(),
    lifecycleDetailsError: selectLifecycleDetailsError(),
    isTransitionLoading:selectIsTransitionLoading(),
    isAddLifecycleParametersLoading :selectIsLifecycleParametersLoading(),
    usersList: selectUsersList(),
    farmInventoryList: selectFarmInventoryList(),
    loginObject: selectLoginObject(),
    allUserZoneSensorList : selectAllUserZoneSensor(),
    pusherData : selectPusherData(),
    recentZoneSensorData : selectRecentZoneSensorData(),
    isRecentZoneSensorDataLoading : selectIsRecentZoneSensorDataLoading(),
    recentZoneSensorDataLoadingError : selectIsRecentZoneSensorDataLoading(),
    isFarmDashboardZoneTaskLoading: selectIsFarmDashboardZoneTaskLoading(),
    isAddLifeCycleDetails:selectIsUpdateLifeCycleDetailsLoading(),
    addLifeCycleDetailsError:selectIsUpdateLifeCycleDetailsError()
  

});
const mapDispatchToProps = {
    fetchCropsLifecycleDetails: fetchCropsLifecycleDetailsRequest,
    cropsLifecycleTransition:cropsLifecycleTransitionRequest,
    addCropToLifecycleParameters: updateCropToLifecycleParametersRequest,
    updateCropToLifecycleSchedule:updateCropToLifecycleScheduleRequest,
    fetchUsers: fetchUsersRequest,
    fetchFarmInventory: fetchFarmInventoryRequest,
    addFarmDashboardZoneTask: addFarmDashboardZoneTaskRequest,
    fetchRecentZoneSensorData : getRecentZoneSensorDataRequest,
    updateCropToLifecycleDetails:updateCropToLifecycleDetailsRequest,
};
export default
    connect(mapStateToProps, mapDispatchToProps)(LifecycleDetails);
