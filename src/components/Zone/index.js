import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../shared/page-header";
import Loader from "../shared/loader";
import {
  Grid,
  FormControl,
  Box,
  Tab,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import DataTable from "../shared/dataTable";
import SingleCustomSelect from "../shared/select";
import BarChart from "../shared/chart/barChart";
import PieChart from "../shared/chart/pieChart";
import { HARVEST_MONTH_OPTIONS, TOGGLE_ZONE_DATA } from "../../config";
import AddZoneSensorsModal from "./addsensors";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TableDynamicPagination from "../shared/tablepagination";
import ZoneEfficiency from "../zonereports/zoneefficiency";
import moment from "moment";
import ZoneDashboardTask from "./zonetask";
import ZoneInformation from "./zoneinformation";
import ZoneHeaderInformation from "./zoneheaderinformation";

export default function ZoneDashboard({
  fetchFarmZone,
  farmZoneList,
  isFarmZoneLoading,
  farmZoneDashboardList,
  fetchFarmDashboardZone,
  farmZoneDashboardHarvestList,
  isFarmZoneDashboardHarvestListLoading,
  fetchFarmDashboardHarvest,
  usersList,
  fetchUsers,
  loginObject,
  addFarmDashboardZoneTask,
  isFarmDashboardZoneTaskLoading,
  addFarmDashboardZoneTaskComment,
  isFarmDashboardZoneCommetLoading,
  fecthFarmDashboardZone,
  farmDashboardZoneList,
  fetchFarmInventory,
  farmInventoryList,
  isZoneDashboardZoneInfoLoading,
  zoneDashboardZoneInfoList,
  fetchZoneDashoboardZoneInfo,
  isZoneDashboardZoneCropSchedulesListLoading,
  zoneDashboardZoneCropSchedulesList,
  fetchZoneDashboardZoneCropSchdule,
  isZoneDashboardZoneTaskLoading,
  zoneDashboardZoneTaskList,
  fetchZoneDashboardZoneTaskSchedule,
  isZoneDashboardZoneSensorLoading,
  zoneDashboardZoneSensorList,
  fetchZoneDashboardZoneSensors,
  fetchZoneDashboardZoneUtilizationCrops,
  zoneDashboardZoneUtilizationCropsList,
  fetchZoneDashboardZoneUtilizationStages,
  zoneDashboardZoneUtilizationStagesList,
  zoneReportsList,
  isZoneReportsListLoading,
  fetchZoneReports,
  isFarmReportsZoneAverageMortalityListLoading,
  farmReportsZoneAverageMortalityList,
  fecthFarmReportsZoneAverageMortality,
  isFarmReportsZoneTatTaskCategoriesListLoading,
  farmReportsZoneTatTaskCategoriesList,
  fetchFarmReportsZoneTatTaskRequest,
  fetchFarmZoneSensorDataRequest,
  farmZoneSensorDataList,
  isFarmZoneSensorDataLoading,
  fetchDashboardLattestSensors,
  farmDashboardZoneLattestSensorList,
  isFarmDashboardZoneLattestSensorLoading,
  fetchAllFarmZones,
  isAllFarmZonesLoading,
  allFarmZones,
}) {
  const { farmId, zoneId } = useParams();
  const [month, setMonth] = useState(3);
  const [openZoneSensors, setZoneSensors] = useState(false);
  const [value, setValue] = React.useState("1");
  const [selectedPlatform, setSelectedPlatform] = useState("zoneEfficiency");
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedSensor, setSelectedSensor] = useState(null);

  useEffect(() => {
    if (zoneId) {
      fecthFarmDashboardZone({
        farmId: farmId,
        queryParams: { skip: 0, take: 10 },
      });
    }
    fetchZoneDashboardZoneSensors(zoneId);
    fetchFarmZoneSensorDataRequest({ id: zoneId });
  }, [zoneId]);
  useEffect(() => {
    fetchAllFarmZones(farmId);
  }, []);
  useEffect(() => {
    handlePlatformChange(null, selectedPlatform);
  }, []);

  useEffect(() => {
    fetchZoneDashoboardZoneInfo(zoneId);
  }, [
    isFarmDashboardZoneTaskLoading,
    isZoneDashboardZoneSensorLoading,
    zoneId,
  ]);

  const { length: zoneSensorLattestDataLength } =
    zoneDashboardZoneSensorList || [];
  useEffect(() => {
    if (zoneSensorLattestDataLength) {
      const sensorId = zoneDashboardZoneSensorList[0].sensorId;
      fetchDashboardLattestSensors(sensorId);
      setSelectedSensor(sensorId);
    }
  }, [zoneSensorLattestDataLength, zoneId]);

  const handleZoneTabChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "1") {
      fetchFarmZoneSensorDataRequest({ id: zoneId });
    } else if (newValue === "2") {
      fetchZoneDashboardZoneSensors(zoneId);
    } else if (newValue === "3") {
      fetchZoneDashboardZoneCropSchdule({
        zoneId: zoneId,
        queryParams: { skip: 0, take: 10 },
      });
    } else if (newValue === "4") {
      fetchZoneDashboardZoneTaskSchedule({
        zoneId: zoneId,
        queryParams: { skip: 0, take: 10 },
      });
    } else if (newValue === "5") {
      // fetchZoneReports(zoneId);
    } else if (newValue === "6") {
      fetchFarmZone(zoneId);
    }
  };
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate(`/farm/${farmId}/dashboard`);
  };
  let showBackButton = [
    {
      handler: handleBackButton,
    },
  ];

  const handleDropDowmChange = ({ target }) => {
    navigate(`/farm/${farmId}/zone/${target.value}/`);
    if (value === "1") {
      fetchFarmZoneSensorDataRequest({ id: target.value });
    } else if (value === "2") {
      fetchZoneDashboardZoneSensors(target.value);
    } else if (value === "3") {
      fetchZoneDashboardZoneCropSchdule({
        zoneId: target.value,
        queryParams: { skip: 0, take: 10 },
      });
    } else if (value === "4") {
      fetchZoneDashboardZoneTaskSchedule({
        zoneId: target.value,
        queryParams: { skip: 0, take: 10 },
      });
    } else if (value === "5") {
      switch (selectedComponent) {
        case "zoneEfficiency":
          setSelectedComponent("zoneEfficiency");
          fetchZoneReports(target.value);
          break;
        case "mortalityRate":
          fecthFarmReportsZoneAverageMortality(target.value);
          setSelectedComponent("mortalityRate");
          break;
        case "taskTat":
          fetchFarmReportsZoneTatTaskRequest(target.value);
          setSelectedComponent("taskTat");
          break;
        case "CapacityEfficiency":
          fetchFarmDashboardHarvest({ zoneId: target.value, month });
          fetchZoneDashboardZoneUtilizationStages(target.value);
          fetchZoneDashboardZoneUtilizationCrops(target.value),
            setSelectedComponent("CapacityEfficiency");
          break;
        default:
          setSelectedComponent(null);
          break;
      }
    } else if (value === "6") {
      fetchFarmZone(target.value);
    }
  };

  let headerDropwdown = true;

  const handleChangeCropSchedulePagination = (queryParams) => {
    fetchZoneDashboardZoneCropSchdule({ zoneId: zoneId, queryParams });
  };
  const handleSensorLattestDataChange = (event, newZonelattesPlatform) => {
    const zoneInterId = newZonelattesPlatform;
    setSelectedSensor(newZonelattesPlatform);
    fetchDashboardLattestSensors(zoneInterId);
  };

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
      label: "Description",
      key: "message",
    },
  ];

  
  const ZONE_HEADERS = [
    {
      label: "Type",
      key: "type",
      redirection: false,
      redirectionKey: "link",
    },
    {
      label: "SensorId",
      key: "sensorId",
      redirection: false,
      redirectionKey: "link",
    },
    {
      label: "Status",
      key: "",
      redirection: false,
    },
  ];

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
              {(TOGGLE_ZONE_DATA || []).map((platform, index) => (
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

  const handleChange = (event) => {
    const { value } = event.target;
    setMonth(value);
    fetchFarmDashboardHarvest({ zoneId: zoneId, month: value });
  };

  const getZonerListOptions = useCallback(() => {
    const options = [];
    if (allFarmZones && allFarmZones.length) {
      allFarmZones.forEach((list) => {
        if (list?.name) {
          const { name, zone_internal_id } = list;
          options.push({ label: name, value: zone_internal_id });
        }
      });
    }
    return options;
  }, [farmDashboardZoneList]);

  const renderZoneSencers = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={9} lg={9}>
            <p className="section-title">Zone Sensors</p>
          </Grid>
          <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
            <DataTable
              data={{
                headers: ZONE_HEADERS,
                rows: zoneDashboardZoneSensorList || [],
              }}
            />
          </Grid>
        </Grid>
      </>
    );
  };
  const renderZoneCropSchedules = () => {
    const { cropSchedules } = zoneDashboardZoneCropSchedulesList;
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <p className="section-title">Zone Crop Schedules</p>
          </Grid>
          <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
            <DataTable data={{ headers: headers, rows: cropSchedules || [] }} />
            <TableDynamicPagination
              count={zoneDashboardZoneCropSchedulesList.total}
              handleChangePagination={handleChangeCropSchedulePagination}
            />
          </Grid>
        </Grid>
      </>
    );
  };

  const renderPlatformComponent = () => {
    if (selectedComponent === "zoneEfficiency") {
      return (
        <ZoneEfficiency
          zoneReportsList={zoneReportsList}
          fetchZoneReports={fetchZoneReports}
          isZoneReportsListLoading={isZoneReportsListLoading}
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
      case "zoneEfficiency":
        setSelectedComponent("zoneEfficiency");
        break;
      case "mortalityRate":
        fecthFarmReportsZoneAverageMortality(zoneId);
        setSelectedComponent("mortalityRate");
        break;
      case "taskTat":
        fetchFarmReportsZoneTatTaskRequest(zoneId);
        setSelectedComponent("taskTat");
        break;
      case "CapacityEfficiency":
        fetchFarmDashboardHarvest({ zoneId: zoneId, month });
        fetchZoneDashboardZoneUtilizationStages(zoneId);
        fetchZoneDashboardZoneUtilizationCrops(zoneId),
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
          <span className="section-title">Zone Monthly Harvest Breakup</span>
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
            chartData={farmZoneDashboardHarvestList || []}
            labelKey="name"
            valueKey="kgs"
          />
        </Grid>
        <Grid container spacing={2}>
          {renderFarmZoneUtilization()}
          {renderZoneCropsUtilization()}
        </Grid>
      </Grid>
    );
  };

  const renderAverageMortality = () => {
    return (
      <>
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
            chartData={farmReportsZoneAverageMortalityList || []}
            labelKey="stage"
            valueKey="avgMortalityRate"
          />
        </Grid>
      </>
    );
  };
  const renderTatTaskCategerios = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={8} sm={10} md={10}>
            <span className="section-title">Task Tat Category</span>
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
              chartData={farmReportsZoneTatTaskCategoriesList || []}
              labelKey="category"
              valueKey="avgTAT"
            />
          </Grid>
        </Grid>
      </>
    );
  };

  const renderFarmZoneUtilization = () => {
    return (
      <>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <p className="section-title">
                Farm Zone Utilization Based On Stages
              </p>
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
                chartData={zoneDashboardZoneUtilizationStagesList || []}
              />
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };
  const renderZoneCropsUtilization = () => {
    return (
      <Grid item xs={6} sm={6} md={6} lg={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <p className="section-title">
              Farm Zone Utilization Based On Crops
            </p>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className="card-outline-container graph-container"
          >
            <PieChart chartData={zoneDashboardZoneUtilizationCropsList || []} />
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const rendeLattestSensorDataByID = () => {
    const { data } = farmDashboardZoneLattestSensorList || {};
    if (!data || !data[0] || !data[0].payload) {
      return (
        <span>No sensor data available</span>
      )
    }
    const sensorData = data[0].payload;
    return (
      <Grid item xs={12} sm={12} md={12}>
        <p className="section-title"> Senor Information </p>
        {sensorData && (
          <p>
            Last Updated :
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

  const renderZoneSensorData = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
         {(zoneDashboardZoneSensorList && zoneDashboardZoneSensorList.length)?
          <TabContext
          value={
            selectedSensor
              ? selectedSensor.toString()
              : zoneDashboardZoneSensorList[0]?.sensorId || ""
          }
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
            {(zoneDashboardZoneSensorList || []).map((platform, index) => (
              <Tab
                key={platform.sensorId}
                label={platform.sensorId}
                value={platform.sensorId ? platform.sensorId : ""}
              />
            ))}
          </TabList>
        </TabContext>:<span>No sensor available</span>}
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {selectedSensor && rendeLattestSensorDataByID()}
        </Grid>
      </>
    );
  };

  let subtitle = `( Zone Area : ${zoneDashboardZoneInfoList?.farmArea || ""} )`;
  return (
    <div>
      <PageHeader
        title={zoneDashboardZoneInfoList?.name || ""}
        subtitle={subtitle ?? ""}
        showBackButton={showBackButton}
        headerDropwdown={headerDropwdown}
        options={getZonerListOptions()}
        value={zoneId}
        labelkey="label"
        valuekey="value"
        handleChange={handleDropDowmChange}
      />
      {isZoneDashboardZoneSensorLoading && (
        <Loader title="Fetching Zone sensors details" />
      )}
      {isZoneDashboardZoneCropSchedulesListLoading && (
        <Loader title="Zone Crop Schedule Details " />
      )}
      {isZoneDashboardZoneTaskLoading && (
        <Loader title="Zone Task Schedule Details " />
      )}
      {isFarmReportsZoneAverageMortalityListLoading && (
        <Loader title="Zone Average Mortality Detailas" />
      )}
      {isFarmReportsZoneTatTaskCategoriesListLoading && (
        <Loader title="Zone Average Tat Task Detailas" />
      )}
      {isFarmZoneLoading && <Loader title="Zone information Details" />}
      {isFarmDashboardZoneTaskLoading && <Loader title=" adding Task" />}
      {isFarmDashboardZoneCommetLoading && <Loader title="Adding Comment" />}
      {isFarmZoneDashboardHarvestListLoading && (
        <Loader title="Fetching Harvest details" />
      )}
      {isFarmDashboardZoneLattestSensorLoading && (
        <Loader title="Zone information Details" />
      )}
      {isZoneDashboardZoneInfoLoading && <Loader title="Loading zone Info" />}
      <div className="page-container">
        <Grid container spacing={2}>
          {<ZoneHeaderInformation zoneDashboardZoneInfoList={zoneDashboardZoneInfoList}/>}
          <TabContext value={value}>
            <Grid item xs={12} sm={12} md={12}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleZoneTabChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Zone Sensors Data" value="1" />
                  <Tab label="Sensors" value="2" />
                  <Tab label="Crop Schedules" value="3" />
                  <Tab label="Task Schedules" value="4" />
                  <Tab label="Reports" value="5" />
                  <Tab label="Info" value="6"></Tab>
                </TabList>
              </Box>
              <TabPanel value="1"> {renderZoneSensorData()}</TabPanel>
              <TabPanel value="2"> {renderZoneSencers()}</TabPanel>
              <TabPanel value="3">{renderZoneCropSchedules()}</TabPanel>
              {/* <TabPanel value="4">{renderZoneTaskSchedules()}</TabPanel> */}
              <TabPanel value="4">
                {
                  <ZoneDashboardTask
                    usersList={usersList}
                    fetchUsers={fetchUsers}
                    farmInventoryList={farmInventoryList}
                    fetchFarmInventory={fetchFarmInventory}
                    addFarmDashboardZoneTask={addFarmDashboardZoneTask}
                    zoneDashboardZoneTaskList={zoneDashboardZoneTaskList}
                    fetchZoneDashboardZoneTaskSchedule={
                      fetchZoneDashboardZoneTaskSchedule
                    }
                    addFarmDashboardZoneTaskComment={addFarmDashboardZoneTaskComment}
                    loginObject={loginObject}
                    farmId={farmId}
                    zoneId={zoneId}
                  />
                }
              </TabPanel>

              <TabPanel value="5">
                <Grid container spacing={2}>
                  {renderReportdDetails()}
                </Grid>
              </TabPanel>
              <TabPanel value="6">{<ZoneInformation farmZoneList={farmZoneList}/>}</TabPanel>
            </Grid>
          </TabContext>
        </Grid>
      </div>
      {openZoneSensors && (
        <AddZoneSensorsModal
          open={openZoneSensors}
          handleSave={handleZoneSensorSave}
          handleClose={handleZoneSensorsModalToggle}
        />
      )}
    </div>
  );
}
