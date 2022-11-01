import React, { useState, useEffect } from "react";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
const appItems = [
    {
        title: 'Farms',
        id: "dashboard",
        navigation: 'app/dashboard',
        icon: <DashboardCustomizeIcon />,
        css: { borderBottom: '1px solid rgb(81,114,35)' }
    },
    {
        title: 'Customers',
        id: "customers",
        navigation: 'app/customers',
        icon: <DashboardCustomizeIcon />,
        css: { borderBottom: '1px solid rgb(81,114,35)' }
    },
    {
        title: 'Sales',
        id: "sales",
        navigation: 'app/sales',
        icon: <DashboardCustomizeIcon />,
        css: { borderBottom: '1px solid rgb(81,114,35)' }
    },
    {
        title: 'Account Users',
        id: "users",
        navigation: 'app/users',
        icon: <DashboardCustomizeIcon />,
        css: { borderBottom: '1px solid rgb(81,114,35)' }
    },
    {
        title: 'Organization',
        id: "organization",
        navigation: 'organization',
        icon: <DashboardCustomizeIcon />,
        css: { borderBottom: '1px solid rgb(81,114,35)' }
    },
]

const menuItems = [
    {
        title: 'Dashboard',
        id: "dashboard",
        icon: <DashboardCustomizeIcon />,
        navigation: 'dashboard',
        css: { borderBottom: '1px solid rgb(81,114,35)' }

    },
    {
        title: 'Crop',
        id: "crop",
        icon: <DashboardCustomizeIcon />,
        isChildToFarmId: true,
        navigation: 'corp',
        css: { borderBottom: '1px solid rgb(81,114,35)' },
        subMenu: [{ id: '1', name: 'Manage Crops', navigation: '/crops/manage', icon: <DashboardCustomizeIcon />, link: '/crops/manage' }, { id: '3', name: 'Crops Lifecycle', navigation: '/crops/lifecycle', link: '/crops/lifecycle', icon: <DashboardCustomizeIcon />, }]

    },
    {
        title: 'Water Management',
        id: "Water",
        icon: <DashboardCustomizeIcon />,
        navigation: 'water',
        css: { borderBottom: '1px solid rgb(81,114,35)' },
        subMenu: [{ id: '1', name: 'Storage', navigation: 'water/storage' }, { id: '2', name: 'Refil History', navigation: 'water/refill' }, { id: '3', name: 'Consumption History', navigation: 'water/consumption' }]

    },
    {
        title: 'Monitors',
        id: "Monitors",
        icon: <DashboardCustomizeIcon />,
        navigation: 'monitors',
        css: { borderBottom: '1px solid rgb(81,114,35)' },
        subMenu: [{ id: '1', name: 'Data Inputs', navigation: 'monitors/datainputs' }, { id: '2', name: 'Status', navigation: 'monitors/status' }, { id: '3', name: 'Data Plots', navigation: 'monitors/dataplots' }, { id: '4', name: 'Consulatant Reporting', navigation: 'monitors/reporting' }, { id: '5', name: 'My Reports', navigation: 'monitors/myreports' }]

    },
    {
        title: 'Inventory',
        id: "Inventory",
        icon: <DashboardCustomizeIcon />,
        navigation: 'inventory',
        css: { borderBottom: '1px solid rgb(81,114,35)' },
        subMenu: [{ id: '1', name: 'Items', navigation: 'inventory/items' }, { id: '2', name: 'Equipments', navigation: 'inventory/equipments' }, { id: '3', name: 'Replenish', navigation: 'inventory/replenish' }]

    },
    {
        title: 'Reports',
        id: "Reports",
        icon: <DashboardCustomizeIcon />,
        navigation: 'reports',
        css: { borderBottom: '1px solid rgb(81,114,35)' },
        subMenu: [{ id: '1', name: 'Avg Weight Per Plant', navigation: 'reports/avgweight' }, { id: '2', name: 'Farm Efficiency', navigation: 'reports/efficiency' }]

    },
    {
        title: 'Manage',
        id: "Manage",
        icon: <DashboardCustomizeIcon />,
        navigation: 'Manage',
        css: { borderBottom: '1px solid rgb(81,114,35)' },

    },
    {
        title: 'Users',
        id: "Users",
        isChildToFarmId: true,
        navigation: 'users',
        link: '/users',
        icon: <DashboardCustomizeIcon />,
        css: { borderBottom: '1px solid rgb(81,114,35)' },

    },

];



export { menuItems, appItems};