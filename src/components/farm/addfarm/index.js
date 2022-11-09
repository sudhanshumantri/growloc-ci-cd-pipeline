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
import { nutrientsType } from "../../../config";
import InputLabel from "@mui/material/InputLabel";
export default function AddFarmModal({
  open,
  handleSave,
  handleClose,
  farmDetails = {
    name: "",
    farmArea: "",
    germinationType:"",
    germinationArea:"",
    germinationSeedsCount:null,
    germinationWateringType:"",
    germinationWateringSchedule:"",
    nurseryType:"",
    nurseryArea:"",
    nurserySeedsCount:null,
    nurseryWateringType:"",
    nurseryWateringSchedule:"",
    nurseryWateringSchedule: "",
    growingType: "",
    growingArea: "",
    growingRowCount: null,
    growingPlantCountPerRow:null,
    growingPlantSpacing: "",
    growingWateringSchedule: "",
    reservoirCapacity: "",
    nutrientWaterReservoirCapacity: "",
    phReservoirCapacity: "",
    stockNutrientSolutionCapacity: "",
    cultivableArea: "",
    nutrientdilutionRatio:"",
    nutrientsType: "",
    location: "",
    polyhouseStructureExpectedLife: "",
    polyhousePlasticExpectedLife: "",
  },
}) {
  // const [farm, setFarm] = useState({});
  const geolocation = ["Climate zone"];
  const [farmData, setFarmData] = useState(farmDetails);
  const [nameError, setNameError] = useState(false);
  const handleChange = (e) => {
    nameError && setNameError(false);
    const { value, name } = e.target;
    setFarmData({ ...farmData, [name]: value });
  };
  const validateFarm = () => {
    if (farmData.name) {
      return true;
    } else {
      setNameError(true);
      return false;
    }
  };
  const handleFarmSave = () => {
    let requestFarmData = {
      name:farmData.name,
      farmArea:farmData.farmArea,
      germinationType:farmData.germinationType,
      germinationArea:farmData.germinationArea,
      germinationSeedsCount:parseInt(farmData.germinationSeedsCount),
      germinationWateringType:farmData.germinationWateringType,
      germinationWateringSchedule:farmData.germinationWateringSchedule,
      nurseryType:farmData.nurseryType,
      nurseryArea:farmData.nurseryArea,
      nurserySeedsCount:parseInt(farmData.nurserySeedsCount),
      nurseryWateringType: farmData.nurseryWateringType,
      nurseryWateringSchedule: farmData.nurseryWateringSchedule,
      growingType:farmData.growingType,
      growingArea:farmData.growingArea,
      growingRowCount:parseInt(farmData.growingRowCount),
      growingPlantCountPerRow:parseInt(farmData.growingPlantCountPerRow),
      growingPlantSpacing:farmData.growingPlantSpacing,
      growingWateringSchedule: farmData.growingWateringSchedule,
      reservoirCapacity: farmData.reservoirCapacity,
      nutrientWaterReservoirCapacity: farmData.nutrientWaterReservoirCapacity,
      phReservoirCapacity: farmData.phReservoirCapacity,
      stockNutrientSolutionCapacity: farmData.stockNutrientSolutionCapacity,
      cultivableArea: farmData.cultivableArea,
      nutrientdilutionRatio: farmData.nutrientdilutionRatio,
      nutrientsType: farmData.nutrientsType,
      location:farmData.location,
      polyhouseStructureExpectedLife:farmData.polyhouseStructureExpectedLife,
      polyhousePlasticExpectedLife:farmData.polyhousePlasticExpectedLife
    };

    if (validateFarm()) {
      console.log("hey",requestFarmData );
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
              value={farmData.name || ""}
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
              name="farmArea"
              value={farmData.farmArea || ""}
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
              name="germinationType"
              lable="Germination Type"
              value={farmData.germinationType || "" }
              options={germination}
              handleChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            label={"Germination Area"}
            name="germinationArea"
            value={farmData.germinationArea || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"No. of seeds per plantation"}
              name="germinationSeedsCount"
              value={farmData.germinationSeedsCount || ""}
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
              name="germinationWateringType"
              lable="Watering Type"
              value={farmData.germinationWateringType || ""}
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
              name="germinationWateringSchedule"
              onChange={handleChange}
              value={farmData.germinationWateringSchedule || ""}
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
              name="nurseryType"
              lable="Nursery Type"
              value={farmData.nurseryType || ""}
              options={nursaryType}
              handleChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"Nursery Area"}
              name="nurseryArea"
              value={farmData.nurseryArea || ""}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"No of seeds for Nursery"}
              name="nurserySeedsCount"
              onChange={handleChange}
              value={farmData.nurserySeedsCount || ""}
              InputProps={{ inputProps: { min: 1, max: 10 } }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-name-label" variant="outlined">
              Watering Type
            </InputLabel>
            <SingleCustomSelect
              name="nurseryWateringType"
              lable="Watering Type"
              value={farmData.nurseryWateringType || ""}
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
              name="nurseryWateringSchedule"
              value={farmData.nurseryWateringSchedule || ""}
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
              name="growingType"
              lable="Growing Zone"
              value={farmData.growingType || ""}
              options={growingZone}
              handleChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"Growing Area"}
              name="growingArea"
              value={farmData.growingArea || ""}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"No of plants in a row"}
              name="growingRowCount"
              value={farmData.growingRowCount || ""}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"No of rows"}
              name="growingPlantCountPerRow"
              value={farmData.growingPlantCountPerRow || ""}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"Watering Schedule"}
              name="growingWateringSchedule"
              type="number"
              onChange={handleChange}
              value ={farmData.growingWateringSchedule || ""}
              InputProps={{ inputProps: { min: 1, max: 10 } }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-name-label" variant="outlined">
              Plant spacing
            </InputLabel>
            <SingleCustomSelect
              name="growingPlantSpacing"
              lable="Plant spacing"
              value={farmData.growingPlantSpacing || ""}
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
              name="reservoirCapacity"
              value={farmData.reservoirCapacity || ""}
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
              name="nutrientWaterReservoirCapacity"
              value={farmData.nutrientWaterReservoirCapacity || ""}
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
              name="phReservoirCapacity"
              onChange={handleChange}
              value={farmData.phReservoirCapacity || ""}  
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              label={"Stock nutrient solution capacity"}
              InputLabelProps={{ shrink: true }}
              name="stockNutrientSolutionCapacity"
              onChange={handleChange}
              value={farmData.stockNutrientSolutionCapacity || ""}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              label={"Nutrient dilution ratio"}
              InputLabelProps={{ shrink: true }}
              name="nutrientdilutionRatio"
              onChange={handleChange}
              value={farmData.nutrientdilutionRatio || ""}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-name-label" variant="outlined">
              Type of nutrients{" "}
            </InputLabel>
            <SingleCustomSelect
              name="nutrientsType"
              lable="Type of nutrients"
              value={farmData.nutrientsType || ""}
              options={nutrientsType}
              handleChange={handleChange}
            />
          </FormControl>
        </Grid>
      </>
    );
  };
  const geolocationZone = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
          <p className="header-title">Geolocation</p>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-name-label" variant="outlined">
              Zone
            </InputLabel>
            <SingleCustomSelect
              name="location"
              lable="Zone"
              value={farmData.location || ""}
              options={geolocation}
              handleChange={handleChange}
            />
          </FormControl>
        </Grid>
      </>
    );
  };
  const PolyhouseZone = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
          <p className="header-title">Polyhouse</p>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              name="polyhouseStructureExpectedLife"
              label=" Polyhouse structure expected life"
              value={farmData.polyhouseStructureExpectedLife || ""}
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label="Polyhouse plastic expected life"
              name="polyhousePlasticExpectedLife"
              value={farmData.polyhousePlasticExpectedLife || ""}
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
            {geolocationZone()}
            {PolyhouseZone()}
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
