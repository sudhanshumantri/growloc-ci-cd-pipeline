import React, { useState } from "react";
import { Grid, FormControl } from "@mui/material";
import { useParams } from "react-router-dom";
import PageHeader from "../../shared/page-header";
import DataTable from "../../shared/dataTable";
import PieChart from "../../shared/chart/pieChart";
import BarChart from "../../shared/chart/barChart";
import SingleCustomSelect from "../../shared/select";
import { HARVEST_MONTH_OPTIONS} from "../../../config";
import Loader from "../../shared/loader";
import AddIcon from "@mui/icons-material/Add";
import ButtonCustom from "../../shared/button";
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
// import AddTaskModal from "../addtask";
import AddTaskModal from "../../shared/addtask/addtask";
import AddFarmTaskComment from "../addfarmtaskcomment";

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

}) {
  const { farmId } = useParams();
  const [month, setMonth] = useState(3);
  const [open, setOpen] = useState(false);
  const [openCommetTask,setCommetTask] = useState(false)
  const [taskCommentData,setTaskCommentData] = useState({})
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
      label: "Batch Number",
      key: "batchNo",
      redirection: false,
    },
    {
      label: "Crop Name",
      key: "cropName",
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
      label: "Due Date",
      key: "dueDate",
      redirection: false,
      isDate: true,
    },
    {
      label: "Comment",
      isButton: true,
      buttonArray: [
        {
          label: "Add New",
          handler: handleCommentModalToggle,
          type: "icon",
          icon: <AddCommentOutlinedIcon sx={{ color: "#517223" }} />,
        },
        
      ],
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
    console.log(farmdDetails, "here is farm details");
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
          <DataTable data={{ headers: TASK_HEADER, rows: farmdDetails?.Tasks || [] }} />
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
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <p className="section-title">Monthly Harvest Breakup</p>
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
      <PageHeader title="Farm Dashboard" buttonArray={[]} />
      {isDashboardHarvestListLoading && <Loader title="Fetching Details" />}
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
