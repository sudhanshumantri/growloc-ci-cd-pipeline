import React, { useState, useEffect } from 'react'
import {
  styled,
  Box,
  List,
  ListItemText,
  CssBaseline,
  Collapse,
  ListItem,
  ListItemIcon,
  IconButton
} from '@mui/material/'
import MuiDrawer from '@mui/material/Drawer'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Link } from 'react-router-dom'
import TopHeader from '../header/'
import { farmMenuItems, menuItems, zoneMenuItems } from './config'
import '../../../../public/assets/Irrigation.png'
import LOGO_DARK from '../../../../public/assets/logo_white_resized.png'
import './style.css'
import AuthOutlet from '../authoutlet'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { isMobile } from 'react-device-detect'
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
export default function SideBar ({ router, logout, loginObject }) {
  // const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [openSubmenu, toggleSubmenu] = useState(false)
  const [items, setItems] = useState(menuItems)

  useEffect(() => {
    if (isMobile) {
      setOpen(false)
    }
  }, [])

  const toggleDrawer = () => {
    setOpen(!open)
  }
  const { location } = router
  useEffect(() => {
    if (location?.pathname) {
      const route = location.pathname.split('/')
      if (route.includes('farm') && route.includes('zone')) {
        setItems(zoneMenuItems)
      } else if (route.includes('farm')) {
        setItems(farmMenuItems)
        console.log(farmMenuItems, 'farmMenuItems')
      } else {
        setItems(menuItems)
      }
    }
  }, [location])

  const handleClick = (id) => {
    toggleSubmenu((prevState) => ({ ...prevState, [id]: !prevState[id] }))
  }
  const handleActiveStyle = (idx, menu) => {
    let tmp = [...items]
    tmp = tmp.map((x) => {
      x.isActive = false
      if (x.subMenu) {
        x.subMenu = x.subMenu.map((it) => {
          it.isActive = false
          return it
        })
      }
      return x
    })
    tmp[idx].isActive = true
    setItems(tmp)
  }
  const subMenueClick = (i, j) => {
    const tmp = [...items]
    let sub = tmp[i].subMenu
    sub = sub.map((x) => {
      x.isActive = false
      return x
    })
    sub[j].isActive = true
    tmp[i] = sub
    setItems(tmp)
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
      <Drawer variant='permanent' open={open} className='drawer-background'>
        <DrawerHeader
          sx={{
            background: '#517223',
            height: '100hv'
          }}
          className='drawer-heade-section'
        >
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
          {items.map((each, index) => {
            return (
              <React.Fragment key={each.id + index}>
                {each.subMenu && each.subMenu.length
                  ? (
                    <>
                      <div
                        key={each.id + index}
                        style={each.isActive ? { backgroundColor: 'black' } : {}}
                        onClick={() => handleActiveStyle(index)}
                      >
                        <AuthOutlet
                          key={each.id}
                          isAuthRequired={each.isAuthRequired}
                          from={each.from}
                          action={each.action}
                        >
                          <ListItem
                            button
                            onClick={() => handleClick(each.id)}
                            style={each.css}
                          >
                            <ListItemIcon className='darwer-icon'>
                              <img src={each.icon} />
                            </ListItemIcon>
                            <ListItemText primary={each.title} />
                            {openSubmenu[each.id]
                              ? (
                                <ExpandLess />
                                )
                              : (
                                <ExpandMore />
                                )}
                          </ListItem>
                        </AuthOutlet>
                      </div>
                      <Collapse in={openSubmenu[each.id]}>
                        <List component='nav' className='drawer-sub-menu'>
                          {(each.subMenu || []).map((subData, idx) => (
                            <div
                              key={subData.id}
                              style={
                              subData.isActive
                                ? { backgroundColor: 'black' }
                                : { color: 'white' }
                            }
                              onClick={() => subMenueClick(index, idx)}
                            >
                              <AuthOutlet
                                key={subData.id}
                                isAuthRequired={subData.isAuthRequired}
                                from={subData.from}
                                action={subData.action}
                              >
                                <ListItem
                                  style={subData.css}
                                  component={Link}
                                  to={subData.navigation}
                                  key={subData.id}
                                  button
                                >
                                  <ListItemIcon className='darwer-icon'>
                                    <img src={subData.icon} />
                                  </ListItemIcon>
                                  <ListItemText primary={subData.name} />
                                </ListItem>
                              </AuthOutlet>
                            </div>
                          ))}
                        </List>
                      </Collapse>
                    </>
                    )
                  : (
                    <div
                      style={
                      each.isActive
                        ? { backgroundColor: 'black' }
                        : { color: 'white' }
                    }
                      onClick={() => handleActiveStyle(index, each)}
                    >
                      <AuthOutlet
                        isAuthRequired={each.isAuthRequired}
                        from={each.from}
                        action={each.action}
                      >
                        <ListItem
                          component={Link}
                          to={each.navigation}
                          style={each.css}
                          button
                          key={index}
                        >
                          <ListItemIcon className='darwer-icon'>
                            <img src={each.icon} />
                          </ListItemIcon>
                          <ListItemText
                            primary={each.title}
                            sx={{ color: 'white' }}
                          />
                        </ListItem>
                      </AuthOutlet>
                    </div>
                    )}
              </React.Fragment>
            )
          })}
        </List>
      </Drawer>
    </Box>
  )
}
