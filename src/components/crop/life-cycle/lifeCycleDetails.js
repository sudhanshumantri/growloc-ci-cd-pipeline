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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import style from "./style.css";
import MoveCropLifeCycleModal from "./moveCropLifecycleModal";
import ScheduleHarvestingModal from "./scheduleHarvestingModal";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EditParameters from "./editParameter";

const STATIC_STEPPER = [
  {
    label: "Germination",
  },
  {
    label: "Nursery",
  },
  {
    label: "Harvest",
  },
];

let headers = [
  {
    label: "Batch No",
    key: "batchName",
    redirection: true,
    redirectionKey: "link",
  },
  {
    label: "Crop",
    key: "crop.crop.name",
    redirection: false,
  },
  {
    label: "Variety",
    key: "crop.crop.variety",
    redirection: false,
  },
  {
    label: "Start Date ",
    key: "start_date",
    redirection: false,
    isDate: true,
  },
  {
    label: "Est Harvest Date",
    key: "estDate",
    redirection: false,
  },
  {
    label: "No. of Seeds",
    key: "qty",
    redirection: false,
  },
];
export default function CropLifeCycleDetails({
  fetchCropsLifecycleDetails,
  lifecycleDetails,
  isLifecycleDetailsLoading,
  lifecycleDetailsError,
  cropsLifecycleTransition,
  isTransitionLoading,
  addCropToLifecycleParameters,
  isAddLifecycleParametersLoading,


}) {
  const [open, setOpen] = useState(false);
  const [openScheduleHarvestingModal, setScheduleHarvestingModal] = useState(false);
  const [isStageEditOpen, setIsStageEditOpen] = useState(false);
  let { lifecycleId } = useParams();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isHarvestStage, setHarvestStage] = React.useState(false);
  const [maxQty, setMaxQty] = React.useState(null);
  const [modalHeaderText, setModalHeaderText] = React.useState("");
  const handleModalToggle = () => {
    setOpen(!open);

  };
  const handleScheduleHarvestingModalToggle = () => {
    setScheduleHarvestingModal(!openScheduleHarvestingModal);
  };

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
  React.useEffect(() => {
    fetchCropsLifecycleDetails(parseInt(lifecycleId));
  }, []);
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
        buttonArray.push({
          label: "Dispose",
          handler: handleModalToggle,
        });
        if (cropDetails.crop.crop.variety == 'Vine' || cropDetails.crop.crop.variety == 'Herb') {
          buttonArray.push({
            label: "Schedule",
            handler: handleScheduleHarvestingModalToggle,
          });
        }
      }
    }
    return buttonArray;
  };
  const renderHeader = () => {
    let { cropDetails } = lifecycleDetails;
    let title = cropDetails.batchNo + "-" + cropDetails.crop.crop.name;
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
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
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
    );
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
      <Grid item xs={12} sm={6} md={6}>
        <p className="header-title">
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
                    key={data + index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <p className="label-light">
                        <span className="label-bold"> {data.qty}</span> units
                        were moved {data.movement == 1 ? " in to" : "out from"}{" "}
                        the {selectedStageInformation.stage} stage on{" "}
                        <span className="label-bold">
                          {moment(data.start_date).format(
                            "MMMM Do YYYY hh:mm:ss A"
                          )}
                        </span>
                      </p>
                    </TableCell>
                    {/* <TableCell align="right">
                                        <span className='label-bold'>  {data.value}</span>
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
  const renderSelectedStageInformation = (activeStep, handleEditToggle) => {
    let { FarmCropLifecycleStages } = lifecycleDetails.cropDetails;
    let selectedStageInformation = FarmCropLifecycleStages[activeStep];

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <p className="header-title">
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
          <p className="header-title">
            {selectedStageInformation.stage + " Parameters Information"}
            {" "}
            <BorderColorIcon className="icon" onClick={handleEditToggle} />
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
          <p className="header-title">Sensors Information </p>
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

  const handleParametersSave = (data) => {
    const { id, parameters } = data;
    const paylad = {
      cropLifeCycleStageId: id,
      parameters,
    };
    addCropToLifecycleParameters(paylad);
    handleEditToggle();
  };
  console.log('isHarvestStage', isHarvestStage)
  return (
    <>
      {isLifecycleDetailsLoading && <Loader title="Fetching Details" />}

      {!isLifecycleDetailsLoading && (
        <>
          {renderHeader(lifecycleDetails, handleModalToggle)}
          <div className="page-container">
            {open && (
              <MoveCropLifeCycleModal
                open={open}
                handleClose={handleModalToggle}
                title={isHarvestStage ? "Dispose Plants" : "Transplant crops "}
                handleClick={handleCropTransationModalSave}
                modalData={lifecycleDetails}
                isHarvestStage={isHarvestStage}
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
              //  handleClick={handleCropTransationModalSave}
              />
            )}

            {isTransitionLoading && (
              <Loader title="Migrating Crops to another stage" />
            )}
            <Stack sx={{ width: "100%" }} spacing={4}>
              {renderStepper()}
            </Stack>
            {renderSelectedStageInformation(activeStep, handleEditToggle)}
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
      )}
    </>
  );
}
