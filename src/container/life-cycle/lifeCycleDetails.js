import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchFarmCropsRequest } from "../../actions/crops";
import { fetchCropsLifecycleDetailsRequest,cropsLifecycleTransitionRequest, updateCropToLifecycleParametersRequest,updateCropToLifecycleScheduleRequest } from "../../actions/life-cycle";
import LifecycleDetails from "../../components/crop/life-cycle/lifeCycleDetails";
import {
    selectLifecycleDetails,
    selectIsLifecycleDetailsLoading,
    selectLifecycleDetailsError,
    selectIsTransitionLoading,
    selectIsLifecycleParametersLoading
} from "../../selectors/life-cycle";
import { selectCropFarmList } from "../../selectors/crops";

const mapStateToProps = createStructuredSelector({

    lifecycleDetails: selectLifecycleDetails(),
    isLifecycleDetailsLoading: selectIsLifecycleDetailsLoading(),
    lifecycleDetailsError: selectLifecycleDetailsError(),
    isTransitionLoading:selectIsTransitionLoading(),
    isAddLifecycleParametersLoading :selectIsLifecycleParametersLoading(),


});
const mapDispatchToProps = {
    fetchCropsLifecycleDetails: fetchCropsLifecycleDetailsRequest,
    cropsLifecycleTransition:cropsLifecycleTransitionRequest,
    addCropToLifecycleParameters: updateCropToLifecycleParametersRequest,
    updateCropToLifecycleSchedule:updateCropToLifecycleScheduleRequest
};
export default
    connect(mapStateToProps, mapDispatchToProps)(LifecycleDetails);
