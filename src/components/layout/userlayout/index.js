import React, { useEffect } from "react";
import Pusher from "pusher-js";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Routes, Route } from "react-router-dom";
import store from "../../../store";
import PrivateOutlet from "../../privateroute";
import { fetchPusherRequest } from "../../../actions/pusher";
import { fetchAllUserZoneSensorRequest } from "../../../actions/dashboard";
import FarmDashboard from "../../../container/dashboard";
import ManageCrop from "../../../container/managecrops";
import Monitor from "../../monitor";
import Login from "../../../container/login";
import Register from "../../../container/register";
import WaterManagement from "../../../container/waterManagement";
import SideBar from "../../../container/sidebar";
import Farms from "../../../container/farm";
import AddUsers from "../../../container/users";
import CropLifeCycle from "../../../container/life-cycle";
import CropLifeCycleDetails from "../../../container/life-cycle/lifeCycleDetails";
import ZoneDashboard from "../../../container/zone";
import ManageZoneTasks from "../../../container/zonetask";
import ProfileInformation from "../../../container/profile"
import FarmEfficiency from "../../../container/reports";
import ZoneEfficiency from "../../../container/zonereports";
import FarmOutlet from "../../farmoutlet";
import { getAsyncInjectors } from "../../../utils/asyncInjectors";
import loginReducer from "../../../reducers/login";
import registerReducer from "../../../reducers/register";
import farmReducer from "../../../reducers/farm";
import usersReducer from "../../../reducers/users";
import cropsReducer from "../../../reducers/crops";
import lifeCycleReducer from "../../../reducers/life-cycle";
import dashboardFarmReducer from "../../../reducers/dashboard";
import inventoryReducer from "../../../reducers/inventory";
import taskReducer from "../../../reducers/task";
import zoneReducer from "../../../reducers/zone";
 import profileReducer from "../../../reducers/profile"
import pusherReducer from "../../../reducers/pusher";
import reportsReducer from "../../../reducers/reports";
import zoneReportsReducer from "../../../reducers/zonereports";
import loginSagas from "../../../sagas/login";
import registerSagas from "../../../sagas/register";
import cropsSagas from "../../../sagas/crops";
import farmSagas from "../../../sagas/farm";
import userSagas from "../../../sagas/users";
import farmDashboardSagas from "../../../sagas/dashboard";
import lifeCycleSagas from "../../../sagas/life-cycle";
import inventorySagas from "../../../sagas/inventory";
import taskSagas from "../../../sagas/task";
import zoneSagas from "../../../sagas/zone";
import pusherSagas  from "../../../sagas/pusher";
import profileSagas from "../../../sagas/profile"
import reportsSagas from "../../../sagas/reports";
import  zoneReportsSagas  from "../../../sagas/zonereports";
import { selectToken } from "../../../selectors/login";
import { loadAuthToken } from "../../../actions/login";
import AddFarm from "../../../container/addfarm";
import ManageItem from "../../../container/inventory";
import ManageTasks from "../../../container/task";
import { ErrorPage } from "../../errorpage";
import { ForgotPassword } from "../../forgotpassword";
import CapacityEfficiency from "../../reports/capacityefficiency";
import Energyfficiency from "../../reports/energyefficiency";
const { injectReducer, injectSagas } = getAsyncInjectors(store);
injectReducer("crops", cropsReducer);
injectReducer("login", loginReducer);
injectReducer("register", registerReducer);
injectSagas(registerSagas);
injectReducer("farm", farmReducer);
injectReducer("life-cycle", lifeCycleReducer);
injectReducer("dashboard", dashboardFarmReducer);
//injectReducer("users", usersReducer);
injectReducer("inventory", inventoryReducer);
injectReducer("task", taskReducer);
injectReducer("zone", zoneReducer);
injectReducer("pusherData",pusherReducer);
injectReducer("profile",profileReducer);
injectReducer("reports",reportsReducer);
injectReducer("zoneReports",zoneReportsReducer);
injectSagas(profileSagas);
injectSagas(pusherSagas);
injectSagas(farmSagas);
//injectSagas(userSagas);
injectSagas(loginSagas);
injectSagas(cropsSagas);
injectSagas(lifeCycleSagas);
injectSagas(farmDashboardSagas);
injectSagas(inventorySagas);
injectSagas(taskSagas);
injectSagas(zoneSagas);
injectSagas(reportsSagas);
injectSagas(zoneReportsSagas)
const drawerWidth = 240;
const UserLayout = ({ loadAuthToken,fetchAllUserZoneSensor,fetchPusherData }) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  let loginObject = localStorage.getItem("AUTH_OBJECT");
  if (loginObject) {
    loginObject = JSON.parse(loginObject);
  }
  loadAuthToken({
    token,
    loginObject,
  });
  useEffect(() => {
   if(token && loginObject){
    fetchAllUserZoneSensor()
    const pusher = new Pusher('74168d0c587988b1d7a3', {
      cluster: 'ap2',
      encrypted: true
    });
    const channel = pusher.subscribe('sensor-channel');
    channel.bind("sensor-event", data => {
      fetchPusherData(data.data);
    });
   }
  }, []);
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
              <Route path="inventory/items" element={<ManageItem />} />
              <Route path="inventory/items" element={<ManageItem />} />
              <Route path="inventory/manage" element={<ManageCrop />} />
              <Route path="task" element={<ManageTasks />} />
              <Route path="water-management" element={<WaterManagement />} />
              <Route path="monitor" element={<Monitor />} />
              <Route path="reports/farm-efficiency" element={<FarmEfficiency />} />
              <Route path="reports/capacity-efficiency" element={<CapacityEfficiency />} />
              <Route path="reports/energy-efficiency" element={<Energyfficiency/>} />
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
              <Route path="lifecycle" element={<CropLifeCycle />} />
              <Route path="inventory/items" element={<ManageItem />} />
              <Route path="inventory/manage" element={<ManageCrop />} />
              <Route
                path="crops/lifecycle/details/:lifecycleId"
                element={<CropLifeCycleDetails />}
              />
              <Route path="task" element={<ManageZoneTasks />} />
              <Route path="water-management" element={<WaterManagement />} />
              <Route path="monitor" element={<Monitor />} />
              <Route path="reports/zone-efficiency" element={<ZoneEfficiency />} />
            </Route>
            <Route
              path="task"
              element={
                <PrivateOutlet token={token}>
                  <ManageTasks />
                </PrivateOutlet>
              }
            />

            <Route
              path="profile"
              element={
                <PrivateOutlet token={token}>
                  <ProfileInformation />
                </PrivateOutlet>
              }
            />
          <Route  element={<ErrorPage />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Box>
    </Box>
  );
};
const mapDispatchToProps = {
  loadAuthToken: loadAuthToken,
  fetchPusherData : fetchPusherRequest,
  fetchAllUserZoneSensor : fetchAllUserZoneSensorRequest
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
  connect(mapStateToProps, mapDispatchToProps)(UserLayout)
);
