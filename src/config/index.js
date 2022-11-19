export const api = {
  host: "https://growloc-backend.herokuapp.com/api/",
  //host: 'http://localhost:8000/api/'
};
export const WEEKDAYS = [
  { label: "S", value: "7" },
  { label: "M", value: "1" },
  { label: "T", value: "2" },
  { label: "W", value: "3" },
  { label: "Th", value: "4" },
  { label: "F", value: "5" },
  { label: "Sa", value: "6" },
];
export const germination = ["Tray with coco peat", "Oasis cubes", "Coco plugs"];
export const wateringType = ["Manual", "Automated"];
export const nursaryType = [
  "Open(No humidity control)",
  "Closed dome (Humidity control)",
];
export const growingZone = [
  "NFT system",
  "Trough system ",
  "Raft system",
  "Dutch bucket system",
];
export const plantSpacing = ["Plant to Plant", "Row to Row"];
export const nutrientsType = ["2 Part mix", "3 Part mix", "Custom nutrient mix"]
export const options = [
  {
    name: "3 Months",
    value: 3,
  },
  {
    name: "6 Months",
    value: 6,
  },
  {
    name: "12 Months",
    value: 12,
  },
];

export const role_based_access = {
  // key : end-point
  farms: {
    // key: role, value: access
    farmowner: ["create", "edit", "delete", "view"],
    farmmanager: ["view"],
    ergonomists: ["view"],
    supervisor: ["view"],
  },
  
  crops: {
    farmowner: ["create", "edit", "delete", "view"],
    farmmanager: ["create", "edit", "delete", "view"],
    ergonomists: ["view"],
    supervisor: ["view"],
  },
  lifeCycle: {
    farmowner: ["create", "edit", "delete", "view"],
    farmmanager: ["create", "edit", "delete", "view"],
    ergonomists: [ "view"],
    supervisor: [],
  },
};

