import React, { useState, memo, useEffect } from "react";
import "./style.css";
import {
  Grid,
  FormControl,
  Card,
  CardContent,
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
} from "@mui/material";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
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
import {
  HARVEST_MONTH_OPTIONS,
  SEVERITY_LEVEL,
  TOGGLE_DATA,
} from "../../../config";
import SingleCustomSelect from "../../shared/select";
import AddZoneModal from "../addzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ConfirmDialogBox from "../../shared/dailog/ConfirmDialogBox";
import AddCropModal from "../../crop/life-cycle/addCropToLifeCycleModal";
import Noofzone from "../../../../public/assets/Noofzone.png";
import Noofbatch from "../../../../public/assets/Noofbatch.png";
import Totalharvest from "../../../../public/assets/Totalharvest.png";
import Nooftask from "../../../../public/assets/Nooftask.png";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import FarmEfficiency from "../../reports/farmefficiency";
import TableDynamicPagination from "../../shared/tablepagination";
import ToggleButtonReports from "../../shared/togglebutton";
import AuthOutlet from "../../shared/authoutlet";
import moment from "moment";

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
}) {
  const navigate = useNavigate();
  const location = useLocation();

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
  const [seletedView, setSelectView] = useState("list");
  const [tabInfo, setTabInfo] = useState("1");
  const [value, setValue] = useState("1");
  const [selectedPlatform, setSelectedPlatform] = useState("farmEfficiency");
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedSensorPlatform, setSelectedSensorPlatform] = useState(null);
  const [selectedSensor, setSelectedSensor] = useState(null);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    handlePlatformChange(null, selectedPlatform);
  }, []);

  React.useEffect(() => {
    // fecthFarmDashboardZone({
    //   farmId: farmId,
    //   queryParams: { skip: 0, take: 10 },
    // });
    fetchDashboardAllZoneDetails(farmId);
    fetchAllCropsLifecycle(farmId);
  }, []);

  React.useEffect(() => {
    fetchFarmDashboardInfo(farmId);
  }, [isFarmDashboardZoneLoading, isTaskScheduleTaskLoading]);

  // const {zoneInformation} = farmDashboardZoneList;
  // const {length:zoneInfoLength} = zoneInformation || [];
  const zoneInformation = farmDashboardAllZoneDetailsList;
  const zoneInfoLength = zoneInformation.length;

  React.useEffect(() => {
    if (zoneInfoLength) {
      const zone_internal_id = zoneInformation[0].zone_internal_id;
      // fetchFarmDashboardZoneSensor({ id: zone_internal_id });
      fetchZoneDashboardZoneSensors(zone_internal_id);
      // fetchDashboardLattestSensors(zone_internal_id)
    }
  }, [zoneInfoLength]);

  const { length: zoneSensorLattestDataLength } =
    zoneDashboardZoneSensorList || [];

  React.useEffect(() => {
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
      // fetchFarmDashboardZoneSensor({id:zone_internal_id});
      // fecthFarmDashboardZone({
      //   farmId: farmId,
      //   queryParams: { skip: 0, take: 10 },
      // });
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
      fetchFarmReports(farmId);
    } else if (newValue === "6") {
      fetchFarmDashboardFarmInfo(farmId);
    }
  };

  const handleTabInfoChange = (event, newValue) => {
    setTabInfo(newValue);
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

  const handleModalToggle = (event, reason) => {
    if (reason && reason == "backdropClick" && "escapeKeyDown") return;
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
    fetchFarmDashboardHarvest({ farmId: farmId, month: value });
  };

  const handleTaskSave = (data) => {
    if (data) {
      data.createdBy = loginObject?.profile.userId;
      data.farmId = farmId;
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
        farmId: farmId,
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
        userId: rowdata.createdByProfile.userId,
      });
    }
    handleCommentModalToggle();
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

  const handleChangeTaskPagination = (queryParams) => {
    fetchFarmDashboardFarmTask({ farmId: farmId, queryParams });
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
    {
      label: "Status",
      // key: "dueDate",
      redirection: false,
      isDate: true,
    },
  ];
  const ZONE_HEADER = [
    {
      label: "Name",
      key: "name",
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

  const renderTaskSchedules = () => {
    const { tasks } = farmDashboardTaskList;
    return (
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={9} lg={9}>
          <span className="section-title">Tasks</span>
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={3} sx={{ alignItems: "center" }}>
          <AuthOutlet isAuthRequired={true} from="farmItems" action="create">
            <ButtonCustom
              title="Add New Task"
              ICON={<AddIcon />}
              handleButtonClick={handleModalToggle}
            />
          </AuthOutlet>
        </Grid>
        <Grid className="card-outline-container " item xs={12} sm={12} md={12}>
          <CollapsibleTable
            data={{ headers: TASK_HEADER, rows: tasks || [] }}
            handleCommentModalToggle={handleCommentModalToggle}
          />
          <TableDynamicPagination
            count={farmDashboardTaskList.total}
            handleChangePagination={handleChangeTaskPagination}
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
                  label={platform.value}
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

  const renderFarmSummaryInfo = () => {
    const { batchCount, noOfZones, noOfTasks } = farmDashboardFarmInfoList;
    const { totalHarvested } = farmDashboardFarmInfoList;
    return (
      <>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Card>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={9} md={9}>
                    <h4 className="section-details">{noOfZones || 0}</h4>
                    <p className="farm-card">No of Zones </p>
                  </Grid>
                  <Grid item xs={6} sm={3} md={3}>
                    <img
                      height="42px"
                      width="42px"
                      className="farm-dashboard-images"
                      src={Noofzone}
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
                  <h4 className="section-details">{batchCount || 0}</h4>
                  <p className="farm-card">No of Batch</p>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                  <img
                    height="42px"
                    width="42px"
                    className="farm-dashboard-images"
                    src={Noofbatch}
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
                  <h4 className="section-details">{noOfTasks || 0}</h4>
                  <p className="farm-card">No of Tasks</p>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                  <img
                    height="42px"
                    width="42px"
                    className="farm-dashboard-images"
                    src={Nooftask}
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
                    {totalHarvested?.kgs || 0}(kgs)/
                    {totalHarvested?.qty || 0}(qty)
                  </h4>
                  <p className="farm-card">Total Harvest</p>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                  <img
                    height="42px"
                    width="42px"
                    className="farm-dashboard-images"
                    src={Totalharvest}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </>
    );
  };
  const getHeight = (farmArea) => {
    return (400 / farmdDetails?.farmArea) * parseInt(farmArea) + "px";
  };

  const getWidth = (farmArea) => {
    return (100 / farmdDetails?.farmArea) * parseInt(farmArea) + "%";
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

  const renderFarmArea = () => {
    const { name, farmArea } = farmDashboardInfoList;
    return (
      <>
        {name && farmArea && (
          <div>
            <p className="section-title">
              Farm Name : <span>{name}</span>
            </p>
            <p className="section-title">
              Farm Area: <span>{farmArea}</span>
            </p>
          </div>
        )}
      </>
    );
  };

  const renderGerminationInfo = () => {
    return (
      <>
        <p className="section-title">
          Germination Type :
          <span>{farmDashboardInfoList?.germinationType}</span>
        </p>
        <p className="section-title">
          Germination Area :
          <span>{farmDashboardInfoList?.germinationArea}</span>
        </p>
        <p className="section-title">
          No of Seeds Per Plantation :
          <span>{farmDashboardInfoList?.germinationSeedsCount}</span>
        </p>
        <p className="section-title">
          Watering Type :
          <span>{farmDashboardInfoList?.germinationWateringType} </span>
        </p>
        <p className="section-title">
          Watering Schedule:
          <span>{farmDashboardInfoList?.germinationWateringSchedule}</span>
        </p>
      </>
    );
  };
  const renderNurseryInfo = () => {
    return (
      <>
        <p className="section-title">
          Nursery Type : <span>{farmDashboardInfoList?.nurseryType}</span>
        </p>
        <p className="section-title">
          Nursery Area : <span>{farmDashboardInfoList?.nurseryArea}</span>
        </p>
        <p className="section-title">
          No of Seeds Per Nursery :
          <span>{farmDashboardInfoList?.nurserySeedsCount}</span>
        </p>
        <p className="section-title">
          Watering Type :
          <span>{farmDashboardInfoList?.nurseryWateringType}</span>
        </p>
        <p className="section-title">
          Watering Schedule:
          <span>{farmDashboardInfoList?.nurseryWateringSchedule}</span>
        </p>
      </>
    );
  };

  const renderGrowingInfo = () => {
    return (
      <>
        <p className="section-title">
          Growring Type : <span>{farmDashboardInfoList?.growingType}</span>
        </p>
        <p className="section-title">
          Growring Area : <span>{farmDashboardInfoList?.growingArea}</span>
        </p>
        <p className="section-title">
          No Of Plants In Row :
          <span>{farmDashboardInfoList?.growingPlantCountPerRow}</span>
        </p>
        <p className="section-title">
          No Of Rows: <span>{farmDashboardInfoList?.growingRowCount}</span>
        </p>
        <p className="section-title">
          Watering Schedule:
          <span>{farmDashboardInfoList?.growingPlantSpacing}</span>
        </p>
        <p className="section-title">
          Plant Spacing:
          <span>{farmDashboardInfoList?.nurseryWateringSchedule}</span>
        </p>
      </>
    );
  };
  const renderWateringTypeInfo = () => {
    return (
      <>
        <p className="section-title">
          Main Reservoir Capacity :
          <span>{farmDashboardInfoList?.reservoirCapacity}</span>
        </p>
        <p>
          Nutrient Water Reservoir Capacity :
          <span>{farmDashboardInfoList?.nutrientWaterReservoirCapacity}</span>
        </p>
        <p className="section-title">
          Ph Up/Down Reservoir Capacity :
          <span>{farmDashboardInfoList?.phReservoirCapacity}</span>
        </p>
        <p className="section-title">
          Stock Nutrient Solution Capacity :
          <span>{farmDashboardInfoList?.stockNutrientSolutionCapacity}</span>
        </p>
        <p className="section-title">
          Nutrient Dilution Ratio :
          <span>{farmDashboardInfoList?.nutrientdilutionRatio}</span>
        </p>
        <p className="section-title">
          Type Of Nutrients :<span>{farmDashboardInfoList?.nutrientsType}</span>
        </p>
      </>
    );
  };
  const renderPolyhouseInfo = () => {
    return (
      <>
        <p className="section-title">
          Polyhouse Structure Expected Life :
          <span>{farmDashboardInfoList?.polyhouseStructureExpectedLife}</span>
        </p>
        <p className="section-title">
          Polyhouse Plastic Expected Life :
          <span>{farmDashboardInfoList?.polyhousePlasticExpectedLife}</span>
        </p>
      </>
    );
  };

  const renderFarmInfo = () => {
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
                sx={{ borderRight: 1, borderColor: "divider" }}
                className={"tab-vertical"}
                aria-label="lab API tabs examplesssssss"
              >
                <Tab label="Farm Area" value="1" />
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


  const rendeLattestSensorDataByID = () => {
    const { data } = farmDashboardZoneLattestSensorList || {};
    if (!data || !data[0] || !data[0].payload) {
      return null;
    }
    const sensorData = data[0].payload;
    return (
      <Grid item xs={12} sm={12} md={12}>
        <p className="section-title"> Senor Information </p>
        {sensorData && (
          <p>
            Last Updated :{" "}
            {moment(
              new Date(farmDashboardZoneLattestSensorList?.created_on)
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
              {Object.entries(sensorData).map(([key, value]) => {
                return (
                  <TableRow
                    key={key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="label-custom" align="left">
                      {key}
                    </TableCell>
                    <TableCell className="table-header" align="left">
                      <b>{value}</b>
                    </TableCell>
                    <TableCell className="table-header" align="left">
                      {value.value} <b>{value.unit}</b>
                    </TableCell>
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
    console.log("Selected sensor:", newValue);
    const zoneInterId = newValue;
    setSelectedSensor(newValue);
    fetchDashboardLattestSensors(zoneInterId);
  };

  const handleZoneNAmeTabChange = (event, newValue) => {
    setActiveStep(newValue);
    const zoneInformation = farmDashboardAllZoneDetailsList;
    console.log(zoneInformation, "zoneInformation");
    setSelectedSensorPlatform(newValue);
    // setSelectedSensor({});
    const selectedZone = zoneInformation?.find(
      (zone) => zone.name === newValue
    );
    console.log(selectedZone, "selectedZone");
    const zoneInterId = selectedZone.zone_internal_id;
    fetchZoneDashboardZoneSensors(zoneInterId);
  };

  const renderFarmSensorData = () => {
    const zoneInformation = farmDashboardAllZoneDetailsList || "";

    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            
            <TabContext value={activeStep}>
              <TabList
                onChange={handleZoneNAmeTabChange}
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
                    key={platform.name}
                    label={platform.name}
                    value={platform.name}
                  />
                ))}
              </TabList>
            </TabContext>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TabContext
              value={selectedSensor}
              //
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
                    label={sensor.sensorId}
                  />
                ))}
              </TabList>
            </TabContext>
          </Grid>
          <Grid item xs={12}>
            {selectedSensor &&
              zoneDashboardZoneSensorList &&
              zoneDashboardZoneSensorList.length > 0 &&
              rendeLattestSensorDataByID()}
          </Grid>

          {/* <ToggleButtonGroup
              value={selectedSensor}
              exclusive
              onChange={handleSensorLattestDataChange}
              aria-label="Platform"
            >
              {(zoneDashboardZoneSensorList || []).map((platform) => (
                <ToggleButton
                  key={platform.sensorId}
                  value={platform.sensorId}
                  style={{
                    backgroundColor:
                      selectedSensor === platform.sensorId
                        ? "green"
                        : undefined,
                    color:
                      selectedSensor === platform.sensorId ? "white" : "black",
                  }}
                >
                  {platform.sensorId}
                </ToggleButton>
              ))}
            </ToggleButtonGroup> */}
          {/* </Grid> */}
          {/* <Grid item xs={12} sm={12} md={12}>
            {selectedSensor &&
              zoneDashboardZoneSensorList &&
              zoneDashboardZoneSensorList.length > 0 &&
              rendeLattestSensorDataByID()}
          </Grid> */}
        </Grid>
      </>
    );
  };
  let totalFarmArea = 0;
  farmDashboardZoneList?.zoneInformation?.forEach(function (zone) {
    totalFarmArea += parseInt(zone.farmArea);
  });
  const reamingArea = farmDashboardFarmInfoList?.farmArea - totalFarmArea;
  let subtitle = `(Total Farm Area : ${
    farmDashboardFarmInfoList?.farmArea || ""
  }  Available Farm Area : ${reamingArea ?? ""} )`;
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
      <div className="page-container">
        <Grid container spacing={2}>
          {renderFarmSummaryInfo()}
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
              <TabPanel value="4">{renderTaskSchedules()}</TabPanel>
              <TabPanel value="5">
                <Grid container spacing={2}>
                  {renderReportdDetails()}
                </Grid>
              </TabPanel>
              <TabPanel value="6">{renderFarmInfo()}</TabPanel>
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
            fetchFarmInventory={fetchFarmInventory}
            fetchUsers={fetchUsers}
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
