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
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from "../actions/actionTypes";
const INITIAL_STATE = fromJS({
  isUsersListLoading: false,
  usersList: [],
  UsersListError: null,
  isAddUserLoading: false,
  addUserError: null,
  isUpdateUserLoading: false,
  updateUserError: null,
  userStatus: true,
  isdeleteUserLoading: false,
  isdeleteUserError: false,
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
      console.log("FETCH_USERS_SUCCESS", action.data);
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
      return state
      .set("isAddUserLoading", true)
      .set("addUserError", null);
    case ADD_USER_SUCCESS:
      const newUser = { id: action.data?.id, userId: action.data?.profile?.userId, farmId: usersList[0]?.farmId, user:{...action.data}}
      usersList.push(newUser);
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
        .set("isUpdateUserLoading", true)
        .set("userStatus", null)
        .set("updateUserLoading", null);
    case UPDATE_USER_SUCCESS:
      const { data } = action.data;
      const index = usersList.findIndex((user) => user.userId === data.userId);
      usersList[index].user.profile = data;
      return state
        .set("isUpdateUserLoading", false)
        .set("userStatus", true)
        .set("usersList", usersList)
    case UPDATE_USER_FAILURE:
      return state
        .set("isUpdateUserLoading", false)
        .set("userStatus", true)
        .set("updateUserError", true);
    case DELETE_USER_REQUEST:
      return state.set("isdeleteUserLoading", true).set("isdeleteUserError", null);
    case DELETE_USER_SUCCESS:
      const { userId } = action.data;
      const filteredList = usersList.filter((user) => user.userId !== userId);
      return state
        .set("isdeleteUserLoading", false)
        .set("usersList", filteredList)
        .set("isdeleteUserError", null);
    case DELETE_USER_FAILURE:
      return state.set("usersList", usersList);
    default:
      return state;
  }
}
