import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from './actionTypes'

export function registerRequest (data) {
  return {
    type: REGISTER_REQUEST,
    data
  }
}
export function registerSuccess (data) {
  return {
    type: REGISTER_SUCCESS,
    data
  }
}
export function registerFailure (error) {
  return {
    type: REGISTER_FAILURE,
    error
  }
}
