import React, { useState } from 'react'
import {
  styled,
  Box,
  List,
  ListItemText,
  CssBaseline,
  ListItem,
  ListItemIcon,
  IconButton
} from '@mui/material/'
import MuiDrawer from '@mui/material/Drawer'
import { Link } from 'react-router-dom'
import TopHeader from '../../shared/header'
import Dashboard from '../../../../public/assets/Dashboard.png'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import LOGO_DARK from '../../../../public/assets/logo_white_resized.png'
import './style.css'

const drawerWidth = 300
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden',
  backgroundColor: '#517223'
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + -13px)`,
    backgroundColor: '#517223'
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  background: 'white',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}))
export default function AdminSideBar ({ logout, loginObject }) {
  const [open, setOpen] = useState(false)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopHeader
        open={open}
        drawerWidth={drawerWidth}
        loginObject={loginObject}
        logout={logout}
        toggleDrawer={toggleDrawer}
      />
      <Drawer variant='permanent' open={open} sx={{ zIndex: 1 }}>
        <DrawerHeader sx={{ background: '#517223' }}>
          <div className='drawer-header-logo'>
            <img src={LOGO_DARK} width='245px' height='73px' />
            <IconButton
              onClick={toggleDrawer}
              sx={{
                color: 'white',
                textAlignt: 'left',
                marginTop: '-69px'
              }}
            >
              {open && <ChevronLeftIcon />}
            </IconButton>
          </div>
        </DrawerHeader>
        <List
          className='drawer-list-container'
          sx={{ width: '100%', maxWidth: 360 }}
          component='nav'
        >
          <div style={{ backgroundColor: 'black' }}>
            <ListItem
              component={Link}
              style={{ borderBottom: '1px solid white' }}
            >
              <ListItemIcon className='darwer-icon'>
                <img src={Dashboard} />
              </ListItemIcon>
              <ListItemText primary='Dashboard' sx={{ color: 'white' }} />
            </ListItem>
          </div>
        </List>
      </Drawer>
    </Box>
  )
}
