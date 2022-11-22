import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sortBy } from "lodash";
import PageHeader from "../../shared/page-header";
import Loader from "../../shared/loader";
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
  Alert
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import style from "./style.css";
import MoveCropLifeCycleModal from "./moveCropLifecycleModal";
import ScheduleHarvestingModal from "./scheduleHarvestingModal";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EditParameters from "./editParameter";
import { WEEKDAYS } from '../../../config'
export default function CropLifeCycleDetails({
  fetchCropsLifecycleDetails,
  lifecycleDetails,
  isLifecycleDetailsLoading,
  lifecycleDetailsError,
  cropsLifecycleTransition,
  isTransitionLoading,
  addCropToLifecycleParameters,
  isAddLifecycleParametersLoading,
  updateCropToLifecycleSchedule
}) {
  const [open, setOpen] = useState(false);
  const [openScheduleHarvestingModal, setScheduleHarvestingModal] = useState(false);
  const [isStageEditOpen, setIsStageEditOpen] = useState(false);
  let { lifecycleId } = useParams();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isHarvestStage, setHarvestStage] = React.useState(false);
  const [maxQty, setMaxQty] = React.useState(null);
  const [modalHeaderText, setModalHeaderText] = React.useState("");
  const [harvestingSchedules, setHarvestingSchedules] = React.useState([]);
  React.useEffect(() => {
    fetchCropsLifecycleDetails(parseInt(lifecycleId));
  }, []);
  const handleModalToggle = () => {
    setOpen(!open);
  };
  const handleScheduleHarvestingModalToggle = () => {
    if (!openScheduleHarvestingModal) {
      setHarvestingSchedules((lifecycleDetails.cropDetails.FarmCropLifecycleSchedules && lifecycleDetails.cropDetails.FarmCropLifecycleSchedules.length > 0) ? lifecycleDetails.cropDetails.FarmCropLifecycleSchedules[0].repeatsOn : [])
    }
    setScheduleHarvestingModal(!openScheduleHarvestingModal);
  };
  const handleScheduleHarvestChange = (value) => {
    let daysIndex = harvestingSchedules.indexOf(value);
    if (daysIndex != -1) {
      setHarvestingSchedules(
        harvestingSchedules.filter(a =>
          a !== value
        )
      );
    } else {
      setHarvestingSchedules([
        ...harvestingSchedules, value
      ]
      )
    }
  }
  const handleScheduleHarvestSave = () => {
    let scheduleHarvestingData = null;
    if (lifecycleDetails.cropDetails.FarmCropLifecycleSchedules && lifecycleDetails.cropDetails.FarmCropLifecycleSchedules.length > 0) {
      scheduleHarvestingData = {
        id: lifecycleDetails.cropDetails.FarmCropLifecycleSchedules[0].id,
        cropLifeCycleId: lifecycleId,
        repeatsOn: harvestingSchedules
      }
      //edit is happening
    } else {
      scheduleHarvestingData = {
        cropLifeCycleId: lifecycleId,
        repeatsOn: harvestingSchedules
      }
      //add is happening
    }
    updateCropToLifecycleSchedule(scheduleHarvestingData);
    handleScheduleHarvestingModalToggle();
  }
  const handleEditToggle = () => {
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
        isCompleted: isHarvestStage ? isComplete : false
      };
      handleModalToggle();
      cropsLifecycleTransition(requestData);
    }
  };
  const handleParametersSave = (data) => {
    const { id, parameters } = data;
    const paylad = {
      cropLifeCycleStageId: id,
      parameters,
    };
    addCropToLifecycleParameters(paylad);
    handleEditToggle();
  };
  const handleActionButton = () => {
    let buttonArray = [];
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

        if (cropDetails.crop.crop.variety == 'Vine' || cropDetails.crop.crop.variety == 'Herb') {
          buttonArray.push({
            label: "Harvest",
            handler: handleModalToggle,
          });
          let cropsSchedule = lifecycleDetails?.cropDetails?.FarmCropLifecycleSchedules.length > 0;
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
    let buttonArray = handleActionButton();
    return (
      <div>
        <PageHeader
          title={title}
          subtitle={subtitle}
          info={info}
          buttonArray={buttonArray}
        />
      </div>
    );
  };
  const renderStepper = () => {
    let { FarmCropLifecycleStages } = lifecycleDetails.cropDetails;
    return (
      <>
        <Stepper alternativeLabel nonLinear activeStep={activeStep} >
          {FarmCropLifecycleStages.map((data, index) => (
            <Step key={index}>
              <StepLabel
                onClick={() => handleActiveStep(index)}
                StepIconProps={{
                  classes: { root: "rounder-icon-stepper" },
                }}
              >
                <p className="step-label">{data.stage + "(" + data.qty + ")"}</p>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </>
    );
  };
  const renderNotification = () => {
    let cropsSchedule = lifecycleDetails?.cropDetails?.FarmCropLifecycleSchedules.length > 0;
    if (cropsSchedule) {
      cropsSchedule = lifecycleDetails?.cropDetails?.FarmCropLifecycleSchedules[0];
      let repeatsOn = _.orderBy(cropsSchedule.repeatsOn, [], ["asc"]);
      return (
        <Alert severity="info">Crop Harvesting would be repeated on following days:
          {repeatsOn.map((date, index) => {
            let dayObject = _.find(WEEKDAYS, { value: date });
            let daysText = dayObject.label;
            if (index != repeatsOn.length - 1) {
              daysText = daysText + ', '
            }
            return (
              <b> {daysText}</b>
            )
          })}
          <BorderColorIcon className="icon" sx={{ fontSize: '14px', marginLeft: '5px', color: '#517223' }} onClick={handleScheduleHarvestingModalToggle} />
        </Alert>
      )
    }

  }
  const renderHistoryInformation = () => {
    let { FarmCropLifecycleStages, FarmCropLifecycleHistory } =
      lifecycleDetails.cropDetails;
    let selectedStageInformation = FarmCropLifecycleStages[activeStep];
    let filteredHistory = _.filter(FarmCropLifecycleHistory, {
      stage: selectedStageInformation.stage,
    });
    filteredHistory = _.orderBy(filteredHistory, ["start_date"], ["desc"]);
    return (
      <Grid item xs={12} sm={6} md={6}>
        <p className="section-title">
          {selectedStageInformation.stage + " History Information"}
        </p>
        <Paper
          style={{
            height: 250,
            width: "100%",
            overflowY: "scroll",
            boxShadow: "none",
          }}
          className="bordered-table"
        >
          <Table size="small" aria-label="a dense table">
            <TableBody>
              {filteredHistory.map((data, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <p className="label-light">
                        <span className="label-bold"> {data.qty}</span> units
                        <span className="label-bold"> {data.kgs ? '(' + data.kgs + ' Kg) ' : ''}</span>
                        were moved {data.movement == 1 ? " in to" : "out from"}{" "}
                        the {selectedStageInformation.stage} stage on{" "}
                        <span className="label-bold">
                          {moment(data.start_date).format(
                            "MMMM Do YYYY hh:mm:ss A"
                          )}
                        </span>
                      </p>
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
  const renderSelectedStageInformation = () => {
    let { FarmCropLifecycleStages } = lifecycleDetails.cropDetails;
    let selectedStageInformation = FarmCropLifecycleStages[activeStep];

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <p className="section-title">
            {selectedStageInformation.stage + " Stage Information"}
          </p>
          <div className="life-cycle-details-card">
            <p className="label-light">
              <span className="label-light-bold">Crop Name: </span>{" "}
              {lifecycleDetails.cropDetails.crop.crop.name}
            </p>
            <p className="label-light">
              <span className="label-light-bold">Current Stage: </span>{" "}
              {selectedStageInformation.stage}
            </p>
            <p className="label-light">
              <span className="label-light-bold">Units: </span>{" "}
              {selectedStageInformation.qty}
            </p>
            <p className="label-light">
              <span className="label-light-bold">Expected Start Date : </span>
              {moment(selectedStageInformation.expected_start_date).format(
                "MMMM Do YYYY"
              )}
            </p>
            <p className="label-light">
              <span className="label-light-bold">Actual Start Date : </span>
              {selectedStageInformation.start_date
                ? moment(selectedStageInformation.start_date).format(
                  "MMMM Do YYYY hh:mm:ss A"
                )
                : "Not Yet Started"}
            </p>
            <p className="label-light">
              <span className="label-light-bold">Duration: </span>{" "}
              {selectedStageInformation.duration}
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <p className="section-title">
            {selectedStageInformation.stage + " Parameters Information"}
            {" "}
            <BorderColorIcon className="icon" sx={{ fontSize: '16px' }} onClick={handleEditToggle} />
          </p>

          <div className="life-cycle-details-card">
            {selectedStageInformation.parameters.map((param) => {
              return (
                <p className="label-light">
                  <span className="label-light-bold">{param.name}: </span>{" "}
                  {param.value} <b>{param.unit}</b>
                </p>
              );
            })}
          </div>
        </Grid>
        {renderHistoryInformation()}
        <Grid item xs={12} sm={6} md={6}>
          <p className="section-title">Sensors Information </p>
          <div className="life-cycle-details-card">
            <p className="label-light">
              {" "}
              <span className="label-light-bold">Crop Name: </span> Crop Name
            </p>
            <p className="label-light">
              {" "}
              <span className="label-light-bold">Variety: </span> Variety
            </p>
            <p className="label-light">
              {" "}
              <span className="label-light-bold">Quantity: </span> Quantity
            </p>
          </div>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      {isLifecycleDetailsLoading && <Loader title="Fetching Details" />
      }
      {
        !isLifecycleDetailsLoading && (
          <>
               {renderHeader()}
            <div className="page-container">
              {renderStepper()}
              {renderNotification()}
              {renderSelectedStageInformation()}
              {open && (
                <MoveCropLifeCycleModal
                  open={open}
                  handleClose={handleModalToggle}
                  title={isHarvestStage ? "Dispose Plants" : "Transplant crops "}
                  handleClick={handleCropTransationModalSave}
                  modalData={lifecycleDetails}
                  isHarvestStage={isHarvestStage}
                  isContiniousHarvet={(lifecycleDetails.cropDetails.crop.crop.variety == 'Vine' || lifecycleDetails.cropDetails.crop.crop.variety == 'Herb') ? true : false}
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
              {isAddLifecycleParametersLoading && (<Loader title="updating parameters" />)}
              {isStageEditOpen && (
                <EditParameters
                  open={isStageEditOpen}
                  handleClose={handleEditToggle}
                  modalData={lifecycleDetails}
                  activeStep={activeStep}
                  handleSave={handleParametersSave}
                />
              )}
            </div>
          </>
        )
      }
    </>
  );
}
