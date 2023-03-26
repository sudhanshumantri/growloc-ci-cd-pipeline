import React, { useEffect } from "react";
import store from "../../store";
import { getAsyncInjectors } from "../../utils/asyncInjectors";
import loginReducer from "../../reducers/login";
import usersReducer from "../../reducers/users";
import loginSagas from "../../sagas/login";
import userSagas from "../../sagas/users";
import Adminlayout from "./adminlayout";
import Userlayout from "./userlayout";
const { injectReducer, injectSagas } = getAsyncInjectors(store);
injectReducer("login", loginReducer);
injectReducer("users", usersReducer);
injectSagas(userSagas);
injectSagas(loginSagas);

const Layout = () => {
  let loginObject = localStorage.getItem("AUTH_OBJECT");
  if (loginObject) {
    loginObject = JSON.parse(loginObject);
  }
  const { profile } = loginObject || "";

  return <>{profile?.role === "admin" ? <Adminlayout /> : <Userlayout />}</>;
};
export default Layout;
