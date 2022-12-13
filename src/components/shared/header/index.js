import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Box, Toolbar, IconButton, Typography, Avatar } from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open, drawerwidth }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'rgb(81,114,35)',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerwidth,
        width: `calc(100% - ${drawerwidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
export default function TopHeader({ open, toggleDrawer, drawerWidth, loginObject }) {
    //console.log(loginObject);
    if (loginObject) {
        let userName = loginObject?.profile?.name;
        let userNameArray = userName?.split(" ");
        if (userNameArray) { }
        let avatarName = userNameArray[0]?.charAt(0);
        return (
            <AppBar
                position="fixed"
                open={open}
                drawerwidth={drawerWidth}
            >
                <Toolbar>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <IconButton sx={{ p: 0 }}>
                            <Avatar sx={{ width: '25px', height: '25px', fontSize: '14px', marginRight: '8px', borderRadius: '4px', fontWeight: 500 }} >
                                {avatarName}
                            </Avatar>
                        </IconButton>
                        <Typography variant="p" className='label-white' bold noWrap component="div" sx={{ cursor: 'pointer' }} >
                            Hi, {userName}
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        );
    }
}

