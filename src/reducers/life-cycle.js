import { fromJS } from "immutable";
import {
  ADD_CROP_LIFECYCLE_REQUEST,
  ADD_CROP_LIFECYCLE_SUCCESS,
  ADD_CROP_LIFECYCLE_FAILURE,
  FETCH_CROP_LIFECYCLE_REQUEST,
  FETCH_CROP_LIFECYCLE_SUCCESS,
  FETCH_CROP_LIFECYCLE_FAILURE,
  FETCH_CROP_LIFECYCLE_DETAILS_REQUEST,
  FETCH_CROP_LIFECYCLE_DETAILS__SUCCESS,
  FETCH_CROP_LIFECYCLE_DETAILS__FAILURE,
  CROP_LIFECYCLE_TRANSITION_REQUEST,
  CROP_LIFECYCLE_TRANSITION__SUCCESS,
  CROP_LIFECYCLE_TRANSITION__FAILURE,
  UPDATE_CROP_LIFECYCLE_PARAMETERS_REQUEST,
  UPDATE_CROP_LIFECYCLE_PARAMETERS_SUCCESS,
  UPDATE_CROP_LIFECYCLE_PARAMETERS_FAILURE,
  UPDATE_CROP_LIFECYCLE_SCHEDULE_REQUEST,
  UPDATE_CROP_LIFECYCLE_SCHEDULE_SUCCESS,
  UPDATE_CROP_LIFECYCLE_SCHEDULE_FAILURE,
  UPDATE_CROP_LIFECYCLE_DETAILS_REQUEST,
  UPDATE_CROP_LIFECYCLE_DETAILS_SUCCESS,
  UPDATE_CROP_LIFECYCLE_DETAILS_FAILURE

} from "../actions/actionTypes";
const INITIAL_STATE = fromJS({
  isCropLifeCycleListLoading: false,
  isAddLifecycleLoading: false,
  lifecycleCrops: [],
  addLifecycleError: null,
  cropLifeCycleListError: null,
  lifecycleDetails: null,
  isLifeCycleDetailsLoading: true,
  lifeCycleDetailsError: null,
  isTransitionLoading: false,
  isAddLifecycleParametersLoading: false,
  addLifecycleParameterError: null,
  isUpdateLifecycleStageScheduleRequested: false,
  isUpdateLifeCycleDetailsLoading:false,
  isUpdateLifeCycleDetailsError:false
});
export default function cropLifecycleReducer(
  state = INITIAL_STATE,
  action = {}
) {
  let lifecycleDetails = state.toJS()["lifecycleDetails"];
  switch (action.type) {

    case FETCH_CROP_LIFECYCLE_REQUEST:
      return state
        .set("isCropLifeCycleListLoading", true)
        .set("cropLifeCycleListError", null);
    case FETCH_CROP_LIFECYCLE_SUCCESS:
      return state
        .set("isCropLifeCycleListLoading", false)
        .set("lifecycleCrops", action.data)
        .set("cropLifeCycleListError", null);
    case FETCH_CROP_LIFECYCLE_FAILURE:
      return state
        .set("isCropLifeCycleListLoading", false)
        .set("lifecycleCrops", [])
        .set("cropLifeCycleListError", action.error);
    case ADD_CROP_LIFECYCLE_REQUEST:
      return state
        .set("isAddLifecycleLoading", true)
        .set("addLifecycleError", null);
    case ADD_CROP_LIFECYCLE_SUCCESS:
      let lifecycleCrops = state.toJS()["lifecycleCrops"];
      lifecycleCrops.push(action.data);
      return state
        .set("isAddLifecycleLoading", false)
        .set("lifecycleCrops", lifecycleCrops)
        .set("addLifecycleError", null);
    case ADD_CROP_LIFECYCLE_FAILURE:
      return state
        .set("isAddLifecycleLoading", false)
        .set("addLifecycleError", action.error);
    case FETCH_CROP_LIFECYCLE_DETAILS_REQUEST:
      return state
        .set("lifecycleDetails", null)
        .set("isLifeCycleDetailsLoading", true)
        .set("lifeCycleDetailsError", null);
    case FETCH_CROP_LIFECYCLE_DETAILS__SUCCESS:
      return state
        .set("lifecycleDetails", action.data)
        .set("isLifeCycleDetailsLoading", false)
        .set("lifeCycleDetailsError", null);
    case FETCH_CROP_LIFECYCLE_DETAILS__FAILURE:
      return state
        .set("lifecycleDetails", null)
        .set("isLifeCycleDetailsLoading", false)
        .set("lifeCycleDetailsError", null);
    //transtion handling
    case CROP_LIFECYCLE_TRANSITION_REQUEST:
      return state.set("isTransitionLoading", true);
    case CROP_LIFECYCLE_TRANSITION__SUCCESS:
      return state
        .set("lifecycleDetails", action.data)
        .set("isTransitionLoading", false);
    case CROP_LIFECYCLE_TRANSITION__FAILURE:
      return state.set("isTransitionLoading", false);
    //
    case UPDATE_CROP_LIFECYCLE_PARAMETERS_REQUEST:
      return state
        .set("isAddLifecycleParametersLoading", true)
        .set("addLifecycleParameterError", null);
    case UPDATE_CROP_LIFECYCLE_PARAMETERS_SUCCESS:
      const { FarmCropLifecycleStages } = lifecycleDetails.cropDetails;
      const { id } = action.data;
      const index = FarmCropLifecycleStages.findIndex(
        (stage) => stage.id === id
      );
      lifecycleDetails.cropDetails.FarmCropLifecycleStages[index] = action.data;
      return state
        .set("isAddLifecycleParametersLoading", false)
        .set("lifecycleDetails", lifecycleDetails)
        .set("addLifecycleParameterError", null);
    case UPDATE_CROP_LIFECYCLE_PARAMETERS_FAILURE:
      return state
        .set("isAddLifecycleParametersLoading", false)
        .set("addLifecycleParameterError", action.error);

    // update of stage parameters
    case UPDATE_CROP_LIFECYCLE_SCHEDULE_REQUEST:
      return state
        .set("isUpdateLifecycleStageScheduleRequested", true)
    case UPDATE_CROP_LIFECYCLE_SCHEDULE_SUCCESS:
      lifecycleDetails.cropDetails.FarmCropLifecycleSchedules = [action.data];
      return state
        .set("isUpdateLifecycleStageScheduleRequested", false)
        .set("lifecycleDetails", lifecycleDetails)
    case UPDATE_CROP_LIFECYCLE_SCHEDULE_FAILURE:
      return state
        .set("isUpdateLifecycleStageScheduleRequested", false)

    case UPDATE_CROP_LIFECYCLE_DETAILS_REQUEST:
      
      return state
        .set("isUpdateLifeCycleDetailsLoading", true)
        .set("isUpdateLifeCycleDetailsError", null);
    case UPDATE_CROP_LIFECYCLE_DETAILS_SUCCESS:

      return state
        .set("isUpdateLifeCycleDetailsLoading", false)
        .set("lifecycleDetails", lifecycleDetails)
        .set("isUpdateLifeCycleDetailsError", null);
    case UPDATE_CROP_LIFECYCLE_DETAILS_FAILURE:
      return state
        .set("isUpdateLifeCycleDetailsLoading", false)
        .set("isUpdateLifeCycleDetailsError", action.error);

    default:
      return state;
  }
}
