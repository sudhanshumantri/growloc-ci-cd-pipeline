import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CustomButton from "../../shared/button";
import { Grid } from "@mui/material";
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
  cropDetails ={
    isEditMode: false,

  }
}) {
  let { farmId } = useParams();
  // const [open, setOpen] = useState(false);
  const [cropListName, setCropListName] = useState(null);
  const [germinationMethod, setGerminationMethod] = useState(null);
  const [selectedData, setSelectedData] = useState({});
  const [isMethodError, setIsMethodError] = useState(false);
  const [isCropError, setIsCropError] = useState(false);
  const [units, setUnits] = useState(1);

  React.useEffect(() => {
    if (open && cropDetails.name) {
      console.log(cropDetails.name, "cropDeatils.name");
      handleChange({ target: { value: cropDetails.name }}, true);
    }
  }, [modalData]);

  const handleChange = (event, isFromEdit = false) => {
    console.log("event.target.value", event.target.value, event);
    const selectedItem = modalData.find(item=>item.name === event.target.value);
    setCropListName(event.target.value);
    setSelectedData(selectedItem);
    if(isFromEdit) {
      const germinationIndex = selectedItem.germinationMethod.findIndex(method=> method.type === cropDetails.germinationMethod.type);
      handleGerminationChange({ target: { value: germinationIndex}});
      handleUnitsChange({target: { value: cropDetails.qty}})
    }
  };
  const handleGerminationChange = (event) => {
    setGerminationMethod(event.target.value);
  };
  const handleUnitsChange = (event) => {
    setUnits(event.target.value);
  };
  const handleSaveCrop = () => {
    // console.log(germinationMethod,selectedData);
    let isError = false;
    let cropData = {
      name: cropListName,
      scientificName: selectedData.scientificName,
      variety: selectedData.variety,
      parameters: selectedData.parameters,
      germinationMethod:
        germinationMethod !== null
          ? selectedData.germinationMethod[germinationMethod]
          : null,
    };
    let data = {
      farmId: parseInt(farmId),
      crop: cropData,
      qty: parseInt(units),
    };
    if (cropListName === null) {
      setIsCropError(true);
      isError = true;
    }
    if (!cropData.germinationMethod) {
      setIsMethodError(true);
      isError = true;
    }
    if (!isError) {
      handleSave(data);
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialog-title-container">
          {/* Add a new crop */}
          {cropDetails.id? "Update crop": "Add a new crop"}
        </DialogTitle>
        <DialogContent sx={{ paddingTop: "10px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-name-label" variant="outlined">
                {/*  */}
                  Crop
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  name="name"
                  label="Select"
                  disabled={cropDetails.isEditMode}
                  value={cropListName}
                  onChange={(e) => {
                    isCropError && setIsCropError(false);
                    handleChange(e);
                  }}
                  MenuProps={MenuProps}
                >
                  {(modalData || []).map((e, keyIndex) => (
                    <MenuItem key={keyIndex} value={e.name}>
                      {e.name}
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
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <TextField
                  disabled={true}
                  label={"Variety"}
                  InputLabelProps={{ shrink: true }}
                  value={selectedData.variety}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <TextField
                  disabled={true}
                  InputLabelProps={{ shrink: true }}
                  label={"Scientific Name"}
                  value={selectedData.scientificName}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-name-label" variant="outlined">
                  Germination Method
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  disabled={cropDetails.isEditMode}
                  onChange={(e) => {
                    isMethodError && setIsMethodError(false);
                    handleGerminationChange(e);
                  }}
                  value={germinationMethod}
                  // value ={cropData.germinationMethod}
                  input={<OutlinedInput label="Germination Method" />}
                  MenuProps={MenuProps}
                >
                  {(selectedData.germinationMethod || []).map((e, keyIndex) => (
                    <MenuItem key={keyIndex} value={keyIndex}>
                      {e.type}
                    </MenuItem>
                  ))}
                </Select>
                {isMethodError && (
                  <FormHelperText style={{ color: "red" }}>
                    Please select a method
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label={"Units"}
                  // value={units}
                  value ={units}
                  onChange={handleUnitsChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
          <p className="header-title">Stages</p>
          <Grid container spacing={2}>
            {selectedData.germinationMethod &&
            selectedData.germinationMethod[germinationMethod]
              ? (
                  selectedData.germinationMethod[germinationMethod].stages || []
                ).map((item) => (
                  <Grid item xs={4}>
                    <TextField
                      disabled={true}
                      key={item.duration}
                      label={item.name}
                      value={item.duration}
                      variant="outlined"
                    />
                  </Grid>
                ))
              : ""}
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
