import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Routes, Route,BrowserRouter } from "react-router-dom";
import store from "../../store";
import { getAsyncInjectors } from "../../utils/asyncInjectors";
import loginReducer from "../../reducers/login";
import usersReducer from "../../reducers/users";
import loginSagas from "../../sagas/login";
import userSagas from "../../sagas/users";
import { selectToken } from "../../selectors/login";
import { loadAuthToken } from "../../actions/login";
import Login from "../../container/login";
import Register from "../../container/register";
import Adminlayout from "./adminlayout";
import Userlayout from "./userlayout";
const { injectReducer, injectSagas } = getAsyncInjectors(store);
injectReducer("login", loginReducer);
injectReducer("users", usersReducer);
injectSagas(userSagas);
injectSagas(loginSagas);

const Layout = () => {
  
  return (
    <>
     <Userlayout/>
   <Adminlayout/>     
    </>
  );
};
export default Layout;
