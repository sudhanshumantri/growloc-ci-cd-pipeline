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
export default function AddFarmModal({ open, handleClick }) {
  const [farm, setFarm] = useState({});
  const [nameError, setNameError] = useState("");

  const handleChange = (event, name) => {
    setFarm({ ...farm, [name]: event.target.value });
  };

  const validateFarm = () => {
    if (farm.name) {
      handleClick(farm);
    } else {
      setNameError(true);
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClick}>
        <DialogTitle className="dialog-title-container">
          Add a new Farm{" "}
        </DialogTitle>
        <DialogContent sx={{ paddingTop: "20px" }}>
          <Grid container spacing={3}>
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
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label={"CultivableArea"}
                  variant="outlined"
                  onChange={(e) => handleChange(e, "cultivableArea")}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label={"ReservoirCapacity"}
                  onChange={(e) => handleChange(e, "reservoirCapacity")}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonCustom
            isLight={true}
            handleButtonClick={handleClick}
            title="Cancel"
          />
          <ButtonCustom handleButtonClick={() => validateFarm()} title="Save" />
        </DialogActions>
      </Dialog>
    </div>
  );
}
