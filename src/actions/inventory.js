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

 } from "./actionTypes";
  
  export function fetchFarmInventoryRequest(data) {
    return {
      type: FETCH_FARM_ALL_INVENTORY_REQUEST,
      data
    };
  }
  export function fetchFarmInventorySuccess(data) {
    return {
      type: FETCH_FARM_ALL_INVENTORY_SUCCESS,
      data,
    };
  }
  export function fetchFarmInventoryFailure(error) {
    return {
      type: FETCH_FARM_ALL_INVENTORY_FAILURE,
      error,
    };
  }

  export function addFarmInventoryRequest(data) {
    return {
      type: ADD_FARM_INVENTORY_REQUEST,
      data
    };
  }
  export function addFarmInventorySuccess(data) {
    return {
      type: ADD_FARM_INVENTORY_SUCCESS,
      data,
    };
  }
  export function addFarmInventoryFailure(error) {
    return {
      type: ADD_FARM_INVENTORY_FAILURE,
      error,
    };
  }

export function updateFarmInventoryRequest(data) {
  return {
      type: UPDATE_FARM_INVENTORY_REQUEST,
      data
  };
}
export function updateFarmInventorySuccess(data) {
  return {
      type: UPDATE_FARM_INVENTORY_SUCCESS,
      data
  };
}

export function updateFarmInventoryFailure(error) {
  return {
      type: UPDATE_FARM_INVENTORY_FAILURE,
      error
  };
}

export function deleteUFarmInventoryRequest(data) {
  return {
      type: DELETE_FARM_INVENTORY_REQUEST,
      data
  };
}
export function deleteFarmInventorySuccess(data) {
  return {
      type: DELETE_FARM_INVENTORY_SUCCESS,
      data
  };
}
export function deleteFarmInventoryFailure(error) {
  return {
      type: DELETE_FARM_INVENTORY_FAILURE,
      error
  };
}

