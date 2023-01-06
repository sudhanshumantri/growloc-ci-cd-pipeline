import React, { useState, memo } from "react";
import "./style.css";
import {
  Grid,
  FormControl,
  Card,
  CardContent,
  CardMedia,
  Typography,
  ButtonGroup,
  Button,
  ToggleButtonGroup,
  ToggleButton,
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
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import Tabs from "@mui/material/Tabs";
import { color, textAlign } from "@mui/system";

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
  isAddLifecycleLoading,
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
  const [seletedView, setSelectView] = useState(false);
  const [tabInfo, setTabInfo] = useState("1");
  const [value, setValue] = useState("1");

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleTabInfoChange = (event, newValue) => {
    console.log(newValue,"newValue");
    setTabInfo(newValue);
  };

  const handleGridView = (tag) => {
    setSelectView(!seletedView);
  };

  console.log("dashboardFarmList", dashboardFarmList);

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

  let { cropSchedules, farmdDetails } = dashboardFarmList;

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
              <span className="section-title">
                Farm Utilization Based On Stages
              </span>
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
            <span className="section-title">
              Farm Utilization Based On Crops
            </span>
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

  const renderFarmZoneListView = () => {
    return (
      <Grid container spacing={2}>
        <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
          <DataTable
            data={{ headers: ZONE_HEADER, rows: farmDashboardZoneList || [] }}
          />
        </Grid>
      </Grid>
    );
  };

  const renderFarmSummaryInfo = () => {
    const { batchCount, totalHarvested, farmdDetails } = dashboardFarmList;
    return (
      <>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Card>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={9} md={9}>
                    <h4 className="section-details">
                      {farmDashboardZoneList?.length || ""}
                    </h4>
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
                  <h4 className="section-details">{batchCount || " "}</h4>
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
                    {farmdDetails?.Tasks.length || " "}
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
                    {totalHarvested?.kgs || " "}(kgs) /
                    {totalHarvested?.qty || " "}(qty)
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

  const renderFarmZoneGridView = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={3} sm={3} md={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Card
              className="zone-section"
              style={{ backgroundColor: "#9ef898" }}
            >
              <CardContent>
                <p className="zone-name">{farmDashboardZoneList[0]?.name}</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Card
              className="zone-section"
              style={{ backgroundColor: "#ace2b0" }}
            >
              <CardContent>
                <p className="zone-name">{farmDashboardZoneList[1]?.name}</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12} style={{ alignItems: "center" }}>
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
          <Card className="zone-second" style={{ backgroundColor: "#07c03d" }}>
            <CardContent
              style={{ textAnchor: "middle", dominantBaseline: "central" }}
            >
              <p className="zone-name zone-height">4</p>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Card className="zone-second" style={{ backgroundColor: "#d3d3d3" }}>
            <CardContent>
              <p className="zone-name zone-height">5</p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  const renderViewOptionsRow = () => {
    return (
      <>
        <Grid item xs={12}>
          <ToggleButtonGroup
            exclusive
            onChange={handleGridView}
            value={seletedView}
            sx={{
              height: 35,
              ".Mui-selected,.Mui-selected:hover": {
                color: "white !important",
                backgroundColor: "#0E2C4B !important",
              },
            }}
          >
            <ToggleButton value="list" size="small" aria-label="right">
              <ListIcon />
            </ToggleButton>
            <ToggleButton
              className="selected-toggle"
              value="grid"
              size="small"
              aria-label="centered"
            >
              <GridViewIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </>
    );
  };

  const renderFarmArea = () => {
    const { farmdDetails } = dashboardFarmList;
    return (
      <>
        {/* <Grid item xs={12} sm={12} md={12}> */}
          <p className="section-title">Farm Name : <span>{farmdDetails?.name}</span></p>
          <p className="section-title">Farm Area: <span>{farmdDetails?.farmArea}</span></p>
        {/* </Grid> */}
        
      </>
    );
  };

  const renderGerminationInfo = () => {
    const { farmdDetails } = dashboardFarmList;
    return (
      <>
          <p className="section-title">
            Germination Type : <span>{farmdDetails?.germinationType}</span>
          </p>
          <p className="section-title">
            Germination Area : <span>{farmdDetails?.germinationArea}</span>
          </p>
          <p className="section-title">
            No of Seeds Per Plantation :<span>{farmdDetails?.germinationSeedsCount}</span>
          </p>
          <p className="section-title">
            Watering Type : <span>{farmdDetails?.germinationWateringType} </span>
          </p>
          <p className="section-title">
            Watering Schedule: <span>{farmdDetails?.germinationWateringSchedule}</span>
          </p>
      </>
    );
  };
  const renderNurseryInfo = () => {
    return (
      <>
          <p className="section-title">
            Nursery Type : <span>{farmdDetails?.nurseryType}</span>
          </p>
          <p className="section-title">
            Nursery Area : <span>{farmdDetails?.nurseryArea}</span>
          </p>
          <p className="section-title">
            
            No of Seeds Per Nursery : <span>{farmdDetails?.nurserySeedsCount}</span>
          </p>
          <p className="section-title">
            Watering Type : <span>{farmdDetails?.nurseryWateringType}</span>
          </p>
          <p className="section-title">
            Watering Schedule: <span>{farmdDetails?.nurseryWateringSchedule}</span>
          </p>
      </>
    );
  };

  const renderGrowingInfo = () => {
    return (
      <>
          <p className="section-title">
            
            Growring Type : <span>{farmdDetails?.growingType}</span>
          </p>
          <p className="section-title">
            Growring Area : <span>{farmdDetails?.growingArea}</span>
          </p>
          <p className="section-title">
            No Of Plants In Row : <span>{farmdDetails?.growingPlantCountPerRow}</span>
          </p>
          <p className="section-title">
            No Of Rows: <span>{farmdDetails?.growingRowCount}</span>
          </p>
          <p className="section-title">
            Watering Schedule: <span>{farmdDetails?.growingPlantSpacing}</span>
          </p>
          <p className="section-title">
            Plant Spacing: <span>{farmdDetails?.nurseryWateringSchedule}</span>
          </p>
      </>
    );
  };

  const renderWateringTypeInfo = () => {
    return (
      <>
          <p className="section-title">
            Main Reservoir Capacity : <span>{farmdDetails?.reservoirCapacity}</span>
          </p>
          <p>
            Nutrient Water Reservoir Capacity :
            <span>{farmdDetails?.nutrientWaterReservoirCapacity}</span>
          </p>
          <p className="section-title">
            Ph Up/Down Reservoir Capacity : <span>{farmdDetails?.phReservoirCapacity}</span>
          </p>
          <p className="section-title">
            Stock Nutrient Solution Capacity :
            <span>{farmdDetails?.stockNutrientSolutionCapacity}</span>
          </p>
          <p className="section-title">
            Nutrient Dilution Ratio : <span>{farmdDetails?.nutrientdilutionRatio}</span>
          </p>
          <p className="section-title">
            Type Of Nutrients : <span>{farmdDetails?.nutrientsType}</span> 
          </p>
      </>
    );
  };

  const renderPolyhouseInfo = () => {
    return (
      <>
          <p className="section-title">
            Polyhouse Structure Expected Life :
            <span>{farmdDetails?.polyhouseStructureExpectedLife}</span>
          </p>
          <p className="section-title">
            Polyhouse Plastic Expected Life :
            <span>{farmdDetails?.polyhousePlasticExpectedLife}</span>
          </p>
      </>
    );
  };

  const renderFarmInfo = () => {
    console.log("hello",tabInfo);
    return (
      <>
        <TabContext value={tabInfo}>
          <Grid item xs={12} sm={12} md={12}>
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
                height: 300,
              }}
            >
              <TabList
                orientation="vertical"
                onChange={handleTabInfoChange}
                sx={{ borderRight: 1, borderColor: "divider"}}
                className={"tab-vertical"}
                aria-label="lab API tabs examplesssssss"
              >
                <Tab label="Farm Area" value="1"  />
                <Tab label="Germination Zone" value="2" />
                <Tab label="Nursery Zone" value="3" />
                <Tab label="Growing Zone" value="4" />
                <Tab label="Watering Zone" value="5" />
                <Tab label="Polyhouse" value="6" />
              </TabList>
              <TabPanel value="1">{renderFarmArea()}</TabPanel>
              <TabPanel value="2">{renderGerminationInfo()}</TabPanel>
              <TabPanel value="3">{renderNurseryInfo()}</TabPanel>
              <TabPanel value="4">{renderGrowingInfo()}</TabPanel>
              <TabPanel value="5">{renderWateringTypeInfo()}</TabPanel>
              <TabPanel value="6">{renderPolyhouseInfo()}</TabPanel>
            </Box>
          </Grid>
        </TabContext>
      </>
    );
  };

  return (
    <div>
      <PageHeader
        // title="Farm Dashboard"
        title={farmdDetails?.name || ""}
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
      {isAddLifecycleLoading && <Loader title="Adding Crops to Lifecycle " />}

      <div className="page-container">
        <Grid container spacing={2}>
          {renderFarmSummaryInfo()}
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
                  <Tab label="Info" value="5" />
                </TabList>
              </Box>
              <TabPanel value="1">
                {renderViewOptionsRow()}
                <br />
                {/* {seletedView ? renderFarmZone() : renderZoneCard()} */}
                {seletedView
                  ? renderFarmZoneGridView()
                  : renderFarmZoneListView()}
              </TabPanel>
              <TabPanel value="2">{renderCropSchedules()}</TabPanel>
              <TabPanel value="3">{renderTaskSchedules()}</TabPanel>
              <TabPanel value="4">
                {renderMonthlyHarvestBreakup()}
                <Grid container spacing={2}>
                  {renderFarmUtilization()}
                  {renderCropsUtilization()}
                </Grid>
              </TabPanel>
              <TabPanel value="5">{renderFarmInfo()}</TabPanel>
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
    </div>
  );
}
