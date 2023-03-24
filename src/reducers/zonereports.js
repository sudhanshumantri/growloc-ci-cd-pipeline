import { fromJS } from "immutable";
import {
    FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_REQUEST,
    FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_SUCCESS,
    FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_FAILURE,
    FETCH_FARM_REPORTS_ZONE_AVERAGE_MORTALITY_REQUEST,
    FETCH_FARM_REPORTS_ZONE_AVERAGE_MORTALITY_SUCCESS,
    FETCH_FARM_REPORTS_ZONE_AVERAGE_MORTALITY_FAILURE,
    FETCH_FARM_REPORTS_ZONE_TAT_TASK_CATEGORIES_REQUEST,
    FETCH_FARM_REPORTS_ZONE_TAT_TASK_CATEGORIES_SUCCESS,
    FETCH_FARM_REPORTS_ZONE_TAT_TASK_CATEGORIES_FAILURE,
} from "../actions/actionTypes";

const INITIAL_STATE = fromJS({
  isZoneReportsListLoading: false,
  zoneReportsList: [],
  zoneReportsListError: null,
  isFarmReportsZoneAverageMortalityListLoading: false,
  farmReportsZoneAverageMortalityList: [],
  farmReportsZoneAverageMortalityError: null,
  isFarmReportsZoneTatTaskCategoriesListLoading: false,
  farmReportsZoneTatTaskCategoriesList: [],
  farmReportsZoneTatTaskCategoriesError: null,
});

export default function zoneReportsReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_REQUEST:
      return state
        .set("isZoneReportsListLoading", true)
        .set("zoneReportsList", [])
        .set("zoneReportsListError", null);
    case FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_SUCCESS:
      return state
        .set("isZoneReportsListLoading", false)
        .set("zoneReportsList", action.data)
        .set("zoneReportsListError", null);
    case FETCH_ALL_ZONE_SENSORS_REPORTS_DATA_FAILURE:
      return state
        .set("isZoneReportsListLoading", false)
        .set("zoneReportsList", [])
        .set("zoneReportsListError", action.error);

        case FETCH_FARM_REPORTS_ZONE_AVERAGE_MORTALITY_REQUEST:
          return state
            .set("isFarmReportsZoneAverageMortalityListLoading", true)
            .set("farmReportsZoneAverageMortalityList", [])
            .set("isFarmReportsZoneAverageMortalityError", null);
        case FETCH_FARM_REPORTS_ZONE_AVERAGE_MORTALITY_SUCCESS:
          return state
            .set("isFarmReportsZoneAverageMortalityListLoading", false)
            .set("farmReportsZoneAverageMortalityList", action.data)
            .set("farmReportsListEisFarmReportsZoneAverageMortalityErrorrror", null);
        case FETCH_FARM_REPORTS_ZONE_AVERAGE_MORTALITY_FAILURE:
          return state
            .set("isFarmReportsZoneAverageMortalityListLoading", false)
            .set("farmReportsZoneAverageMortalityList", [])
            .set("isFarmReportsZoneAverageMortalityError", action.error);

            case FETCH_FARM_REPORTS_ZONE_TAT_TASK_CATEGORIES_REQUEST:
              return state
                .set("isFarmReportsZoneTatTaskCategoriesListLoading", true)
                .set("farmReportsZoneTatTaskCategoriesList", [])
                .set("farmReportsZoneTatTaskCategoriesError", null);
            case FETCH_FARM_REPORTS_ZONE_TAT_TASK_CATEGORIES_SUCCESS:
              return state
                .set("isFarmReportsZoneTatTaskCategoriesListLoading", false)
                .set("farmReportsZoneTatTaskCategoriesList", action.data)
                .set("farmReportsZoneTatTaskCategoriesError", null);
            case FETCH_FARM_REPORTS_ZONE_TAT_TASK_CATEGORIES_FAILURE:
              return state
                .set("isFarmReportsZoneTatTaskCategoriesListLoading", false)
                .set("farmReportsZoneTatTaskCategoriesList", [])
                .set("farmReportsZoneTatTaskCategoriesError", action.error);
    
          
    
    default:
      return state;
  }
}
