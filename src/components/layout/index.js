import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import SideBar from "../shared/sidebar/"
import Toolbar from '@mui/material/Toolbar';
import { Routes, Route } from "react-router-dom";
import Seeding from "../crop/seeding";
import Planting from "../crop/planting";
// import ManageCrop from "../crop/managecorp";
import Dashboard from '../dashboard';
import Transplanting from '../crop/transplating';
import store from '../../store';
import { getAsyncInjectors } from '../../utils/asyncInjectors';
// import reducers and sagas
import cropsReducer from '../../reducers/crops';
import { cropsSagas } from '../../sagas/crops';
import ManageCrop from '../../container/managecrops';

const { injectReducer, injectSagas } = getAsyncInjectors(store);
injectReducer('crops', cropsReducer);
injectSagas([cropsSagas]);


const drawerWidth = 240;
export default function Header() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* <TopHeader /> */}
            <SideBar />
            <Box
                component="main"
                sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }} >
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
