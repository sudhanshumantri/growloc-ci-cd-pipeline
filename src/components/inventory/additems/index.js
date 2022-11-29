import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  FormControl,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material/";
import CustomButton from "../../shared/button";
import TextBox from "../../shared/text-box";
import SingleCustomSelect from "../../shared/select";
import { inventoryData } from "../../../config";

export default function AddInventoryItems({
  open,
  handleClose,
  handleSave,
  itemDetails = {
    name: "",
    qty: "",
    units: "",
  },
}) {
  let { farmId } = useParams();
  const [itemData, setItemData] = useState(itemDetails);
  const [nameError, setNameError] = useState(false);

  const handleChange = (e) => {
    nameError && setNameError(false);
    const { value, name } = e.target;
    setItemData({ ...itemData, [name]: value });
  };

  const handleFarmItem = () => {
    let isError = false;
    if (!itemData.name) {
      setNameError(true);
      isError = true;
    }
    return isError;
  };
  const handleFarmInventorySave = () => {
    let payload = {
      farmId: parseInt(farmId),
      name: itemData.name,
      qty: itemData.qty,
      units: itemData.units,
    };
    let isError = handleFarmItem(payload);
    if (!isError) {
      handleSave(payload);
    }
  };

  const renderActionButtons = () => {
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
              handleButtonClick={handleFarmInventorySave}
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
          {itemDetails.id ? "Update item" : "Add a item"}
        </DialogTitle>
        <DialogContent sx={{ paddingTop: "10px" }}>
          <Grid container sx={{ margin: "1px", width: 500 }} spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <span className="input-label">Name</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite={true}
                  name="name"
                  value={itemData.name}
                  onChange={handleChange}
                  error={nameError}
                  helperText={nameError ? "Please provide name" : ""}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label">Quantity</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite={true}
                  name="qty"
                  value={itemData.qty}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label"> Units</span>
              <FormControl fullWidth>
                <SingleCustomSelect
                  isWhite={true}
                  name="units"
                  value={itemData.units}
                  handleChange={handleChange}
                  options={inventoryData}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        {renderActionButtons()}
      </Dialog>
    </div>
  );
}
