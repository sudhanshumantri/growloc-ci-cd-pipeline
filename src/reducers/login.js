import { fromJS } from "immutable";
import {
  LOAD_AUTH_TOKEN,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGOUT,
} from "../actions/actionTypes";
const INITIAL_STATE = fromJS({
  userData: {},
  isLoginRequested: false,
  isLoginErr: null,
  token: null,
  isLoadingAuthToken: true,
});
export default function loginReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LOAD_AUTH_TOKEN:
      return state
        .set("isLoadingAuthToken", false)
        .set("token", action.data.token)
        .set("loginObject", action.data.loginObject);
    case LOGIN_REQUEST:
      return state.set("isLoginRequested", true).set("isLoginErr", null);
    case LOGIN_SUCCESS:
      return state
        .set("isLoginRequested", false)
        .set("isLoginErr", null)
        .set("token", action.data);
    case LOGIN_FAILURE:
      return state
        .set("isLoginRequested", false)
        .set("isLoginErr", action.error);
    case LOGOUT:
      return state
        .set("isLoginRequested", false)
        .set("isLoadingAuthToken", false)
        .set("token", null)
        .set("userData", {})
        .set("err", null);
    default:
      return state;
  }
}
