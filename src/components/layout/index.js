import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Routes, Route } from "react-router-dom";
import ManageCrop from "../../container/managecrops";
import Login from "../../container/login";
import SideBar from "../../container/sidebar";
import Farms from "../../container/farm";
import CropLifeCycle from "../../container/life-cycle";
import Planting from "../crop/planting";
import Transplanting from "../crop/transplating";
import store from "../../store";
import PrivateOutlet from "../privateroute";
import FarmOutlet from "../farmoutlet";
import { getAsyncInjectors } from "../../utils/asyncInjectors";
import loginReducer from "../../reducers/login";
import farmReducer from "../../reducers/farm";
import cropsReducer from "../../reducers/crops";
import lifeCycleReducer from "../../reducers/life-cycle";
import loginSagas from "../../sagas/login";
import cropsSagas from "../../sagas/crops";
import farmSagas from "../../sagas/farm";
import lifeCycleSagas from "../../sagas/life-cycle";
import { selectToken } from "../../selectors/login";
import { loadAuthToken } from "../../actions/login";

const { injectReducer, injectSagas } = getAsyncInjectors(store);
injectReducer("crops", cropsReducer);
injectReducer("login", loginReducer);
injectReducer("farm", farmReducer);
injectReducer("life-cycle", lifeCycleReducer);
injectSagas(farmSagas);
injectSagas(loginSagas);
injectSagas(cropsSagas);
injectSagas(lifeCycleSagas);
const drawerWidth = 240;
const Layout = () => {
  const token = localStorage.getItem("AUTH_TOKEN");
  let loginObject = localStorage.getItem("AUTH_OBJECT");
  if (loginObject) {
    loginObject = JSON.parse(loginObject);
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
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
            element={
              <PrivateOutlet token={token}>
                <FarmOutlet />
              </PrivateOutlet>
            }
            children={[SideBar]}
          >
            <Route path="crops/manage" element={<ManageCrop />} />
            <Route path="crops/lifecycle" element={<CropLifeCycle />} />
            <Route path="crops/planting" element={<Planting />} />
            <Route path="crops/transplanting" element={<Transplanting />} />
          </Route>
          <Route
            exact
            path="app/dashboard"
            element={
              <PrivateOutlet token={token}>
                <Farms />
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
