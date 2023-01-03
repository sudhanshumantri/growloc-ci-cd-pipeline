import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../shared/page-header";
import { useNavigate } from "react-router-dom";
import Loader from "../shared/loader";
import { Grid, FormControl } from "@mui/material";
import DataTable from "../shared/dataTable";
import SingleCustomSelect from "../shared/select";
import BarChart from "../shared/chart/barChart";
import PieChart from "../shared/chart/pieChart";
import { HARVEST_MONTH_OPTIONS } from "../../config";
import AddFarmTaskComment from "../shared/addfarmtaskcomment";
import ButtonCustom from "../shared/button";
import AddIcon from "@mui/icons-material/Add";
import CollapsibleTable from "../shared/collapsibleDataTable";
import AddTaskModal from "../shared/addtask/addtask";
import AddZoneSensorsModal from "./addsensors";

export default function ZoneDashboard({
  fetchFarmZone,
  farmZoneList,
  isFarmZoneLoading,
  farmZoneDashboardList,
  fetchFarmDashboardZone,
  farmZoneDashboardHarvestList,
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
}) {
  const { farmId, zoneId } = useParams();
  const [month, setMonth] = useState(3);
  const [open, setOpen] = useState(false);
  const [openCommetTask, setCommetTask] = useState(false);
  const [rowdata, setRowData] = useState({});
  const [openZoneSensors, setZoneSensors] = useState(false);
  const [zoneClick, SetZoneClick] = useState("");
  const navigate = useNavigate();

  console.log(farmDashboardZoneList, "farmDashboardZoneList");

  React.useEffect(() => {
    if (zoneId) {
      fetchFarmZone(zoneId);
      fetchFarmDashboardZone(zoneId);
      fetchFarmDashboardHarvest({ zoneId: parseInt(zoneId), month });
      fetchUsers(farmId);
      fecthFarmDashboardZone(farmId);
    }
  }, [zoneId]);
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

  const handleZoneSensorsModalToggle = () => {
    setZoneSensors(!openZoneSensors);
  };
  const handleZoneTaskSave = (data) => {
    if (data) {
      data.createdBy = loginObject?.profile.id;
      data.farmId = parseInt(farmId);
      data.zoneId = parseInt(zoneId);
      addFarmDashboardZoneTask(data);
    }
    handleModalToggle();
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
    {
      label: "Severity",
      key: "severity",
      redirection: false,
      isDate: true,
    },
  ];
  const ZONE_HEADERS = [
    {
      label: "Type",
      key: "",
      redirection: false,
      redirectionKey: "link",
    },
    {
      label: "SensorId",
      key: "",
      redirection: false,
      redirectionKey: "link",
    },
    {
      label: "Status",
      key: "",
      redirection: false,
    },
  ];
  const handleChange = (event) => {
    const { value } = event.target;
    setMonth(value);
    fetchFarmDashboardHarvest({ zoneId: parseInt(zoneId), month: value });
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
        userId: parseInt(rowdata.createdByProfile.id),
      });
    }
    handleCommentModalToggle();
  };

  const getZonerListOptions = useCallback(() => {
    const options = [];
    if (farmDashboardZoneList.length) {
      farmDashboardZoneList.forEach((list) => {
        if (list?.name) {
          const { name, id } = list;
          options.push({ label: name, value: id });
        }
      });
    }
    return options;
  }, [farmDashboardZoneList]);

  const renderZoneSencers = () => {
    const { cropSchedules } = farmZoneDashboardList;
    return (
      <>
        {/* <Grid item xs={12} sm={12} md={12}>
          <p className="section-title">Zone Sensors</p>
        </Grid> */}
        <Grid item xs={6} sm={6} md={9} lg={9}>
          <p className="section-title">Zone Sensors</p>
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={3} sx={{ alignItems: "center" }}>
          <ButtonCustom
            title="Add New Sensors"
            ICON={<AddIcon />}
            handleButtonClick={handleZoneSensorsModalToggle}
          />
        </Grid>

        <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
          <DataTable
            data={{ headers: ZONE_HEADERS, rows: cropSchedules || [] }}
          />
        </Grid>
      </>
    );
  };

  const renderZoneCropSchedules = () => {
    const { cropSchedules } = farmZoneDashboardList;
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
          <p className="section-title">Zone Crop Schedules</p>
        </Grid>
        <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
          <DataTable data={{ headers: headers, rows: cropSchedules || [] }} />
        </Grid>
      </>
    );
  };

  const renderZoneMonthlyHarvestBreakup = () => {
    return (
      <>
        <Grid item xs={8} sm={10} md={10}>
          <p className="section-title">Zone Monthly Harvest Breakup</p>
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
          <BarChart chartData={farmZoneDashboardHarvestList || []} />
        </Grid>
      </>
    );
  };

  const renderFarmZoneUtilization = () => {
    const { stagedBasedQtyData } = farmZoneDashboardList;
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
              <PieChart chartData={stagedBasedQtyData || []} />
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
            <PieChart chartData={cropBasedQtyData || []} />
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderZoneTaskSchedules = () => {
    const { farmdDetails } = farmZoneDashboardList;
    return (
      <>
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

  return (
    <div>
      <PageHeader
        title={farmZoneList?.name || ""}
        showBackButton={showBackButton}
        headerDropwdown={headerDropwdown}
        options={getZonerListOptions()}
        // value={zoneClick}
        value={zoneId}
        labelkey="label"
        valuekey="value"
        handleChange={handleDropDowmChange}
      />
      {isFarmZoneLoading && <Loader title=" Feching zone" />}
      {isFarmDashboardZoneTaskLoading && <Loader title=" adding Task" />}
      {isFarmDashboardZoneCommetLoading && <Loader title="Adding Comment" />}
      <div className="page-container">
        <Grid container spacing={2}>
          {renderZoneSencers()}
          {renderZoneCropSchedules()}
          {renderZoneTaskSchedules()}
          {renderZoneMonthlyHarvestBreakup()}
          {renderFarmZoneUtilization()}
          {renderZoneCropsUtilization()}
        </Grid>
      </div>
      {open && (
        <AddTaskModal
          open={open}
          handleSave={handleZoneTaskSave}
          handleClose={handleModalToggle}
          usersList={usersList}
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
          handleClose={handleZoneSensorsModalToggle}
        />
      )}
    </div>
  );
}
