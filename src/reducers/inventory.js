import { fromJS } from "immutable";
import {
  FETCH_FARM_ALL_INVENTORY_REQUEST,
  FETCH_FARM_ALL_INVENTORY_SUCCESS,
  FETCH_FARM_ALL_INVENTORY_FAILURE,
  ADD_FARM_INVENTORY_REQUEST,
  ADD_FARM_INVENTORY_SUCCESS,
  ADD_FARM_INVENTORY_FAILURE,
  UPDATE_FARM_INVENTORY_REQUEST,
  UPDATE_FARM_INVENTORY_SUCCESS,
  UPDATE_FARM_INVENTORY_FAILURE,
  DELETE_FARM_INVENTORY_REQUEST,
  DELETE_FARM_INVENTORY_SUCCESS,
  DELETE_FARM_INVENTORY_FAILURE,
} from "../actions/actionTypes";

const INITIAL_STATE = fromJS({
  isFarmInventoryListLoading: false,
  FarmInventoryList: [],
  FarmInventoryListError: null,
  isAddFarmInventoryLoading: false,
  AddFarmInventoryError: null,
  isUpdateFarmInventoryLoading:false,
  updateFarmInventoryError:null,
  isDeleteFarmInventoryLoading:false,
  isDeleteFarmInventoryError:false,
});

export default function inventoryReducer(state = INITIAL_STATE, action = {}) {
  let FarmInventoryList = state.toJS()["FarmInventoryList"];
  switch (action.type) {
    case FETCH_FARM_ALL_INVENTORY_REQUEST:
      return state
        .set("isFarmInventoryListLoading", true)
        .set("FarmInventoryList", [])
        .set("FarmInventoryListError", null);
    case FETCH_FARM_ALL_INVENTORY_SUCCESS:
      return state
        .set("isFarmInventoryListLoading", false)
        .set("FarmInventoryList", action.data)
        .set("FarmInventoryListError", null);
    case FETCH_FARM_ALL_INVENTORY_FAILURE:
      return state
        .set("isFarmInventoryListLoading", false)
        .set("FarmInventoryList", [])
        .set("FarmInventoryListError", action.error);
    //
    case ADD_FARM_INVENTORY_REQUEST:
      return state
        .set("isAddFarmInventoryLoading", true)
        .set("AddFarmInventoryError", null);
    case ADD_FARM_INVENTORY_SUCCESS:
      const newItem = {...action.data};
      FarmInventoryList.push(newItem);
      return state
        .set("isAddFarmInventoryLoading", false)
        .set("AddFarmInventoryError", null)
        .set("FarmInventoryList", FarmInventoryList);
    case ADD_FARM_INVENTORY_FAILURE:
      return state
        .set("isAddFarmInventoryLoading", false)
        .set("AddFarmInventoryError", action.error);
    //

    case UPDATE_FARM_INVENTORY_REQUEST:
      return state
        .set("isUpdateFarmInventoryLoading", true)
        .set("updateFarmInventoryError", null);
    case UPDATE_FARM_INVENTORY_SUCCESS:
        const { data} = action.data;
      const index = FarmInventoryList.findIndex((item) => item.id === data.id);
      FarmInventoryList[index] = data;
      return state
        .set("isUpdateFarmInventoryLoading", false)
        .set("FarmInventoryList", FarmInventoryList);
    case UPDATE_FARM_INVENTORY_FAILURE:
      return state
        .set("isUpdateFarmInventoryLoading", false)
        .set("updateFarmInventoryError", true);
    case DELETE_FARM_INVENTORY_REQUEST:
      return state
        .set("isDeleteFarmInventoryLoading", true)
        .set("isDeleteFarmInventoryError", null);
    case DELETE_FARM_INVENTORY_SUCCESS:
      const  id = action.data;
      const filteredList = FarmInventoryList.filter((item) => item.id !== id);
      return state
        .set("isDeleteFarmInventoryLoading", false)
        .set("FarmInventoryList",filteredList)
        .set("isDeleteFarmInventoryError", null);
    case DELETE_FARM_INVENTORY_FAILURE:
      return state.set("FarmInventoryList", FarmInventoryList);
    default:
      return state;
  }
}
