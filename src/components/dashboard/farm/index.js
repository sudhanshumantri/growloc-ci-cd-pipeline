import React, { useState, memo, useEffect } from "react";
import "./style.css";
import {
  Grid,
  FormControl,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Tab,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../shared/page-header";
import DataTable from "../../shared/dataTable";
import PieChart from "../../shared/chart/pieChart";
import BarChart from "../../shared/chart/barChart";
import Loader from "../../shared/loader";
import AddIcon from "@mui/icons-material/Add";
import {
  HARVEST_MONTH_OPTIONS,
  TOGGLE_DATA,
} from "../../../config";
import SingleCustomSelect from "../../shared/select";
import AddZoneModal from "../addzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ConfirmDialogBox from "../../shared/dailog/ConfirmDialogBox";
import AddCropModal from "../../crop/life-cycle/addCropToLifeCycleModal";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import FarmEfficiency from "../../reports/farmefficiency";
import TableDynamicPagination from "../../shared/tablepagination";
import moment from "moment";
import FarmDashboardFarmInfo from "./farmheaderinfromation";
import FarmDashboardFarmInformation from "./farminformation";
import FarmDashbaordTaskList from "./farm/farmtask";
export default function FarmDashboard({
  fetchFarmDashboardHarvest,
  dashboardHarvestList,
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
  isDashboardFarmInfoListLoading,
  farmDashboardFarmInfoList,
  fetchFarmDashboardInfo,
  fetchFarmDashboardCropSchedule,
  farmDashboardCropSchedulesList,
  isDashboardCropSchedulesListLoading,
  isFarmDashboardZoneListLoading,
  fetchFarmDashboardFarmInfo,
  farmDashboardInfoList,
  isDashboardInfoListLoading,
  fetchFarmDashboardFarmTask,
  isDashboardFarmTaskLoading,
  farmDashboardTaskList,
  fetchFarmDashboardFarmUtilizationCrops,
  farmDashboardFarmUtilizationCropsList,
  fetchFarmDashboardFarmUtilizationStages,
  farmDashboardFarmUtilizationStagesList,
  fetchFarmReports,
  farmReportsList,
  isFarmReportsListLoading,
  isFarmReportsFarmAverageMortalityListLoading,
  farmReportsFarmAverageMortalityList,
  fetchFarmReportsFarmAverageMorality,
  fetchFarmReportFarmTatTaskCategories,
  farmReportsFarmTatTaskCategoriesList,
  isFarmReportsFarmTatTaskCategoriesListLoading,
  fetchFarmDashboardZoneSensor,
  farmDashboardZoneSensorList,
  isFarmDashboardZoneSensorLoading,
  isZoneDashboardZoneSensorLoading,
  fetchZoneDashboardZoneSensors,
  zoneDashboardZoneSensorList,
  fetchDashboardLattestSensors,
  farmDashboardZoneLattestSensorList,
  isFarmDashboardZoneLattestSensorLoading,
  isFarmDashboardAllZoneDetailsLoading,
  farmDashboardAllZoneDetailsList,
  fetchDashboardAllZoneDetails,
  history,
  pusherData,
  allllZoneSensorOfUser,
}) {
  const navigate = useNavigate();
  const { farmId } = useParams();
  const [month, setMonth] = useState(3);
  const [openZone, setOpenZone] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [zoneData, setZoneData] = useState({});
  const [openCrop, setOpenCrop] = useState(false);
  const [cropData, setCropData] = useState({});
  const [seletedView, setSelectView] = useState("list");
  const [value, setValue] = useState("1");
  const [selectedPlatform, setSelectedPlatform] = useState("farmEfficiency");
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedSensorPlatform, setSelectedSensorPlatform] = useState(null);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [activeStep, setActiveStep] = useState("");
  const [lattestDataByPusher,setLatestDataByPusher] = useState([]);

  useEffect(() => {
    handlePlatformChange(null, selectedPlatform);
  }, []);
  useEffect(() => {
    fetchDashboardAllZoneDetails(farmId);
    fetchAllCropsLifecycle(farmId);
  }, []);
  useEffect(() => {
    fetchFarmDashboardInfo(farmId);
  }, [isFarmDashboardZoneLoading, isTaskScheduleTaskLoading]);
  const zoneInformation = farmDashboardAllZoneDetailsList;
  const zoneInfoLength = zoneInformation.length;
  useEffect(() => {
    if (zoneInfoLength) {
      const zone_internal_id = zoneInformation[0].zone_internal_id;
      fetchZoneDashboardZoneSensors(zone_internal_id);
    }
  }, [zoneInfoLength]);

  const { length: zoneSensorLattestDataLength } =
    zoneDashboardZoneSensorList || [];

useEffect(()=>{
  if(pusherData && pusherData.length){
    const sensorId = selectedSensor?selectedSensor:zoneDashboardZoneSensorList[0]?.sensorId;
  let sensorDataFilter = pusherData.filter(item=>item.device_id == sensorId);
      sensorDataFilter.sort((a,b)=>parseInt(b.iot_timestamp) - parseInt(a.iot_timestamp));
      let tmpData = [...sensorDataFilter];
      setLatestDataByPusher([{...tmpData[0]}]);
  }
},[selectedSensor,pusherData]);
  useEffect(() => {
    if (zoneSensorLattestDataLength) {
      const sensorId = zoneDashboardZoneSensorList[0].sensorId;
      fetchDashboardLattestSensors(sensorId);
      setSelectedSensor(sensorId);
    }
  }, [zoneSensorLattestDataLength]);
  useEffect(() => {
    if (zoneInformation && zoneInformation.length > 0) {
      setActiveStep(zoneInformation[0].name);
    }
  }, [zoneInfoLength]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "1") {
      fetchDashboardAllZoneDetails(farmId);
    } else if (newValue === "2") {
      fecthFarmDashboardZone({
        farmId: farmId,
        queryParams: { skip: 0, take: 10 },
      });
    } else if (newValue === "3") {
      fetchFarmDashboardCropSchedule({
        farmId: farmId,
        queryParams: { skip: 0, take: 10 },
      });
    } else if (newValue === "4") {
      fetchFarmDashboardFarmTask({
        farmId: farmId,
        queryParams: { skip: 0, take: 10 },
      });
    } else if (newValue === "5") {
      // fetchFarmReports(farmId);
    } else if (newValue === "6") {
      fetchFarmDashboardFarmInfo(farmId);
    }
  };

  const handleGridView = () => {
    setSelectView(seletedView == "grid" ? "list" : "grid");
  };

  const renderPlatformComponent = () => {
    if (selectedComponent === "farmEfficiency") {
      return (
        <FarmEfficiency
          fetchFarmReports={fetchFarmReports}
          farmReportsList={farmReportsList}
          isFarmReportsListLoading={isFarmReportsListLoading}
        />
      );
    } else if (selectedComponent === "mortalityRate") {
      return renderAverageMortality();
    } else if (selectedComponent === "taskTat") {
      return renderTatTaskCategerios();
    } else if (selectedComponent === "CapacityEfficiency") {
      return renderMonthlyHarvestBreakup();
    } else {
      return null;
    }
  };

  const handlePlatformChange = (event, newPlatform) => {
    setSelectedPlatform(newPlatform);
    console.log(newPlatform, "newPlatform");
    switch (newPlatform) {
      case "farmEfficiency":
        setSelectedComponent("farmEfficiency");
        break;
      case "mortalityRate":
        fetchFarmReportsFarmAverageMorality(farmId);
        setSelectedComponent("mortalityRate");
        break;
      case "taskTat":
        fetchFarmReportFarmTatTaskCategories(farmId);
        setSelectedComponent("taskTat");
        break;
      case "CapacityEfficiency":
        fetchFarmDashboardHarvest({ farmId: farmId, month });
        fetchFarmDashboardFarmUtilizationCrops(farmId),
        fetchFarmDashboardFarmUtilizationStages(farmId);
        setSelectedComponent("CapacityEfficiency");
        break;
      default:
        setSelectedComponent(null);
        break;
    }
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
          <BarChart
            chartData={dashboardHarvestList || []}
            labelKey="name"
            valueKey="kgs"
          />
        </Grid>
        <Grid container spacing={2}>
          {renderFarmUtilization()}
          {renderCropsUtilization()}
        </Grid>
      </Grid>
    );
  };

  const renderAverageMortality = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <span className="section-title">Average Mortality</span>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className="card-outline-container graph-container"
          >
            <BarChart
              chartData={farmReportsFarmAverageMortalityList || []}
              labelKey="stage"
              valueKey="avgMortalityRate"
            />
          </Grid>
        </Grid>
      </>
    );
  };
  const renderTatTaskCategerios = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <span className="section-title">Tat Task Category</span>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className="card-outline-container graph-container"
          >
            <BarChart
              chartData={farmReportsFarmTatTaskCategoriesList || []}
              labelKey="category"
              valueKey="avgTAT"
            />
          </Grid>
        </Grid>
      </>
    );
  };

  const zoneId = (farmDashboardCropSchedulesList?.cropSchedules || [])[0]
    ?.zoneId;
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
    fetchFarmDashboardHarvest({ farmId: farmId, month: value });
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
        farmId: farmId,
      });
    }
    handleZoneModalToggle();
  };

  const handleZoneModalToggle = (event, reason) => {
    if (reason && reason == "backdropClick" && "escapeKeyDown") return;
    setOpenZone(!openZone);
    setZoneData({});
  };

  const handleEdit = (zoneEdit) => {
    const { zone_internal_id, name, farmArea, zoneType, systemType } = zoneEdit;
    const zoneDetails = {
      name: name,
      farmArea: farmArea,
      zoneType: zoneType,
      systemType: systemType,
      id: zone_internal_id,
    };
    setZoneData(zoneDetails);
    setOpenZone(true);
  };
  const handleDelete = (zoneInfo) => {
    const { zone_internal_id, name } = zoneInfo;
    const zoneDetails = { id: zone_internal_id, name };
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
      addCropToLifecycle({
        ...lifecycleData,
        zoneId: cropData.zone_internal_id,
      });
    }
    handleCropModalToggle();
  };

  const handleChangePagination = (queryParams) => {
    fetchFarmDashboardCropSchedule({ farmId: farmId, queryParams });
  };
  const handleChangeZonePagination = (queryParams) => {
    fecthFarmDashboardZone({ farmId: farmId, queryParams });
  };

  const ZONE_HEADER = [
    {
      label: "Name",
      key: 'name',
      redirection: true,
      redirectionKey: "zone_internal_id",
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
      align:"center",
      buttonArray: [
        {
          label: "Add a new Crop ",
          type: "icon",
          isAuthRequired: true,
          from: "farmItems",
          action: "edit",
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
      isAuthRequired: true,
      from: "farmItems",
      action: "create",
      handler: handleZoneModalToggle,
    },
  ];

  let showBackButton = [
    {
      handler: handleBackButton,
    },
  ];

  const renderCropSchedules = () => {
    const { cropSchedules } = farmDashboardCropSchedulesList;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <span className="section-title">Crop Schedules</span>
        </Grid>
        <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
          <DataTable data={{ headers: headers, rows: cropSchedules || [] }} />
          <TableDynamicPagination
            count={farmDashboardCropSchedulesList.total}
            handleChangePagination={handleChangePagination}
          />
        </Grid>
      </Grid>
    );
  };

  const renderFarmUtilization = () => {
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
              <PieChart
                chartData={farmDashboardFarmUtilizationStagesList || []}
              />
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };
  const renderCropsUtilization = () => {
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
            <PieChart chartData={farmDashboardFarmUtilizationCropsList || []} />
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const durationStyles = { backgroundColor: "green", color: "white" };

  const renderReportdDetails = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
          <TabContext value={selectedPlatform}>
            <TabList
              onChange={handlePlatformChange}
              sx={{
                ".Mui-selected": {
                  color: "green !important",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "green",
                },
              }}
            >
              {(TOGGLE_DATA || []).map((platform, index) => (
                <Tab
                  key={platform.value}
                  label={platform.label}
                  value={platform.value}
                />
              ))}
            </TabList>
          </TabContext>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {renderPlatformComponent()}
        </Grid>
      </>
    );
  };

  const renderFarmZoneListView = () => {
    return (
      <Grid container spacing={2}>
        <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
          <DataTable
            data={{
              headers: ZONE_HEADER,
              rows: farmDashboardZoneList.zoneInformation || [],
            }}
          />
          <TableDynamicPagination
            count={farmDashboardZoneList.total}
            handleChangePagination={handleChangeZonePagination}
          />
        </Grid>
      </Grid>
    );
  };

  const renderFarmZoneGridView = () => {
    let totalFarmArea = parseInt(farmDashboardFarmInfoList?.farmArea || {});
    let zoneAreas = farmDashboardZoneList?.zoneInformation?.map((zone) =>
      parseInt(zone.farmArea)
    );
    let totalZoneArea =
      zoneAreas && zoneAreas.length ? zoneAreas.reduce((a, b) => a + b) : 0;
    let newZoneData = [...farmDashboardZoneList.zoneInformation];
    newZoneData.push({
      name: "Empty Zone",
      id: farmDashboardZoneList?.zoneInformation?.length + 1,
      farmArea: totalFarmArea - totalZoneArea,
    });
    //  newZoneData = newZoneData.sort((a,b)=>parseInt(a.farmArea)-parseInt(b.farmArea));
    newZoneData = newZoneData.map((zone, idx) => {
      let fraction = parseInt(zone.farmArea) / totalFarmArea;
      let height = 400 * fraction;
      let width = 100 * fraction;
      zone.height = Math.ceil(height);
      zone.width = Math.ceil(width);
      if (width < 25) {
        zone.col = 1;
      } else if (width > 25 && width < 50) {
        zone.col = 2;
      } else if (width > 50 && width < 75) {
        zone.col = 3;
      } else {
        zone.col = 4;
      }
      if (height < 100) {
        zone.row = 1;
      } else if (height > 100 && height < 200) {
        zone.row = 2;
      } else if (height > 200 && height < 300) {
        zone.row = 3;
      } else {
        zone.row = 4;
      }
      return zone;
    });

    return (
      <>
        <div
          style={{
            height: "400px",
            width: "100%",
            display: "grid",
            gap: "10px",
            gridTemplateColumns: `repeat(4,1fr)`,
            gridAutoFlow: "dense",
          }}
        >
          {newZoneData.map((zone, idx) => {
            return (
              <div
                className="zone-gridview-cards"
                key={zone.id}
                style={{
                  backgroundColor:
                    zone.name == "Empty Zone" ? "grey" : "#517223",
                  gridColumn: `auto/span ${zone.col}`,
                  gridRow: `auto/span ${zone.row}`,
                }}
              >
                {zone.name == "Empty Zone" ? (
                  <>
                    <p className="zone-gridview-cars-header">{zone.name}</p>
                    <p className="label-white">Area: {zone.farmArea} sqft.</p>
                  </>
                ) : (
                  <Link
                    to={"/farm/" + farmId + "/zone/" + zone.zone_internal_id}
                  >
                    <p className="zone-gridview-cars-header">{zone.name}</p>
                    <p className="label-white">Area: {zone.farmArea} sqft.</p>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </>
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
                backgroundColor: "#517222 !important",
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

  const rendeLattestSensorDataByID = () => {
    const { data } = farmDashboardZoneLattestSensorList || {};
    if (!data || !data[0] || !data[0].payload ) {
      if(!isFarmDashboardZoneLattestSensorLoading){
        return (
          <Typography>No live data available</Typography>
        )
      }else{
        return null;
      }
    }
    let rows = [
      {
        name:"Temperature",
        label:"temp"
      },
      {
        name:"Humidity",
        label:"humidity"
      },
      {
        name:"CO2",
        label:"co2",
      },
      {
        name:"Light",
        label:"lightIntensity"
      }
    ]
    let sensorData = null ;
    let sensorDataReceivedTime = null;
    if(
      lattestDataByPusher && 
      lattestDataByPusher.length && 
      lattestDataByPusher[0].data && 
      lattestDataByPusher[0].data.length
      ){
      sensorData = lattestDataByPusher[0].data[0].payload;
      sensorDataReceivedTime = parseInt(lattestDataByPusher[0].iot_timestamp);
    }else{
      sensorData = data[0].payload;
      sensorDataReceivedTime = farmDashboardZoneLattestSensorList?.created_on
    }
    return (
      <Grid item xs={12} sm={12} md={12}>
        <p className="section-title"> Senor Information </p>
        {sensorData && (
          <p>
            Last Updated :{" "}
            {moment(
              new Date(sensorDataReceivedTime)
            ).format("MMMM Do YYYY hh:mm:ss A")}
          </p>
        )}
        <Paper className="life-cycle-details-card life-cycle-spacing ">
          <Table size="small" aria-label="a dense table">
            <TableHead className="table-header-row">
              <TableRow>
                <TableCell className="label-custom">
                  <b>Parameter</b>
                </TableCell>
                <TableCell className="label-custom">
                  <b>Value</b>
                </TableCell>
                <TableCell className="label-custom"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((item,idx) => {
                return (
                  <TableRow
                    key={item.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="label-custom" align="left">
                      {item.name}
                    </TableCell>
                    <TableCell className="table-header" align="left">
                      <b>{sensorData[item.label]}</b>
                    </TableCell>
                    {/* <TableCell className="table-header" align="left">
                      unit
                    </TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    );
  };

  const handleSensorLattestDataChange = (event, newValue) => {
    const zoneInterId = newValue;
    setSelectedSensor(newValue);
    fetchDashboardLattestSensors(zoneInterId);
  };

  const handleZoneNameTabChange = (event, newValue) => {
    setActiveStep(newValue);
    const zoneInformation = farmDashboardAllZoneDetailsList;
    const selectedZone = zoneInformation?.find(
      (zone) => zone.name === newValue
    );
    const zoneInterId = selectedZone.zone_internal_id;
    fetchZoneDashboardZoneSensors(zoneInterId);
  };

  const renderFarmSensorData = () => {
    const zoneInformation = farmDashboardAllZoneDetailsList || "";
    //console.log(zoneInformation[0]?.name);
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <TabContext value={activeStep ? activeStep.toString():zoneInformation[0]?.name || ""}>
              <TabList
                onChange={handleZoneNameTabChange}
                sx={{
                  ".Mui-selected": {
                    color: "green !important",
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "green",
                  },
                }}
              >
                {zoneInformation?.map((platform, index) => (
                  <Tab
                    key={platform.id}
                    label={platform.name}
                    value={platform.name ? platform.name : false}
                  />
                ))}
              </TabList>
            </TabContext>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
           {(zoneDashboardZoneSensorList && zoneDashboardZoneSensorList.length) ? <TabContext
              value={selectedSensor ? selectedSensor.toString() : zoneDashboardZoneSensorList[0]?.sensorId || ""}
              aria-label="Sensor"
              variant="scrollable"
              scrollButtons="auto"
            >
              <TabList
                onChange={handleSensorLattestDataChange}
                sx={{
                  ".Mui-selected": {
                    color: "green !important",
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "green",
                  },
                }}
              >
                {(zoneDashboardZoneSensorList || []).map((sensor) => (
                  <Tab
                    key={sensor.sensorId}
                    value={sensor.sensorId}
                    label={sensor.sensorId }
                  />
                ))}
              </TabList>
            </TabContext>
            : !isZoneDashboardZoneSensorLoading ?<Typography>No live sensor available</Typography>:""
            }
          </Grid>
          <Grid item xs={12}>
            {selectedSensor &&
              zoneDashboardZoneSensorList &&
              zoneDashboardZoneSensorList.length > 0 &&
              rendeLattestSensorDataByID()}
          </Grid>
        </Grid>
      </>
    );
  };
  let totalFarmArea = 0;
  farmDashboardZoneList?.zoneInformation?.forEach(function (zone) {
    totalFarmArea += parseInt(zone.farmArea);
  });
  const reamingArea = farmDashboardFarmInfoList?.farmArea - totalFarmArea;
  let subtitle;
  if(farmDashboardFarmInfoList?.farmArea) {
     subtitle = `(Total Farm Area : ${
      farmDashboardFarmInfoList?.farmArea || ""
    }  Available Farm Area : ${reamingArea ?? ""} )`;
  }
  return (
    <div>
      <PageHeader
        title={farmDashboardFarmInfoList?.farmName || ""}
        subtitle={subtitle}
        buttonArray={buttonArray}
        showBackButton={showBackButton}
      />
      {isFarmDashboardZoneListLoading && (
        <Loader title="Fetching Zone Details" />
      )}
      {isFarmDashboardZoneLoading && <Loader title="adding Zone" />}
      {isUpdateFarmDashboardZoneLoading && <Loader title="Updating Zone" />}

      {isDeleteFarmDashboardZoneLoading && <Loader title="Deleting Zone" />}
      {isAddLifecycleLoading && <Loader title="Adding Crops to Lifecycle " />}
      {isDashboardCropSchedulesListLoading && (
        <Loader title=" Fetching Crops Schedules Details" />
      )}
      {isDashboardFarmTaskLoading && (
        <Loader title=" Fetching Task Schedules Details" />
      )}
      {isFarmReportsFarmAverageMortalityListLoading && (
        <Loader title=" Fetching Average Mortality Details" />
      )}
      {isFarmReportsFarmTatTaskCategoriesListLoading && (
        <Loader title=" Fetching Average Tat Task Details" />
      )}
      {isDashboardInfoListLoading && <Loader title=" Fecting Farm details" />}
      {isTaskScheduleTaskLoading && <Loader title="Adding Tasks" />}
      {isFarmTaskCommentLoading && <Loader title="Adding Comment" />}
      {isDashboardHarvestListLoading && (
        <Loader title="Fetching Harvest Details" />
      )}
      {/* {isFarmDashboardZoneSensorLoading && <Loader title="Fetching Farm Sensor Data" />} */}
      {isZoneDashboardZoneSensorLoading && (
        <Loader title="Fetching Sensor Data" />
      )}
      {isFarmDashboardZoneLattestSensorLoading && (
        <Loader title="Fetching Sensors Information" />
      )}
      {isFarmDashboardAllZoneDetailsLoading && (
        <Loader title="Fetching Zone Details" />
      )}
      {/* {isDashboardFarmInfoListLoading && <Loader title="Fetching Farm Info" />} */}
      <div className="page-container">
        <Grid container spacing={2}>
          {<FarmDashboardFarmInfo farmInfo={farmDashboardFarmInfoList} />}
          <TabContext value={value}>
            <Grid item xs={12} sm={12} md={12}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleTabChange}
                  aria-label="lab API tabs example"
                  sx={{
                    ".Mui-selected": {
                      color: "green !important",
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "green",
                    },
                  }}
                >
                  <Tab label="Sensor Data " value="1" />
                  <Tab label="Zone" value="2" />
                  <Tab label="Crop Schedules" value="3" />
                  <Tab label="Task Schedules" value="4" />
                  <Tab label="Reports" value="5" />
                  <Tab label="Info" value="6" />
                </TabList>
              </Box>
              <TabPanel value="1">{renderFarmSensorData()}</TabPanel>
              <TabPanel value="2">
                {renderViewOptionsRow()}
                <br />
                {seletedView === "list"
                  ? renderFarmZoneListView()
                  : renderFarmZoneGridView()}
              </TabPanel>
              <TabPanel value="3">{renderCropSchedules()}</TabPanel>
              <TabPanel value="4">
                {
                  <FarmDashbaordTaskList
                    usersList={usersList}
                    farmInventoryList={farmInventoryList}
                    fetchFarmInventory={fetchFarmInventory}
                    fetchUsers={fetchUsers}
                    addTaskScheduleTask={addTaskScheduleTask}
                    loginObject={loginObject}
                    farmDashboardTaskList={farmDashboardTaskList}
                    fetchFarmDashboardFarmTask={fetchFarmDashboardFarmTask}
                    farmId={farmId}
                    addFarmTaskComment={addFarmTaskComment}
                    isFarmTaskCommentLoading = {isFarmTaskCommentLoading}
                  />
                }
              </TabPanel>

              <TabPanel value="5">
                <Grid container spacing={2}>
                  {renderReportdDetails()}
                </Grid>
              </TabPanel>
              {/* <TabPanel value="6">{renderFarmInfo()}</TabPanel> */}
              <TabPanel value="6">
                {
                  <FarmDashboardFarmInformation
                    farmDashboardInfoList={farmDashboardInfoList}
                  />
                }
              </TabPanel>
            </Grid>
          </TabContext>
        </Grid>
        {openZone && (
          <AddZoneModal
            open={openZone}
            handleClose={handleZoneModalToggle}
            handleSave={handleFarmDashboardZone}
            zoneDetails={zoneData}
            data={farmDashboardZoneList}
            farmData={farmDashboardFarmInfoList}
            backdrop="static"
            keyboard={false}
            onBackdropClick={null}
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
