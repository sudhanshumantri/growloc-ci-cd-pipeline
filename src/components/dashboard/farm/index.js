import React, { useState } from "react";
import { Grid, FormControl } from "@mui/material";
import { useParams } from "react-router-dom";
import PageHeader from "../../shared/page-header";
import DataTable from "../../shared/dataTable";
import PieChart from "../../shared/chart/pieChart";
import BarChart from "../../shared/chart/barChart";
import SingleCustomSelect from "../../shared/select";
import { options } from "../../../config";
import Loader from "../../shared/loader";
import AddIcon from "@mui/icons-material/Add";
import ButtonCustom from "../../shared/button";
import AddTaskModal from "../addtask";
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
  fetchFarmDashboardHarvest,
  dashboardHarvestList,
  isDashboardHarvestListLoading,
  usersList,
  fetchUsers,
  addTaskScheduleTask,
  fetchFarmInventory,
  FarmInventoryList
}) {
  const { farmId } = useParams();
  const [month, setMonth] = useState(3);
  const [open, setOpen] = useState(false);

  const headers = [
    {
      label: "Batch Number",
      key: "lifecycleId",
      redirection: true,
      redirectionKey: "lifecycleId",
      baseEndPoint: "#/crops/lifecycle/details/",
      isAuthRequired: true,
      from: "lifeCycle",
      action: "view",
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

  const handleModalToggle = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setMonth(value);
    fetchFarmDashboardHarvest({ farmId: parseInt(farmId), month: value });
  };

  const   handleTaskSave = (data) => {
    if (data) {
      addTaskScheduleTask(data);
    }
    handleModalToggle();
  };

  const renderCropSchedules = () => {
    const { cropSchedules } = dashboardFarmList;
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
          <p className="section-title">Crop Schedules</p>
        </Grid>
        <Grid container className="farm-container">
          <Grid item xs={12} sm={12} md={12}>
            <DataTable data={{ headers: headers, rows: cropSchedules || [] }} />
          </Grid>
        </Grid>
      </>
    );
  };
  const renderTaskSchedules = () => {
    return (
      <>
        <Grid item xs={6} sm={6} md={6}>
          <p className="section-title">Task Schedules</p>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          sx={{ alignItems: "center" }}
          className="button-container"
        >
          <ButtonCustom
            title="Add New Task"
            ICON={<AddIcon />}
            handleButtonClick={handleModalToggle}
          />
        </Grid>
        <Grid container className="farm-container">
          <Grid item xs={12} sm={12} md={12}>
            <DataTable data={{ headers: cropSchedulesHeader, rows: rows }} />
          </Grid>
        </Grid>
      </>
    );
  };
  const renderFarmUtilization = () => {
    const { stagedBasedQtyData } = dashboardFarmList;
    return (
      <Grid item xs={12} sm={6} md={6}>
        <div className="card-container">
          <p className="section-title">Farm Utilization Based On Stages</p>
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
          <p className="section-title">Farm Utilization Based On Crops</p>
          <PieChart chartData={cropBasedQtyData || []} />
        </div>
      </Grid>
    );
  };
  const renderMonthlyHarvestBreakup = () => {
    return (
      <Grid item xs={12} sm={12} md={12}>
        <div className="card-container">
          <p className="section-title">Monthly Harvest Breakup</p>
          <Grid container justifyContent="end">
            <Grid item xs={3} sm={2} md={2}>
              <span className="input-label"> Select Month</span>
              <FormControl fullWidth>
                <SingleCustomSelect
                  value={month}
                  valueKey="value"
                  labelKey="name"
                  options={options}
                  handleChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
          <BarChart chartData={dashboardHarvestList || []} />
        </div>
      </Grid>
    );
  };
  React.useEffect(() => {
    fetchFarmDashboard(farmId);
    fetchFarmDashboardHarvest({ farmId: parseInt(farmId), month });
    fetchFarmInventory(farmId);
    if (usersList.length <= 0) {
      fetchUsers({ farmId });
    }
  }, []);

  return (
    <div>
      <PageHeader title="Farm Dashboard" buttonArray={[]} />
      {isDashboardHarvestListLoading && <Loader title="Fetching Details" />}
      <div className="page-container">
        <Grid container item spacing={2}>
          {isDashboardHarvestListLoading && <Loader title="Fetching Details" />}
          {renderCropSchedules()}
          {renderTaskSchedules()}
          {renderMonthlyHarvestBreakup()}
          {renderFarmUtilization()}
          {renderCropsUtilization()}
        </Grid>
        {open && (
          <AddTaskModal
            open={open}
            handleSave={handleTaskSave}
            handleClose={handleModalToggle}
            usersList={usersList}
            FarmInventoryList={FarmInventoryList}
          />
        )}
      </div>
    </div>
  );
}
