import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { role_based_access } from "../../../config";

const AuthOutlet = ({ children, isAuthRequired, from, action }) => {
  //console.log(children, isAuthRequired, from, action);
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    if (isAuthRequired) {
      const AUTH_OBJECT = JSON.parse(localStorage.getItem("AUTH_OBJECT"));
      const role = AUTH_OBJECT.profile.role;
      console.log(role);
      const actions = role_based_access[from][role];
      console.log('actions',actions);
      const isAuth = actions.includes(action);
      setIsAuthorized(isAuth || false);
    } else {
      setIsAuthorized(true);
    }
  }, [isAuthRequired]);

  return isAuthorized && <div>{children}</div>;
};
export default AuthOutlet;
