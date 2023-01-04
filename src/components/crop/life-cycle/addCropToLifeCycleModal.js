import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  MenuItem,
  FormControl,
  FormHelperText,
  Select,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material/";
import CustomButton from "../../shared/button";
import TextBox from "../../shared/text-box";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function AddCropModal({
  modalData,
  open,
  handleSave,
  handleClose,
}) {
  let { farmId } = useParams();
  let { zoneId } = useParams();
  const [selectedCrop, setselectedCrop] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [isUnitsError, setIsUnitsError] = useState(false);
  const [unitErrorMessage, setUnitErrorMessage] = useState("");
  const [isCropError, setIsCropError] = useState(false);
  const [units, setUnits] = useState(1);
  const handleDataValidation = (data) => {
    let isError = false;
    if (!selectedCrop) {
      setIsCropError(true);
      isError = true;
    }

    if (!units) {
      setIsUnitsError(true);
      setUnitErrorMessage("Unit is required");
      isError = true;
    } else {
      if (units > selectedCrop.qty) {
        setIsUnitsError(true);
        setUnitErrorMessage("Unit can't be greater than " + selectedCrop.qty);
        isError = true;
      }
    }
    return isError;
  };
  const handleCropChange = (event) => {
    isCropError && setIsCropError(false);
    setselectedCrop(event.target.value);
  };
  const handleUnitsChange = (event) => {
    setUnits(event.target.value);
  };
  const handleBatchNumberChange = (event) => {
    setBatchNo(event.target.value);
  };
  const handleSaveCrop = () => {
    let requestData = {
      farmId: parseInt(farmId),
      zoneId: parseInt(zoneId),
      qty: parseInt(units),
      batchNo: batchNo,
      crop: selectedCrop,
    };
    let isError = handleDataValidation(requestData);
    if (!isError) {
      handleSave(requestData);
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialog-title-container">
          Add a new crop to lifecycle
        </DialogTitle>
        <DialogContent sx={{ paddingTop: "10px" }}>
          <br />
          <Grid container spacing={2} >
            <Grid item xs={12} sm={12} md={12}>
              <span className="input-label">Crop</span>
              <span className="label-light">*</span>
              <FormControl fullWidth>
                <Select
                  sx={{ background: "white" }}
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  size="small"
                  value={selectedCrop}
                  onChange={(e) => {
                    isCropError && setIsCropError(false);
                    handleCropChange(e);
                  }}
                  // input={<OutlinedInput label="crop" />}
                  MenuProps={MenuProps}
                >
                  {(modalData || []).map((e, keyIndex) => (
                    <MenuItem key={keyIndex} value={e}>
                      {e.crop.name}
                    </MenuItem>
                  ))}
                </Select>
                {isCropError && (
                  <FormHelperText style={{ color: "red" }}>
                    Please select a crop
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <span className="input-label">Units</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite={true}
                  value={units}
                  error={isUnitsError}
                  helperText={isUnitsError ? unitErrorMessage : ""}
                  onChange={(e) => {
                    isUnitsError && setIsUnitsError(false);
                    handleUnitsChange(e);
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <CustomButton
            isLight={true}
            handleButtonClick={handleClose}
            title="Cancel"
          />
          <CustomButton handleButtonClick={handleSaveCrop} title="Save" />
        </DialogActions>
      </Dialog>
    </div>
  );
}
