const menuItems = [
    {
        title: 'Dashboard',
        id: "dashboard",
        navigation: 'dashboard',
        css: { borderBottom: '1px solid rgb(81,114,35)' }

    },
    {
        title: 'Crop',
        id: "crop",
        navigation: 'corp',
        css: { borderBottom: '1px solid rgb(81,114,35)' },
        subMenu: [{ id: '1', name: 'Manage Crops', navigation: 'crop/manage', }, { id: '3', name: 'Seeding', navigation: 'crop/seeding', }, { id: '4', name: 'Planting', navigation: 'crop/planting' }, { id: '5', name: 'Transplanting', navigation: 'crop/transplanting' }]

    },
    {
        title: 'Harvest Management',
        id: "Harvest",
        navigation: 'harvest',
        css: { borderBottom: '1px solid rgb(81,114,35)' },

        subMenu: [{ id: '1', name: 'Greens', navigation: 'harvest/greens' }, { id: '2', name: 'Herbs', navigation: 'harvest/herbs' }, { id: '3', name: 'Vines', navigation: 'harvest/vines' }, { id: '4', name: 'Flowers', navigation: 'harvest/flowers' }, { id: '5', name: 'Fruits', navigation: 'harvest/fruits' }, { id: '6', name: 'Roots', navigation: 'harvest/roots' }, { id: '6', name: 'Legumes', navigation: 'harvest/legumes' }]

    },
    {
        title: 'Water Management',
        id: "Water",
        navigation: 'water',
        css: { borderBottom: '1px solid rgb(81,114,35)' },
        subMenu: [{ id: '1', name: 'Storage', navigation: 'water/storage' }, { id: '2', name: 'Refil History', navigation: 'water/refill' }, { id: '3', name: 'Consumption History', navigation: 'water/consumption' }]

    },
    {
        title: 'Monitors',
        id: "Monitors",
        navigation: 'monitors',
        css: { borderBottom: '1px solid rgb(81,114,35)' },
        subMenu: [{ id: '1', name: 'Data Inputs', navigation: 'monitors/datainputs' }, { id: '2', name: 'Status', navigation: 'monitors/status' }, { id: '3', name: 'Data Plots', navigation: 'monitors/dataplots' }, { id: '4', name: 'Consulatant Reporting', navigation: 'monitors/reporting' }, { id: '5', name: 'My Reports', navigation: 'monitors/myreports' }]

    },
    {
        title: 'Inventory',
        id: "Inventory",
        navigation: 'inventory',
        css: { borderBottom: '1px solid rgb(81,114,35)' },
        subMenu: [{ id: '1', name: 'Items', navigation: 'inventory/items' }, { id: '2', name: 'Equipments', navigation: 'inventory/equipments' }, { id: '3', name: 'Replenish', navigation: 'inventory/replenish' }]

    },
    {
        title: 'Reports',
        id: "Reports",
        navigation: 'reports',
        css: { borderBottom: '1px solid rgb(81,114,35)' },
        subMenu: [{ id: '1', name: 'Avg Weight Per Plant', navigation: 'reports/avgweight' }, { id: '2', name: 'Farm Efficiency', navigation: 'reports/efficiency' }]

    },
    {
        title: 'Manage',
        id: "Manage",
        navigation: 'Manage',
        css: { borderBottom: '1px solid rgb(81,114,35)' },

    },
];

export default menuItems;