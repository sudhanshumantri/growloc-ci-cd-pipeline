import { fromJS } from "immutable";
import {
  FETCH_ALL_CROPS_REQUEST,
  FETCH_ALL_CROPS_SUCCESS,
  FETCH_ALL_CROPS_FAILURE,
  ADD_CROPS_REQUEST,
  ADD_CROPS_SUCCESS,
  ADD_CROPS_FAILURE,
  FETCH_ALL_CROPS_FARM_REQUEST,
  FETCH_ALL_CROPS_FARM_SUCCESS,
  FETCH_ALL_CROPS_FARM_FAILURE,
} from "../actions/actionTypes";
const INITIAL_STATE = fromJS({
  isCropListLoading: false,
  isAddCropLoading: false,
  addCropError: null,
  cropList: [],
  cropListError: null,
  isCropFarmListLoading: false,
  cropFarmList: [],
  farmListError: null,
});
export default function cropsReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_ALL_CROPS_REQUEST:
      return state
        .set("isCropListLoading", true)
        .set("cropList", [])
        .set("cropListError", null);
    case FETCH_ALL_CROPS_SUCCESS:
      return state
        .set("isCropListLoading", false)
        .set("cropList", action.data)
        .set("cropListError", null);
    case FETCH_ALL_CROPS_FAILURE:
      return state
        .set("isCropListLoading", false)
        .set("cropList", [])
        .set("cropListError", action.error);
    case ADD_CROPS_REQUEST:
      return state.set("isAddCropLoading", true).set("addCropError", null);
    case ADD_CROPS_SUCCESS:
      return state.set("isAddCropLoading", false).set("addCropError", null);
    case ADD_CROPS_FAILURE:
      return state
        .set("isAddCropLoading", false)
        .set("addCropError", action.error);
    case FETCH_ALL_CROPS_FARM_REQUEST:
      return state
        .set("isCropFarmListLoading", true)
        .set("cropFarmList", [])
        .set("farmListError", null);
    case FETCH_ALL_CROPS_FARM_SUCCESS:
      return state
        .set("isCropFarmListLoading", false)
        .set("cropFarmList", action.data)
        .set("farmListError", null);
    case FETCH_ALL_CROPS_FARM_FAILURE:
      return state
        .set("isCropFarmListLoading", false)
        .set("cropFarmList", [])
        .set("farmListError", action.error);
    default:
      return state;
  }
}
