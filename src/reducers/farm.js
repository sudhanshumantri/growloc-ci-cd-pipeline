import { fromJS } from 'immutable'
import {
  FETCH_ALL_FARM_REQUEST,
  FETCH_ALL_FARM_SUCCESS,
  FETCH_ALL_FARM_FAILURE,
  ADD_FARM_REQUEST,
  ADD_FARM_SUCCESS,
  ADD_FARM_FAILURE,
  UPDATE_FARM_REQUEST,
  UPDATE_FARM_SUCCESS,
  UPDATE_FARM_FAILURE,
  DELETE_FARM_REQUEST,
  DELETE_FARM_SUCCESS,
  DELETE_FARM_FAILURE,
  FETCH_FARM_DETAILS_REQUEST,
  FETCH_FARM_DETAILS_SUCCESS,
  FETCH_FARM_DETAILS_FAILURE
} from '../actions/actionTypes'
const INITIAL_STATE = fromJS({
  isFarmListLoading: false,
  isAddFarmLoading: false,
  addFarmError: null,
  farmList: [],
  FarmListError: null,
  isUpdateFarmLoading: false,
  isupdateFarmError: null,
  farmStatus: true,
  isdeleteFarmLoading: false,
  isdeleteFarmError: false,
  farmDetailsList: {},
  isFarmDetailsListLoading: false,
  addFarmDetailsError: null
})
export default function farmReducer (state = INITIAL_STATE, action = {}) {
  const farmList = state.toJS().farmList
  switch (action.type) {
    case FETCH_ALL_FARM_REQUEST:
      return state
        .set('isFarmListLoading', true)
        .set('farmList', [])
        .set('FarmListError', null)
    case FETCH_ALL_FARM_SUCCESS:
      return state
        .set('isFarmListLoading', false)
        .set('farmList', action.data)
        .set('FarmListError', null)
    case FETCH_ALL_FARM_FAILURE:
      return state
        .set('isFarmListLoading', false)
        .set('farmList', [])
        .set('FarmListError', action.error)
    case ADD_FARM_REQUEST:
      return state.set('isAddFarmLoading', true).set('addFarmError', null)
    case ADD_FARM_SUCCESS:
      farmList.push({ farm: action.data })
      return state
        .set('isAddFarmLoading', false)
        .set('addFarmError', null)
        .set('farmList', farmList)
    case ADD_FARM_FAILURE:
      return state
        .set('isAddFarmLoading', false)
        .set('addFarmError', action.error)
    case UPDATE_FARM_REQUEST:
      return state
        .set('isUpdateFarmLoading', true)
        .set('farmStatus', null)
        .set('isupdateFarmError', null)
    case UPDATE_FARM_SUCCESS:
      return state.set('isUpdateFarmLoading', false).set('farmStatus', true)
    case UPDATE_FARM_FAILURE:
      return state
        .set('isUpdateFarmLoading', false)
        .set('farmStatus', true)
        .set('isupdateUserError', true)
    case DELETE_FARM_REQUEST:
      return state
        .set('isdeleteFarmLoading', true)
        .set('isdeleteFarmError', null)
    case DELETE_FARM_SUCCESS: {
      const farmId = action.data
      const filteredList = farmList.filter((farm) => farm.farmId !== farmId)
      return state
        .set('isdeleteFarmLoading', false)
        .set('farmList', filteredList)
        .set('isdeleteFarmError', null)
    }
    case DELETE_FARM_FAILURE:
      return state.set('farmList', farmList)
    case FETCH_FARM_DETAILS_REQUEST:
      return state
        .set('isFarmDetailsListLoading', true)
        .set('farmDetailsList', {})
        .set('addFarmDetailsError', null)
    case FETCH_FARM_DETAILS_SUCCESS:
      return state
        .set('isFarmDetailsListLoading', false)
        .set('farmDetailsList', action.data)
        .set('addFarmDetailsError', null)
    case FETCH_FARM_DETAILS_FAILURE:
      return state
        .set('isFarmDetailsListLoading', false)
        .set('farmDetailsList', {})
        .set('addFarmDetailsError', action.error)
    default:
      return state
  }
}
