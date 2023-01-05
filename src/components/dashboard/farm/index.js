import React, { useState, memo } from "react";
import {
  Grid,
  FormControl,
  Card,
  CardContent,
  CardMedia,
  Typography,
  ButtonGroup,
  Button,
} from "@mui/material";
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
import { HARVEST_MONTH_OPTIONS, SEVERITY_LEVEL } from "../../../config";
import SingleCustomSelect from "../../shared/select";
import { useNavigate } from "react-router-dom";
import AddZoneModal from "../addzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ConfirmDialogBox from "../../shared/dailog/ConfirmDialogBox";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import AddCropModal from "../../crop/life-cycle/addCropToLifeCycleModal";
import imageSrc from "../../../../public/assets/total-devices.svg";
import farmsImage from "../../../../public/assets/svg.svg";
import harvestImage from "../../../../public/assets/batch-progress.svg";
import taskImage from "../../../../public/assets/task-for-today.svg";
// import { Box, Tab, Tabs } from "@mui/material";
// import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";

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
  cropList,
  farmCropList,
  fecthCropFarm,
  fetchAllCropsLifecycle,
  addCropToLifecycle,
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
  const [openCrop, setOpenCrop] = useState(false);
  const [cropData, setCropData] = useState({});

  const [value, setValue] = React.useState("1");

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    fecthFarmDashboardZone(farmId);
    fetchFarmDashboard(farmId);
    fetchFarmInventory(farmId);
    fetchFarmDashboardHarvest({ farmId: parseInt(farmId), month });
    fecthCropFarm({ farmId: parseInt(farmId) });
    fetchAllCropsLifecycle({ farmId: parseInt(farmId) });
    if (usersList.length <= 0) {
      fetchUsers(farmId);
    }
  }, []);

  let { cropSchedules } = dashboardFarmList;

  const zoneId = (cropSchedules || [])[0]?.zoneId;

  const headers = [
    {
      label: "Batch Number",
      key: "lifecycleId",
      redirection: true,
      redirectionKey: "lifecycleId",
      baseEndPoint: `#/farm/${farmId}/zone/${zoneId}/crops/lifecycle/details/`,
      isAuthRequired: true,
      from: "lifeCycle",
      action: "view",
    },

    {
      label: "Crop Name",
      key: "cropName",
    },
    {
      label: "Zone Name",
      key: "zoneName",
    },
    {
      label: "Description",
      key: "message",
    },
  ];

  const handleModalToggle = () => {
    setOpen(!open);
  };

  const handleCropModalToggle = (cropData) => {
    setCropData(cropData);
    setOpenCrop(!openCrop);
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
        zoneType: data.zoneType,
        systemType: data.systemType,
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
    setZoneData({});
  };

  const handleEdit = (zoneEdit) => {
    const { id, name, farmArea, zoneType, systemType } = zoneEdit;
    const zoneDetails = {
      name: name,
      farmArea: farmArea,
      zoneType: zoneType,
      systemType: systemType,
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

  const handleZoneCropLifeCycleSave = (lifecycleData) => {
    if (lifecycleData) {
      addCropToLifecycle({ ...lifecycleData, zoneId: parseInt(cropData.id) });
    }
    handleCropModalToggle();
  };

  const TASK_HEADER = [
    {
      label: "Severity",
      key: "severity",
      redirection: false,
      isDate: true,
    },
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
      label: "Zone Type",
      key: "zoneType",
    },
    {
      label: "System Type",
      key: "systemType",
    },

    {
      label: "Actons",
      isButton: true,
      buttonArray: [
        {
          label: "Add a new Crop ",
          type: "icon",
          handler: handleCropModalToggle,
          icon: <AddIcon sx={{ color: "#517223" }} />,
        },
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <span className="section-title">Crop Schedules</span>
        </Grid>
        <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
          <DataTable data={{ headers: headers, rows: cropSchedules || [] }} />
        </Grid>
      </Grid>
    );
  };
  const renderTaskSchedules = () => {
    const { farmdDetails } = dashboardFarmList;
    return (
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={9} lg={9}>
          <span className="section-title">Tasks</span>
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={3} sx={{ alignItems: "center" }}>
          <ButtonCustom
            title="Add New Task"
            ICON={<AddIcon />}
            handleButtonClick={handleModalToggle}
          />
        </Grid>
        <Grid className="card-outline-container " item xs={12} sm={12} md={12}>
          {/* <DataTable data={{ headers: TASK_HEADER, rows: farmdDetails?.Tasks || [] }}
             handleCommentModalToggle={handleCommentModalToggle}
             />  */}
          <CollapsibleTable
            data={{ headers: TASK_HEADER, rows: farmdDetails?.Tasks || [] }}
            handleCommentModalToggle={handleCommentModalToggle}
          />
        </Grid>
      </Grid>
    );
  };
  const renderFarmUtilization = () => {
    const { stagedBasedQtyData } = dashboardFarmList;
    return (
      <>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <span className="section-title">Farm Utilization Based On Stages</span>
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
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <span className="section-title">Farm Utilization Based On Crops</span>
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
      <Grid container spacing={2}>
        <Grid item xs={8} sm={10} md={10}>
          <span className="section-title">Monthly Harvest Breakup</span>
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
      </Grid>
    );
  };

  const renderFarmZone = () => {
    return (
      <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <span className="section-title">Zone</span>
          </Grid>
          <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
            <DataTable
              data={{ headers: ZONE_HEADER, rows: farmDashboardZoneList || [] }}
            />
          </Grid>
      </Grid>
    );
  };

  const renderCard = () => {
    const { batchCount, totalHarvested, farmdDetails } = dashboardFarmList;
    return (
      <>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Card>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={9} md={9}>
                    <h4 className="section-details">1</h4>
                    <p className="farm-card">No of Zones </p>
                  </Grid>
                  <Grid item xs={6} sm={3} md={3}>
                    <img
                      height="42px"
                      width="42px"
                      className="farm-dashboard-images"
                      src={imageSrc}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={9} md={9}>
                  <h4 className="section-details">{batchCount}</h4>
                  <p className="farm-card">No of Batch</p>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                  <img
                    height="42px"
                    width="42px"
                    className="farm-dashboard-images"
                    src={farmsImage}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={9} md={9}>
                  <h4 className="section-details">
                    {farmdDetails?.Tasks.length}
                  </h4>
                  <p className="farm-card">No of Tasks</p>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                  <img
                    height="42px"
                    width="42px"
                    className="farm-dashboard-images"
                    src={taskImage}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={9} md={9}>
                  <h4 className="section-details">
                    {totalHarvested?.kgs}(kgs)/{totalHarvested?.qty}(qty)
                  </h4>
                  <p className="farm-card">Total Harves</p>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                  <img
                    height="42px"
                    width="42px"
                    className="farm-dashboard-images"
                    src={harvestImage}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </>
    );
  };

  const renderZoneCard = () => {
    return (
      <>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={3} sm={3} md={3}>
              <Grid item xs={12} sm={12} md={12}>
                <Card
                  className="zone-section"
                  style={{ backgroundColor: "#9ef898" }}
                >
                  <CardContent>
                    <p className="zone-name">
                      {farmDashboardZoneList[0]?.name}
                    </p>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Card
                  className="zone-section"
                  style={{ backgroundColor: "#ace2b0" }}
                >
                  <CardContent>
                    <p className="zone-name">
                      {farmDashboardZoneList[1]?.name}
                    </p>
                  </CardContent>
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                style={{ alignItems: "center" }}
              >
                <Card
                  className="zone-section"
                  style={{ backgroundColor: "#8ec16e" }}
                >
                  <CardContent>
                    <p className="zone-name">1 </p>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={5} sm={5} md={5}>
              <Card
                className="zone-second"
                style={{ backgroundColor: "#07c03d" }}
              >
                <CardContent
                  style={{ textAnchor: "middle", dominantBaseline: "central" }}
                >
                  <p className="zone-name zone-height">4</p>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Card
                className="zone-second"
                style={{ backgroundColor: "#d3d3d3" }}
              >
                <CardContent>
                  <p className="zone-name zone-height">5</p>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
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
          {renderCard()}
          {/* {renderFarmZone()}
          {renderCropSchedules()}
          {renderTaskSchedules()}
          {renderMonthlyHarvestBreakup()}
          {renderFarmUtilization()}
          {renderCropsUtilization()}   */}
          {/* <Box sx={{ width: "100%" }}> */}
          <TabContext value={value}>
            <Grid item xs={12} sm={12} md={12}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleTabChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Zone" value="1" />
                  <Tab label="Crop Schedules" value="2" />
                  <Tab label="Task Schedules" value="3" />
                  <Tab label="Graph" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">{renderFarmZone()}</TabPanel>
              <TabPanel value="2">{renderCropSchedules()}</TabPanel>
              <TabPanel value="3">{renderTaskSchedules()}</TabPanel>
              <TabPanel value="4">
                {renderMonthlyHarvestBreakup()}
                <Grid container spacing={2}>
                  {renderFarmUtilization()}
                  {renderCropsUtilization()}
                </Grid>
              </TabPanel>
            </Grid>
          </TabContext>
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
        {openCrop && (
          <AddCropModal
            modalData={farmCropList}
            open={openCrop}
            handleClose={handleCropModalToggle}
            handleSave={handleZoneCropLifeCycleSave}
          />
        )}
      </div>
    </div >
  );
}
