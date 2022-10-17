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
    FETCH_CROP_LIFECYCLE_DETAILS__FAILURE
} from "../actions/actionTypes";
const INITIAL_STATE = fromJS({
    isCropLifeCycleListLoading: false,
    isAddLifecycleLoading: false,
    lifecycleCrops: [],
    addLifecycleError: null,
    cropLifeCycleListError: null,
    lifecycleDetails: null,
    isLifeCycleDetailsLoading: true,
    lifeCycleDetailsError: null
});
export default function cropLifecycleReducer(state = INITIAL_STATE, action = {}) {
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
            let lifecycleCrops = state.toJS()['lifecycleCrops'];
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
        default:
            return state;
    }
}
