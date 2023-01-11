import * as React from "react";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
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
  Button,
  ListItemText,
  Container,
} from "@mui/material/";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from "react-router-dom";


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, drawerwidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "rgb(81,114,35)",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerwidth,
    width: `calc(100% - ${drawerwidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
export default function TopHeader({
  open,
  toggleDrawer,
  drawerWidth,
  loginObject,
  logout,
}) {
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showMenu,setShowMenu] = React.useState(false);
    const navigate = useNavigate();
    const logoutHandler = () => {
      logout();
      handleToggleMenu()
      };
     const  handleToggleMenu = (event) => {
      setShowMenu(!showMenu)
      setAnchorEl(event.currentTarget);
    }

    const handleAccountsNavigation = () => {
      navigate('/profile')
    }
  if (loginObject) {
    let userName = loginObject?.profile?.name;
    let userNameArray = userName?.split(" ");
    if (userNameArray) {
    }
    let avatarName = userNameArray[0]?.charAt(0);
    return (
      <AppBar position="fixed" open={open} drawerwidth={drawerWidth}>
        <Container maxWidth="xl">
                        <Toolbar >
                            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <IconButton sx={{ p: 0 }}>
                                    <Avatar variant="square" sx={{ width: '25px', height: '25px', fontSize: '14px', marginRight: '8px', borderRadius: '4px', fontWeight: 500 }} >
                                        {avatarName}
                                    </Avatar>
                                </IconButton>
                                <Typography variant="p" className='label-white' bold ="true"noWrap component="div" sx={{ cursor: 'pointer' }} >
                                  Hi  {userName}
                                </Typography>
                                <IconButton
                                    aria-label="settings"
                                    onClick={handleToggleMenu}
                                >
                                    <KeyboardArrowDownIcon
                                        sx={{ color: 'white' }}
                                        id="basic-button"
                                        aria-controls={showMenu ? "basic-menu" : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={showMenu ? "true" : undefined}
                                    />
                                </IconButton>
                            </Box>
                        </Toolbar>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            elevation={0}
                            open={showMenu}
                            onClose={handleToggleMenu}
                            PaperProps={{
                              sx: {
                               width: "300px",
                              border: "2px solid #E5E4D7",
                              borderRadius: "10px",
                             },
                           }}
                            >
                            <MenuItem sx={{ fontSize: '12px' }} >
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText className='label-custom' onClick={handleAccountsNavigation}> My Profile</ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem sx={{ fontSize: '12px' }} component={Link} onClick={() => logoutHandler()}>
                                <ListItemIcon>
                                    <PowerSettingsNewIcon />
                                </ListItemIcon>
                                <ListItemText className='label-custom'> Logout</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Container>

      </AppBar>
    );
  }
}
