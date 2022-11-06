import * as React from "react";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import ButtonCustom from "../../shared/button";
import { Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

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
export default function AddFarmModal({ open, handleSave, handleClose }) {
  const [farm, setFarm] = useState({});
  const [nameError, setNameError] = useState(false);
  const handleChange = (event, name) => {
    setFarm({ ...farm, [name]: event.target.value });
  };
  const germination = ["Tray with coco peat", "Oasis cubes", "Coco plugs"];
  const wateringType = ["Manual", "automated"]
  const nursaryType = ["Open (No humidity control)", "Closed dome (Humidity control)"]
  const growingZone = ['NFT system', "Trough system ", "Raft system", "Dutch bucket system"]
  const plantSpacing = ['Plant to Plant', "Row to Row"]
  const validateFarm = () => {
    if (farm.name) {
      return true;
    } else {
      setNameError(true);
      return false;
    }
  };
  const handleFarmSave = () => {
    let requestFarmData = {
      name: farm.name,
      farmArea: farm.farmArea,
      cultivableArea: farm.cultivableArea,
      reservoirCapacity: farm.cultivableArea,
    };
    if (validateFarm()) {
      handleSave(requestFarmData);
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialog-title-container">
          Add a new Farm
        </DialogTitle>
        <DialogContent sx={{ paddingTop: "10px" }}>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <TextField
                  label={"Name"}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    nameError && setNameError(false);
                    handleChange(e, "name");
                  }}
                  variant="outlined"
                  error={nameError}
                  helperText={nameError ? "Please provide name" : ""}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label={"FarmArea"}
                  onChange={(e) => handleChange(e, "farmArea")}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-name-label" variant="outlined">
                  Germination Zone
                </InputLabel>
                <InputLabel id="demo-multiple-name-label" variant="outlined">
                  {/*  */}
                  zone
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  name="germination"
                  label="Select"
                  onChange={(e) => handleChange(e, "germination")}
                  MenuProps={MenuProps}
                >
                  {germination.map((zone, index) => {
                    return <MenuItem value={zone} key={index}>{zone}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label={"GerminationArea"}
                  onChange={(e) => handleChange(e, "GerminationArea")}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label={"No of Seeds for Plantation"}
                  onChange={(e) => handleChange(e, "seeds")}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-name-label" variant="outlined">
                  {/*  */}
                  Watering Type
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  label="Select"
                  onChange={(e) => handleChange(e, "germination")}
                  MenuProps={MenuProps}
                >
                  {wateringType.map((water, index) => {
                    return <MenuItem value={water} key={index}>{water}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <FormControl fullWidth>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label={"WateringSchedule"}
                  type="number"
                  onChange={(e) => handleChange(e, "WateringSchedule")}
                  InputProps={{ inputProps: { min: 1, max: 10 } }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
            <p className="header-title">Nursery Zone</p>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  label="Select"
                  onChange={(e) => handleChange(e, "nurserytype")}
                  MenuProps={MenuProps}
                >
                  {nursaryType.map((narsary, index) => {
                    return <MenuItem value={narsary} key={index}>{narsary}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label={"NursaryArea"}
                  onChange={(e) => handleChange(e, "nursaryArea")}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-name-label" variant="outlined">
                  {/*  */}
                  Watering Type
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  label="Select"
                  onChange={(e) => handleChange(e, "wateringtype")}
                  MenuProps={MenuProps}
                >
                  {wateringType.map((water, index) => {
                    return <MenuItem value={water} key={index}>{water}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <FormControl fullWidth>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label={"WateringSchedule"}
                  type="number"
                  onChange={(e) => handleChange(e, "wateringSchedule")}
                  InputProps={{ inputProps: { min: 1, max: 10 } }}
                />
              </FormControl>
            </Grid>
            <p className="header-title">Growing zone</p>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-name-label" variant="outlined">
                  {/*  */}
                  Growing zone
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  label="Select"
                  onChange={(e) => handleChange(e, "growing")}
                  MenuProps={MenuProps}
                >
                  {growingZone.map((grow, index) => {
                    return <MenuItem value={grow} key={index}>{grow}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <FormControl fullWidth>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label={"WateringSchedule"}
                  type="number"
                  onChange={(e) => handleChange(e, "wateringSchedule")}
                  InputProps={{ inputProps: { min: 1, max: 10 } }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label={"GrowingArea"}
                  onChange={(e) => handleChange(e, "growingArea")}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label={"No of plants in a row"}
                  onChange={(e) => handleChange(e, "plants")}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label={"No of Rows"}
                  onChange={(e) => handleChange(e, "rows")}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label={"No of Rows"}
                  onChange={(e) => handleChange(e, "rows")}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-name-label" variant="outlined">
                  {/*  */}
                  Plant spacing
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  label="Select"
                  onChange={(e) => handleChange(e, "plantspacing")}
                  MenuProps={MenuProps}
                >
                  {plantSpacing.map((plant, index) => {
                    return <MenuItem value={plant} key={index}>{plant}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonCustom
            isLight={true}
            handleButtonClick={handleClose}
            title="Cancel"
          />
          <ButtonCustom handleButtonClick={handleFarmSave} title="Save" />
          {/* handleButtonClick={() => validateFarm()} */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
