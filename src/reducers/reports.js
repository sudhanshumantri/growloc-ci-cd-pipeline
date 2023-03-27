import { fromJS } from "immutable";
import {
    FETCH_ALL_FARM_REPORTS_DATA_REQUEST,
    FETCH_ALL_FARM_REPORTS_DATA_SUCCESS,
    FETCH_ALL_FARM_REPORTS_DATA_FAILURE,
    FETCH_FARM_REPORTS_FARM_AVERAGE_MORTALITY_REQUEST,
    FETCH_FARM_REPORTS_FARM_AVERAGE_MORTALITY_SUCCESS,
    FETCH_FARM_REPORTS_FARM_AVERAGE_MORTALITY_FAILURE,
    FETCH_FARM_REPORTS_FARM_TAT_TASK_CATEGORIES_REQUEST,
    FETCH_FARM_REPORTS_FARM_TAT_TASK_CATEGORIES_SUCCESS,
    FETCH_FARM_REPORTS_FARM_TAT_TASK_CATEGORIES_FAILURE
} from "../actions/actionTypes";

const INITIAL_STATE = fromJS({
  isFarmReportsListLoading: false,
  farmReportsList: [],
  farmReportsListError: null,
  isFarmReportsFarmAverageMortalityListLoading: false,
  farmReportsFarmAverageMortalityList: [],
  farmReportsFarmAverageMortalityError: null,
  isFarmReportsFarmTatTaskCategoriesListLoading: false,
  farmReportsFarmTatTaskCategoriesList: [],
  farmReportsFarmTatTaskCategoriesListError: null,

});

export default function reportsReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_ALL_FARM_REPORTS_DATA_REQUEST:
      return state
        .set("isFarmReportsListLoading", true)
        .set("farmReportsList", [])
        .set("farmReportsListError", null);
    case FETCH_ALL_FARM_REPORTS_DATA_SUCCESS:
      return state
        .set("isFarmReportsListLoading", false)
        .set("farmReportsList", action.data)
        .set("farmReportsListError", null);
    case FETCH_ALL_FARM_REPORTS_DATA_FAILURE:
      return state
        .set("isFarmReportsListLoading", false)
        .set("farmReportsList", [])
        .set("farmReportsListError", action.error);
    
    //
       case FETCH_FARM_REPORTS_FARM_AVERAGE_MORTALITY_REQUEST:
      return state
        .set("isFarmReportsFarmAverageMortalityListLoading", true)
        .set("farmReportsFarmAverageMortalityList", [])
        .set("farmReportsFarmAverageMortalityError", null);
    case FETCH_FARM_REPORTS_FARM_AVERAGE_MORTALITY_SUCCESS:
      return state
        .set("isFarmReportsFarmAverageMortalityListLoading", false)
        .set("farmReportsFarmAverageMortalityList", action.data)
        .set("farmReportsFarmAverageMortalityError", null);
    case FETCH_FARM_REPORTS_FARM_AVERAGE_MORTALITY_FAILURE:
      return state
        .set("isFarmReportsFarmAverageMortalityListLoading", false)
        .set("farmReportsFarmAverageMortalityList", [])
        .set("farmReportsFarmAverageMortalityError", action.error);

      //

        case FETCH_FARM_REPORTS_FARM_TAT_TASK_CATEGORIES_REQUEST:
          return state
            .set("isFarmReportsFarmTatTaskCategoriesListLoading", true)
            .set("farmReportsFarmTatTaskCategoriesList", [])
            .set("farmReportsFarmTatTaskCategoriesListError", null);
        case FETCH_FARM_REPORTS_FARM_TAT_TASK_CATEGORIES_SUCCESS:
          return state
            .set("isFarmReportsFarmTatTaskCategoriesListLoading", false)
            .set("farmReportsFarmTatTaskCategoriesList", action.data)
            .set("farmReportsFarmTatTaskCategoriesListError", null);
        case FETCH_FARM_REPORTS_FARM_TAT_TASK_CATEGORIES_FAILURE:
          return state
            .set("isFarmReportsFarmTatTaskCategoriesListLoading", false)
            .set("farmReportsFarmTatTaskCategoriesList", [])
            .set("farmReportsFarmTatTaskCategoriesListError", action.error);
    
          
    default:
      return state;
  }
}
