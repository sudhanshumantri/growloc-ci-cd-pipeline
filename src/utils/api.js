import callApi from "./request";
import { api } from "../config";

const endpointLocation = "remote";
const urls = {
  remote: {
    "fetch-crops-list": "crop/get-all-crops",
    "add-crops-lists": "crop/add-new-crop",
    "add-crops-farm-list": "farm/crop/get-all-crop",
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

export function callAddCrop(data) {
  console.log(data);
  const params = {
    farmId: 1,
    cropData: {
      id: 1,
      name: "Broccoli - Microgreen",
      variety: "Microgreen",
      scientificName: "Brassica oleracea var. italica",
      germinationMethod: [
        {
          type: "Seeding",
          stages: [
            {
              name: "Germination",
              duration: 1,
            },
            {
              name: "Nursery",
              duration: 5,
            },
            {
              name: "Harvest",
              duration: 2,
            },
          ],
        },
        {
          type: "Panting",
          stages: [
            {
              name: "Germination",
              duration: 3,
            },
            {
              name: "Nursery",
              duration: 2,
            },
            {
              name: "Harvest",
              duration: 5,
            },
          ],
        },
      ],
      parameters: [
        {
          name: "pH Level",
          unit: "Units",
          value: "5.9",
        },
        {
          name: "Electric Conductivity",
          unit: "mS/cm",
          value: "1-2",
        },
        {
          name: "Temperature",
          unit: "C",
          value: "18-24",
        },
        {
          name: "CO2 Level",
          unit: "ppm",
          value: "1500",
        },
        {
          name: "Light",
          unit: "lumen",
          value: "6000",
        },
        {
          name: "Humidity",
          unit: "%",
          value: "60-50",
        },
      ],
    },
  };
  return callApi(getEndpoint("add-crops-lists"), {
    method: "POST",
    removeAuthorizationHeader: false,
    data: { ...params },
  });
}

export function callFetchCropsFarmList() {
  const body = {farmId:1};
  return callApi(getEndpoint("add-crops-farm-list"), {
    method: "post",
    removeAuthorizationHeader: false,
    body
  });
} 
