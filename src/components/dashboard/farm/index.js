import React, { useState } from "react";
import { Grid, FormControl } from "@mui/material";
import { useParams } from "react-router-dom";
import PageHeader from "../../shared/page-header";
import DataTable from "../../shared/dataTable";
import PieChart from "../../shared/chart/pieChart";
import BarChart from "../../shared/chart/barChart";
import CollapsibleTable from "../../shared/collapsibleDataTable";
import Loader from "../../shared/loader";
import AddIcon from "@mui/icons-material/Add";
import ButtonCustom from "../../shared/button";
import AddTaskModal from "../../shared/addtask/addtask";
import AddFarmTaskComment from "../addfarmtaskcomment";
import {HARVEST_MONTH_OPTIONS} from "../../../config"
import SingleCustomSelect from "../../shared/select";
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
  farmInventoryList,
  loginObject,
  addFarmTaskComment,
  isFarmTaskCommentLoading,
  isTaskScheduleTaskLoading,


}) {
  const { farmId } = useParams();
  const [month, setMonth] = useState(3);
  const [open, setOpen] = useState(false);
  const [openCommetTask,setCommetTask] = useState(false)
  const [rowdata,setRowData] = useState({})
  const headers = [
    {
      label: "Batch Number",
      key: "lifecycleId",
      redirection: true,
      redirectionKey: "lifecycleId",
      baseEndPoint: `#/farm/${farmId}/crops/lifecycle/details/`,
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

  console.log(dashboardFarmList, "here is dashborad");
  const handleModalToggle = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setMonth(value);
    fetchFarmDashboardHarvest({ farmId: parseInt(farmId), month: value });
  };

  const handleTaskSave = (data) => {
    if (data) {
      data.createdBy = loginObject?.profile.id;
      data.farmId = parseInt(farmId);
      addTaskScheduleTask(data);
    }
     handleModalToggle();
  };

  const handleCommentModalToggle = (rowData) => {
    setRowData(rowData)
    setCommetTask(!openCommetTask);
  };

  const handleTaskCommentSave = (data) => {
    if (data) {
      addFarmTaskComment({...data, taskId:parseInt(rowdata.id), userId:parseInt(rowdata.createdByProfile.id)});
    }
    handleCommentModalToggle();
  };
  const TASK_HEADER = [
    {
      label: "Category",
      key: "category",
      redirection: false,
      redirectionKey: "link",
    },
    {
      label: "Task Name",
      key: "taskName",
      redirection: false,
      redirectionKey: "link",
    },
    {
      label: "Description",
      key: "description",
      redirection: false,
    },
    {
      label: "Created By",
      key: "createdByProfile.name",
      redirection: false,
    },
    {
      label: "Created For",
      key: "createdForProfile.name",
      redirection: false,
    },
    {
      label: "Created On",
      key: "dueDate",
      redirection: false,
      isDate: true,
    },
    {
      label: "Item Name",
      key: "itemName",
      redirection: false,
      isDate: true,
    },
    {
      label: "Due Date",
      key: "dueDate",
      redirection: false,
      isDate: true,
    },
  ]
  const renderCropSchedules = () => {
    const { cropSchedules } = dashboardFarmList;
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
          <p className="section-title">Crop Schedules</p>
        </Grid>
        <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
          <DataTable data={{ headers: headers, rows: cropSchedules || [] }} />
        </Grid>
      </>
    );
  };
  const renderTaskSchedules = () => {
    const { farmdDetails } = dashboardFarmList;
    return (
      <>
        <Grid item xs={6} sm={6} md={9} lg={9}>
          <p className="section-title">Tasks</p>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={3}
          lg={3}
          sx={{ alignItems: "center" }}
        >
          <ButtonCustom
            title="Add New Task"
            ICON={<AddIcon />}
            handleButtonClick={handleModalToggle}
          />
        </Grid>
        <Grid className="card-outline-container " item xs={12} sm={12} md={12}>
          {/* <DataTable data={{ headers: TASK_HEADER, rows: farmdDetails?.Tasks || [] }} /> */}
          <CollapsibleTable data={{ headers: TASK_HEADER, rows: farmdDetails?.Tasks || [] }} handleCommentModalToggle={handleCommentModalToggle}/>
        </Grid>
      </>
    );
  };
  const renderFarmUtilization = () => {
    const { stagedBasedQtyData } = dashboardFarmList;
    return (
      <>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <p className="section-title">Farm Utilization Based On Stages</p>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} className='card-outline-container graph-container'>
              <PieChart chartData={stagedBasedQtyData || []} />
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };
  const renderCropsUtilization = () => {
    const { cropBasedQtyData } = dashboardFarmList;
    return (
      <Grid item xs={6} sm={6} md={6} lg={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <p className="section-title">Farm Utilization Based On Crops</p>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} className='card-outline-container graph-container'>
            <PieChart chartData={cropBasedQtyData || []} />
          </Grid>
        </Grid>
      </Grid>
      // <>
      //   <Grid item xs={6} sm={6} md={6} lg={6}>
      //     <p className="section-title">Farm Utilization Based On Crops</p>
      //   </Grid>
      //   <Grid item xs={6} sm={6} md={6} lg={6} className='card-outline-container'>
      //     <PieChart chartData={cropBasedQtyData || []} />
      //   </Grid>
      // </>
      // <Grid item xs={12} sm={6} md={6}>
      //   <div className="card-container">
      //     <p className="section-title">Farm Utilization Based On Crops</p>
      //     <PieChart chartData={cropBasedQtyData || []} />
      //   </div>
      // </Grid>
    );
  };
  const renderMonthlyHarvestBreakup = () => {
    return (
      <>
        <Grid item xs={8} sm={10} md={10} >
          <p className="section-title">Monthly Harvest Breakup</p>
        </Grid>
        <Grid item xs={4} sm={2} md={2}>
            <FormControl fullWidth>
            <span className="input-label">Select Month</span>
             <SingleCustomSelect
                value={month}
                valueKey="value"
                labelKey="name"
                lable="Select Month"
                options={HARVEST_MONTH_OPTIONS}
                handleChange={handleChange}
              />
            </FormControl>
            </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} className='card-outline-container graph-container'>
          <BarChart chartData={dashboardHarvestList || []} />
        </Grid>
      </>
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
      <PageHeader title="Farm Dashboard" buttonArray={[]} showBackButton={true} />
      {isDashboardHarvestListLoading && <Loader title="Fetching Details" />}
      {isFarmTaskCommentLoading && <Loader title="Adding Comment" />}
      {isTaskScheduleTaskLoading && <Loader title="Adding Tasks" />}
      <div className="page-container">
        <Grid container spacing={2}>
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
            farmInventoryList={farmInventoryList}
          />
        )}
       {openCommetTask && (
          <AddFarmTaskComment
            open={openCommetTask}
            handleSave={handleTaskCommentSave}
            handleClose={handleCommentModalToggle}

          />
        )}

      </div>
    </div>
  );
}
