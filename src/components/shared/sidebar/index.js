import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import MuiDrawer from '@mui/material/Drawer';
import List from "@mui/material/List";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemText from "@mui/material/ListItemText";
import CssBaseline from '@mui/material/CssBaseline';
//import Drawer from "@mui/material/Drawer";
import Collapse from '@mui/material/Collapse';
import ListItem from "@mui/material/ListItem";
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from "react-router-dom";
import TopHeader from "../header/";
import menuItems from "./config";
import style from './style.css'
const drawerWidth = 300;

/* This is the additional code required for LeftDrawer Expand and Collapse(with Icons showing) - Start */

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: '#F4F4F2',
    // backgroundColor: '#e9e9e9',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + -13px)`,
        backgroundColor: '#F4F4F2',
        // backgroundColor: '#e9e9e9',
    },
});

/**
 * this configures the drawer header conatiner 
 */
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    background: 'white',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);
export default function SideBar() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [openSubmenu, toggleSubmenu] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const handleClick = (id) => {
        toggleSubmenu(prevState => ({ ...prevState, [id]: !prevState[id] }));
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopHeader open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth}/>
            <Drawer
                variant="permanent"
                open={open}
            >
                <DrawerHeader sx={{background:'#F4F4F2'}}>
                    <IconButton onClick={toggleDrawer}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <List
                    sx={{ width: '100%', maxWidth: 360, }}
                    component="nav"
                >
                    {menuItems.map((each, index) => (
                        <React.Fragment key={index}>
                            {each.subMenu && each.subMenu.length ?
                                <>
                                    <ListItem button onClick={() => handleClick(each.id)} style={each.css}>
                                        <ListItemText primary={each.title} />
                                        {openSubmenu[each.id] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={openSubmenu[each.id]} >
                                        <List component="nav" className="drawer-sub-menu" >
                                            {(each.subMenu || []).map(subData => (
                                                <ListItem style={subData.css} component={Link} to={subData.navigation} key={subData.id} button>
                                                    <ListItemText primary={subData.name} />

                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                </> :
                                <ListItem component={Link} to={each.navigation} style={each.css} button key={index}>
                                    <ListItemText primary={each.title} />
                                </ListItem>
                            }
                        </React.Fragment>
                    ))}
                </List>

            </Drawer>
        </Box>
    )
}