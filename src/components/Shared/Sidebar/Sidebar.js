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
import  {Link} from "react-router-dom";
import menuItems from "./config";

const drawerWidth = 240;
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
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>

                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"

                >
                    {menuItems.map((each, index) => (
                        <React.Fragment key={index}>
                            {each.subMenu && each.subMenu.length ?
                                <> 
                                    <ListItem  button onClick={() => handleClick(each.id)}>
                                        <ListItemText primary={each.title} />
                                        {open[each.id] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={open[each.id]} >
                                        <List component="div" >
                                            {(each.subMenu || []).map(subData => (
                                                <ListItem component={Link} to={subData.navigation} key={subData.id} button>
                                                    <ListItemText inset primary={subData.name} />

                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                </> :
                                <ListItem component={Link} to={each.navigation} button key={index}>
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