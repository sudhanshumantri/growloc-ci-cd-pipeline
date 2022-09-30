import * as React from "react";
import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Collapse from '@mui/material/Collapse';
import ListItem from "@mui/material/ListItem";





const drawerWidth = 240;
const menuItems = [
    {
        text: 'Dashboard',
        id: "dash"

    },
    {
        text: 'Corp',
        id: "corp",
        subMenu: [{ id: '1', name: 'Seeding' }, { id: '2', name: 'Planting' }]

    },
];


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
                                    <ListItem button onClick={() => handleClick(each.id)}>
                                        <ListItemText primary={each.text} />
                                        {open[each.id] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={open[each.id]} >
                                        <List component="div" >
                                            {(each.subMenu || []).map(subData => (
                                                <ListItem key={subData.id} button>
                                                    <ListItemText inset primary={subData.name} />

                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                </> :
                                <ListItem button key={index}>
                                    <ListItemText primary={each.text} />
                                </ListItem>
                            }
                        </React.Fragment>
                    ))}
                </List>
            </Box>
            
        </Drawer>
    )
}