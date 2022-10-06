import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TopHeader from "../shared/header/";
import SideBar from "../shared/sidebar/"
import Toolbar from '@mui/material/Toolbar';
import { Routes, Route } from "react-router-dom";
import Seeding from "../crop/seeding";
import Planting from "../crop/planting";
import ManageCrop from "../crop/managecorp";
import Dashboard from '../dashboard';
import Transplanting from '../crop/transplating';
const drawerWidth = 240;
export default function Header() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopHeader />
            <SideBar />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }} >
                <Toolbar />
                <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="crop/manage" element={<ManageCrop />} />
                    <Route path="crop/seeding" element={<Seeding />} />
                    <Route path="crop/planting" element={<Planting />} />
                    <Route path="crop/transplanting" element={<Transplanting />} />
                </Routes>

            </Box>
        </Box>

    );
}
