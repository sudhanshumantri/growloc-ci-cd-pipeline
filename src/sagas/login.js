import { call, all, put, takeLatest } from "redux-saga/effects";
import { callLoginHandler } from "../utils/api";
import store, { browserHistory } from '../store';


import { loginSuccess, loginFailure, loadAuthToken } from "../actions/login";

export function* loginHandler({ data }) {
  let responseData = yield call(callLoginHandler, data);
  if (responseData?.status == 200 && responseData.data) {
    yield call(browserHistory.push, "/app/dashboard");
    yield call(browserHistory.go, "//app/dashboard");

    yield put(loginSuccess(responseData.data.token));
    localStorage.setItem("AUTH_TOKEN", responseData.data.token);
    localStorage.setItem("AUTH_OBJECT", JSON.stringify(responseData.data));
  } else {
    yield put(loginFailure("Invalid Credentials"));
  }
}

export function* loginSagas() {
  yield all([takeLatest("LOGIN_REQUEST", loginHandler)]);
}

export default [loginSagas];
