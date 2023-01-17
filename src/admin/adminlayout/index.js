import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import PrivateOutlet from "../privateroute";
import ManageTasks from "../task";
import Login from "../login";
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
      {token && <SideBar loginObject={loginObject} />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "60px",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            path="task"
            element={
              <PrivateOutlet token={token}>
                <ManageTasks />
              </PrivateOutlet>
            }
          />
        </Routes>
      </Box>
    </Box>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminLayout));



// "phone":1122334455,
// "password":"admin@123"
