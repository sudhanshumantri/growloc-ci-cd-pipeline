import {
  FETCH_ALL_FARM_TASKS_REQUEST,
  FETCH_ALL_FARM_TASKS_SUCCESS,
  FETCH_ALL_FARM_TASKS_FAILURE,
  ADD_TASKS_COMMENTS_REQUEST,
  ADD_TASKS_COMMENTS_SUCCESS,
  ADD_TASKS_COMMENTS_FAILURE
} from './actionTypes'

export function fetchFarmTaskRequest (data) {
  return {
    type: FETCH_ALL_FARM_TASKS_REQUEST,
    data
  }
}
export function fetchFarmTaskSuccess (data) {
  return {
    type: FETCH_ALL_FARM_TASKS_SUCCESS,
    data
  }
}
export function fetchFarmTaskFailure (error) {
  return {
    type: FETCH_ALL_FARM_TASKS_FAILURE,
    error
  }
}
export function addTaskCommentRequest (data) {
  return {
    type: ADD_TASKS_COMMENTS_REQUEST,
    data
  }
}
export function addTaskCommentSuccess (data) {
  return {
    type: ADD_TASKS_COMMENTS_SUCCESS,
    data
  }
}
export function addTaskCommentFailure (error) {
  return {
    type: ADD_TASKS_COMMENTS_FAILURE,
    error
  }
}
