import * as React from "react";
import { useState } from "react";
import {
  FormControl,
  Dialog,
  DialogActions,
  TextField,
  DialogTitle,
  DialogContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material/";

import ButtonCustom from "../../shared/button";
import TextBox from "../../shared/text-box";

export default function MoveCropLifeCycleModal({
  title,
  open,
  handleClick,
  maxQty,
  handleClose,
  isHarvestStage,
  isContiniousHarvet,
}) {
  const [units, setUnits] = useState("");
  const [kgs, setKgs] = useState("");
  const [complete, setComplete] = useState(false);
  const [unitError, setUnitError] = useState(false);
  const [unitErrorMessage, setUnitErrorMessage] = useState(false);
  const handleCompleteToggle = () => {
    setComplete(!complete);
  };
  const handleUnitsChange = (e) => {
    const numbers = e.target.value.replace(/[^0-9]/g, "");
    setUnits(numbers);
  };
  const handleKgChange = (e) => {
    let input = e.target.value;
    if (!input || input.match(/^\d{1,}(\.\d{0,4})?$/)) {
      setKgs(input);
    }
  };
  const handleModalInfoSave = () => {
    if (!units) {
      setUnitError(true);
      setUnitErrorMessage('"No of plants is required');
    } else if (parseInt(units) > maxQty) {
      setUnitError(true);
      setUnitErrorMessage("No of plants can't be greater than " + maxQty);
    } else {
      let data = {
        units,
        kgs,
        complete: isHarvestStage ? complete : false,
      };
      handleClick(
        units,
        kgs,
        isContiniousHarvet ? (isHarvestStage ? complete : false) : true
      );
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialog-title-container">{title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <span className="input-label">No of plants</span>
              <br />
              <FormControl fullWidth>
                <TextBox
                  // style={{ width: 300 }}
                  // label={"No of plants"}
                  isWhite={true}
                  name="units"
                  // InputLabelProps={{ shrink: true }}
                  value={units}
                  error={unitError}
                  helperText={unitError ? unitErrorMessage : ""}
                  onChange={handleUnitsChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              {isHarvestStage && (
                <>
                  <span className="input-label">Plants harvested in KGS?</span>

                  <FormControl fullWidth>
                    <TextField
                      // style={{ width: 300 }}
                      // label={"Plants harvested in KGS?"}
                      name="units"
                      // InputLabelProps={{ shrink: true }}
                      value={kgs}
                      onChange={handleKgChange}
                    />
                  </FormControl>
                  {isContiniousHarvet && (
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleCompleteToggle}
                            checked-={complete}
                          />
                        }
                        label="Do you want to dispose  the crops after this harvest?"
                      />
                    </FormGroup>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonCustom
            isLight={true}
            title="Cancel"
            handleButtonClick={handleClose}
          />
          <ButtonCustom title="Ok" handleButtonClick={handleModalInfoSave} />
        </DialogActions>
      </Dialog>
    </div>
  );
}
