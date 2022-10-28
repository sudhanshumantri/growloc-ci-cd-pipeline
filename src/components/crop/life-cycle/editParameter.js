import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import CustomButton from "../../shared/button";
import { Grid } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditParameters({
  open,
  modalData,
  activeStep,
  handleSave,
  handleClose
}) {
  const { FarmCropLifecycleStages } = modalData.cropDetails;
  const selectedStageInformation = FarmCropLifecycleStages[activeStep];
  const [stageData, setStagaData] = useState(selectedStageInformation);
  const handleChange = (e, index) => {
    const tempData = { ...stageData };
    tempData.parameters[index]["value"] = e.target.value;
    setStagaData(tempData);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialog-title-container">
          Edit Parameters
        </DialogTitle>
        <DialogContent sx={{ paddingTop: "10px" }}>
          <br />
          <Grid container spacing={2}>
            {stageData.parameters.map((parameter, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <FormControl fullWidth>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    label={parameter.name}
                    value={parameter.value}
                    onChange={(e) => handleChange(e, index)}
                  />
                </FormControl>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <CustomButton
            isLight={true}
            handleButtonClick={handleClose}
            title="Cancel"
          />
          <CustomButton handleButtonClick={()=>handleSave(stageData)} title="Save" />
        </DialogActions>
      </Dialog>
    </div>
  );
}