import React, { useState, useEffect } from "react";
import {
  styled,
  useTheme,
  Box,
  List,
  ListItemText,
  CssBaseline,
  ListItem,
  ListItemIcon,
  Divider,
} from "@mui/material/";
import MuiDrawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import TopHeader from "../../shared/header";
import "../../../../public/assets/Irrigation.png";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../../../public/assets/logo.png";
import { adminMenuItems } from "../../shared/sidebar/config";
import Dashboard from "../../../../public/assets/Dashboard.png";
import "./style.css";

const drawerWidth = 300;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#517223",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + -13px)`,
    backgroundColor: "#517223",
  },
});

/**
 * this configures the drawer header conatiner
 */
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  background: "white",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export default function AdminSideBar({  logout, loginObject }) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [openSubmenu, toggleSubmenu] = useState(false);
  const [items, setItems] = useState(adminMenuItems);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleClick = (id) => {
    toggleSubmenu((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopHeader
        open={open}
        drawerWidth={drawerWidth}
        loginObject={loginObject}
        logout ={logout}
      />
      <Drawer variant="permanent" open={open} sx={{ zIndex: 1 }}>
        <DrawerHeader sx={{ background: "#517223" }}>
          <div className="drawer-header-logo">
            <img src={logo} onClick={() => this.props.router.navigate("/")} />
          </div>
        </DrawerHeader>
        <List
          className="drawer-list-container"
          sx={{ width: "100%", maxWidth: 360 }}
          component="nav"
        >  
        <ListItem component={Link} style={{borderBottom: "1px solid white"}}
>
            <ListItemIcon className="darwer-icon">
                <img src={Dashboard}/>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem> 
          <Divider/>
           <ListItem component={Link} >
            <ListItemIcon className="darwer-icon">
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem> 

        </List>
      </Drawer>
    </Box>
  );
}
