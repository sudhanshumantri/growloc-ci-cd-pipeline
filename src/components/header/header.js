import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TopHeader from "../top-header/top-header";
import SideBar from "../side-bar/side-bar";
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import SeedingTable from '../Tables/seeding';
import PlantingTable from '../Tables/planting';
import TransPalntTable from '../Tables/transplating';
import FormDialog from '../Dailog/DailogBox';
import PlantFormDialog from '../Dailog/PlantBox';
import DataTable from '../DataTable';
import data from "../lib/data";
import data1 from "../lib/persons";

 
const drawerWidth = 240;
export default function Header() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopHeader />
            <SideBar />
            <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography paragraph>
            <FormDialog/>
         <SeedingTable/>
        </Typography>
        <Typography paragraph>
            <PlantFormDialog/>
            <PlantingTable/>
        </Typography>
        <Typography paragraph>
    <TransPalntTable/>
        </Typography>
        <Typography paragraph>
    <DataTable title="Students" data={data1} />
        </Typography>
        <Typography paragraph>
       <DataTable data={data} />
        </Typography>
      </Box>
        </Box>
        
    );
}
