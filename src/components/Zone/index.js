import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../shared/page-header";
import Loader from "../shared/loader";
import {
  Grid,
  FormControl,
  Card,
  CardContent,
  Box,
  Tab,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import DataTable from "../shared/dataTable";
import SingleCustomSelect from "../shared/select";
import BarChart from "../shared/chart/barChart";
import PieChart from "../shared/chart/pieChart";
import { HARVEST_MONTH_OPTIONS, TOGGLE_ZONE_DATA } from "../../config";
import AddFarmTaskComment from "../shared/addfarmtaskcomment";
import ButtonCustom from "../shared/button";
import AddIcon from "@mui/icons-material/Add";
import CollapsibleTable from "../shared/collapsibleDataTable";
import AddTaskModal from "../shared/addtask/addtask";
import AddZoneSensorsModal from "./addsensors";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Noofbatch from "../../../public/assets/Noofbatch.png";
import Totalharvest from "../../../public/assets/Totalharvest.png";
import Nooftask from "../../../public/assets/Nooftask.png";
import TableDynamicPagination from "../shared/tablepagination";
import ZoneEfficiency from "../zonereports/zoneefficiency";
import ToggleButtonReports from "../shared/togglebutton";

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
}) {
  const { farmId, zoneId } = useParams();
  const [month, setMonth] = useState(3);
  const [open, setOpen] = useState(false);
  const [openCommetTask, setCommetTask] = useState(false);
  const [rowdata, setRowData] = useState({});
  const [openZoneSensors, setZoneSensors] = useState(false);
  const [value, setValue] = React.useState("1");
  const [selectedPlatform, setSelectedPlatform] = useState("zoneEfficiency");
  const [selectedComponent, setSelectedComponent] = useState(null);

  React.useEffect(() => {
    if (zoneId) {
      fecthFarmDashboardZone({
        farmId: farmId,
        queryParams: { skip: 0, take: 10 },
      });

      fetchZoneDashoboardZoneInfo(zoneId);
      fetchZoneDashboardZoneSensors({
        zoneId: zoneId,
        queryParams: { skip: 0, take: 10 },
      });
    }
    fetchZoneReports(zoneId);
  }, [zoneId]);

  useEffect(() => {
    handlePlatformChange(null, selectedPlatform);
  }, []);

  const handleZoneTabChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "1") {
      fetchZoneDashboardZoneSensors({
        zoneId: zoneId,
        queryParams: { skip: 0, take: 10 },
      });
    } else if (newValue === "2") {
      fetchZoneDashboardZoneCropSchdule({
        zoneId: zoneId,
        queryParams: { skip: 0, take: 10 },
      });
    } else if (newValue === "3") {
      fetchZoneDashboardZoneTaskSchedule({
        zoneId: zoneId,
        queryParams: { skip: 0, take: 10 },
      });
    } else if (newValue === "4") {
      fetchZoneReports(zoneId);
    } else if (newValue === "5") {
      fetchFarmZone(zoneId);
    }
  };
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };
  let showBackButton = [
    {
      handler: handleBackButton,
    },
  ];

  const handleDropDowmChange = ({ target }) => {
    navigate(`/farm/${farmId}/zone/${target.value}/`);
  };
  const handleModalToggle = () => {
    setOpen(!open);
  };

  let headerDropwdown = true;

  const handleZoneSensorSave = (data) => {};
  const handleZoneTaskSave = (data) => {
    if (data) {
      data.createdBy = loginObject?.profile.userId;
      data.farmId = farmId;
      data.zoneId = zoneId;
      addFarmDashboardZoneTask(data);
    }
    handleModalToggle();
  };

  const handleChangeCropSchedulePagination = (queryParams) => {
    fetchZoneDashboardZoneCropSchdule({ zoneId: zoneId, queryParams });
  };
  const handleChangeZoneTaskSchedulePagination = (queryParams) => {
    fetchZoneDashboardZoneTaskSchedule({ zoneId: zoneId, queryParams });
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
      key: "status",
      redirection: false,
      isDate: true,
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
           <ToggleButtonGroup
          value={selectedPlatform}
          exclusive
          onChange={handlePlatformChange}
          aria-label="Platform"
        >
          {TOGGLE_ZONE_DATA.map((platform) => (
            <ToggleButton
              key={platform.value}
              value={platform.value}
              style={{
                backgroundColor:
                  selectedPlatform === platform.value ? "green" : undefined,
              }}
            >
              {platform.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup> 
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
  const handleCommentModalToggle = (rowData) => {
    setRowData(rowData);
    setCommetTask(!openCommetTask);
  };
  const handleZoneTaskCommentSave = (data) => {
    if (data) {
      addFarmDashboardZoneTaskComment({
        ...data,
        taskId: parseInt(rowdata.id),
        userId: rowdata.createdByProfile.userId,
      });
    }
    handleCommentModalToggle();
  };

  const getZonerListOptions = useCallback(() => {
    const options = [];
    if (farmDashboardZoneList?.zoneInformation?.length) {
      farmDashboardZoneList?.zoneInformation?.forEach((list) => {
        if (list?.name) {
          const { name, zone_internal_id } = list;
          options.push({ label: name, value: zone_internal_id });
        }
      });
    }
    return options;
  }, [farmDashboardZoneList]);

  const renderZoneSencers = () => {
    const { sensors } = zoneDashboardZoneSensorList;
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={9} lg={9}>
            <p className="section-title">Zone Sensors</p>
          </Grid>
          <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
            <DataTable data={{ headers: ZONE_HEADERS, rows: sensors || [] }} />
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
    const { cropBasedQtyData } = farmZoneDashboardList;
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

  const renderZoneTaskSchedules = () => {
    const { tasks } = zoneDashboardZoneTaskList;
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={9} lg={9}>
            <p className="section-title">Zone Tasks</p>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3} sx={{ alignItems: "center" }}>
            <ButtonCustom
              title="Add New Task"
              ICON={<AddIcon />}
              handleButtonClick={handleModalToggle}
            />
          </Grid>
          <Grid
            className="card-outline-container "
            item
            xs={12}
            sm={12}
            md={12}
          >
            <CollapsibleTable
              data={{ headers: TASK_HEADER, rows: tasks || [] }}
              handleCommentModalToggle={handleCommentModalToggle}
            />
            <TableDynamicPagination
              count={zoneDashboardZoneTaskList.total}
              handleChangePagination={handleChangeZoneTaskSchedulePagination}
            />
          </Grid>
        </Grid>
      </>
    );
  };
  const renderZoneCard = () => {
    const { noOfTasks, batchCount, totalHarvested } = zoneDashboardZoneInfoList;
    return (
      <>
        <Grid item xs={4} sm={4} md={4}>
          <Card>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={9} md={9}>
                    <h4 className="section-details">{batchCount || 0}</h4>
                    <p className="farm-card">No of Batches</p>
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
          </Card>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={9} md={9}>
                  <h4 className="section-details">{noOfTasks || 0}</h4>
                  <p className="farm-card">Total Tasks</p>
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
        <Grid item xs={4} sm={4} md={4}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={9} md={9}>
                  <h4 className="section-details">
                    {totalHarvested?.kgs || 0}(kgs) /{totalHarvested?.qty || 0}
                    (qty)
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

  const renderZoneInfo = () => {
    const { name, farmArea, systemType, zoneType } = farmZoneList;
    return (
      <>
        {name && farmArea && systemType && zoneType && (
          <div>
            <p className="section-title">
              Zone Name : <span>{name}</span>
            </p>
            <p className="section-title">
              Farm Area:
              <span>{farmArea}</span>
            </p>
            <p className="section-title">
              System Type :<span>{systemType}</span>
            </p>
            <p className="section-title">
              Zone Type :<span>{zoneType}</span>
            </p>
          </div>
        )}
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

      <div className="page-container">
        <Grid container spacing={2}>
          {renderZoneCard()}
          <TabContext value={value}>
            <Grid item xs={12} sm={12} md={12}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleZoneTabChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Sensors" value="1" />
                  <Tab label="Crop Schedules" value="2" />
                  <Tab label="Task Schedules" value="3" />
                  <Tab label="Graph" value="4" />
                  <Tab label="Info" value="5"></Tab>
                </TabList>
              </Box>
              <TabPanel value="1"> {renderZoneSencers()}</TabPanel>
              <TabPanel value="2">{renderZoneCropSchedules()}</TabPanel>
              <TabPanel value="3">{renderZoneTaskSchedules()}</TabPanel>
              <TabPanel value="4">
                <Grid container spacing={2}>
                  {renderReportdDetails()}
                </Grid>
              </TabPanel>
              <TabPanel value="5">{renderZoneInfo()}</TabPanel>
            </Grid>
          </TabContext>
        </Grid>
      </div>
      {open && (
        <AddTaskModal
          open={open}
          handleSave={handleZoneTaskSave}
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
          handleSave={handleZoneTaskCommentSave}
          handleClose={handleCommentModalToggle}
        />
      )}
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
