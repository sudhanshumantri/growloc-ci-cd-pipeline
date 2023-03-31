import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import store from "../../../store";
import { getAsyncInjectors } from "../../../utils/asyncInjectors";
import loginReducer from "../../../reducers/login";
import usersReducer from "../../../reducers/users";
import loginSagas from "../../../sagas/login";
import userSagas from "../../../sagas/users";
import { selectToken } from "../../../selectors/login";
import { loadAuthToken } from "../../../actions/login";
import AdminDashboard from "../../../container/admin"
import adminSagas  from "../../../sagas/admin";
import adminReducer from "../../../reducers/admin";
import PrivateOutlet from "../../privateroute";
import AdminSideBar from "../../admin/adminsidebar";

const { injectReducer, injectSagas } = getAsyncInjectors(store);
injectReducer("login", loginReducer);
//injectReducer("users", usersReducer);
injectReducer("admin", adminReducer);
//injectSagas(userSagas);
// injectSagas(loginSagas);
injectSagas(adminSagas);

const drawerWidth = 240;
const AdminLayout = ({ loadAuthToken }) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  let loginObject = localStorage.getItem("AUTH_OBJECT");
  if (loginObject) {
    loginObject = JSON.parse(loginObject);
  }
  loadAuthToken({
    token,
    loginObject,
  });
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {token && <AdminSideBar loginObject={loginObject}/>}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "60px",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
                <AdminDashboard />
            }
          />
          <Route
            path="/user"
            element={
              <PrivateOutlet token={token}>
                <AdminDashboard />
              </PrivateOutlet>
            }
          />
        </Routes>
      </Box>
    // </Box>
  );
};
const mapDispatchToProps = {
  loadAuthToken: loadAuthToken,
};
const mapStateToProps = createStructuredSelector({
  token: selectToken(),
});
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    return <Component {...props} />;
  }
  return ComponentWithRouterProp;
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminLayout)
);
