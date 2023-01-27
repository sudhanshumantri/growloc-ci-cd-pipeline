import { fromJS } from "immutable";
import {
    FETCH_ALL_ADMIN_DASHBOARD_REQUEST,
    FETCH_ALL_ADMIN_DASHBOARD_SUCCESS,
    FETCH_ALL_ADMIN_DASHBOARD_FAILURE,
    ADD_ADMIN_ZONE_SENSORS_REQUEST,
    ADD_ADMIN_ZONE_SENSORS_SUCCESS,
    ADD_ADMIN_ZONE_SENSORS_FAILURE,
    DELETE_ADMIN_ZONE_SENSORS_REQUEST,
    DELETE_ADMIN_ZONE_SENSORS_SUCCESS,
    DELETE_ADMIN_ZONE_SENSORS_FAILURE
} from "../actions/actionTypes";
const INITIAL_STATE = fromJS({
  isAdminListLoading: false,
  adminList: [],
  adminListError: null,
  isAddAdminZoneSensorsLoading: false,
  addAdminZoneSensorsError: null,
  isDeleteAdminZoneSensorsLoading : false,
  isDeleteAdminZoneSensorsError : null

  
});
export default function adminReducer(state = INITIAL_STATE, action = {}) {
  let adminList = state.toJS()["adminList"];
  switch (action.type) {
    case FETCH_ALL_ADMIN_DASHBOARD_REQUEST:
      return state
        .set("isAdminListLoading", true)
        .set("adminList", [])
        .set("adminListError", null);
    case FETCH_ALL_ADMIN_DASHBOARD_SUCCESS:
      return state
        .set("isAdminListLoading", false)
        .set("adminList", action.data)
        .set("adminListError", null);
    case FETCH_ALL_ADMIN_DASHBOARD_FAILURE:
      return state
        .set("isAdminListLoading", false)
        .set("adminList", [])
        .set("adminListError", action.error);
        case ADD_ADMIN_ZONE_SENSORS_REQUEST:
          return state
            .set("isAddAdminZoneSensorsLoading", true)
            .set("addAdminZoneSensorsError", null);
        case ADD_ADMIN_ZONE_SENSORS_SUCCESS:
          return state
            .set("isAddAdminZoneSensorsLoading", false)
            .set("adminList",adminList)
            .set("addAdminZoneSensorsError", null)
        case ADD_ADMIN_ZONE_SENSORS_FAILURE:
          return state
            .set("isAddAdminZoneSensorsLoading", false)
            .set("addAdminZoneSensorsError", action.error);
            case DELETE_ADMIN_ZONE_SENSORS_REQUEST:

              return state
                .set("isDeleteAdminZoneSensorsLoading", true)
                .set("isDeleteAdminZoneSensorsError", null);
            case DELETE_ADMIN_ZONE_SENSORS_SUCCESS:
              return state
                .set("isDeleteAdminZoneSensorsLoading", false)
                .set("adminList","filteredList")
                .set("isDeleteAdminZoneSensorsError", null);
            case DELETE_ADMIN_ZONE_SENSORS_FAILURE:
              return state.set("adminList", "");
    default:
      return state;
  }
}
