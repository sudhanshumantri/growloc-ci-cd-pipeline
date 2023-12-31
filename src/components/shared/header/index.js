import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  ListItemIcon,
  MenuItem,
  Divider,
  ListItemText,
  Container
} from '@mui/material/'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import PersonIcon from '@mui/icons-material/Person'
import { Link, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open, drawerwidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: 'rgb(81,114,35)',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerwidth,
    width: `calc(100% - ${drawerwidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

export default function TopHeader ({
  open,
  drawerWidth,
  loginObject,
  logout,
  toggleDrawer
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  const logoutHandler = () => {
    logout()
    handleToggleMenu()
  }
  const handleToggleMenu = (event) => {
    setShowMenu(!showMenu)
    if (event) {
      setAnchorEl(event.currentTarget)
    }
  }
  const handleAccountsNavigation = () => {
    navigate('profile')
    handleToggleMenu()
  }

  const renderAdminHeader = () => {
    return (
      <>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          elevation={0}
          open={showMenu}
          onClose={handleToggleMenu}
          PaperProps={{
            sx: {
              width: '300px',
              border: '2px solid #E5E4D7',
              borderRadius: '10px'
            }
          }}
        >
          <MenuItem
            sx={{ fontSize: '12px' }}
            component={Link}
            onClick={() => logoutHandler()}
          >
            <ListItemIcon>
              <PowerSettingsNewIcon />
            </ListItemIcon>
            <ListItemText className='label-custom'> Logout</ListItemText>
          </MenuItem>
        </Menu>
      </>
    )
  }

  const userHeader = () => {
    return (
      <>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          elevation={0}
          open={showMenu}
          onClose={handleToggleMenu}
          PaperProps={{
            sx: {
              width: '300px',
              border: '2px solid #E5E4D7',
              borderRadius: '10px'
            }
          }}
        >
          <MenuItem
            sx={{ fontSize: '12px' }}
            onClick={handleAccountsNavigation}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText className='label-custom'> My Profile</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem
            sx={{ fontSize: '12px' }}
            component={Link}
            onClick={() => logoutHandler()}
          >
            <ListItemIcon>
              <PowerSettingsNewIcon />
            </ListItemIcon>
            <ListItemText className='label-custom'> Logout</ListItemText>
          </MenuItem>
        </Menu>
      </>
    )
  }
  if (loginObject) {
    const userName = loginObject?.profile?.name
    const userRole = loginObject?.profile?.role
    const userNameArray = userName?.split(' ')
    const avatarName = userNameArray[0]?.charAt(0)

    return (
      <AppBar
        position='fixed'
        elevation={1}
        open={open}
        drawerwidth={drawerWidth}
      >
        <Container maxWidth='xl'>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={() => toggleDrawer()}
              // sx={{ mr: 2, ...(open && { display: 'none' }) }}
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' })
              }}
            >
              <MenuIcon
                sx={{
                  '@media (min-width: 600px)': {
                    marginLeft: '-34px!important',
                    fontSize: '31px !impotant'
                  },
                  '@media (max-width: 599px)': {
                    marginLeft: '-8px!important',
                    fontSize: '31px !impotant'
                  }
                }}
              />
            </IconButton>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}
            >
              <IconButton
                // sx={{ p: 0 }}
                color='inherit'
                aria-label='open drawer'
                edge='start'
                sx={{ mr: 2, ...open }}
              >
                <Avatar
                  variant='square'
                  sx={{
                    width: '25px',
                    height: '25px',
                    fontSize: '14px',
                    marginRight: '-9px',
                    borderRadius: '4px',
                    fontWeight: 500
                  }}
                >
                  {avatarName}
                </Avatar>
              </IconButton>
              <Typography
                variant='p'
                className='label-white'
                bold='true'
                noWrap
                component='div'
                sx={{ cursor: 'pointer' }}
              >
                Hi {userName}
              </Typography>
              <IconButton aria-label='settings' onClick={handleToggleMenu}>
                <KeyboardArrowDownIcon
                  sx={{ color: 'white' }}
                  id='basic-button'
                  aria-controls={showMenu ? 'basic-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={showMenu ? 'true' : undefined}
                />
              </IconButton>
            </Box>
          </Toolbar>
          {userRole === 'admin' ? renderAdminHeader() : userHeader()}
        </Container>
      </AppBar>
    )
  }
}
