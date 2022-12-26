import { fromJS } from "immutable";
import {
    FETCH_ALL_ZONE_TASKS_REQUEST,
    FETCH_ALL_ZONE_TASKS_SUCCESS,
    FETCH_ALL_ZONE_TASKS_FAILURE,
    ADD_ZONE_TASK_COMMENT_REQUEST,
    ADD_ZONE_TASK_COMMENT_SUCCESS,
    ADD_ZONE_TASK_COMMENT_FAILURE,
} from "../../actions/actionTypes";
const INITIAL_STATE = fromJS({
  isZoneTaskListLoading: false,
  zoneTaskList: [],
  zoneTaskListError: null,
  isZoneTaskCommentLoading:false,
  zoneTaskCommentError:null,
});
export default function zoneTaskReducer(state = INITIAL_STATE, action = {}) {
  let zoneTaskList = state.toJS()["zoneTaskList"];
  switch (action.type) {
    case FETCH_ALL_ZONE_TASKS_REQUEST:
      return state
        .set("isZoneTaskListLoading", true)
        .set("zoneTaskList", [])
        .set("FarmTaskListError", null);
    case FETCH_ALL_ZONE_TASKS_SUCCESS:
      return state
        .set("isZoneTaskListLoading", false)
        .set("zoneTaskList", action.data)
        .set("FarmTaskListError", null);
    case FETCH_ALL_ZONE_TASKS_FAILURE:
      return state
        .set("isZoneTaskListLoading", false)
        .set("zoneTaskList", [])  
        .set("zoneTaskListError", action.error);
        //

        case ADD_ZONE_TASK_COMMENT_REQUEST:
          return state
            .set("isZoneTaskCommentLoading", true)
            .set("zoneTaskCommentError", null);
        case ADD_ZONE_TASK_COMMENT_SUCCESS:
      const ZoneTaskRowIndex = zoneTaskList.tasks.findIndex(
        (l) => l.id == action.data.taskId
      );
      const AUTH_OBJECT = JSON.parse(localStorage.getItem("AUTH_OBJECT"));
      const user = AUTH_OBJECT.profile;
      zoneTaskList.tasks[ZoneTaskRowIndex].TasksHistory.push({ ...action.data, user });
          return state
            .set("isZoneTaskCommentLoading", false)
            .set("zoneTaskList", zoneTaskList)
            .set("zoneTaskCommentError", null);
        case ADD_ZONE_TASK_COMMENT_FAILURE:
          return state
            .set("isZoneTaskCommentLoading", false)
            .set("zoneTaskCommentError", action.error);

    default:
      return state;
  }
}
