import Dashboard from '../../../../public/assets/Dashboard.png'
import Irrigation from '../../../../public/assets/Irrigationcrop.png'
import Account from '../../../../public/assets/Account.png'
import ManageCrops from '../../../../public/assets/LawnCare.png'
import CropsLifecycle from '../../../../public/assets/Irrigation.png'
import Inventory from '../../../../public/assets/Inventory.png'
import WaterManagement from '../../../../public/assets/WaterManagement.png'
import Tasks from '../../../../public/assets/Tasks.png'

const menuItems = [
  {
    title: 'Farms',
    id: 'dashboard',
    navigation: '/',
    icon: Irrigation,
    css: { borderBottom: '1px solid white' },
    isAuthRequired: true,
    from: 'dashboard',
    action: 'view',
    isActive: true
  },

  {
    title: 'Task',
    id: 'Task',
    navigation: 'task',
    link: 'task',
    icon: Tasks,
    isAuthRequired: true,
    from: 'task',
    action: 'view',
    css: { borderBottom: '1px solid white' },
    isActive: true
  }
]

const farmMenuItems = [
  {
    title: 'Dashboard',
    id: 'Dashboard',
    icon: Dashboard,
    navigation: '/dashboard',
    link: '/dashboard',
    css: { borderBottom: '1px solid white' },
    isAuthRequired: true,
    from: 'crops',
    action: 'view',
    isActive: true
  },

  {
    title: 'Tasks',
    id: 'Tasks',
    navigation: '/task',
    icon: Tasks,
    link: '/task',
    css: { borderBottom: '1px solid white' },
    isActive: false
  },
  {
    title: 'Water Management',
    id: 'Water',
    icon: WaterManagement,
    isAuthRequired: true,
    from: 'waterManagement',
    action: 'view',
    link: '/water-management',
    navigation: 'water-management',
    css: { borderBottom: '1px solid white' },
    isActive: false
  },

  {
    title: 'Inventory',
    id: 'inventory',
    icon: Inventory,
    isChildToFarmId: true,
    navigation: 'inventory',
    css: { borderBottom: '1px solid white' },
    isAuthRequired: true,
    from: 'crops',
    action: 'view',
    isActive: false,
    subMenu: [
      {
        id: '1',
        name: 'Items',
        icon: Inventory,
        link: '/inventory/items',
        navigation: 'inventory/items',
        isActive: false
      },
      {
        id: '2',
        name: 'Manage Crops',
        navigation: '/inventory/manage',
        icon: ManageCrops,
        link: '/inventory/manage',
        isActive: false
      }
    ]
  },

  {
    title: 'Users',
    id: 'Users',
    isChildToFarmId: true,
    navigation: 'users',
    link: '/users',
    icon: Account,

    css: { borderBottom: '1px solid white' },
    isActive: false
  }
]

const zoneMenuItems = [
  {
    title: 'Dashboard',
    id: 'dashboard',
    icon: Dashboard,
    navigation: '/dashboard',
    link: '/dashboard',
    css: { borderBottom: '1px solid white' },
    isAuthRequired: true,
    from: 'crops',
    action: 'view',
    isActive: true
  },

  {
    title: 'Lifecycle',
    id: 'lifecycle',
    icon: CropsLifecycle,
    isChildToFarmId: true,
    navigation: '/lifecycle',
    link: '/lifecycle',
    css: { borderBottom: '1px solid white' },
    isAuthRequired: true,
    from: 'crops',
    action: 'view',
    isActive: false
  },

  {
    title: 'Tasks',
    id: 'Tasks',
    navigation: '/task',
    icon: Tasks,
    link: '/task',
    css: { borderBottom: '1px solid white' },
    isActive: false
  },
  {
    title: 'Water Management',
    id: 'Water',
    icon: WaterManagement,
    isAuthRequired: true,
    from: 'waterManagement',
    action: 'view',
    link: '/water-management',
    navigation: 'water-management',
    css: { borderBottom: '1px solid white' },
    isActive: false
  },

  {
    title: 'Inventory',
    id: 'inventory',
    icon: Inventory,
    isChildToFarmId: true,
    navigation: 'inventory',
    css: { borderBottom: '1px solid white' },
    isAuthRequired: true,
    from: 'crops',
    action: 'view',
    isActive: false,
    subMenu: [
      {
        id: '1',
        name: 'Items',
        icon: Inventory,
        link: '/inventory/items',
        navigation: 'inventory/items',
        isActive: false
      },
      {
        id: '2',
        name: 'Manage Crops',
        navigation: '/inventory/manage',
        icon: ManageCrops,
        link: '/inventory/manage',
        isActive: false
      }
    ]
  },

  {
    title: 'Users',
    id: 'Users',
    isChildToFarmId: true,
    navigation: 'users',
    link: '/users',
    icon: Account,
    isAuthRequired: true,
    from: 'users',
    action: 'view',
    css: { borderBottom: '1px solid white' },
    isActive: false
  }
]

const adminMenuItems = [
  {
    title: 'Dashboard',
    id: 'dashboard',
    navigation: '/dashboard',
    icon: Irrigation,
    css: { borderBottom: '1px solid white' },
    isActive: true
  }
]

export { farmMenuItems, menuItems, zoneMenuItems, adminMenuItems }
