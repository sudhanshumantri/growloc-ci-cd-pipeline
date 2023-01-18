import { call, all, put, takeLatest } from "redux-saga/effects";
import { callLoginHandler,callForgotPasswordHandler,callChangePasswordHandler,callRestPasswordTokenValidationHandler } from "../utils/api";
import store, { browserHistory } from "../store";
import { loginSuccess, loginFailure, loadAuthToken ,forgotPasswordFailure, forgotPasswordSuccess} from "../actions/login";
export function* loginHandler({ data }) {
  let responseData = yield call(callLoginHandler, data);
  if (responseData?.status == 200 && responseData.data.status) {
    // if (responseData.data?.data?.profile?.role === "admin") {
    //   yield call(browserHistory.push, "/dashboard");
    //   yield call(browserHistory.push, "/dashboard");
    // }
    
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
  yield call(browserHistory.push, "/login");
  yield call(browserHistory.go, "/login");
}
function* forgotPasswordHandler({ data }) {
  let { type, body, token } = data;
  if (type == 'send-link') {
      let responseData = yield call(callForgotPasswordHandler, body);
      if (responseData?.status == 200) {
        addNotification(
          "Password updated succesfully", 5000,true, "success"
          );
      }
  } else if (type == 'verify-token') {
      let routeParams = token + '/verification';
      let responseData = yield call(callRestPasswordTokenValidationHandler, routeParams);
      if (responseData?.status == 200 && responseData.data.code == 1) {
          localStorage.setItem('RESET_PASSWORD_TOKEN', JSON.stringify(responseData.data));
          yield put(forgotPasswordSuccess())
      } else {
          yield put(forgotPasswordFailure("Something went wrong"))
      }
  } else if (type == 'update-password') {
      let restPaaswordToken = localStorage.getItem('RESET_PASSWORD_TOKEN');
      restPaaswordToken = JSON.parse(restPaaswordToken);
      let routeParams = restPaaswordToken.clientid;
      body.user = restPaaswordToken.user;
      let responseData = yield call(callChangePasswordHandler, routeParams, body);
      if (responseData?.status == 200 && responseData.data.code == 1) {
          localStorage.removeItem('RESET_PASSWORD_TOKEN');
          yield put(forgotPasswordSuccess());
      } else {
          yield put(forgotPasswordFailure("Something went wrong"));
      }
  }
}

export function* loginSagas() {
  yield all([takeLatest("LOGIN_REQUEST", loginHandler)]);
  yield all([takeLatest("LOGOUT", logoutHandler)]);
  yield all([takeLatest("FORGOT_PASSWORD_REQUEST", forgotPasswordHandler)]);
}

export default [loginSagas];
  