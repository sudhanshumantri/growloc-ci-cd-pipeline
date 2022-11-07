import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CustomButton from "../../shared/button";
import SingleCustomSelect from "../../shared/select";
import { Grid } from "@mui/material";
export default function AddCropModal({
  modalData,
  open,
  handleSave,
  handleClose,
  cropDetails = {
    isEditMode: false,
  },
}) {
  let { farmId } = useParams();
  // const [open, setOpen] = useState(false);
  const [cropListName, setCropListName] = useState("");
  const [germinationMethod, setGerminationMethod] = useState("");
  const [selectedData, setSelectedData] = useState({});
  const [isMethodError, setIsMethodError] = useState(false);
  const [isCropError, setIsCropError] = useState(false);
  const [units, setUnits] = useState(1);

  React.useEffect(() => {
    if (open && cropDetails.name) {
      handleChange({ target: { value: cropDetails.name } }, true);
    }
  }, [modalData]);

  const handleChange = (event, isFromEdit = false) => {
    console.log("event.target.value", event.target.value, event);
    const selectedItem = modalData.find(
      (item) => item.name === event.target.value
    );
    setCropListName(event.target.value);
    setSelectedData(selectedItem);
    if (isFromEdit) {
      const germinationIndex = selectedItem.germinationMethod.findIndex(
        (method) => method.type === cropDetails.germinationMethod.type
      );
      handleGerminationChange({ target: { value: germinationIndex } });
      handleUnitsChange({ target: { value: cropDetails.qty } });
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
          {cropDetails.id ? "Update crop" : "Add a new crop"}
        </DialogTitle>
        <DialogContent sx={{ paddingTop: "10px" }}>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <SingleCustomSelect
                inputLable="Crop"
                label="Select"
                valueKey="name"
                labelKey="name"
                lable="Crop"
                value={cropListName}
                disabled={cropDetails.isEditMode}
                options={modalData}
                handleChange={(e) => {
                  isCropError && setIsCropError(false);
                  handleChange(e);
                }}
                isError={isCropError}
                errorMessage="Please select a crop"
              />
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
              <SingleCustomSelect
                inputLable="Germination Method"
                value={germinationMethod}
                valueKey="index"
                labelKey="type"
                lable="Germination Method"
                disabled={cropDetails.isEditMode}
                options={selectedData.germinationMethod}
                handleChange={(e) => {
                  isMethodError && setIsMethodError(false);
                  handleGerminationChange(e);
                }}
                isError={isMethodError}
                errorMessage="Please select a method"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label={"Units"}
                  // value={units}
                  value={units}
                  onChange={handleUnitsChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <p className="header-title">Stages</p>
            </Grid>
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
