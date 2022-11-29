import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { role_based_access } from "../../../config";

const AuthOutlet = ({ children, isAuthRequired, from, action, defaultReturn }) => {
  //console.log(children, isAuthRequired, from, action);
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    if (isAuthRequired) {
      const AUTH_OBJECT = JSON.parse(localStorage.getItem("AUTH_OBJECT"));
      const role = AUTH_OBJECT.profile.role;
      const actions = role_based_access[from][role];
      const isAuth = actions.includes(action);
      setIsAuthorized(isAuth || false);
    } else {
      setIsAuthorized(true);
    }
  }, [isAuthRequired]);

  return isAuthorized ? <>{children}</>: defaultReturn || null;
};
export default AuthOutlet;
