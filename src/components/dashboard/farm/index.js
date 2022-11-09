import React, { useState } from "react";
import {
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useParams } from "react-router-dom";
import PageHeader from "../../shared/page-header";
import DataTable from "../../shared/dataTable";
import PieChart from "../../shared/chart/pieChart";
import BarChart from "../../shared/chart/barChart";
let cropSchedulesHeader = [
  {
    label: "Batch Number",
    key: "batchNo",
    redirection: false,
    redirectionKey: "link",
  },
  {
    label: "Crop Name",
    key: "name",
    redirection: false,
  },
  {
    label: "Description",
    key: "description",
    redirection: false,
  },
];
let rows = [
  {
    zoneId: "Zone 1",
    batchNo: "batchNo",
    name: "crop Name",
    description:
      "The harvesting for this crop is expected to start in next two days",
  },
  {
    zoneId: "Zone 2",
    batchNo: "batchNo",
    name: "Crop Name",
    description:
      "The harvesting for this crop is expected to start in next two days",
  },
  {
    zoneId: "Zone 3",
    batchNo: "batchNo",
    name: "Crop Name",
    description:
      "The harvesting for this crop is expected to start in next two days",
  },
  {
    zoneId: "Zone 4",
    batchNo: "batchNo",
    name: "Crop Name",
    description:
      "The harvesting for this crop is expected to start in next two days",
  },
];

export default function FarmDashboard({
  dashboardFarmList,
  fetchFarmDashboard,
}) {
  const headers = [
    {
      label: "Batch Number",
      key: "batch",
      redirection: true,
      redirectionKey: 'lifecycleId',
      baseEndPoint: '#/crops/lifecycle/details/'
    },

    {
      label: "Crop Name",
      key: "cropName",
    },
    {
      label: "Description",
      key: "message",
    },
  ];

  const { farmId } = useParams();
  const renderCropSchedules = () => {
    const { cropSchedules } = dashboardFarmList;
    return (
      <Grid item xs={12} sm={12} md={12}>
        <div className="card-container">
          <p className="header-title">Crop Schedules</p>
          <DataTable data={{ headers: headers, rows: cropSchedules || [] }} />
        </div>
      </Grid>
    );
  };
  const renderTaskSchedules = () => {
    return (
      <Grid item xs={12} sm={12} md={12}>
        <div className="card-container">
          <p className="header-title">Task Schedules</p>
          <DataTable data={{ headers: cropSchedulesHeader, rows: rows }} />
        </div>
      </Grid>
    );
  };
  const renderFarmUtilization = () => {
    const { stagedBasedQtyData } = dashboardFarmList;
    return (
      <Grid item xs={12} sm={6} md={6}>
        <div className="card-container">
          <p className="header-title">Farm Utilization Based On Stages</p>
          <PieChart chartData={stagedBasedQtyData || []} />
        </div>
      </Grid>
    );
  };
  const renderCropsUtilization = () => {
    const { cropBasedQtyData } = dashboardFarmList;
    return (
      <Grid item xs={12} sm={6} md={6}>
        <div className="card-container">
          <p className="header-title">Farm Utilization Based On Crops</p>
          <PieChart chartData={cropBasedQtyData || []} />
        </div>
      </Grid>
    );
  };
  const renderMonthlyHarvestBreakup = () => {
    return (
      <Grid item xs={12} sm={12} md={12}>
        <div className="card-container">
          <p className="header-title">Monthly Harvest Breakup</p>
          <BarChart />
        </div>
      </Grid>
    );
  };

  React.useEffect(() => {
    fetchFarmDashboard(farmId);
  }, []);

  console.log("here is list", dashboardFarmList);

  return (
    <div>
      <PageHeader title="Farm Dashboard" buttonArray={[]} />
      <div className="page-container">
        <Grid container item sx={8} spacing={2}>
          {renderCropSchedules()}
          {renderTaskSchedules()}
          {renderMonthlyHarvestBreakup()}
          {renderFarmUtilization()}
          {renderCropsUtilization()}
        </Grid>
      </div>
    </div>
  );
}
