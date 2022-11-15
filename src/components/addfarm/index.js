import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import ButtonCustom from "../shared/button";
import SingleCustomSelect from "../shared/select";
import { Grid } from "@mui/material";
import { germination } from "../../config";
import { wateringType } from "../../config";
import { nursaryType } from "../../config";
import { growingZone } from "../../config";
import { plantSpacing } from "../../config";
import { nutrientsType } from "../../config";
import InputLabel from "@mui/material/InputLabel";
import PageHeader from "../shared/page-header";
import Loader from "../shared/loader";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";

export default function AddFarm({
  addFarm,
  updateFarm,
  isAddFarmLoading,
  isUpdateFarmLoading,
  fecthFarmDetails,
  farmDetailsList,
  isFarmDetailsListLoading
}) {
  const [farmData, setFarmData] = useState({
    name: "",
    farmArea: "",
    germinationType: "",
    germinationArea: "",
    germinationSeedsCount: null,
    germinationWateringType: "",
    germinationWateringSchedule: "",
    nurseryType: "",
    nurseryArea: "",
    nurserySeedsCount: null,
    nurseryWateringType: "",
    nurseryWateringSchedule: "",
    nurseryWateringSchedule: "",
    growingType: "",
    growingArea: "",
    growingRowCount: null,
    growingPlantCountPerRow: null,
    growingPlantSpacing: "",
    growingWateringSchedule: "",
    reservoirCapacity: "",
    nutrientWaterReservoirCapacity: "",
    phReservoirCapacity: "",
    stockNutrientSolutionCapacity: "",
    cultivableArea: "",
    nutrientdilutionRatio: "",
    location: "",
    polyhouseStructureExpectedLife: "",
    polyhousePlasticExpectedLife: "",
  });

  const geolocation = ["Climate zone"];

  const [validation, setValidation] = useState({
    name: false,
    germinationType: false,
    germinationWateringType: false,
    nurseryType: false,
    nurseryWateringType: false,
    growingType: false,
    growingArea: false,
    growingPlantCountPerRow: false,
    growingPlantSpacing: false,
    reservoirCapacity:false,
    nutrientWaterReservoirCapacity: false,
    nutrientsType: false,
    location: false,
    polyhouseStructureExpectedLife: false,
    polyhousePlasticExpectedLife: false,
    farmLocation: false,
    liveLocation: false,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFarmData({ ...farmData, [name]: value });
    validation[name] && setValidation({ ...validation, [name]: false });
  };

  const { farmId } = useParams();

  useEffect(() => {
    if (farmId) {
      fecthFarmDetails(farmId);
    }
  }, [farmId]);

  useEffect(() => {
    if (isFarmDetailsListLoading === false) {
      setFarmData(farmDetailsList);

    }
  }, [isFarmDetailsListLoading]);

  const validateFarm = () => {
    let errors = { ...validation };
    let isValid = true;
    if (!farmData.name) {
      errors.name = true;
      isValid = false;
    }
    if (!farmData.germinationType) {
      errors.germinationType = true;
      isValid = false;
    }
    if (!farmData.germinationWateringType) {
      errors.germinationWateringType = true;
      isValid = false;
    }
    if (!farmData.nurseryType) {
      errors.nurseryType = true;
      isValid = false;
    }
    if (!farmData.nurseryWateringType) {
      errors.nurseryWateringType = true;
      isValid = false;
    }

    if (!farmData.growingType) {
      errors.growingType = true;
      isValid = false;
    }
    if (!farmData.growingArea) {
      errors.growingArea = true;
      isValid = false;
    }
    if (!farmData.growingPlantCountPerRow) {
      errors.growingPlantCountPerRow = true;
      isValid = false;
    }
    if (!farmData.growingPlantSpacing) {
      errors.growingPlantSpacing = true;
      isValid = false;
    }
    if (!farmData.reservoirCapacity) {
      errors.reservoirCapacity = true;
      isValid = false;
    }
    if (!farmData.nutrientWaterReservoirCapacity) {
      errors.nutrientWaterReservoirCapacity = true;
      isValid = false;
    }
    if (!farmData.nutrientsType) {
      errors.nutrientsType = true;
      isValid = false;
    }
    if (!farmData.location) {
      errors.location = true;
      isValid = false;
    }
    if (!farmData.polyhouseStructureExpectedLife) {
      errors.polyhouseStructureExpectedLife = true;
      isValid = false;
    }
    if (!farmData.polyhousePlasticExpectedLife) {
      errors.polyhousePlasticExpectedLife = true;
      isValid = false;
    }
    setValidation(errors);
    return isValid;
  };
  const handleFarmSave = () => {
    let requestFarmData = {
      name: farmData.name,
      farmArea: farmData.farmArea,
      germinationType: farmData.germinationType,
      germinationArea: farmData.germinationArea,
      germinationSeedsCount: parseInt(farmData.germinationSeedsCount),
      germinationWateringType: farmData.germinationWateringType,
      germinationWateringSchedule: farmData.germinationWateringSchedule,
      nurseryType: farmData.nurseryType,
      nurseryArea: farmData.nurseryArea,
      nurserySeedsCount: parseInt(farmData.nurserySeedsCount),
      nurseryWateringType: farmData.nurseryWateringType,
      nurseryWateringSchedule: farmData.nurseryWateringSchedule,
      growingType: farmData.growingType,
      growingArea: farmData.growingArea,
      growingRowCount: parseInt(farmData.growingRowCount),
      growingPlantCountPerRow: parseInt(farmData.growingPlantCountPerRow),
      growingPlantSpacing: farmData.growingPlantSpacing,
      growingWateringSchedule: farmData.growingWateringSchedule,
      reservoirCapacity: farmData.reservoirCapacity,
      nutrientWaterReservoirCapacity: farmData.nutrientWaterReservoirCapacity,
      phReservoirCapacity: farmData.phReservoirCapacity,
      stockNutrientSolutionCapacity: farmData.stockNutrientSolutionCapacity,
      cultivableArea: farmData.cultivableArea,
      nutrientdilutionRatio: farmData.nutrientdilutionRatio,
      nutrientsType: farmData.nutrientsType,
      location: farmData.location,
      polyhouseStructureExpectedLife: farmData.polyhouseStructureExpectedLife,
      polyhousePlasticExpectedLife: farmData.polyhousePlasticExpectedLife,
    };
    if (validateFarm()) {
      handleSave(requestFarmData);
    }
  };

  const handleSave = (payload) => {
    if (farmId) {
      updateFarm({payload, farmId});
    } else {
      addFarm(payload);
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
              error={validation.name}
              helperText={validation.name ? "Please provide name" : ""}
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

  //   const farmLocation = () => {

  //     return (
  //         <>
  //          <Grid item xs={12} sm={12} md={12}>
  //          <FormControl fullWidth>
  //             <TextField
  //               fullWidth
  //               variant="outlined"
  //               inputRef={materialRef}
  //               label={"Farm Location"}
  //               name="farmLocation"
  //               InputLabelProps={{ shrink: true }}
  //             onChange={handleChange}
  //              error={validation.farmLocation}
  //             helperText={validation.farmLocation ? "Please provide name" : ""}
  //             />
  //           </FormControl>
  //           </Grid>
  //         </>
  //     )
  //  }

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
              value={farmData.germinationType || ""}
              options={germination}
              isError={validation.germinationType}
              errorMessage="Please select a germination zone"
              handleChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"Germination Area"}
              name="germinationArea"
              value={farmData.germinationArea || ""}
              onChange={handleChange}
            />
          </FormControl>
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
              isError={validation.germinationWateringType}
              errorMessage="Please select a germination watering type"
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
              isError={validation.nurseryType}
              errorMessage="Please select a nursery zone"
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
              isError={validation.nurseryWateringType}
              errorMessage="Please select a nursery watering type"
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
              isError={validation.growingType}
              errorMessage="Please select a growing type"
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
              error={validation.growingArea}
              helperText={validation.growingArea ? "Please provide name" : ""}
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
              error={validation.growingPlantCountPerRow}
              helperText={
                validation.growingPlantCountPerRow ? "Please provide name" : ""
              }
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
              value={farmData.growingWateringSchedule || ""}
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
              isError={validation.growingPlantSpacing}
              errorMessage="Please select Plant spacing"
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
              error={validation.growingPlantCountPerRow}
              helperText={
                validation.growingPlantCountPerRow
                  ? "Please provide reservoircapacity"
                  : ""
              }
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
              error={validation.nutrientWaterReservoirCapacity}
              helperText={
                validation.nutrientWaterReservoirCapacity
                  ? "Please provide Nutrient water reservoir capacity"
                  : ""
              }
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
              isError={validation.nutrientsType}
              errorMessage="Please select nutrientstype"
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
              error={validation.polyhouseStructureExpectedLife}
              helperText={
                validation.polyhouseStructureExpectedLife
                  ? "Please provide polyhouse structure expected life"
                  : ""
              }
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
              error={validation.polyhousePlasticExpectedLife}
              helperText={
                validation.polyhousePlasticExpectedLife
                  ? "Please provide Polyhouse plastic expected life"
                  : ""
              }
              variant="outlined"
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
              isError={validation.location}
              errorMessage="Please select a location"
            />
          </FormControl>
        </Grid>
      </>
    );
  };
  return (
    <div>
      <PageHeader title="Manage Farm" buttonArray={[]} />
      {isAddFarmLoading && <Loader title="Adding Farm" />}
      {isUpdateFarmLoading && <Loader title="Updating Farms" />}
      {isFarmDetailsListLoading && <Loader title="Fetching Farm Details"/>}
      <div className="page-container">
        <Grid container spacing={3}>
          {farmBasicInfo()}
          {/* {farmLocation()} */}
          {germinationZone()}
          {nurseryZone()}
          {growZoneArea()}
          {wateringZone()}
          {geolocationZone()}
          {PolyhouseZone()}
        </Grid>
        <br />
        <ButtonCustom
          handleButtonClick={handleFarmSave}
          title={farmId ? "Update" : "Save"}
        />
      </div>
    </div>
  );
}
