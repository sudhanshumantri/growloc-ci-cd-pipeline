import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Routes, Route } from "react-router-dom";
import Seeding from "../crop/seeding";
import Planting from "../crop/planting";
import Transplanting from "../crop/transplating";
import store from "../../store";
import PrivateOutlet from "../privateroute";
import FarmOutlet from "../farmoutlet";
import { getAsyncInjectors } from "../../utils/asyncInjectors";
import cropsReducer from "../../reducers/crops";
import loginReducer from "../../reducers/login";
import loginSagas from "../../sagas/login";
import cropsSagas from "../../sagas/crops";
import ManageCrop from "../../container/managecrops";
import Login from "../../container/login";
import SideBar from "../../container/sidebar";
import DashBoard from "../../container/dashboard";
import { selectToken } from "../../selectors/login";
import { loadAuthToken } from "../../actions/login";
import farmReducer from "../../reducers/farm";
import farmSagas from "../../sagas/farm";
const { injectReducer, injectSagas } = getAsyncInjectors(store);
injectReducer("crops", cropsReducer);
injectReducer("login", loginReducer);
injectReducer("farm", farmReducer);
injectSagas(farmSagas);
injectSagas(loginSagas);
injectSagas(cropsSagas);

const drawerWidth = 240;
const Layout = ({ token, loadAuthToken }) => {
  console.log(token);
  console.count("layout");
  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");
    let loginObject = localStorage.getItem("AUTH_OBJECT");
    if (loginObject) {
      loginObject = JSON.parse(loginObject);
    }
    loadAuthToken({
      token,
      loginObject,
    });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <TopHeader /> */}

      {token && <SideBar />}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "60px",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Routes>
          <Route
            path="farm/:farmId"
            element={<FarmOutlet />}
            children={[SideBar]}
          >
            <Route path="crops/manage" element={<ManageCrop />} />
            <Route path="crops/seeding" element={<Seeding />} />
            <Route path="crops/planting" element={<Planting />} />
            <Route path="crops/transplanting" element={<Transplanting />} />
          </Route>
          <Route
            exact
            path="app/dashboard"
            element={
              <PrivateOutlet token={token}>
                <DashBoard />
              </PrivateOutlet>
            }
          />
          <Route path="login" element={<Login />} />
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
