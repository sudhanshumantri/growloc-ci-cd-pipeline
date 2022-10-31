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
import { Box } from '@mui/material'

import { Grid } from "@mui/material";
const days = [
    { label: 'S', value: '7' },
    { label: 'M', value: '1' },
    { label: 'T', value: '2' },
    { label: 'W', value: '3' },
    { label: 'Th', value: '4' },
    { label: 'F', value: '5' },
    { label: 'Sa', value: '6' },
]
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
    return (
        <Dialog open={open} onClose={handleClick}>
            <DialogTitle className="dialog-title-container">
                Schedule Crop Harvesting
            </DialogTitle>
            <DialogContent>
                <p className="label-bold">Harvesting cycle will repeat every week on?</p>
                <div className='repeat-days-container'>
                    {days.map((day, index) => {
                        let isChecked = true;
                        return (
                            <Box key={index}
                                // onClick={() => {
                                //     handleFlowCardUpdate(day.value, {
                                //         stepObject: stepObject,
                                //         userDataKey: 'days'
                                //     }
                                //     )
                                // }}
                                sx={{
                                    padding: "5px 13px",
                                    backgroundColor: isChecked == -1 ? "#2B98D3" : "#EBEEEF",
                                    fontSize: "12px",
                                    color: isChecked == -1 ? "white" : "#0E2C4B",
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                        opacity: [0.9, 0.8, 0.7],
                                    },
                                }}
                            >
                                {day.label}
                            </Box>
                        )
                    })}
                </div>
            </DialogContent>
            <DialogActions>
                <ButtonCustom
                    isLight={true}
                    title="Cancel"
                    handleButtonClick={handleClose}
                />
                <ButtonCustom title="Schedule"
                    handleButtonClick={handleModalInfoSave}
                />
            </DialogActions>
        </Dialog>

    );
}
