import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {FormControl,Dialog,DialogTitle,DialogContent,DialogActions,Grid} from "@mui/material/";
import CustomButton from "../../shared/button";
import SingleCustomSelect from "../../shared/select";
import TextBox from "../../shared/text-box";
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
      handleCropChange({ target: { value: cropDetails.name } }, true);
    }
  }, [modalData]);

  const handleCropChange = (event, isFromEdit = false) => {
    isCropError && setIsCropError(false);
    const selectedItem = modalData.find(
      (item) => item.name === event.target.value
    );
    console.log(selectedItem,"hello");
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
    isMethodError && setIsMethodError(false);
    setGerminationMethod(event.target.value);
  };
  const handleUnitsChange = (event) => {
    setUnits(event.target.value);
  };
  const handleSaveCrop = () => {
    console.log(germinationMethod,selectedData);
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
            <CustomButton handleButtonClick={handleSaveCrop} title="Save" />
          </DialogActions>
        </div>
      </>
    );
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
          <Grid container spacing={2} >
            <Grid item xs={12} sm={12} md={12}>
              <span className="input-label"> Crop</span>
              <FormControl fullWidth>
                <SingleCustomSelect
                  isWhite={true}
                  label="Select"
                  valueKey="name"
                  labelKey="name"
                  lable="Crop"
                  value={cropListName}
                  disabled={cropDetails.isEditMode}
                  options={modalData}
                  handleChange={(e) => handleCropChange(e)}
                  isError={isCropError}
                  errorMessage="Please select a crop"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label">Variety</span>
              <FormControl fullWidth>
                <TextBox
                  disabled={true}
                  isWhite={true}
                  value={selectedData.variety}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label">Scientific Name</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite={true}
                  disabled={true}
                  value={selectedData.scientificName}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label"> Germination Method</span>
              <FormControl fullWidth>
                <SingleCustomSelect
                  isWhite={true}
                  valueKey="index"
                  labelKey="type"
                  // lable="Germination Method"
                  disabled={cropDetails.isEditMode}
                  options={selectedData.germinationMethod}
                  value={germinationMethod}
                  handleChange={(e) => handleGerminationChange(e)}
                  isError={isMethodError}
                  errorMessage="Please select a method"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label">Units</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite={true}
                  value={units}
                  onChange={handleUnitsChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <p className="section-title">Stages</p>
            </Grid>
            {selectedData.germinationMethod &&
            selectedData.germinationMethod[germinationMethod]
              ? (
                  selectedData.germinationMethod[germinationMethod].stages || []
                ).map((item) => (
                  <Grid item xs={4}>
                    <span className="input-label">{item.name}</span>
                    <TextBox
                      isWhite={true}
                      disabled={true}
                      key={item.duration}
                      value={item.duration}
                    />
                  </Grid>
                ))
              : ""}
          </Grid>
        </DialogContent>
        {renderActionButton()}
      </Dialog>
    </div>
  );
}
