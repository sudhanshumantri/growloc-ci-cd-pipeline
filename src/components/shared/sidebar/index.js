import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemText from "@mui/material/ListItemText";
import CssBaseline from "@mui/material/CssBaseline";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link } from "react-router-dom";
import TopHeader from "../header/";
import { farmMenuItems, menuItems } from "./config";
import '../../../../public/assets/Irrigation.png';
const ASSETS_URL = '../../../../public/assets/';
import './style.css';
const drawerWidth = 300;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#517223",
  // backgroundColor: '#e9e9e9',
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
    // backgroundColor: '#e9e9e9',
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
export default function SideBar({ router }) {

  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [openSubmenu, toggleSubmenu] = useState(false);
  const [items, setItems] = useState(menuItems);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { location } = router;
  useEffect(() => {
    if (location?.pathname) {
      if (location.pathname === "/" || location.pathname.indexOf("/login") > -1) {
        setItems(menuItems);
      } else {
        setItems(farmMenuItems);
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
        // toggleDrawer={toggleDrawer}
        drawerWidth={drawerWidth}
      />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ background: "#517223" }}>
        </DrawerHeader>
        <List className='drawer-list-container' sx={{ width: "100%", maxWidth: 360 }} component="nav">
          {items.map((each, index) => {
            console.log(each.icon);
            return (
              <React.Fragment key={index}>
                {each.subMenu && each.subMenu.length ? (
                  <>
                    <ListItem
                      button
                      onClick={() => handleClick(each.id)}
                      style={each.css}
                    >
                      <ListItemIcon className='darwer-icon' >
                        <img src={each.icon} />
                      </ListItemIcon>
                      <ListItemText primary={each.title} />
                      {openSubmenu[each.id] ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openSubmenu[each.id]}>
                      <List component="nav" className="drawer-sub-menu">
                        {(each.subMenu || []).map((subData) => (
                          <ListItem
                            style={subData.css}
                            component={Link}
                            to={subData.navigation}
                            key={subData.id}
                            button
                          >
                            <ListItemIcon className='darwer-icon' >
                              <img src={subData.icon} />
                            </ListItemIcon>
                            <ListItemText primary={subData.name} />
                          </ListItem>
                        )
                        )}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItem
                    component={Link}
                    to={each.navigation}
                    style={each.css}
                    button
                    key={index}
                  >
                    <ListItemIcon className='darwer-icon' >
                      <img src={each.icon} />
                      {/* <img src={require('../../../../public/assets/Irrigation.png')} /> */}
                    </ListItemIcon>
                    <ListItemText primary={each.title} />
                  </ListItem>
                )}
              </React.Fragment>
            )
          })}
        </List>
      </Drawer>
    </Box>
  );
}
