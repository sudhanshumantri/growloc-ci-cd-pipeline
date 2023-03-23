import React, { useEffect, useState, Fragment } from "react";
import Pusher from 'pusher-js';
import { useParams } from "react-router-dom";
import { sortBy } from "lodash";
import PageHeader from "../../shared/page-header";
import Loader from "../../shared/loader";
import Divider from "@mui/material/Divider";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Alert,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import style from "./style.css";
import MoveCropLifeCycleModal from "./moveCropLifecycleModal";
import ScheduleHarvestingModal from "./scheduleHarvestingModal";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EditParameters from "./editParameter";
import { WEEKDAYS } from "../../../config";
import AddTaskModal from "../../shared/addtask/addtask";

export default function CropLifeCycleDetails({
  fetchCropsLifecycleDetails,
  lifecycleDetails,
  isLifecycleDetailsLoading,
  lifecycleDetailsError,
  cropsLifecycleTransition,
  isTransitionLoading,
  addCropToLifecycleParameters,
  isAddLifecycleParametersLoading,
  updateCropToLifecycleSchedule,
  fetchFarmInventory,
  fetchUsers,
  usersList,
  farmInventoryList,
  addTaskScheduleTask,
  loginObject,
  allUserZoneSensorList,
  pusherData,
  recentZoneSensorData,
  isRecentZoneSensorDataLoading,
  recentZoneSensorDataLoadingError,
  fetchRecentZoneSensorData,
}) {
  let { farmId } = useParams();
  let { zoneId } = useParams();
  let { lifecycleId } = useParams();
  const [open, setOpen] = useState(false);
  const [recentPusherData, setRecentPusherData] = useState({});
  const [isPusherData, setIsPusherData] = useState(false);
  const [openScheduleHarvestingModal, setScheduleHarvestingModal] =
    useState(false);
  const [isStageEditOpen, setIsStageEditOpen] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isHarvestStage, setHarvestStage] = React.useState(false);
  const [maxQty, setMaxQty] = React.useState(null);
  const [modalHeaderText, setModalHeaderText] = React.useState("");
  const [harvestingSchedules, setHarvestingSchedules] = React.useState([]);
  const [openTaskModal, setTaskModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchRecentZoneSensorData({ id: zoneId });
    fetchCropsLifecycleDetails(parseInt(lifecycleId));
    fetchFarmInventory(farmId);
    if (usersList.length <= 0) {
      fetchUsers({ farmId });
    }
  }, []);


  useEffect(() => {
    let sensors = allUserZoneSensorList.filter((obj) => obj.zoneId === zoneId);
    let zonePusheData = pusherData.filter((obj) => obj.zoneId === zoneId)
    console.log("check========",zonePusheData,pusherData);
    zonePusheData = zonePusheData.sort((a, b) => parseInt(b.iot_timestamp) - parseInt(a.iot_timestamp));
    if (zonePusheData.length) {
      setRecentPusherData(zonePusheData[0]);
      setIsPusherData(true);
    }

  }, [pusherData]);

  const handleBackButton = () => {
    navigate(-1);
  };

  let showBackButton = [
    {
      handler: handleBackButton,
    },
  ];


  useEffect(() => {
    if (!isLifecycleDetailsLoading) {
      const { cropDetails } = lifecycleDetails;
      const { FarmCropLifecycleStages = [] } = cropDetails;
      let activeStep = 0;
      for (let step of FarmCropLifecycleStages) {
        if (step.qty === 0) {
          activeStep = step.order;
        }
      }
      activeStep =
        activeStep >= FarmCropLifecycleStages.length ? 0 : activeStep;
      setActiveStep(activeStep);
    }
  }, [isLifecycleDetailsLoading]);

  const handleTaskLifeCycleSave = (data) => {
    if (data) {
      data.createdBy = loginObject?.profile.id;
      data.cropLifeCycleId = parseInt(lifecycleId);
      data.farmId = farmId;
      addTaskScheduleTask(data);
    }
    handleTaskModalToggle();
  };
  const handleModalToggle = () => {
    setOpen(!open);
  };
  const handleTaskModalToggle = () => {
    setTaskModal(!openTaskModal);
  };

  const handleScheduleHarvestingModalToggle = () => {
    if (!openScheduleHarvestingModal) {
      setHarvestingSchedules(
        lifecycleDetails.cropDetails.FarmCropLifecycleSchedules &&
          lifecycleDetails.cropDetails.FarmCropLifecycleSchedules.length > 0
          ? lifecycleDetails.cropDetails.FarmCropLifecycleSchedules[0].repeatsOn
          : []
      );
    }
    setScheduleHarvestingModal(!openScheduleHarvestingModal);
  };
  const handleScheduleHarvestChange = (value) => {
    let daysIndex = harvestingSchedules.indexOf(value);
    if (daysIndex != -1) {
      setHarvestingSchedules(harvestingSchedules.filter((a) => a !== value));
    } else {
      setHarvestingSchedules([...harvestingSchedules, value]);
    }
  };
  const handleScheduleHarvestSave = () => {
    let scheduleHarvestingData = null;
    if (
      lifecycleDetails.cropDetails.FarmCropLifecycleSchedules &&
      lifecycleDetails.cropDetails.FarmCropLifecycleSchedules.length > 0
    ) {
      scheduleHarvestingData = {
        id: lifecycleDetails.cropDetails.FarmCropLifecycleSchedules[0].id,
        cropLifeCycleId: lifecycleId,
        repeatsOn: harvestingSchedules,
      };
      //edit is happening
    } else {
      scheduleHarvestingData = {
        cropLifeCycleId: lifecycleId,
        repeatsOn: harvestingSchedules,
      };
      //add is happening
    }
    updateCropToLifecycleSchedule(scheduleHarvestingData);
    handleScheduleHarvestingModalToggle();
  };
  const handleParametersInformationEditToggle = () => {
    setIsStageEditOpen(!isStageEditOpen);
  };
  const handleActiveStep = (id) => {
    setActiveStep(id);
    let { FarmCropLifecycleStages } = lifecycleDetails.cropDetails;
    let selectedStageInformation = FarmCropLifecycleStages[id];
    setMaxQty(selectedStageInformation.qty);
    if (id == FarmCropLifecycleStages.length - 1) {
      setHarvestStage(true);
    } else {
      setHarvestStage(false);
    }
  };

  const handleCropTransationModalSave = (units, kgs, isComplete) => {
    let { FarmCropLifecycleStages } = lifecycleDetails.cropDetails;
    let selectedStageInformation = FarmCropLifecycleStages[activeStep];
    if (selectedStageInformation.qty > 0) {
      let nextStageInforamtion = null;
      if (activeStep + 1 < FarmCropLifecycleStages.length) {
        nextStageInforamtion = FarmCropLifecycleStages[activeStep + 1];
      }
      let requestData = {
        cropLifeCycleId: parseInt(lifecycleId),
        units: parseInt(units),
        kgs: kgs ? parseInt(kgs) : kgs,
        currentStageId: selectedStageInformation.id,
        nextStageId: nextStageInforamtion ? nextStageInforamtion.id : null,
        isDispose: isHarvestStage ? true : false,
        isCompleted: isHarvestStage ? isComplete : false,
      };
      cropsLifecycleTransition(requestData);
      handleModalToggle();
      activeStep < 4 && setActiveStep((prevStep) => prevStep + 1);
    }
  };
  const handleParametersSave = (data) => {
    const { id, parameters } = data;
    const paylad = {
      cropLifeCycleStageId: id,
      parameters,
    };
    addCropToLifecycleParameters(paylad);
    handleParametersInformationEditToggle();
  };
  const handleActionButton = () => {
    let buttonArray = [];

    let buttonTaskLabel = "Add New Task";
    buttonArray.push({
      label: buttonTaskLabel,
      ICON: <AddIcon />,
      handler: handleTaskModalToggle,
    });

    let { cropDetails } = lifecycleDetails;
    //  cropDetails.crop.crop.variety
    let { FarmCropLifecycleStages } = lifecycleDetails.cropDetails;
    let selectedStageInformation = FarmCropLifecycleStages[activeStep];
    if (selectedStageInformation.qty > 0) {
      if (activeStep + 1 < FarmCropLifecycleStages.length) {
        let nextStageInforamtion = FarmCropLifecycleStages[activeStep + 1];
        let buttonLable = "Move to " + nextStageInforamtion.stage;
        buttonArray.push({
          label: buttonLable,
          handler: handleModalToggle,
        });
      } else {
        //this is the last step and it is harvesting

        if (
          cropDetails.crop.crop.variety == "Vine" ||
          cropDetails.crop.crop.variety == "Herb"
        ) {
          buttonArray.push({
            label: "Harvest",
            handler: handleModalToggle,
          });
          let cropsSchedule =
            lifecycleDetails?.cropDetails?.FarmCropLifecycleSchedules.length >
            0;
          if (!cropsSchedule) {
            buttonArray.push({
              label: "Schedule",
              handler: handleScheduleHarvestingModalToggle,
            });
          }
        } else {
          buttonArray.push({
            label: "Dispose",
            handler: handleModalToggle,
          });
        }
      }
    }
    return buttonArray;
  };
  const renderHeader = () => {
    let { cropDetails } = lifecycleDetails;
    let title = cropDetails.batchNo + " " + cropDetails.crop.crop.name;
    let subtitle = "(Units :" + cropDetails.qty + ")";
    let buttonArray = handleActionButton();

    return (
      <div>
        <PageHeader
          title={title}
          subtitle={subtitle}
          buttonArray={buttonArray}
          showBackButton={showBackButton}
        />
      </div>
    );
  };
  const renderStepper = () => {
    let { FarmCropLifecycleStages } = lifecycleDetails.cropDetails;
    let { cropDetails } = lifecycleDetails;
    let info = [
      {
        title: "Variety",
        value: cropDetails.crop.crop.variety,
      },
      {
        title: "Germination Method",
        value: cropDetails.crop.crop.germinationMethod.type,
      },
      {
        title: "Life Cycle Start Date",
        value: moment(cropDetails.start_date).format("MMMM Do YYYY hh:mm:ss A"),
      },
    ];
    return (
      <>
        {info.map((data, index) => (
          <span className="label-custom" key={index}>
            {data.title && (
              <>
                <b>{data.title}</b>:
              </>
            )}

            {data.value}
            {info.length - 1 != index && <>, </>}
          </span>
        ))}
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {FarmCropLifecycleStages.map((data, index) => (
            <Step key={index}>
              <StepLabel
                onClick={() => handleActiveStep(index)}
                StepIconProps={{
                  classes: { root: "rounder-icon-stepper" },
                }}
              >
                <p className="step-label">
                  {data.stage + "(" + data.qty + ")"}
                </p>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </>
    );
  };
  const renderNotification = () => {
    let cropsSchedule =
      lifecycleDetails?.cropDetails?.FarmCropLifecycleSchedules.length > 0;
    if (cropsSchedule) {
      cropsSchedule =
        lifecycleDetails?.cropDetails?.FarmCropLifecycleSchedules[0];
      let repeatsOn = _.orderBy(cropsSchedule.repeatsOn, [], ["asc"]);
      return (
        <Alert severity="info">
          Crop Harvesting would be repeated on following days:
          {repeatsOn.map((date, index) => {
            let dayObject = _.find(WEEKDAYS, { value: date });
            let daysText = dayObject.label;
            if (index != repeatsOn.length - 1) {
              daysText = daysText + ", ";
            }
            return <b key={index}> {daysText}</b>;
          })}
          <BorderColorIcon
            className="icon"
            sx={{ fontSize: "14px", marginLeft: "5px", color: "#517223" }}
            onClick={handleScheduleHarvestingModalToggle}
          />
        </Alert>
      );
    }
  };
  const renderHistoryInformation = () => {
    let { FarmCropLifecycleStages, FarmCropLifecycleHistory } =
      lifecycleDetails.cropDetails;
    let selectedStageInformation = FarmCropLifecycleStages[activeStep];
    let filteredHistory = _.filter(FarmCropLifecycleHistory, {
      stage: selectedStageInformation.stage,
    });
    filteredHistory = _.orderBy(filteredHistory, ["start_date"], ["desc"]);
    return (
      <Grid item xs={12} sm={12} md={12}>
        <p className="section-title">
          {selectedStageInformation.stage + " History Information"}
        </p>
        <Paper className="life-cycle-details-card life-cycle-spacing ">
          <Table size="small" aria-label="a dense table">
            <TableHead className="table-header-row">
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Units</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHistory.map((data, index) => {
                return (
                  <TableRow
                    // key={index}
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="table-header" align="left">
                      {moment(data.start_date).format(
                        "MMMM Do YYYY hh:mm:ss A"
                      )}
                    </TableCell>
                    <TableCell className="table-header" align="left">
                      {data.qty} units
                      {data.kgs ? "(" + data.kgs + " Kg) " : ""}
                    </TableCell>
                    <TableCell className="table-header" align="left">
                      {data.qty} {data.kgs ? "(" + data.kgs + " Kg) " : ""}
                      were moved {data.movement == 1 ? " in to" : "out from"}
                      {moment(data.start_date).format(
                        "MMMM Do YYYY hh:mm:ss A"
                      )}
                    </TableCell>

                    {/* <TableCell component="th" scope="row">
                    <p className="label-light">
                      <span className="label-bold"> {data.qty}</span> units
                      <span className="label-bold">
                        {" "}
                        {data.kgs ? "(" + data.kgs + " Kg) " : ""}
                      </span>
                      were moved {data.movement == 1 ? " in to" : "out from"}{" "}
                      the {selectedStageInformation.stage} stage on{" "}
                      <span className="label-bold">
                        {moment(data.start_date).format(
                          "MMMM Do YYYY hh:mm:ss A"
                        )}
                      </span>
                    </p>
                  </TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Divider />
        </Paper>
      </Grid>
    );
  };
  const renderSelectedSegmentSensorInformation = (selectedStageInformation, obj) => {
    let data = obj.payload;
    return (
      <Grid item xs={12} sm={12} md={12}>
        <p className="section-title">Sensors Information </p>
        <p >Last Updated : {moment(new Date(obj.timestamp)).format("MMMM Do YYYY hh:mm:ss A")}</p>
        <Paper className="life-cycle-details-card life-cycle-spacing ">
          <Table size="small" aria-label="a dense table">
            <TableHead className="table-header-row">
              <TableRow>
                <TableCell className="label-custom"><b>Parameter</b></TableCell>
                <TableCell className="label-custom"><b>Current Value</b></TableCell>
                <TableCell className="label-custom"><b>Ideal Value</b>
                  <EditOutlinedIcon
                    className="icon"
                    sx={{ color: "#517223", fontSize: "16px" }}
                    onClick={handleParametersInformationEditToggle}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedStageInformation.parameters.map((param, index) => {
                return (
                  <TableRow
                    // key={index}
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="label-custom" align="left">
                      {param.name}
                    </TableCell>
                    <TableCell className="table-header" align="left">
                      {param.name === "pH Level" ? data["pH"] : param.name == "Electric Conductivity" ? data["conductivity"] : param.name == "Temperature" ? data["waterTemperature"] : param.name == "CO2 Level" ? data["cO2"] : param.name == "Light" ? data["lightIntensity"] : param.name == "Humidity" ? data["humidity"] : ""} <b>{param.unit}</b>
                    </TableCell>
                    <TableCell className="table-header" align="left">
                      {param.value} <b>{param.unit}</b>
                    </TableCell>
                  </TableRow>
                );
              })}
              {/* {Object.keys(data).map((param, index) => {
                return (
                  <TableRow
                    // key={index}
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="label-custom" align="left">
                      {param}
                    </TableCell>
                    <TableCell className="table-header" align="left">
                      {data[param]}
                    </TableCell>
                    <TableCell className="table-header" align="left">
                      {data[param]}
                    </TableCell>
                  </TableRow>
                );
              })} */}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    )
  }
  const renderSelectedStageInformation = () => {
    let { FarmCropLifecycleStages } = lifecycleDetails.cropDetails;
    let selectedStageInformation = FarmCropLifecycleStages[activeStep];

    return (
      <Grid container spacing={2}>
        {isPusherData ? renderSelectedSegmentSensorInformation(selectedStageInformation, recentPusherData.data[0]) : !isRecentZoneSensorDataLoading ? renderSelectedSegmentSensorInformation(selectedStageInformation, recentZoneSensorData.data[0]) : ""}
        <Grid item xs={12} sm={12} md={12}>
          <p className="section-title">
            {selectedStageInformation.stage + " Stage Information"}
          </p>
          <div className="life-cycle-details-card life-cycle-spacing ">
            <p className="label-light ">
              <span className="label-custom">Crop Name: </span>
              {lifecycleDetails.cropDetails.crop.crop.name}
            </p>
            <Divider />

            <p className="label-light">
              <span className="label-custom">Current Stage: </span>
              {selectedStageInformation.stage}
            </p>
            <Divider />

            <p className="label-light">
              <span className="label-custom">Units: </span>
              {selectedStageInformation.qty}
            </p>
            <Divider />

            <p className="label-light">
              <span className="label-custom">Expected Start Date : </span>
              {moment(selectedStageInformation.expected_start_date).format(
                "MMMM Do YYYY"
              )}
            </p>
            <Divider />
            <p className="label-light">
              <span className="label-custom">Actual Start Date : </span>
              {selectedStageInformation?.start_date
                ? moment(selectedStageInformation.start_date).format(
                  "MMMM Do YYYY hh:mm:ss A"
                )
                : "Not Yet Started"}
            </p>
            <Divider />
            <p className="label-light">
              <span className="label-custom">Duration: </span>
              {selectedStageInformation.duration}
            </p>
            <Divider />
          </div>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={6}>
          <p className="section-title">
            {selectedStageInformation.stage + " Parameters Information"}
            <EditOutlinedIcon
              className="icon"
              sx={{ color: "#517223", fontSize: "20px" }}
              onClick={handleParametersInformationEditToggle}
            />
          </p>
          <div className="life-cycle-details-card life-cycle-spacing">
            {selectedStageInformation.parameters.map((param, index) => {
              return (
                <div key={index}>
                  <p className="label-light" key={index}>
                    <span className="label-custom">{param.name}: </span>
                    {param.value} <b>{param.unit}</b>
                  </p>
                  <Divider />
                </div>
              );
            })}
          </div>
        </Grid> */}
        {renderHistoryInformation()}

      </Grid>
    );
  };

  return (
    <>
      {isLifecycleDetailsLoading && <Loader title="Fetching Details" />}
      {!isLifecycleDetailsLoading && (
        <>
          {renderHeader()}
          <div className="page-container">
            {renderStepper()}
            {renderNotification()}
            {renderSelectedStageInformation()}
            {openTaskModal && (
              <AddTaskModal
                open={openTaskModal}
                handleSave={handleTaskLifeCycleSave}
                handleClose={handleTaskModalToggle}
                usersList={usersList}
                farmInventoryList={farmInventoryList}
              />
            )}
            {open && (
              <MoveCropLifeCycleModal
                open={open}
                handleClose={handleModalToggle}
                title={isHarvestStage ? "Dispose Plants" : "Transplant crops "}
                handleClick={handleCropTransationModalSave}
                modalData={lifecycleDetails}
                isHarvestStage={isHarvestStage}
                isContiniousHarvet={
                  lifecycleDetails.cropDetails.crop.crop.variety == "Vine" ||
                    lifecycleDetails.cropDetails.crop.crop.variety == "Herb"
                    ? true
                    : false
                }
                maxQty={
                  maxQty
                    ? maxQty
                    : lifecycleDetails.cropDetails.FarmCropLifecycleStages[
                      activeStep
                    ].qty
                }
              />
            )}
            {openScheduleHarvestingModal && (
              <ScheduleHarvestingModal
                open={openScheduleHarvestingModal}
                handleClose={handleScheduleHarvestingModalToggle}
                handleChange={handleScheduleHarvestChange}
                data={harvestingSchedules}
                handleSave={handleScheduleHarvestSave}
              />
            )}

            {isTransitionLoading && (
              <Loader title="Migrating Crops to another stage" />
            )}
            {isAddLifecycleParametersLoading && (
              <Loader title="updating parameters" />
            )}
            {isStageEditOpen && (
              <EditParameters
                open={isStageEditOpen}
                handleClose={handleParametersInformationEditToggle}
                modalData={lifecycleDetails}
                activeStep={activeStep}
                handleSave={handleParametersSave}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
