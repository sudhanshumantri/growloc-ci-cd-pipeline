import React, { useState, memo } from "react";
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
import AddFarmTaskComment from "../../shared/addfarmtaskcomment";
import { HARVEST_MONTH_OPTIONS } from "../../../config";
import SingleCustomSelect from "../../shared/select";
import { useNavigate } from "react-router-dom";
import AddZoneModal from "../addzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ConfirmDialogBox from "../../shared/dailog/ConfirmDialogBox";

export default function FarmDashboard({
  dashboardFarmList,
  fetchFarmDashboard,
  fetchFarmDashboardHarvest,
  dashboardHarvestList,
  isDashboardFarmListLoading,
  usersList,
  fetchUsers,
  addTaskScheduleTask,
  fetchFarmInventory,
  farmInventoryList,
  loginObject,
  addFarmTaskComment,
  isFarmTaskCommentLoading,
  isTaskScheduleTaskLoading,
  isDashboardHarvestListLoading,
  addFarmDashboardZone,
  fecthFarmDashboardZone,
  farmDashboardZoneList,
  isFarmDashboardZoneLoading,
  deleteFarmDashboardZone,
  isDeleteFarmDashboardZoneLoading,
  updateFarmDashboardZone,
  isUpdateFarmDashboardZoneLoading,
}) {
  const navigate = useNavigate();
  const { farmId } = useParams();
  const [month, setMonth] = useState(3);
  const [open, setOpen] = useState(false);
  const [openCommetTask, setCommetTask] = useState(false);
  const [rowdata, setRowData] = useState({});
  const [openZone, setOpenZone] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [zoneData, setZoneData] = useState({});

  console.log(dashboardFarmList,"dashboardFarmList");

  React.useEffect(() => {
    fecthFarmDashboardZone(farmId);
    fetchFarmDashboard(farmId);
    fetchFarmDashboardHarvest({ farmId: parseInt(farmId), month });
    // fetchFarmInventory(farmId);
    if (usersList.length <= 0) {
      fetchUsers(farmId);
    }
  }, []);
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

  const handleBackButton = () => {
    navigate("/");
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

  const handleFarmDashboardZone = (data) => {
    if (zoneData.id) {
      const payload = {
        name: data.name,
        farmArea: data.farmArea,
      };
      updateFarmDashboardZone({ payload, id: zoneData.id });
    } else {
      addFarmDashboardZone({
        ...data,
        farmId: parseInt(farmId),
      });
    }
    handleZoneModalToggle();
  };

  const handleCommentModalToggle = (rowData) => {
    setRowData(rowData);
    setCommetTask(!openCommetTask);
  };

  const handleTaskCommentSave = (data) => {
    if (data) {
      addFarmTaskComment({
        ...data,
        taskId: parseInt(rowdata.id),
        userId: parseInt(rowdata.createdByProfile.id),
      });
    }
    handleCommentModalToggle();
  };

  const handleZoneModalToggle = () => {
    setOpenZone(!openZone);
  };

  const handleEdit = (zoneEdit) => {
    const { id, name, farmArea } = zoneEdit;
    const zoneDetails = {
      name: name,
      farmArea: farmArea,
      id,
    };
    setZoneData(zoneDetails);
    setOpenZone(true);
  };

  const handleDelete = (zoneInfo) => {
    const { id, name } = zoneInfo;
    const zoneDetails = { id, name };
    setZoneData(zoneDetails);
    setIsDeleteModelOpen(true);
  };
  const handleDeleteDialogueToggle = () => {
    setIsDeleteModelOpen(!isDeleteModelOpen);
    setZoneData({});
  };
  const handleConfirmRemove = () => {
    const { id } = zoneData;
    deleteFarmDashboardZone(id);
    handleDeleteDialogueToggle();
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
      label: "Inventory Name",
      key: "",
      redirection: false,
      isDate: true,
    },
    {
      label: "Due Date",
      key: "dueDate",
      redirection: false,
      isDate: true,
    },
  ];

  const ZONE_HEADER = [
    // {
    //   label: "Zone No",
    //   key: "id",
    //   redirection: true,
    //   redirectionKey: "id",
    //   baseEndPoint: `#/farm/${farmId}/zone/`,
    // },
    {
      label: "Name",
      key: "name",
      redirection: true,
      redirectionKey: "id",
      baseEndPoint: `#/farm/${farmId}/zone/`,
    },
    {
      label: "Farm Area",
      key: "farmArea",
    },
    {
      label: "Actons",
      isButton: true,
      buttonArray: [
        {
          label: "Edit",
          type: "icon",
          handler: handleEdit,
          icon: <EditOutlinedIcon sx={{ color: "#517223" }} />,
          isAuthRequired: true,
          from: "farmItems",
          action: "edit",
        },
        {
          label: "Delete",
          type: "icon",
          icon: <DeleteOutlineOutlinedIcon sx={{ color: "#517223" }} />,
          handler: handleDelete,
          isAuthRequired: true,
          from: "farmItems",
          action: "delete",
        },
      ],
    },
  ];

  let conFirmbuttons = [
    {
      label: "Cancel",
      handler: handleDeleteDialogueToggle,
      isLight: true,
    },
    {
      label: "Delete",
      handler: handleConfirmRemove,
    },
  ];

  let buttonArray = [
    {
      label: "Create a new Zone",
      ICON: <AddIcon />,
      handler: handleZoneModalToggle,
    },
  ];

  let showBackButton = [
    {
      handler: handleBackButton,
    },
  ];

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
        <Grid item xs={6} sm={6} md={3} lg={3} sx={{ alignItems: "center" }}>
          <ButtonCustom
            title="Add New Task"
            ICON={<AddIcon />}
            handleButtonClick={handleModalToggle}
          />
        </Grid>
        <Grid className="card-outline-container " item xs={12} sm={12} md={12}>
          {/* <DataTable data={{ headers: TASK_HEADER, rows: farmdDetails?.Tasks || [] }} /> */}
          <CollapsibleTable
            data={{ headers: TASK_HEADER, rows: farmdDetails?.Tasks || [] }}
            handleCommentModalToggle={handleCommentModalToggle}
          />
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
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              className="card-outline-container graph-container"
            >
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
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className="card-outline-container graph-container"
          >
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
        <Grid item xs={8} sm={10} md={10}>
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
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className="card-outline-container graph-container"
        >
          <BarChart chartData={dashboardHarvestList || []} />
        </Grid>
      </>
    );
  };

  const renderFarmZone = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
          <p className="section-title">Zone</p>
        </Grid>
        <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
          <DataTable
            data={{ headers: ZONE_HEADER, rows: farmDashboardZoneList || [] }}
          />
        </Grid>
      </>
    );
  };

  return (
    <div>
      <PageHeader
        title="Farm Dashboard"
        buttonArray={buttonArray}
        showBackButton={showBackButton}
      />
      {isDashboardFarmListLoading && <Loader title="Fetching Details" />}
      {isFarmTaskCommentLoading && <Loader title="Adding Comment" />}
      {isTaskScheduleTaskLoading && <Loader title="Adding Tasks" />}
      {isDashboardHarvestListLoading && <Loader title="Fetching Details" />}
      {isFarmDashboardZoneLoading && <Loader title="Adding Zone" />}
      {isDeleteFarmDashboardZoneLoading && <Loader title="Deleting Zone" />}
      {isUpdateFarmDashboardZoneLoading && <Loader title="Updating Zone  " />}

      <div className="page-container">
        <Grid container spacing={2}>
          {renderFarmZone()}
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
            // farmInventoryList={farmInventoryList}
          />
        )}
        {openCommetTask && (
          <AddFarmTaskComment
            open={openCommetTask}
            handleSave={handleTaskCommentSave}
            handleClose={handleCommentModalToggle}
          />
        )}
        {openZone && (
          <AddZoneModal
            open={openZone}
            handleClose={handleZoneModalToggle}
            handleSave={handleFarmDashboardZone}
            zoneDetails={zoneData}
            data={farmDashboardZoneList}
          />
        )}

        {isDeleteModelOpen && (
          <ConfirmDialogBox
            dialogState={isDeleteModelOpen}
            buttonArray={conFirmbuttons}
            subHeading={`Are you sure to delete "${zoneData.name}" ?`}
          />
        )}
      </div>
    </div>
  );
}
