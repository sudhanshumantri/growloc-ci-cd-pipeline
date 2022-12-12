import React, { useState, useEffect } from "react";
import Dashboard from "../../../../public/assets/Dashboard.png";
import Irrigation from "../../../../public/assets/Irrigation.png";
import Account from "../../../../public/assets/Account.png";
import Report from "../../../../public/assets/Report.png";
import ManageCrops from "../../../../public/assets/LawnCare.png";
import Crops from "../../../../public/assets/Crops.png";
import CropsLifecycle from "../../../../public/assets/Irrigation.png";
import Inventory from "../../../../public/assets/Inventory.png";
import InventoryItem from "../../../../public/assets/InventoryItem.png";
import WaterManagement from "../../../../public/assets/WaterManagement.png";
import WaterHistory from "../../../../public/assets/WaterHistory.png";

const menuItems = [
  {
    title: "Farms",
    id: "dashboard",
    navigation: "/",
    icon: Irrigation,
    css: { borderBottom: "1px solid white" },
  },
  {
    title: "Reports",
    id: "Reports",
    icon: Report,
    navigation: "reports",
    css: { borderBottom: "1px solid white" },
    subMenu: [
      {
        id: "1",
        name: "Avg Weight Per Plant",
        navigation: "reports/avgweight",
      },
      { id: "2", name: "Farm Efficiency", navigation: "reports/efficiency" },
    ],
  },
];

const farmMenuItems = [
  {
    title: "Dashboard",
    id: "dashboard",
    icon: Dashboard,
    navigation: "/dashboard",
    link: "/dashboard",
    css: { borderBottom: "1px solid white" },
  },
  {
    title: "Crop",
    id: "crop",
    icon: Crops,
    isChildToFarmId: true,
    navigation: "corp",
    css: { borderBottom: "1px solid white" },
    subMenu: [
      {
        id: "1",
        name: "Manage Crops",
        navigation: "/crops/manage",
        icon: ManageCrops,
        link: "/crops/manage",
      },
      {
        id: "3",
        name: "Crops Lifecycle",
        navigation: "/crops/lifecycle",
        link: "/crops/lifecycle",
        icon: CropsLifecycle,
        isAuthRequired: true,
        from: "lifeCycle",
        action: "view",
      },
    ],
  },
  {
    title: "Water Management",
    id: "Water",
    icon: WaterManagement,
    navigation: "water",
    css: { borderBottom: "1px solid white" },
    subMenu: [
      { id: "1", name: "Storage & History",icon:WaterHistory, navigation: "water/storage" }
    ],
  },
  {
    title: "Monitors",
    id: "Monitors",
    icon: null,
    navigation: "monitors",
    css: { borderBottom: "1px solid white" },
    subMenu: [
      { id: "1", name: "Data Inputs", navigation: "monitors/datainputs" },
      { id: "2", name: "Status", navigation: "monitors/status" },
      { id: "3", name: "Data Plots", navigation: "monitors/dataplots" },
      {
        id: "4",
        name: "Consulatant Reporting",
        navigation: "monitors/reporting",
      },
      { id: "5", name: "My Reports", navigation: "monitors/myreports" },
    ],
  },
  {
    title: "Inventory",
    id: "Inventory",
    icon: Inventory,
    navigation: "inventory",
    css: { borderBottom: "1px solid white" },
    subMenu: [
      {
        id: "1",
        name: "Items",
        icon: InventoryItem,
        link: "/inventory/items",
        navigation: "inventory/items",
      }
    ],
  },
  {
    title: "Reports",
    id: "Reports",
    icon: Report,
    navigation: "reports",
    css: { borderBottom: "1px solid white" },
    subMenu: [
      {
        id: "1",
        name: "Avg Weight Per Plant",
        navigation: "reports/avgweight",
      },
      { id: "2", name: "Farm Efficiency", navigation: "reports/efficiency" },
    ],
  },
  // {
  //     title: 'Manage',
  //     id: "Manage",
  //     icon: null,
  //     navigation: 'Manage',
  //     css: { borderBottom: '1px solid white' },

  // },
  {
    title: "Users",
    id: "Users",
    isChildToFarmId: true,
    navigation: "users",
    link: "/users",
    icon: Account,
    css: { borderBottom: "1px solid white" },
  },
  // {
  //   title: "Logout",
  //   id: "Logout",
  //   isChildToFarmId: true,
  //   navigation: null,
  //   css: { borderBottom: "1px solid white" },
  //   action: 'logout'

  // },
];

export { farmMenuItems, menuItems };
