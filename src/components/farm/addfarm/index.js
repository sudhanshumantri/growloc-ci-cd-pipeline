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
import SingleCustomSelect from "../../shared/select";
import { germination } from "../../../config";
import { wateringType } from "../../../config";
import { nursaryType } from "../../../config";
import { growingZone } from "../../../config";
import { plantSpacing } from "../../../config";
import InputLabel from "@mui/material/InputLabel";
import TextBox from "../../shared/text-box";

export default function AddFarmModal({
  open,
  handleSave,
  handleClose,
  farmDetails = {
    name: "",
    farmArea: "",
  },
}) {
  // const [farm, setFarm] = useState({});
  const [farm, setFarm] = useState(farmDetails);
  const [nameError, setNameError] = useState(false);
  const handleChange = (e) => {
    nameError && setNameError(false);
    const { value, name } = e.target;
    setFarm({ ...farm, [name]: value });
  };
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
  const farmBasicInfo = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth>
            <TextField
              label={"Name"}
              name="name"
              value={farm.name}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
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
              name="FarmArea"
              value={farm.farmArea}
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>
        </Grid>
      </>
    );
  };
  const germinationZone = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
          <p className="header-title">Germination Zone</p>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-name-label" variant="outlined">
              Germination Type
            </InputLabel>
            <SingleCustomSelect
              name="germination"
              lable="Germination Type"
              value={farm.germination || ""}
              options={germination}
              handleChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextBox
            InputLabelProps={{ shrink: true }}
            label={"Germination Area"}
            name="GerminationArea"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"No. of seeds per plantation"}
              name="seeds"
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-name-label" variant="outlined">
              Watering Type
            </InputLabel>
            <SingleCustomSelect
              name="germinationwater"
              lable="Watering Type"
              value={farm.germinationwater || ""}
              options={wateringType}
              handleChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"Watering Schedule"}
              type="number"
              name="wateringschedule"
              onChange={handleChange}
              InputProps={{ inputProps: { min: 1, max: 10 } }}
            />
          </FormControl>
        </Grid>
      </>
    );
  };

  const nurseryZone = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
          <p className="header-title">Nursery Zone</p>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-name-label" variant="outlined">
              Nursery Zone
            </InputLabel>
            <SingleCustomSelect
              name="nurserytype"
              lable="Nursery Type"
              value={farm.nurserytype || ""}
              options={nursaryType}
              handleChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"Nursary Area"}
              name="nursaryarea"
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-name-label" variant="outlined">
              Watering Type
            </InputLabel>
            <SingleCustomSelect
              name="nursarywateringtype"
              lable="Watering Type"
              value={farm.nursarywateringtype || ""}
              options={wateringType}
              handleChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"No of seeds for Nursery"}
              name="nurseryseeds"
              onChange={handleChange}
              InputProps={{ inputProps: { min: 1, max: 10 } }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"Watering Schedule"}
              type="number"
              name="nursaryschedule"
              onChange={handleChange}
              InputProps={{ inputProps: { min: 1, max: 10 } }}
            />
          </FormControl>
        </Grid>
      </>
    );
  };

  const growZoneArea = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
          <p className="header-title">Growring Zone</p>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-name-label" variant="outlined">
              Growing Zone
            </InputLabel>
            <SingleCustomSelect
              name="growing"
              lable="Growing Zone"
              value={farm.growing || ""}
              options={growingZone}
              handleChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"Watering Schedule"}
              name="growingschedule"
              type="number"
              onChange={handleChange}
              InputProps={{ inputProps: { min: 1, max: 10 } }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"Growing Area"}
              name="growingarea"
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"No of plants in a row"}
              name="plants"
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"No of rows"}
              name="rows"
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-name-label" variant="outlined">
              Plant spacing
            </InputLabel>
            <SingleCustomSelect
              name="plantspacing"
              lable="Plant spacing"
              value={farm.plantspacing || ""}
              options={plantSpacing}
              handleChange={handleChange}
            />
          </FormControl>
        </Grid>
      </>
    );
  };
  const wateringZone = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
          <p className="header-title">Watering Zone</p>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormControl fullWidth>
            <TextField
              label={"Main reservoir capacity"}
              InputLabelProps={{ shrink: true }}
              name="mainreservoir"
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              label={"Nutrient water reservoir capacity"}
              InputLabelProps={{ shrink: true }}
              name="nutrient"
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              label={"Input water analysis report"}
              InputLabelProps={{ shrink: true }}
              name="input"
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              label={"Ph up/down reservoir capacity"}
              InputLabelProps={{ shrink: true }}
              name="updown"
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              label={"Stock nutrient solution capacity"}
              InputLabelProps={{ shrink: true }}
              name="stock"
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>
        </Grid>
      </>
    );
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialog-title-container">
          Add a new Farm
        </DialogTitle>
        <br />
        <DialogContent sx={{ paddingTop: "10px" }}>
          <Grid container spacing={3}>
            {farmBasicInfo()}
            {germinationZone()}
            {nurseryZone()}
            {growZoneArea()}
            {wateringZone()}
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
