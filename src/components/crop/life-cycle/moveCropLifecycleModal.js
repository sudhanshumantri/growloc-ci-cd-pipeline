import * as React from "react";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ButtonCustom from "../../shared/button";
import { Grid } from "@mui/material";
export default function MoveCropLifeCycleModal({ title, open, handleClick, maxQty, handleClose, isHarvestStage }) {
    const [units, setUnits] = useState("");
    const [kgs, setKgs] = useState("");
    const [complete, setComplete] = useState(true);
    const [unitError, setUnitError] = useState(false);
    const [unitErrorMessage, setUnitErrorMessage] = useState(false);
    const handleCompleteToggle = () => {
        setComplete(!complete);
    }
    const handleUnitsChange = (e) => {
        const numbers = e.target.value.replace(/[^0-9]/g, '');
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
            setUnitError(true)
            setUnitErrorMessage('"No of plants is required')
        } else if (parseInt(units) > maxQty) {
            setUnitError(true)
            setUnitErrorMessage("No of plants can't be greater than " + maxQty)
        } else {
            let data = {
                units,
                kgs,
                complete: isHarvestStage ? complete : false,
            }
            handleClick(units, kgs, isHarvestStage ? complete : false)
        }
    }

    const handleDialogClose = (event, reason) => {
        if (reason && reason == "backdropClick") 
            return;
            handleClick();
    }
    return (

        <div>
            <Dialog open={open} onClose={handleDialogClose}>
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
                                    onChange={handleUnitsChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            {isHarvestStage && (
                                <>
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
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked onChange={handleCompleteToggle} checked-={complete} />} c label="Do you want to end the lifecycle of this crop after this dispose?" />
                                    </FormGroup>
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
                    <ButtonCustom title="Ok"
                        handleButtonClick={handleModalInfoSave}
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
}
