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
} from './actionTypes'

export function fetchAllCropsLifecycleRequest (data) {
  return {
    type: FETCH_CROP_LIFECYCLE_REQUEST,
    data
  }
}
export function fetchAllCropsLifecycleSuccess (data) {
  return {
    type: FETCH_CROP_LIFECYCLE_SUCCESS,
    data
  }
}
export function fetchAllCropsLifecycleFailure (error) {
  return {
    type: FETCH_CROP_LIFECYCLE_FAILURE,
    error
  }
}
export function addCropToLifecycleRequest (data) {
  return {
    type: ADD_CROP_LIFECYCLE_REQUEST,
    data
  }
}
export function addCropToLifecycleSuccess (data) {
  return {
    type: ADD_CROP_LIFECYCLE_SUCCESS,
    data
  }
}
export function addCropToLifecycleFailure (error) {
  return {
    type: ADD_CROP_LIFECYCLE_FAILURE,
    error
  }
}
export function fetchCropsLifecycleDetailsRequest (data) {
  return {
    type: FETCH_CROP_LIFECYCLE_DETAILS_REQUEST,
    data
  }
}
export function fetchCropsLifecycleDetailsSuccess (data) {
  return {
    type: FETCH_CROP_LIFECYCLE_DETAILS__SUCCESS,
    data
  }
}
export function fetchCropsLifecycleDetailsFailure (error) {
  return {
    type: FETCH_CROP_LIFECYCLE_DETAILS__FAILURE,
    error
  }
}
export function cropsLifecycleTransitionRequest (data) {
  return {
    type: CROP_LIFECYCLE_TRANSITION_REQUEST,
    data
  }
}
export function cropsLifecycleTransitionSuccess (data) {
  return {
    type: CROP_LIFECYCLE_TRANSITION__SUCCESS,
    data
  }
}
export function cropsLifecycleTransitionFailure (error) {
  return {
    type: CROP_LIFECYCLE_TRANSITION__FAILURE,
    error
  }
}
export function updateCropToLifecycleParametersRequest (data) {
  return {
    type: UPDATE_CROP_LIFECYCLE_PARAMETERS_REQUEST,
    data
  }
}
export function updateCropToLifecycleParametersSuccess (data) {
  return {
    type: UPDATE_CROP_LIFECYCLE_PARAMETERS_SUCCESS,
    data
  }
}
export function updateCropToLifecycleParametersFailure (error) {
  return {
    type: UPDATE_CROP_LIFECYCLE_PARAMETERS_FAILURE,
    error
  }
}
export function updateCropToLifecycleScheduleRequest (data) {
  return {
    type: UPDATE_CROP_LIFECYCLE_SCHEDULE_REQUEST,
    data
  }
}
export function updateCropToLifecycleScheduleSuccess (data) {
  return {
    type: UPDATE_CROP_LIFECYCLE_SCHEDULE_SUCCESS,
    data
  }
}
export function updateCropToLifecycleScheduleFailure (error) {
  return {
    type: UPDATE_CROP_LIFECYCLE_SCHEDULE_FAILURE,
    error
  }
}
export function updateCropToLifecycleDetailsRequest (data) {
  return {
    type: UPDATE_CROP_LIFECYCLE_DETAILS_REQUEST,
    data
  }
}
export function updateCropToLifecycleDetailsSuccess (data) {
  return {
    type: UPDATE_CROP_LIFECYCLE_DETAILS_SUCCESS,
    data
  }
}
export function updateCropToLifecycleDetailsFailure (error) {
  return {
    type: UPDATE_CROP_LIFECYCLE_DETAILS_FAILURE,
    error
  }
}
