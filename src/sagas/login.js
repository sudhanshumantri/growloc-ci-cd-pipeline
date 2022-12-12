import { call, all, put, takeLatest } from "redux-saga/effects";
import { callLoginHandler } from "../utils/api";
import store, { browserHistory } from "../store";
import { loginSuccess, loginFailure, loadAuthToken } from "../actions/login";
export function* loginHandler({ data }) {
  let responseData = yield call(callLoginHandler, data);
  console.log(responseData, "here is responce data");
  if (responseData?.status == 200 && responseData.data.status) {
    if (responseData.data?.data?.profile?.role === "supervisor") {
      yield call(browserHistory.push, "/task");
      yield call(browserHistory.go, "/task");
    } else {
      yield call(browserHistory.push, "/");
      yield call(browserHistory.go, "/");
    }
    yield put(loginSuccess(responseData.data.token));
    localStorage.setItem("AUTH_TOKEN", responseData.data.token);
    localStorage.setItem("AUTH_OBJECT", JSON.stringify(responseData.data.data));
  } else {
    yield put(loginFailure("Invalid Credentials"));
  }
}
function* logoutHandler() {
  localStorage.removeItem("AUTH_TOKEN");
  localStorage.removeItem("AUTH_OBJECT");
  yield call(browserHistory.push, "/");
  yield call(browserHistory.go, "/");
}

export function* loginSagas() {
  yield all([takeLatest("LOGIN_REQUEST", loginHandler)]);
  yield all([takeLatest("LOGOUT", logoutHandler)]);
}

export default [loginSagas];
