import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../shared/page-header";
import Loader from "../shared/loader";
import TextBox from "../shared/text-box";
import SingleCustomSelect from "../shared/select";
import ButtonCustom from "../shared/button";
import { Grid, FormControl } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import {
    WATERING_TYPE, NUTRIENTS_TYPE
} from "../../config";
export default function ManageUsers({
    updateFarm,
    isUpdateFarmLoading,
    fecthFarmDetails,
    farmDetailsList,
    isFarmDetailsListLoading, }) {
    const [farmData, setFarmData] = useState({
        reservoirCapacity: "",
        nutrientWaterReservoirCapacity: "",
        phReservoirCapacity: "",
        stockNutrientSolutionCapacity: "",
        nutrientdilutionRatio: "",
        nutrientsType: "",
    });
    const [validation, setValidation] = useState({
        reservoirCapacity: false,
        nutrientWaterReservoirCapacity: false,
        nutrientsType: false
    });
    const navigate = useNavigate();

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
    let { farmId } = useParams();
    const validateFarm = () => {
        let errors = { ...validation };
        let isValid = true;
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

        setValidation(errors);
        return isValid;
    };
    const handleFarmSave = () => {
        let requestFarmData = {
            reservoirCapacity: farmData.reservoirCapacity,
            nutrientWaterReservoirCapacity: farmData.nutrientWaterReservoirCapacity,
            phReservoirCapacity: farmData.phReservoirCapacity,
            stockNutrientSolutionCapacity: farmData.stockNutrientSolutionCapacity,
            nutrientdilutionRatio: farmData.nutrientdilutionRatio,
            nutrientsType: farmData.nutrientsType
        }
        if (validateFarm()) {
            handleSave(requestFarmData);
        }
    }
    const handleSave = (payload) => {
        if (farmId) {
            updateFarm({ payload, farmId,shouldRedirect:false });
        }
    };
    const handleChange = (e) => {
        const { value, name } = e.target;
        setFarmData({ ...farmData, [name]: value });
        validation[name] && setValidation({ ...validation, [name]: false });
    };
    const handleBackButton = () => {
        navigate('/')
      }
      let showBackButton = [
        {
          handler: handleBackButton,
        },
      ];
    
    
    let buttonArray = []
    return (
        <div>
            <PageHeader title="Water Management" buttonArray={buttonArray} showBackButton={showBackButton} />
            {isUpdateFarmLoading && <Loader title="Updating Details" />}
            {isFarmDetailsListLoading && <Loader title="Fetching  Details" />}
            <div className="page-container">
                <Grid container spacing={2}>
                    <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <span className="input-label">Main reservoir capacity</span>
                                <span className="label-light">*</span>

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
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <span className="input-label">
                                    Nutrient water reservoir capacity
                                </span>
                                <span className="label-light">*</span>

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
                                <span className="label-light">*</span>
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
                    </Grid>
                </Grid>
                <div className="flex-row-justify-center-container">
                    <ButtonCustom
                        handleButtonClick={handleFarmSave}
                        title={"Update"}
                    />
                </div>
            </div>
        </div>
    );
}