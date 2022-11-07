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
import SingleCustomSelect from "../../shared/select";
import { germination } from "../../../config";
import { wateringType } from "../../../config";
import { nursaryType } from "../../../config";
import { growingZone } from "../../../config";
import { plantSpacing } from "../../../config";
import { select } from "redux-saga/effects";
import TextBox from "../../shared/text-box";
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
<<<<<<< HEAD
=======
  const germination = ["Tray with coco peat", "Oasis cubes", "Coco plugs"];
  const wateringType = ["Manual", "automated"]
  const nursaryType = ["Open (No humidity control)", "Closed dome (Humidity control)"]
  const growingZone = ['NFT system', "Trough system ", "Raft system", "Dutch bucket system"]
  const plantSpacing = ['Plant to Plant', "Row to Row"]
>>>>>>> origin/main
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
              onChange={(e) => handleChange(e, "Farm Area")}
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
          <SingleCustomSelect
            inputLable="Germination Type"
            name="germination"
            lable="Germination Type"
            value={farm.germination || ""}
            options={germination}
            handleChange={(e) => {
              handleChange(e, "germination");
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextBox InputLabelProps={{ shrink: true }}  label ={"Germination Area"} onChange={(e) => handleChange(e, "GerminationArea")}
/>
          {/* <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"Germination Area"}
              onChange={(e) => handleChange(e, "GerminationArea")}
            />
          </FormControl> */}
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"No. of seeds per plantation"}
              onChange={(e) => handleChange(e, "seeds")}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <SingleCustomSelect
            inputLable="Watering Type"
            name="germinationwater"
            lable="Watering Type"
            value={farm.germinationWater || ""}
            options={wateringType}
            handleChange={(e) => {
              handleChange(e, "germinationWater");
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"Watering Schedule"}
              type="number"
              onChange={(e) => handleChange(e, "wateringschedule")}
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
          <SingleCustomSelect
            inputLable="Nursery Zone"
            name="nurserytype"
            lable="Nursery Type"
            value={farm.nurserytype || ""}
            options={nursaryType}
            handleChange={(e) => {
              handleChange(e, "nurserytype");
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"Nursary Area"}
              onChange={(e) => handleChange(e, "nursaryarea")}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <SingleCustomSelect
            inputLable="Watering Type"
            name="nursarywateringtype"
            lable="Watering Type"
            value={farm.nursarywateringtype || ""}
            options={wateringType}
            handleChange={(e) => {
              handleChange(e, "nursarywateringtype");
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"No of seeds for Nursery"}
              onChange={(e) => handleChange(e, "nurseryseeds")}
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
              onChange={(e) => handleChange(e, "nursaryschedule")}
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
          <SingleCustomSelect
            inputLable="Growing Zone"
            name="growing"
            lable="Growing Zone"
            value={farm.growing || ""}
            options={growingZone}
            handleChange={(e) => {
              handleChange(e, "growing");
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"Watering Schedule"}
              type="number"
              onChange={(e) => handleChange(e, "growingschedule")}
              InputProps={{ inputProps: { min: 1, max: 10 } }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              label={"Growing Area"}
              onChange={(e) => handleChange(e, "growingarea")}
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
              label={"No of rows"}
              onChange={(e) => handleChange(e, "rows")}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <SingleCustomSelect
            inputLable="Plant spacing"
            name="plantspacing"
            lable="Plant spacing"
            value={farm.plantspacing || ""}
            options={plantSpacing}
            handleChange={(e) => {
              handleChange(e, "plantspacing");
            }}
          />
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
              onChange={(e) => {
                handleChange(e, "mainreservoir");
              }}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              label={"Nutrient water reservoir capacity"}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                handleChange(e, "nutrient");
              }}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              label={"Input water analysis report"}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                handleChange(e, "input");
              }}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              label={"Ph up/down reservoir capacity"}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                handleChange(e, "input");
              }}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <TextField
              label={"Stock nutrient solution capacity"}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                handleChange(e, "stock");
              }}
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
