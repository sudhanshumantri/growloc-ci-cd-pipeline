import * as React from "react";
import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Collapse from '@mui/material/Collapse';
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import menuItems from "./config";
import style from './style.css'
const drawerWidth = 300;
export default function SideBar() {

    const [open, setOpen] = useState(false);

    const handleClick = (id) => {
        setOpen(prevState => ({ ...prevState, [id]: !prevState[id] }));
    }

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#F9CF78' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto', }}>
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
                                        {open[each.id] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={open[each.id]} >
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
            </Box>
        </Drawer>
    )
}