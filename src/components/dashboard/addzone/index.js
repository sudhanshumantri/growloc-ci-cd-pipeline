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

export default function AddZoneModal({
  open,
  handleSave,
  handleClose,
  zoneDetails = {
    name: "",
    farmArea: "",
    zone: false,
    systemType:"",
  },
}) {
  const [zoneData, setZoneData] = useState(zoneDetails);
  const [validation, setValidation] = useState({
    name: false,
    farmArea: false,
    systemType:false,
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setZoneData({ ...zoneData, [name]: value });
    validation[name] && setValidation({ ...validation, [name]: false });
  };

  const validateFarmDashboardZone = () => {
    let errors = { ...validation };
    let isValid = true;
    if (!zoneData.name) {
      errors.name = true;
      isValid = false;
    }
    if (!zoneData.farmArea) {
      errors.farmArea = true;
      isValid = false;
    }
    setValidation(errors);
    return isValid;
  };

  const handleFarmDashboardZoneSave = () => {
    let requestFarmDashBoardZoneData = {
      name: zoneData.name,
      farmArea: zoneData.farmArea,
    };
    if (validateFarmDashboardZone()) {
      handleSave(requestFarmDashBoardZoneData);
    }
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
              handleButtonClick={handleFarmDashboardZoneSave}
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
        {zoneDetails.id ? "Update Zone" : "Add a new zone"}
        </DialogTitle>
        <br />
        <DialogContent sx={{ paddingTop: "10px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label"> Name</span>
              <span className="label-light">*</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite={true}
                  name="name"
                  value={zoneData.name}
                  onChange={handleChange}
                  error={validation.name}
                  helperText={validation.name ? "Please provide name" : ""}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label">Size</span>
              <span className="label-light">*</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite={true}
                  name="farmArea"
                  value={zoneData.farmArea}
                  onChange={handleChange}
                  error={validation.farmArea}
                  helperText={validation.farmArea ? "Please provide area" : ""}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl>
                <span className="input-label">Selet Zone</span>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="zone"
                  value={zoneData.zone}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel
                    value="Growing Zone"
                    control={<Radio />}
                    label="Growing Zone"
                  />
                  <FormControlLabel
                    value="Nursery Zone"
                    control={<Radio />}
                    label="Nursery Zone"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <span className="input-label">System Type</span>
              <span className="label-light">*</span>
              <FormControl fullWidth>
                <SingleCustomSelect
                  isWhite={true}
                  name="systemType"
                  value={zoneData.systemType}
                  options={GROWING_ZONE}
                  handleChange={handleChange}
                  isError={validation.systemType}
                  errorMessage="Please select a  System Type"
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
