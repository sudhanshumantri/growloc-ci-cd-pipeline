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
  UPDATE_MANAGE_CROP_REQUEST,
  UPDATE_MANAGE_CROP_SUCCESS,
  UPDATE_MANAGE_CROP_FAILURE,
  DELETE_MANAGE_CROP_REQUEST,
  DELETE_MANAGE_CROP_SUCCESS,
  DELETE_MANAGE_CROP_FAILURE,
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
  farmcropsStatus: true,
  isupdateFarmCropsLoading: false,
  isupdateFarmCropsError: null,
  farmcropsStatus: true,
  isdeleteFarmCropsLoading: false,
  isdeleteFarmCropsError: false,

});
export default function cropsReducer(state = INITIAL_STATE, action = {}) {
  let cropList = state.toJS()["cropList"];
  let cropFarmList = state.toJS()["cropFarmList"];
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
    //
    case UPDATE_MANAGE_CROP_REQUEST:
      return state
        .set("isupdateFarmCropsLoading", true)
        .set("farmcropsStatus", null)
        .set("isupdateFarmCropsError", null);
    case UPDATE_MANAGE_CROP_SUCCESS:
      const { data } = action.data;
      const index = cropFarmList.findIndex((crop) => crop.id === data.id);
      cropFarmList[index] = data;
      return state
        .set("isupdateFarmCropsLoading", false)
        .set("farmcropsStatus", true)
        .set("cropFarmList", cropFarmList)
    case UPDATE_MANAGE_CROP_FAILURE:
      return state
        .set("isupdateFarmCropsLoading", false)
        .set("farmcropsStatus", true)
        .set("isupdateFarmCropsError", true);
    case DELETE_MANAGE_CROP_REQUEST:
      return state
        .set("isdeleteFarmCropsLoading", true)
        .set("isdeleteFarmCropsError", null);
    case DELETE_MANAGE_CROP_SUCCESS:
      const { id } = action.data;
      const newList = cropFarmList.filter((crop) => crop.id !== id);
      return state
        .set("isdeleteFarmCropsLoading", false)
        .set("cropFarmList", newList)
        .set("isdeleteFarmCropsError", null); 
    case DELETE_MANAGE_CROP_FAILURE:
      return state.set("cropFarmList", cropFarmList);
    default:
      return state;
  }
}
