import callApi from "./request";
import { api } from "../config";
const endpointLocation = "remote";
const urls = {
  remote: {
    login: "auth/login",
    "fetch-farms-list": "farm/get-all-farm",
    "fetch-crops-list": "crop/get-all-crops",
    "add-farm": "farm/add-new-farm",
    "fetch-farm-all-crops": "farm/crop/get-all-crop",
    "add-crop-to-farm": "farm/crop/add-new-crop",
    "add-crop-to-lifecycle": "farm/crop/start-life-cycle",
    "crop-lifecycle-transition": "farm/crop/life-cycle-transition",
    "fetch-crop-lifecycle": "farm/crop/get-all-life-cycle",
    "fetch-crop-lifecycle-details": "farm/crop/life-cycle-details/",
    "update-crop-lifecycle-parameters":"farm/crop/update-life-cycle-stage-parameters",
    "update-crop-lifecycle-schedule":"farm//crop/schedule-lifecycle/",
    "fetch-users": "farm/get-all-farm-users",
    "add-user": "farm/add-new-user-to-farm",
    "update-user": "farm/update-farm-user",
    "delete-user": "farm/delete-farm-user",
    "update-farm-crop" : "farm/crop/update-crop",
    "delete-farm-crop" : "farm/crop/delete-crop"
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
  console.log(data);
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
  console.log(data);
  return callApi(getEndpoint("update-crop-lifecycle-parameters"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data,
  });
}
export function callUpdateCropToLifecycleSchedule(data) {
  console.log(data);
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
  console.log(data, "hello here is data");
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

