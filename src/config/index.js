import * as React from "react";

import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
export const api = {
  //host: "http://localhost:8000/api/",
  // host: 'http://44.202.123.160:8000/api/'
  host: 'https://growlock-backend.onrender.com/api/'
  //  host: "http://localhost:4000/api/",
  // host: 'http://44.202.123.160:8000/api/'
  // host:'https://growlock-backend.onrender.com/api/'
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
export const nutrientsType = [
  "2 Part mix",
  "3 Part mix",
  "Custom nutrient mix",
];
export const HARVEST_MONTH_OPTIONS = [
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
    supervisor: [],
  },
  lifeCycle: {
    farmowner: ["create", "edit", "delete", "view"],
    farmmanager: ["create", "edit", "delete", "view"],
    ergonomists: ["view"],
    supervisor: [],
  },
  users: {
    farmowner: ["create", "edit", "delete", "view"],
    farmmanager: ["create"],
    ergonomists: ["view"],
    supervisor: [],
  },
  farmItems: {
    farmowner: ["create", "edit", "delete", "view"],
    farmmanager: ["create", "edit", "delete", "view"],
    ergonomists: ["view"],
    supervisor: [],
  },
  dashboard: {
    farmowner: ["create", "edit", "delete", "view"],
    farmmanager: ["create", "edit", "delete", "view"],
    ergonomists: ["view"],
    supervisor: [],
  },
  reports: {
    farmowner: ["create", "edit", "delete", "view"],
    farmmanager: ["create", "edit", "delete", "view"],
    ergonomists: ["view"],
    supervisor: [],
  },
  inventory: {
    farmowner: ["create", "edit", "delete", "view"],
    farmmanager: ["create", "edit", "delete", "view"],
    ergonomists: ["view"],
    supervisor: [],
  },
  monitors: {
    farmowner: ["create", "edit", "delete", "view"],
    farmmanager: ["create", "edit", "delete", "view"],
    ergonomists: ["view"],
    supervisor: [],
  },
  waterManagement: {
    farmowner: ["create", "edit", "delete", "view"],
    farmmanager: ["create", "edit", "delete", "view"],
    ergonomists: ["view"],
    supervisor: [],
  },
  task: {
    farmowner: [],
    farmmanager: [],
    ergonomists: [],
    supervisor: ["view"],
  },





};
export const TASK_CATEGORY = ["Cleaning", "WaterQuality", "Soil Preparation", "Plantation", "Irrigation", "Crop Maintenance", "Fertilizer", "Scouting", "Defence", "Harvest", "Processing", "Storage", "Packing", "Loading", "Transportation", "Selling"];
export const INVENTORY_UNITS = ["Gms", "Ml", "kgs", "Litres", "Pieces", "Packet", "Other"];
export const TASK_HEADER = [
  {
    label: "Category",
    key: "category",
    redirection: false,
    redirectionKey: "link",
  },
  {
    label: "Task Name",
    key: "taskName",
    redirection: false,
    redirectionKey: "link",
  },
  {
    label: "Description",
    key: "description",
    redirection: false,
  },
  {
    label: "Batch Number",
    key: "batchNo",
    redirection: false,
  },
  {
    label: "Crop Name",
    key: "cropName",
    redirection: false,
  },
  {
    label: "Created By",
    key: "createdByProfile.name",
    redirection: false,
  },
  {
    label: "Created For",
    key: "createdForProfile.name",
    redirection: false,
  },
  {
    label: "Created On",
    key: "dueDate",
    redirection: false,
    isDate: true,
  },
  {
    label: "Due Date",
    key: "dueDate",
    redirection: false,
    isDate: true,
  },
  {
    label: "Actons",
    isButton: true,
    buttonArray: [
      {
        label: "Edit",
        type: "icon",
        icon: <AddCommentOutlinedIcon sx={{ color: "#517223" }} />,
        color: "primary",
      },

    ],
  },

]
