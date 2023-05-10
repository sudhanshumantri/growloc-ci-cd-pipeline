import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  styled,
  useTheme,
  Box,
  List,
  ListItemText,
  CssBaseline,
  Collapse,
  ListItem,
  ListItemIcon,
  IconButton,
  useMediaQuery, Grid
} from "@mui/material/";
import MuiDrawer from "@mui/material/Drawer";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import TopHeader from "../header/";
import { farmMenuItems, menuItems, zoneMenuItems } from "./config";
import "../../../../public/assets/Irrigation.png";
import LogoutIcon from "@mui/icons-material/Logout";
const ASSETS_URL = "../../../../public/assets/";
import logo from "../../../../public/assets/logo.png";
import "./style.css";
import AuthOutlet from "../authoutlet";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
export default function SideBar({ router, logout, loginObject }) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [openSubmenu, toggleSubmenu] = useState(false);
  const [items, setItems] = useState(menuItems);
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const { location } = router;
  useEffect(() => {
    if (location?.pathname) {
      const route = location.pathname.split("/");
      if (route.includes("farm") && route.includes("zone")) {
        setItems(zoneMenuItems);
      } else if (route.includes("farm")) {
        setItems(farmMenuItems);
      } else {
        setItems(menuItems);
      }
    }
  }, [location]);
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
        logout={logout}
        toggleDrawer={toggleDrawer}
      />
      <Drawer variant="permanent" open={open}
      >
        {/* sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }} */}
        <DrawerHeader sx={{
          background: "#517223",
        }}>
          <div className="drawer-header-logo">
            <img src={logo} />
            <IconButton onClick={toggleDrawer} sx={{
              display: {
                lg: "none",
                md: "none",
                xs: "block",
              },
              color: "white",
              textAlignt: "left",
              "@media (min-width: 600px)": {
                width: "100%"
              },
            }}
            >
              {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
              {open && <ChevronLeftIcon />}
            </IconButton>
          </div>
        </DrawerHeader>
        <List
          className="drawer-list-container"
          sx={{ width: "100%", maxWidth: 360 }}
          component="nav"
        >
          {items.map((each, index) => {
            return (
              <React.Fragment key={each.id + index}>
                {each.subMenu && each.subMenu.length ? (
                  <>
                    <AuthOutlet
                      isAuthRequired={each.isAuthRequired}
                      from={each.from}
                      action={each.action}
                    >
                      <ListItem
                        button
                        onClick={() => handleClick(each.id)}
                        style={each.css}
                      >
                        <ListItemIcon className="darwer-icon">
                          <img src={each.icon} />
                        </ListItemIcon>
                        <ListItemText primary={each.title} />
                        {openSubmenu[each.id] ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                    </AuthOutlet>
                    <Collapse in={openSubmenu[each.id]}>
                      <List component="nav" className="drawer-sub-menu">
                        {(each.subMenu || []).map((subData) => (
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
                              <ListItemIcon className="darwer-icon">
                                <img src={subData.icon} />
                              </ListItemIcon>
                              <ListItemText primary={subData.name} />
                            </ListItem>
                          </AuthOutlet>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
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
                      <ListItemIcon className="darwer-icon">
                        <img src={each.icon} />
                        {/* <img src={require('../../../../public/assets/Irrigation.png')} /> */}
                      </ListItemIcon>
                      <ListItemText primary={each.title} />
                    </ListItem>
                  </AuthOutlet>
                )}
              </React.Fragment>
            );
          })}

        </List>
      </Drawer>
    </Box>
  );
}
