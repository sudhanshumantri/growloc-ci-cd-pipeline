import * as React from 'react'

import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined'
export const api = {
  // host: 'https://growlock-backend.onrender.com/api/'
  host: 'https://api.growloc.farm/api/'
  // host: 'http://localhost:4000/api/'
}

export const WEEKDAYS = [
  { label: 'S', value: '7' },
  { label: 'M', value: '1' },
  { label: 'T', value: '2' },
  { label: 'W', value: '3' },
  { label: 'Th', value: '4' },
  { label: 'F', value: '5' },
  { label: 'Sa', value: '6' }
]
export const GERMINATION_TYPE = [
  'Tray with coco peat',
  'Oasis cubes',
  'Coco plugs'
]
export const WATERING_TYPE = ['Manual', 'Automated']
export const NURSARY_TYPE = [
  'Open(No humidity control)',
  'Closed dome (Humidity control)'
]
export const GROWING_ZONE = [
  'NFT system',
  'Trough system ',
  'Raft system',
  'Dutch bucket system'
]
export const PLANT_SPACING = ['Plant to Plant', 'Row to Row']
export const NUTRIENTS_TYPE = [
  '2 Part mix',
  '3 Part mix',
  'Custom nutrient mix'
]
export const HARVEST_MONTH_OPTIONS = [
  {
    name: '3 Months',
    value: 3
  },
  {
    name: '6 Months',
    value: 6
  },
  {
    name: '12 Months',
    value: 12
  }
]

export const ROLE_BASED_ACCESS = {
  // ROLE_BASED_ACCESS
  // key : end-point
  farms: {
    // key: role, value: access
    admin: ['create', 'edit', 'delete', 'view'],
    farmowner: ['create', 'edit', 'delete', 'view'],
    farmmanager: ['view'],
    agronomist: ['view'],
    supervisor: ['view']
  },

  crops: {
    admin: ['create', 'edit', 'delete', 'view'],
    farmowner: ['create', 'edit', 'delete', 'view'],
    farmmanager: ['create', 'edit', 'delete', 'view'],
    agronomist: ['view'],
    supervisor: []
  },
  lifeCycle: {
    admin: ['create', 'edit', 'delete', 'view'],
    farmowner: ['create', 'edit', 'delete', 'view'],
    farmmanager: ['create', 'edit', 'delete', 'view'],
    agronomist: ['view'],
    supervisor: []
  },
  users: {
    admin: ['create', 'edit', 'delete', 'view'],
    farmowner: ['create', 'edit', 'delete', 'view'],
    farmmanager: ['create'],
    agronomist: ['view'],
    supervisor: []
  },
  farmItems: {
    admin: ['create', 'edit', 'delete', 'view'],
    farmowner: ['create', 'edit', 'delete', 'view'],
    farmmanager: ['create', 'edit', 'delete', 'view'],
    agronomist: ['view'],
    supervisor: []
  },
  dashboard: {
    admin: ['create', 'edit', 'delete', 'view'],
    farmowner: ['create', 'edit', 'delete', 'view'],
    farmmanager: ['create', 'edit', 'delete', 'view'],
    agronomist: ['view'],
    supervisor: []
  },
  lifeCycleDetails: {
    admin: ['create', 'edit', 'delete', 'view'],
    farmowner: ['create', 'edit', 'delete', 'view'],
    farmmanager: ['create', 'edit', 'delete', 'view'],
    agronomist: ['view'],
    supervisor: []
  },

  reports: {
    admin: ['create', 'edit', 'delete', 'view'],
    farmowner: ['create', 'edit', 'delete', 'view'],
    farmmanager: ['create', 'edit', 'delete', 'view'],
    agronomist: ['view'],
    supervisor: []
  },
  inventory: {
    admin: ['create', 'edit', 'delete', 'view'],
    farmowner: ['create', 'edit', 'delete', 'view'],
    farmmanager: ['create', 'edit', 'delete', 'view'],
    agronomist: ['view'],
    supervisor: []
  },
  monitors: {
    admin: ['create', 'edit', 'delete', 'view'],
    farmowner: ['create', 'edit', 'delete', 'view'],
    farmmanager: ['create', 'edit', 'delete', 'view'],
    agronomist: ['view'],
    supervisor: []
  },
  waterManagement: {
    admin: ['create', 'edit', 'delete', 'view'],
    farmowner: ['create', 'edit', 'delete', 'view'],
    farmmanager: ['create', 'edit', 'delete', 'view'],
    agronomist: ['view'],
    supervisor: []
  },
  task: {
    farmowner: [],
    farmmanager: [],
    agronomist: [],
    supervisor: ['view']
  }
}
export const TASK_CATEGORY = [
  'Cleaning',
  'WaterQuality',
  'Soil Preparation',
  'Plantation',
  'Irrigation',
  'Crop Maintenance',
  'Fertilizer',
  'Scouting',
  'Defence',
  'Harvest',
  'Processing',
  'Storage',
  'Packing',
  'Loading',
  'Transportation',
  'Selling'
]
export const INVENTORY_UNITS = [
  'Gms',
  'Ml',
  'kgs',
  'Litres',
  'Pieces',
  'Packet',
  'Other'
]
export const TASK_HEADER = [
  {
    label: 'Category',
    key: 'category',
    redirection: false,
    redirectionKey: 'link'
  },
  {
    label: 'Task Name',
    key: 'taskName',
    redirection: false,
    redirectionKey: 'link'
  },
  {
    label: 'Description',
    key: 'description',
    redirection: false
  },
  {
    label: 'Batch Number',
    key: 'batchNo',
    redirection: false
  },
  {
    label: 'Crop Name',
    key: 'cropName',
    redirection: false
  },
  {
    label: 'Created By',
    key: 'createdByProfile.name',
    redirection: false
  },
  {
    label: 'Created For',
    key: 'createdForProfile.name',
    redirection: false
  },
  {
    label: 'Created On',
    key: 'dueDate',
    redirection: false,
    isDate: true
  },
  {
    label: 'Due Date',
    key: 'dueDate',
    redirection: false,
    isDate: true
  },
  {
    label: 'Actons',
    isButton: true,
    buttonArray: [
      {
        label: 'Edit',
        type: 'icon',
        icon: <AddCommentOutlinedIcon sx={{ color: '#517223' }} />,
        color: 'primary'
      }
    ]
  }
]

export const SEVERITY_LEVEL = [
  {
    name: 'Urgent',
    value: 0
  },
  {
    name: 'Medium',
    value: 1
  },
  {
    name: 'Normal',
    value: 2
  }
]

export const TOGGLE_DATA = [
  { value: 'farmEfficiency', label: 'Farm Efficiency' },
  { value: 'mortalityRate', label: 'Mortality Rate' },
  { value: 'taskTat', label: 'TASK TAT' },
  { value: 'CapacityEfficiency', label: 'Capacity Efficiency' }
]

export const TOGGLE_ZONE_DATA = [
  { value: 'zoneEfficiency', label: 'Zone Efficiency' },
  { value: 'mortalityRate', label: 'Mortality Rate' },
  { value: 'taskTat', label: 'TASK TAT' },
  { value: 'CapacityEfficiency', label: 'Capacity Efficiency' }
]
export const TIME_FRAMES = ['4hr', '12hr', '24hr', '3d', '1w']
