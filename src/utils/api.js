import callApi from "./request";
import { api } from "../config";
const endpointLocation = "remote";
const urls = {
  remote: {
    login: "auth/login",
    signup: "auth/register",
    "fetch-farms-list": "farm/get-all-farm",
    "fetch-crops-list": "crop/get-all-crops",
    "add-farm": "farm/add-new-farm",
    "fetch-farm-all-crops": "farm/crop/get-all-crop",
    "add-crop-to-farm": "farm/crop/add-new-crop",
    "add-crop-to-lifecycle": "farm/crop/start-life-cycle",
    "crop-lifecycle-transition": "farm/crop/life-cycle-transition",
    "fetch-crop-lifecycle": "farm/crop/get-all-life-cycle",
    "fetch-crop-lifecycle-details": "farm/crop/life-cycle-details/",
    "update-crop-lifecycle-parameters":
      "farm/crop/update-life-cycle-stage-parameters",
    "update-crop-lifecycle-schedule": "farm//crop/schedule-lifecycle/",
    "fetch-users": "farm/get-all-farm-users",
    "add-user": "farm/add-new-user-to-farm",
    "update-user": "farm/update-farm-user",
    "delete-user": "farm/delete-farm-user",
    "update-farm-crop": "farm/crop/update-crop",
    "delete-farm-crop": "farm/crop/delete-crop",
    "update-farm": "farm/update-farm/",
    "delete-farm": "farm/delete-farm/",
    "fetch-farm-all-dashboard": "farm/get-farm-dashboard-data/",
    "fetch-farm-harvest-dashboard": "farm/get-farm-harvesteed-breakup",
    "fetch-farm-details": "farm/get-farm-details/",
    "add-taskschedule-task": "farm/task/",
    "fetch-farm-all-inventory": "farm/inventory/",
    "add-farm-inventory": "farm/inventory/",
    "update-farm-inventory": "farm/inventory/",
    "delete-farm-inventory": "farm/inventory/",
    "fetch-farm-all-task": "farm/task/",
    "add-farm-task-comment": "farm/task/add-comments/",
    "add-task-comment": "farm/task/add-comments/",
    "add-farm-dashboard-zone": "farm/add-new-zone",
    "fetch-all-farm-zone": "farm/get-all-zones/",
    "update-farm-dashboard-zone": "farm/update-zone/",
    "delete-farm-dashboard-zone": "farm/delete-zone/",
    "fetch-farm-zone": "farm/get-zone-details/",
    "fetch-farm-all-dashobard-zone": "farm/get-zone-dashboard-data/",
    "fetch-farm-dashboard-zone-harvest": "farm/get-zone-harvesteed-breakup",
    "add-farm-dashboard-zone-task": "farm/task/",
    "add-task-dashboard-zone-comment": "farm/task/add-comments/",
    "fetch-zone-all-task": "farm/zone-task/",
    "add-zone-task-comment": "farm/task/add-comments/",
    "forgot-password": "",
    "forgot-password-verify-token": "",
    "change-password": "auth/update-password",
    "fetch-user-profile": "",
    "update-user-profile": "auth/update-profile",
    "update-user-phone": "auth/update-phone",
    "fetch-admin-list": "farm/admin-farm-dashboard-data/",
    "add-admin-zone-sensors": "sensor/zone/add",
    "delete-admin-zone-sensors": "sensor/zone/",
    "fetch-all-zone-sensors" : "sensor/get-all-zone-sensor",
    "fetch-farm-all-reports": "farm/get-all-farm-sensor-data",
    "fetch-zone-all-reports": "farm/get-all-zone-sensor-data",
  },
};
function getEndpoint(endpoint) {
  if (urls[endpointLocation][endpoint]) {
    return api.host + urls[endpointLocation][endpoint];
  }
  return null;
}
export function callFetchCropsList() {
  return callApi(getEndpoint("fetch-crops-list"), {
    method: "get",
    removeAuthorizationHeader: false,
  });
}
export function callAddCropToFarm(data) {
  return callApi(getEndpoint("add-crop-to-farm"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data,
  });
}
export function callFetchFarmCropsList(data) {
  return callApi(getEndpoint("fetch-farm-all-crops"), {
    method: "post",
    removeAuthorizationHeader: false,
    data,
  });
}
export function callLoginHandler(data) {
  return callApi(getEndpoint("login"), {
    method: "POST",
    removeAuthorizationHeader: true,
    data,
  });
}
export function callRegisterHandler(data) {
  return callApi(getEndpoint("signup"), {
    method: "POST",
    removeAuthorizationHeader: true,
    data,
  });
}
export function callFetchFarmList() {
  return callApi(getEndpoint("fetch-farms-list"), {
    method: "get",
    removeAuthorizationHeader: false,
  });
}
export function callFarmCrop(data) {
  return callApi(getEndpoint("add-farm"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data,
  });
}

/**Life cycle api */

export function callAddCropToLifecycle(data) {
  return callApi(getEndpoint("add-crop-to-lifecycle"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data,
  });
}

export function callCropLifecycleTransition(data) {
  return callApi(getEndpoint("crop-lifecycle-transition"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data,
  });
}
export function callfetchAllCropsLifecycle(data) {
  return callApi(getEndpoint("fetch-crop-lifecycle"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data,
  });
}
export function callfetchCropsLifecycleDetails(routeParams) {
  return callApi(getEndpoint("fetch-crop-lifecycle-details"), {
    method: "get",
    removeAuthorizationHeader: false,
    routeParams: routeParams,
  });
}

export function callUpdateCropCycleParameters(data) {
  return callApi(getEndpoint("update-crop-lifecycle-parameters"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data,
  });
}

export function callUpdateCropToLifecycleSchedule(data) {
  return callApi(getEndpoint("update-crop-lifecycle-schedule"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data,
  });
}
export function callFetchUsersList(data) {
  return callApi(getEndpoint("fetch-users"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data,
  });
}

export function callAddUser(data) {
  return callApi(getEndpoint("add-user"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data,
  });
}
export function callUpdateUser(data) {
  return callApi(getEndpoint("update-user"), {
    method: "PUT",
    removeAuthorizationHeader: false,
    data: data,
  });
}
export function callDeleteUser(data) {
  return callApi(getEndpoint("delete-user"), {
    method: "delete",
    removeAuthorizationHeader: false,
    data: data,
  });
}

export function callUpdateFarmCrop(data) {
  return callApi(getEndpoint("update-farm-crop"), {
    method: "PUT",
    removeAuthorizationHeader: false,
    data: data,
  });
}
export function callDeleteFarmCrop(data) {
  return callApi(getEndpoint("delete-farm-crop"), {
    method: "delete",
    removeAuthorizationHeader: false,
    data,
  });
}
//

export function callUpdateFarm(data, routeParams) {
  return callApi(getEndpoint("update-farm"), {
    method: "PUT",
    removeAuthorizationHeader: false,
    data,
    routeParams,
  });
}
export function callDeleteFarm(routeParams) {
  return callApi(getEndpoint("delete-farm"), {
    method: "delete",
    removeAuthorizationHeader: false,
    routeParams,
  });
}
//
export function callFetchDashboardFarmList(routeParams) {
  return callApi(getEndpoint("fetch-farm-all-dashboard"), {
    method: "get",
    removeAuthorizationHeader: false,
    routeParams,
  });
}

export function callFetchDashboardHarvestList(data) {
  return callApi(getEndpoint("fetch-farm-harvest-dashboard"), {
    method: "post",
    removeAuthorizationHeader: false,
    data,
  });
}
//
export function callFetchFarmDetailsList(routeParams) {
  return callApi(getEndpoint("fetch-farm-details"), {
    method: "get",
    removeAuthorizationHeader: false,
    routeParams,
  });
}
//

export function callAddTaskScheduleTask(data) {
  return callApi(getEndpoint("add-taskschedule-task"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data,
  });
}
//
export function callfetchFarmInventoryDetails(routeParams) {
  return callApi(getEndpoint("fetch-farm-all-inventory"), {
    method: "get",
    removeAuthorizationHeader: false,
    routeParams,
  });
}

export function callAddFarmInventory(data) {
  return callApi(getEndpoint("add-farm-inventory"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data,
  });
}
//

export function callUpdateFarmInventory(data, routeParams) {
  return callApi(getEndpoint("update-farm-inventory"), {
    method: "PUT",
    removeAuthorizationHeader: false,
    data: data,
    routeParams,
  });
}
//
export function callDeleteFarmInventory(routeParams) {
  return callApi(getEndpoint("delete-farm-inventory"), {
    method: "delete",
    removeAuthorizationHeader: false,
    routeParams,
  });
}
//
export function callfetchFarmTaskDetails(routeParams, queryParams) {
  return callApi(getEndpoint("fetch-farm-all-task"), {
    method: "get",
    removeAuthorizationHeader: false,
    routeParams,
    queryParams,
  });
}
//

export function callAddFarmTaskComment(data) {
  return callApi(getEndpoint("add-farm-task-comment"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data,
  });
}
//

export function callAddTaskComment(data) {
  return callApi(getEndpoint("add-task-comment"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data,
  });
}

export function callAddFarmDashboardZone(data) {
  return callApi(getEndpoint("add-farm-dashboard-zone"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data,
  });
}
//

export function callFetchFarmDashboardZoneList(routeParams) {
  return callApi(getEndpoint("fetch-all-farm-zone"), {
    method: "get",
    removeAuthorizationHeader: false,
    routeParams,
  });
}

export function callUpdateFarmDashboardZoneList(data, routeParams) {
  return callApi(getEndpoint("update-farm-dashboard-zone"), {
    method: "PUT",
    removeAuthorizationHeader: false,
    data: data,
    routeParams,
  });
}
//
export function callDeleteFarmDashboardZoneList(routeParams) {
  return callApi(getEndpoint("delete-farm-dashboard-zone"), {
    method: "delete",
    removeAuthorizationHeader: false,
    routeParams,
  });
}
//
export function callfetchFarmZoneDetails(routeParams) {
  return callApi(getEndpoint("fetch-farm-zone"), {
    method: "get",
    removeAuthorizationHeader: false,
    routeParams,
  });
}
//

export function callFetchDashboardFarmZoneList(routeParams) {
  return callApi(getEndpoint("fetch-farm-all-dashobard-zone"), {
    method: "get",
    removeAuthorizationHeader: false,
    routeParams,
  });
}

export function callFetchFarmDashboardZoneHarvestList(data) {
  return callApi(getEndpoint("fetch-farm-dashboard-zone-harvest"), {
    method: "post",
    removeAuthorizationHeader: false,
    data,
  });
}

export function callAddFarmDashboardZoneTask(data) {
  return callApi(getEndpoint("add-farm-dashboard-zone-task"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data,
  });
}

export function callAddFarmDashboardZoneTaskComment(data) {
  return callApi(getEndpoint("add-task-dashboard-zone-comment"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data,
  });
}

export function callfetchZoneTaskDetails(routeParams, queryParams) {
  return callApi(getEndpoint("fetch-zone-all-task"), {
    method: "get",
    removeAuthorizationHeader: false,
    routeParams,
    queryParams,
  });
}

export function callAddZoneTaskComment(data) {
  return callApi(getEndpoint("add-zone-task-comment"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data,
  });
}

export function callForgotPasswordHandler(data) {
  return callApi(getEndpoint("forgot-password"), {
    method: "post",
    removeAuthorizationHeader: false,
    data,
  });
}

export function callRestPasswordTokenValidationHandler(routeParams) {
  return callApi(getEndpoint("forgot-password-verify-token"), {
    method: "get",
    removeAuthorizationHeader: false,
    routeParams,
  });
}
export function callChangePasswordHandler( data) {
  return callApi(getEndpoint("change-password"), {
    method: "post",
    removeAuthorizationHeader: false,
    data,
  });
}

export function callfetchUserProfile() {
  return callApi(getEndpoint('fetch-user-profile'), {
      method: 'get',
      removeAuthorizationHeader: false,

  });
}
export function callupdateUserProfile(data) {
  return callApi(getEndpoint('update-user-profile'), {
      method: 'POST',
      removeAuthorizationHeader: false,
      data
  });
}
export function callupdateChangePhone(data) {
  return callApi(getEndpoint('update-user-phone'), {
      method: 'POST',
      removeAuthorizationHeader: false,
      data
  });
}
export function callFetchAdminList(routeParams) {
  return callApi(getEndpoint("fetch-admin-list"), {
    method: "get",
    removeAuthorizationHeader: false,
    routeParams,
  });
}

export function callAddAdminsensors(data) {
  return callApi(getEndpoint("add-admin-zone-sensors"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data,
  });
}

export function callDeleteAdminsensors(routeParams) {
  return callApi(getEndpoint("delete-admin-zone-sensors"), {
    method: "delete",
    removeAuthorizationHeader: false,
    routeParams,
  });
}

export function callFetchAllUserZoneSensor() {
  return callApi(getEndpoint("fetch-all-zone-sensors"), {
    method: "get",
    removeAuthorizationHeader: false,
  });
}

export function callfetchFarmReportsDetails(queryParams) {
  return callApi(getEndpoint("fetch-farm-all-reports"), {
    method: "GET",
    removeAuthorizationHeader: false,
    queryParams,
  });
}
export function callfetchZoneReportsDetails(queryParams) {
  return callApi(getEndpoint("fetch-zone-all-reports"), {
    method: "GET",
    removeAuthorizationHeader: false,
    queryParams,
  });
}


