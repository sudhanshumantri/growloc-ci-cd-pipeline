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
export default function MoveCropLifeCycleModal({ title, open, handleSave, handleClose, handleChange, data }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle className="dialog-title-container">
                Schedule Crop Harvesting
            </DialogTitle>
            <DialogContent>
                <p className="label-bold">Harvesting cycle will repeat every week on?</p>
                <div className='repeat-days-container'>
                    {days.map((day, index) => {
                        let isChecked = data.indexOf(day.value);
                        return (
                            <Box key={index}
                                onClick={() => {
                                    handleChange(day.value)
                                }}
                                sx={{
                                    padding: "5px 13px",
                                    backgroundColor: isChecked == -1 ? "#EBEEEF" : "#517223",
                                    fontSize: "12px",
                                    color: isChecked == -1 ? "#0E2C4B" : "white",
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
                    handleButtonClick={handleSave}
                />
            </DialogActions>
        </Dialog>

    );
}
