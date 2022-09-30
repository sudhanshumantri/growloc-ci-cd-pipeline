import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TopHeader from "../Shared/Header/Header";
import SideBar from "../Shared/Sidebar/Sidebar";
import Toolbar from '@mui/material/Toolbar';
import {Routes, Route} from "react-router-dom";
import Seeding from "../Routes/Crop/Seeding/Seeding";



const drawerWidth = 240;
export default function Header() {
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <TopHeader/>
            <SideBar/>
            <Box
                component="main"
                sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
            >
                <Toolbar/>
                <Routes>
                    <Route path="seeding" element={<Seeding/>}/>
                    <Route path="planting" element={<Seeding/>}/>
                </Routes>
            </Box>
        </Box>

    );
}
