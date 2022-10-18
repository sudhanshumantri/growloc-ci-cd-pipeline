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

export default function StartNewCycle({ open, handleClick, modalData }) {
  const [units, setUnits] = useState("");
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setUnits(e.target.value);
    if (e.target.value > modalData.cropDetails.qty) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClick}>
        <DialogTitle className="dialog-title-container">
          Add a Quantity{" "}
        </DialogTitle>
        <DialogContent>
          <Grid container sx={{ margin: "3px" }} spacing={3}>
            <Grid item xs={16} sm={6} md={6}>
              <FormControl>
                <TextField
                  style={{ width: 400 }}
                  fullWidth
                  label={"Quantity"}
                  name="quantity"
                  InputLabelProps={{ shrink: true }}
                  value={units}
                  error={error}
                  helperText={
                    error
                      ? `value should not be greater than specified quantity:${modalData.cropDetails.qty}`
                      : ""
                  }
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonCustom
            isLight={true}
            title="Cancel"
            handleButtonClick={handleClick}
          />
          <ButtonCustom title="Save" />
        </DialogActions>
      </Dialog>
    </div>
  );
}
