import { fromJS } from "immutable";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from "../actions/actionTypes";
const INITIAL_STATE = fromJS({
  isUsersListLoading: false,
  usersList: [],
  UsersListError: null,
  isAddUserLoading: false,
  addUserError: null,
  updateUserLoading: false,
  updateUserError: null,
  userStatus: true,
});

export default function usersReducer(state = INITIAL_STATE, action = {}) {
  let usersList = state.toJS()["usersList"];
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return state
        .set("isUsersListLoading", true)
        .set("usersList", [])
        .set("UsersListError", null);
    case FETCH_USERS_SUCCESS:
      return state
        .set("isUsersListLoading", false)
        .set("usersList", action.data)
        .set("UsersListError", null);
    case FETCH_USERS_FAILURE:
      return state
        .set("isUsersListLoading", false)
        .set("usersList", [])
        .set("UsersListError", action.error);
    case ADD_USER_REQUEST:
      return state.set("isAddUserLoading", true).set("addUserError", null);
    case ADD_USER_SUCCESS:
      return state
        .set("isAddUserLoading", false)
        .set("usersList", usersList)
        .set("addUserError", null);
    case ADD_USER_FAILURE:
      return state
        .set("isAddUserLoading", false)
        .set("addUserError", action.error);
    case UPDATE_USER_REQUEST:
      return state
        .set("isAddUserLoading", true)
        .set("userStatus", null)
        .set("updateUserLoading", null);
    case UPDATE_USER_SUCCESS:
      const { data } = action.data;
      const index = usersList.findIndex((user) => user.userId === data.userId);
      usersList[index].user.profile = data;
      return state
        .set("updateUserLoading", false)
        .set("userStatus", true)
        .set("usersList", usersList)
        .set("updateUserLoading", null);
    case UPDATE_USER_FAILURE:
      return state
        .set("updateUserLoading", false)
        .set("userStatus", true)
        .set("updateUserError", true);
    case DELETE_USER_SUCCESS:
      const {userId} =action.data;
      const filteredList = usersList.filter((user) => user.userId !== userId);
      return state.set("usersList", filteredList);
    case DELETE_USER_FAILURE:
      return state.set("usersList", usersList);
    default:
      return state;
  }
}
