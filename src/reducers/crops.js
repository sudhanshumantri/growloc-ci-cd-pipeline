import { fromJS } from "immutable";
import {
  FETCH_ALL_CROPS_REQUEST,
  FETCH_ALL_CROPS_SUCCESS,
  FETCH_ALL_CROPS_FAILURE,
  ADD_CROP_TO_FARM_REQUEST,
  ADD_CROP_TO_FARM_SUCCESS,
  ADD_CROP_TO_FARM_FAILURE,
  FETCH_FARM_ALL_CROPS_REQUEST,
  FETCH_FARM_ALL_CROPS_SUCCESS,
  FETCH_FARM_ALL_CROPS_FAILURE,
} from "../actions/actionTypes";
const INITIAL_STATE = fromJS({
  isCropListLoading: false,
  isAddCropLoading: false,
  addCropError: null,
  cropList: [],
  cropListError: null,
  isFarmCropListLoading: false,
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
    case ADD_CROP_TO_FARM_REQUEST:
      return state.set("isAddCropLoading", true).set("addCropError", null);
    case ADD_CROP_TO_FARM_SUCCESS:
      return state.set("isAddCropLoading", false).set("addCropError", null);
    case ADD_CROP_TO_FARM_FAILURE:
      return state
        .set("isAddCropLoading", false)
        .set("addCropError", action.error);
    case FETCH_FARM_ALL_CROPS_REQUEST:
      return state
        .set("isFarmCropListLoading", true)
        .set("cropFarmList", [])
        .set("farmListError", null);
    case FETCH_FARM_ALL_CROPS_SUCCESS:
      return state
        .set("isFarmCropListLoading", false)
        .set("cropFarmList", action.data)
        .set("farmListError", null);
    case FETCH_FARM_ALL_CROPS_FAILURE:
      return state
        .set("isFarmCropListLoading", false)
        .set("cropFarmList", [])
        .set("farmListError", action.error);
    default:
      return state;
  }
}
