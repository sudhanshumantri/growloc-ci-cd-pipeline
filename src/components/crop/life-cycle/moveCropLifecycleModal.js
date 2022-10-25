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

export default function MoveCropLifeCycleModal({ title, open, handleClick, maxQty, handleClose, isHarvestStage }) {
    const [units, setUnits] = useState("");
    const [kgs, setKgs] = useState("");
    const [unitError, setUnitError] = useState(false);
    const [unitErrorMessage, setUnitErrorMessage] = useState(false);
    const handleChange = (e) => {
        const numbers = e.target.value.replace(/[^0-9]/g, '');
        setUnits(numbers);

    };
    const handleKgChange = (e) => {
        let input=e.target.value;
        if (!input || input.match(/^\d{1,}(\.\d{0,4})?$/)) {
            setKgs(input);
        }
    };
    const handleModalInfoSave = () => {
        if (!units) {
            setUnitError(true)
            setUnitErrorMessage('"No of plants is required')
        } else if (parseInt(units) > maxQty) {
            setUnitError(true)
            setUnitErrorMessage("No of plants can't be greater than " + maxQty)
        } else {
            handleClick(units,kgs)
        }
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClick}>
                <DialogTitle className="dialog-title-container">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12}>
                            <br />
                            <FormControl fullWidth>
                                <TextField
                                    // style={{ width: 300 }}
                                    label={"No of plants"}
                                    name="units"
                                    InputLabelProps={{ shrink: true }}
                                    value={units}
                                    error={unitError}
                                    helperText={
                                        unitError
                                            ? unitErrorMessage
                                            : ""
                                    }
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            {isHarvestStage && (
                                <FormControl fullWidth>
                                    <TextField
                                        // style={{ width: 300 }}
                                        label={"Plants harvested in KGS?"}
                                        name="units"
                                        InputLabelProps={{ shrink: true }}
                                        value={kgs}
                                        onChange={handleKgChange}
                                    />
                                </FormControl>
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
                    <ButtonCustom title="Save"
                        handleButtonClick={handleModalInfoSave}
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
}
