import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Routes, Route } from "react-router-dom";
import store from "../../store";
import PrivateOutlet from "../privateroute";
// import FarmDashboard from "../dashboard/farm";
import FarmDashboard from "../../container/dashboard";
import ManageCrop from "../../container/managecrops";
import Monitor from "../monitor";
import Login from "../../container/login";
import Register from "../../container/register";
import WaterManagement from "../../container/waterManagement";
import SideBar from "../../container/sidebar";
import Farms from "../../container/farm";
import AddUsers from "../../container/users";
import CropLifeCycle from "../../container/life-cycle";
import CropLifeCycleDetails from "../../container/life-cycle/lifeCycleDetails";
import ZoneDashboard from "../../container/zone";
import FarmOutlet from "../farmoutlet";
import { getAsyncInjectors } from "../../utils/asyncInjectors";
import loginReducer from "../../reducers/login";
import registerReducer from "../../reducers/register";
import farmReducer from "../../reducers/farm";
import usersReducer from "../../reducers/users";
import cropsReducer from "../../reducers/crops";
import lifeCycleReducer from "../../reducers/life-cycle";
import dashboardFarmReducer from "../../reducers/dashboard";
import inventoryReducer from "../../reducers/inventory";
import taskReducer from "../../reducers/task";
import zoneReducer from "../../reducers/zone";
import loginSagas from "../../sagas/login";
import registerSagas from "../../sagas/register";
import cropsSagas from "../../sagas/crops";
import farmSagas from "../../sagas/farm";
import userSagas from "../../sagas/users";
import farmDashboardSagas from "../../sagas/dashboard";
import lifeCycleSagas from "../../sagas/life-cycle";
import inventorySagas from "../../sagas/inventory";
import taskSagas from "../../sagas/task";
import zoneSagas from "../../sagas/zone";
import { selectToken } from "../../selectors/login";
import { loadAuthToken } from "../../actions/login";
import AddFarm from "../../container/addfarm";
// import ManageItem from "../inventory/manageitem";
import ManageItem from "../../container/inventory";
import ManageTasks from "../../container/task";
// import ZoneDashboard from "../Zone";
// import Tasks from "../task";
const { injectReducer, injectSagas } = getAsyncInjectors(store);
injectReducer("crops", cropsReducer);
injectReducer("login", loginReducer);
injectReducer("register", registerReducer);
injectSagas(registerSagas);
injectReducer("farm", farmReducer);
injectReducer("life-cycle", lifeCycleReducer);
injectReducer("dashboard", dashboardFarmReducer);
injectReducer("users", usersReducer);
injectReducer("inventory", inventoryReducer);
injectReducer("task", taskReducer);
injectReducer("zone", zoneReducer);
injectSagas(farmSagas);
injectSagas(userSagas);
injectSagas(loginSagas);
injectSagas(cropsSagas);
injectSagas(lifeCycleSagas);
injectSagas(farmDashboardSagas);
injectSagas(inventorySagas);
injectSagas(taskSagas);
injectSagas(zoneSagas);
const drawerWidth = 240;
const Layout = ({ loadAuthToken }) => {
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
          <Route
            exact
            path="/"
            element={
              <PrivateOutlet token={token}>
                <Farms />
              </PrivateOutlet>
            }
          />
          <Route path="add-farm/" element={<AddFarm />} />
          <Route path="edit-farm/:farmId" element={<AddFarm />} />
          <Route
            path="farm/:farmId"
            element={
              <PrivateOutlet token={token}>
                <FarmOutlet />
              </PrivateOutlet>
            }
            children={[SideBar]}
          >
            <Route path="dashboard" element={<FarmDashboard />} />
            <Route path="users" element={<AddUsers />} />
            <Route path="crops/manage" element={<ManageCrop />} />
            <Route path="crops/lifecycle" element={<CropLifeCycle />} />
            <Route path="inventory/items" element={<ManageItem />} />
            <Route
              path="crops/lifecycle/details/:lifecycleId"
              element={<CropLifeCycleDetails />}
            />
            <Route path="task" element={<ManageTasks />} />
            <Route path="water-management" element={<WaterManagement />} />
            <Route path="monitor" element={<Monitor />} />
          </Route>
          <Route
            path="farm/:farmId/zone/:zoneId"
            element={
              <PrivateOutlet token={token}>
                <FarmOutlet isFromZone={true} />
              </PrivateOutlet>
            }
            children={[SideBar]}
          >
            <Route path="" element={<ZoneDashboard />} />
            <Route path="dashboard" element={<ZoneDashboard />} />
            <Route path="users" element={<AddUsers />} />
            <Route path="crops/manage" element={<ManageCrop />} />
            <Route path="crops/lifecycle" element={<CropLifeCycle />} />
            <Route path="inventory/items" element={<ManageItem />} />
            <Route
              path="crops/lifecycle/details/:lifecycleId"
              element={<CropLifeCycleDetails />}
            />
            <Route path="task" element={<ManageTasks />} />
            <Route path="water-management" element={<WaterManagement />} />
            <Route path="monitor" element={<Monitor />} />
          </Route>
          <Route
            path="task"
            element={
              <PrivateOutlet token={token}>
                <ManageTasks />
              </PrivateOutlet>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
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
