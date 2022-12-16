import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import ButtonCustom from "../shared/button";
import SingleCustomSelect from "../shared/select";
import { Grid } from "@mui/material";
import {
  GERMINATION_TYPE,
  WATERING_TYPE,
  NURSARY_TYPE,
  GROWING_ZONE,
  PLANT_SPACING,
  NUTRIENTS_TYPE,
} from "../../config";
import PageHeader from "../shared/page-header";
import Loader from "../shared/loader";
import "./style.css";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyADsa8IzAq5Q1JhgyllXK67uWc3BUrtwgY");
import { FormControlLabel, RadioGroup, Radio } from "@mui/material";
import TextBox from "../shared/text-box";

export default function AddFarm({
  addFarm,
  updateFarm,
  isAddFarmLoading,
  isUpdateFarmLoading,
  fecthFarmDetails,
  farmDetailsList,
  isFarmDetailsListLoading,
}) {
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);
  const navigate = useNavigate();
  const [location, setLocation] = useState({});
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
    lat: "",
    lng: "",
    polyhouseStructureExpectedLife: "",
    polyhousePlasticExpectedLife: "",
  });
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
    reservoirCapacity: false,
    nutrientWaterReservoirCapacity: false,
    nutrientsType: false,
    location: false,
    polyhouseStructureExpectedLife: false,
    polyhousePlasticExpectedLife: false,
  });

  const { farmId } = useParams();
  const { ref: materialRef } = usePlacesWidget({
    apiKey: "AIzaSyADsa8IzAq5Q1JhgyllXK67uWc3BUrtwgY",
    onPlaceSelected: (place) => handleLocationUpdate(place),
    // {
    //   let lat = null;
    //   let lng = null;
    //   if (place?.geometry?.location) {
    //     lat = place?.geometry?.location.lat();
    //     lng = place?.geometry?.location.lng();
    //   }
    //   farmData.location = place.formatted_address;
    //   setFarmData({ ...farmData, location: place.formatted_address })
    // }
    // inputAutocompleteValue: "country",
    options: {
      types: ["geocode", "establishment"],
    },
  });

  const handleLocationUpdate = (place) => {
    const { formatted_address, geometry } = place;
    let lat = null;
    let lng = null;
    if (geometry?.location) {
      lat = geometry?.location.lat();
      lng = geometry?.location.lng();
    }
    setLocation({ formatted_address, lat, lng });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFarmData({ ...farmData, [name]: value });
    setIsCurrentLocation(false);
    validation[name] && setValidation({ ...validation, [name]: false });
  };
  const handleClose = () => {
    navigate("/");
  };

  useEffect(() => {
    if (farmId) {
      fecthFarmDetails(farmId);
    }
  }, [farmId]);

  useEffect(() => {
    if (isFarmDetailsListLoading === false && farmId) {
      setFarmData(farmDetailsList);
    }
  }, [isFarmDetailsListLoading]);

  useEffect(() => {
    if (location?.formatted_address) {
      const { formatted_address, lat, lng } = location;
      setFarmData({ ...farmData, lat, lng, location: formatted_address });
    }
  }, [location.formatted_address]);

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
      lat: farmData.lat,
      lng: farmData.lng,
      polyhouseStructureExpectedLife: farmData.polyhouseStructureExpectedLife,
      polyhousePlasticExpectedLife: farmData.polyhousePlasticExpectedLife,
    };
    if (validateFarm()) {
      handleSave(requestFarmData);
    }
  };
  const handleGetCurrentLocation = () => {
    setIsCurrentLocation(!isCurrentLocation);
    if (!isCurrentLocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        Geocode.fromLatLng(lat, lng).then(
          (response) => {
            const address = response.results[0].formatted_address;
            setFarmData({ ...farmData, location: address, lat: lat, lng: lng });
          },
          (error) => {
            console.error(error);
          }
        );
      });
    }
  };
  const handleSave = (payload) => {
    if (farmId) {
      updateFarm({ payload, farmId });
    } else {
      addFarm(payload);
    }
  };

  const rendeFarmBasicInfo = () => {
    return (
      <>
        <Grid container spacing={2} className="card-outline-container">
          <Grid item xs={12} sm={12} md={6}>
            <span className="input-label">Name</span>
            <FormControl fullWidth>
              <TextBox
                defaultValue=""
                name="name"
                isWhite={true}
                value={farmData.name}
                onChange={handleChange}
                error={validation.name}
                helperText={validation.name ? "Please provide name" : ""}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <span className="input-label">Farm Area</span>
            <FormControl fullWidth>
              <TextBox
                defaultValue=""
                isWhite={true}
                name="farmArea"
                value={farmData.farmArea}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          {farmLocation()}
        </Grid>
      </>
    );
  };

  const farmLocation = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
          <span className="input-label">Farm Location</span>
          <FormControl fullWidth>
            <TextBox
              defaultValue=""
              fullWidth
              isWhite={true}
              inputRef={materialRef}
              name="location"
              value={farmData.location}
              onChange={handleChange}
              error={validation.location}
              helperText={validation.location ? "Please provide name" : ""}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormControl>
            <FormControlLabel
              className="farm-location"
              control={
                <Radio
                  onClick={handleGetCurrentLocation}
                  checked={isCurrentLocation}
                />
              }
              label="Use My Current Location"
            />
          </FormControl>
        </Grid>
      </>
    );
  };
  const renderGerminationZone = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
          <p className="section-title">Germination Zone</p>
        </Grid>
        <br />
        <Grid container spacing={2} className="card-outline-container">
          <Grid item xs={12} sm={12} md={12}>
            <span className="input-label">Germination Type</span>
            <FormControl fullWidth>
              <SingleCustomSelect
                isWhite={true}
                name="germinationType"
                value={farmData.germinationType}
                options={GERMINATION_TYPE}
                isError={validation.germinationType}
                errorMessage="Please select a germination zone"
                handleChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <span className="input-label">Germination Area</span>
            <FormControl fullWidth>
              <TextBox
                isWhite={true}
                InputLabelProps={{ shrink: true }}
                name="germinationArea"
                value={farmData.germinationArea}
                onChange={handleChange}
                defaultValue=""
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <span className="input-label">No. of seeds per plantation</span>
            <FormControl fullWidth>
              <TextBox
                isWhite={true}
                InputLabelProps={{ shrink: true }}
                name="germinationSeedsCount"
                value={farmData.germinationSeedsCount}
                onChange={handleChange}
                defaultValue=""
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl fullWidth>
              <span className="input-label">Watering Type</span>
              <SingleCustomSelect
                isWhite={true}
                name="germinationWateringType"
                value={farmData.germinationWateringType}
                options={WATERING_TYPE}
                isError={validation.germinationWateringType}
                errorMessage="Please select a germination watering type"
                handleChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <span className="input-label">Watering Schedule</span>
            <FormControl fullWidth>
              <TextBox
                isWhite={true}
                type="number"
                name="germinationWateringSchedule"
                onChange={handleChange}
                value={farmData.germinationWateringSchedule}
                defaultValue=""
              />
            </FormControl>
          </Grid>
        </Grid>
      </>
    );
  };
  const renderNurseryZone = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
          <p className="section-title">Nursery Zone</p>
        </Grid>
        <br />
        <Grid container spacing={2} className="card-outline-container">
          <Grid item xs={12} sm={12} md={12}>
            <span className="input-label">Nursery Type</span>
            <FormControl fullWidth>
              <SingleCustomSelect
                isWhite={true}
                name="nurseryType"
                value={farmData.nurseryType}
                options={NURSARY_TYPE}
                isError={validation.nurseryType}
                errorMessage="Please select a nursery zone"
                handleChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <span className="input-label">Nursery Area</span>
            <FormControl fullWidth>
              <TextBox
                isWhite={true}
                InputLabelProps={{ shrink: true }}
                name="nurseryArea"
                value={farmData.nurseryArea}
                onChange={handleChange}
                defaultValue=""
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <span className="input-label">No of seeds for Nursery</span>
            <FormControl fullWidth>
              <TextBox
                isWhite={true}
                InputLabelProps={{ shrink: true }}
                name="nurserySeedsCount"
                onChange={handleChange}
                value={farmData.nurserySeedsCount}
                defaultValue=""
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl fullWidth>
              <span className="input-label">Watering Type</span>
              <SingleCustomSelect
                isWhite={true}
                name="nurseryWateringType"
                value={farmData.nurseryWateringType}
                options={WATERING_TYPE}
                isError={validation.nurseryWateringType}
                errorMessage="Please select a nursery watering type"
                handleChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <span className="input-label">Watering Schedule</span>
            <FormControl fullWidth>
              <TextBox
                isWhite={true}
                InputLabelProps={{ shrink: true }}
                type="number"
                name="nurseryWateringSchedule"
                value={farmData.nurseryWateringSchedule}
                onChange={handleChange}
                defaultValue=""
              />
            </FormControl>
          </Grid>
        </Grid>
      </>
    );
  };

  const renderGrowZoneArea = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
          <p className="section-title">Growring Zone</p>
        </Grid>
        <br />
        <Grid container spacing={2} className="card-outline-container">
          <Grid item xs={12} sm={12} md={12}>
            <span className="input-label">Growing Zone</span>
            <FormControl fullWidth>
              <SingleCustomSelect
                isWhite={true}
                name="growingType"
                value={farmData.growingType}
                options={GROWING_ZONE}
                isError={validation.growingType}
                errorMessage="Please select a growing type"
                handleChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <span className="input-label">Growing Area</span>
            <FormControl fullWidth>
              <TextBox
                isWhite={true}
                InputLabelProps={{ shrink: true }}
                name="growingArea"
                value={farmData.growingArea}
                error={validation.growingArea}
                helperText={validation.growingArea ? "Please provide name" : ""}
                onChange={handleChange}
                defaultValue=""
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <span className="input-label">No of plants in a row</span>
            <FormControl fullWidth>
              <TextBox
                isWhite={true}
                name="growingRowCount"
                value={farmData.growingRowCount}
                onChange={handleChange}
                defaultValue=""
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <span className="input-label">No of rows</span>
            <FormControl fullWidth>
              <TextBox
                isWhite={true}
                InputLabelProps={{ shrink: true }}
                name="growingPlantCountPerRow"
                value={farmData.growingPlantCountPerRow}
                error={validation.growingPlantCountPerRow}
                helperText={
                  validation.growingPlantCountPerRow
                    ? "Please provide name"
                    : ""
                }
                onChange={handleChange}
                defaultValue=""
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <span className="input-label">Watering Schedule</span>
            <FormControl fullWidth>
              <TextBox
                isWhite={true}
                InputLabelProps={{ shrink: true }}
                name="growingWateringSchedule"
                onChange={handleChange}
                value={farmData.growingWateringSchedule}
                defaultValue=""
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <span className="input-label">Plant spacing</span>
            <FormControl fullWidth>
              <SingleCustomSelect
                isWhite={true}
                name="growingPlantSpacing"
                value={farmData.growingPlantSpacing}
                options={PLANT_SPACING}
                handleChange={handleChange}
                isError={validation.growingPlantSpacing}
                errorMessage="Please select Plant spacing"
                defaultValue=""
              />
            </FormControl>
          </Grid>
        </Grid>
      </>
    );
  };
  const renderWateringZone = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
          <p className="section-title">Watering Zone</p>
        </Grid>
        <br />
        <Grid container spacing={2} className="card-outline-container">
          <Grid item xs={12} sm={12} md={12}>
            <span className="input-label">Main reservoir capacity</span>
            <FormControl fullWidth>
              <TextBox
                isWhite={true}
                name="reservoirCapacity"
                value={farmData.reservoirCapacity}
                onChange={handleChange}
                error={validation.reservoirCapacity}
                helperText={
                  validation.reservoirCapacity
                    ? "Please provide reservoircapacity"
                    : ""
                }
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <span className="input-label">
              Nutrient water reservoir capacity
            </span>
            <FormControl fullWidth>
              <TextBox
                isWhite={true}
                name="nutrientWaterReservoirCapacity"
                value={farmData.nutrientWaterReservoirCapacity}
                onChange={handleChange}
                error={validation.nutrientWaterReservoirCapacity}
                helperText={
                  validation.nutrientWaterReservoirCapacity
                    ? "Please provide Nutrient water reservoir capacity"
                    : ""
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <span className="input-label">Ph up/down reservoir capacity</span>
            <FormControl fullWidth>
              <TextBox
                isWhite={true}
                name="phReservoirCapacity"
                onChange={handleChange}
                value={farmData.phReservoirCapacity}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <span className="input-label">
              Stock nutrient solution capacity
            </span>
            <FormControl fullWidth>
              <TextBox
                isWhite={true}
                name="stockNutrientSolutionCapacity"
                onChange={handleChange}
                value={farmData.stockNutrientSolutionCapacity}
                defaultValue=""
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <span className="input-label">Nutrient dilution ratio</span>
            <FormControl fullWidth>
              <TextBox
                isWhite={true}
                name="nutrientdilutionRatio"
                onChange={handleChange}
                value={farmData.nutrientdilutionRatio}
                defaultValue=""
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <span className="input-label">Type of nutrients</span>
            <FormControl fullWidth>
              <SingleCustomSelect
                isWhite={true}
                name="nutrientsType"
                value={farmData.nutrientsType}
                options={NUTRIENTS_TYPE}
                handleChange={handleChange}
                isError={validation.nutrientsType}
                errorMessage="Please select nutrientstype"
              />
            </FormControl>
          </Grid>
        </Grid>
      </>
    );
  };

  const renderPolyhouseZone = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={12}>
          <p className="section-title">Polyhouse</p>
        </Grid>
        <br />
        <Grid container spacing={2} className="card-outline-container">
          <Grid item xs={12} sm={6} md={6}>
            <span className="input-label">
              Polyhouse structure expected life
            </span>
            <FormControl fullWidth>
              <TextBox
                isWhite={true}
                name="polyhouseStructureExpectedLife"
                value={farmData.polyhouseStructureExpectedLife}
                onChange={handleChange}
                error={validation.polyhouseStructureExpectedLife}
                helperText={
                  validation.polyhouseStructureExpectedLife
                    ? "Please provide polyhouse structure expected life"
                    : ""
                }
                defaultValue=""
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <span className="input-label">Polyhouse plastic expected life</span>
            <FormControl fullWidth>
              <TextBox
                isWhite={true}
                name="polyhousePlasticExpectedLife"
                value={farmData.polyhousePlasticExpectedLife}
                onChange={handleChange}
                error={validation.polyhousePlasticExpectedLife}
                helperText={
                  validation.polyhousePlasticExpectedLife
                    ? "Please provide Polyhouse plastic expected life"
                    : ""
                }
                defaultValue=""
              />
            </FormControl>
          </Grid>
        </Grid>
      </>
    );
  };

  const renderActionButton = () => {
    return (
      <>
        <div className="flex-row-justify-center-container">
          <ButtonCustom
            isLight={true}
            handleButtonClick={handleClose}
            title="Cancel"
          />
          <ButtonCustom
            handleButtonClick={handleFarmSave}
            title={farmId ? "Update" : "Save"}
          />
        </div>
      </>
    );
  };

  return (
    <div>
      <PageHeader
        title={farmId ? `Edit ${farmData.name || ""}` : "Add a new farm"}
        buttonArray={[]}
      />
      {isAddFarmLoading && <Loader title="Adding Farm" />}
      {isUpdateFarmLoading && <Loader title="Updating Farms" />}
      {isFarmDetailsListLoading && <Loader title="Fetching Farm Details" />}
      <div className="page-container">
        {rendeFarmBasicInfo()}
        <br />
        {renderGerminationZone()}
        <br />
        {renderNurseryZone()}
        <br />
        {renderGrowZoneArea()}
        <br />
        {renderWateringZone()}
        <br />
        {renderPolyhouseZone()}
        <br />
        {renderActionButton()}
      </div>
    </div>
  );
}
