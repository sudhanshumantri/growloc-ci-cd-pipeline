import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material/";
import CustomButton from "../../shared/button";
import TextBox from "../../shared/text-box";
import { GROWING_ZONE } from "../../../config";
import SingleCustomSelect from "../../shared/select";

export default function AddZoneSensorsModal({
  open,
  handleSave,
  handleClose,
}) {
  const [sensorsData, setSensorsData] = useState({
    // type:"",
    sensorId:"",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setSensorsData({ ...sensorsData, [name]: value });
  };

  const handleZoneSensorsSave = () => {
    let requestFarmDashBoardZoneData = {
        // type: sensorsData.type,
        sensorId: sensorsData.sensorId,
    };
      handleSave(requestFarmDashBoardZoneData);
  };

  const renderActionButton = () => {
    return (
      <>
        <div className="flex-row-justify-center-container">
          <DialogActions>
            <CustomButton
              isLight={true}
              handleButtonClick={handleClose}
              title="Cancel"
            />
            <CustomButton
              handleButtonClick={handleZoneSensorsSave}
              title="Save"
            />
          </DialogActions>
        </div>
      </>
    );
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialog-title-container">
        Add a new Sensor
        </DialogTitle>
        <br />
        <DialogContent sx={{ paddingTop: "10px" }}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6} md={6}>
              <span className="input-label">Type</span>
              <span className="label-light">*</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite={true}
                  name="type"
                  value={sensorsData.type}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid> */}
            <Grid item xs={12} sm={12} md={12}>
              <span className="input-label">Sensor Id</span>
              <span className="label-light">*</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite={true}
                  name="sensorId"
                  value={sensorsData.sensorId}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        {renderActionButton()}
      </Dialog>
    </div>
  );
}
