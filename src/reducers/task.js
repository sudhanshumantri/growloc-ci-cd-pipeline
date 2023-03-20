import { fromJS } from "immutable";
import {
    FETCH_ALL_FARM_TASKS_REQUEST,
    FETCH_ALL_FARM_TASKS_SUCCESS,
    FETCH_ALL_FARM_TASKS_FAILURE,
    ADD_TASKS_COMMENTS_REQUEST,
    ADD_TASKS_COMMENTS_SUCCESS,
    ADD_TASKS_COMMENTS_FAILURE,
} from "../actions/actionTypes";
const INITIAL_STATE = fromJS({
  isFarmTaskListLoading: false,
  FarmTaskList: [],
  FarmTaskListError: null,
  isTaskCommentLoading:false,
  taskCommentError:null
});
export default function taskReducer(state = INITIAL_STATE, action = {}) {
  let FarmTaskList = state.toJS()["FarmTaskList"];
  switch (action.type) {
    case FETCH_ALL_FARM_TASKS_REQUEST:
      return state
        .set("isFarmTaskListLoading", true)
        .set("FarmTaskList", [])
        .set("FarmTaskListError", null);
    case FETCH_ALL_FARM_TASKS_SUCCESS:
      return state
        .set("isFarmTaskListLoading", false)
        .set("FarmTaskList", action.data)
        .set("FarmTaskListError", null);
    case FETCH_ALL_FARM_TASKS_FAILURE:
      return state
        .set("isFarmTaskListLoading", false)
        .set("FarmTaskList", [])
        .set("FarmTaskListError", action.error);
        //
        case ADD_TASKS_COMMENTS_REQUEST:
          return state
            .set("isTaskCommentLoading", true)
            .set("taskCommentError", null);
        case ADD_TASKS_COMMENTS_SUCCESS:
      const taskRowIndex = FarmTaskList.tasks.findIndex(
        (l) => l.id == action.data.taskId
      );
      const AUTH_OBJECT = JSON.parse(localStorage.getItem("AUTH_OBJECT"));
      const user = AUTH_OBJECT.profile;
      FarmTaskList.tasks[taskRowIndex].TasksHistory.push({ ...action.data, user ,comments:[]});
          return state
            .set("isTaskCommentLoading", false)
            .set("FarmTaskList", FarmTaskList)
            .set("taskCommentError", null);
        case ADD_TASKS_COMMENTS_FAILURE:
          return state
            .set("isTaskCommentLoading", false)
            .set("taskCommentError", action.error);
    default:
      return state;
  }
}
