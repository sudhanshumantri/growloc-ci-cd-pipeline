import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import CustomButton from '../../shared/button'
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
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

export default function AddCropModal({ modalData, open, handleSave, handleClose }) {
    let { farmId } = useParams();
    const [selectedCrop, setselectedCrop] = useState('');
    const [startDate, setStartDate] = useState(moment());
    const [units, setUnits] = useState(1);
    const handleCropChange = (event) => {
        setselectedCrop(event.target.value);
    };
    const handleUnitsChange = (event) => {
        setUnits(event.target.value)
    }
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value)
    }
    const handleSaveCrop = () => {
        let requestData = {
            farmId: parseInt(farmId),
            qty: parseInt(units),
            start_date: startDate,
            crop: selectedCrop,
        }
        handleSave(requestData);
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className='dialog-title-container'>Add a new crop to Lifecycle</DialogTitle>
                <DialogContent sx={{ paddingTop: '10px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} >
                            <FormControl fullWidth>
                                <InputLabel id="demo-multiple-name-label" variant="outlined" >Crop</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    value={selectedCrop}
                                    onChange={handleCropChange}
                                    input={<OutlinedInput label="crop" />}
                                    MenuProps={MenuProps}
                                >
                                    {(modalData || []).map((e, keyIndex) => (
                                        <MenuItem
                                            key={keyIndex}
                                            value={e}
                                        >
                                            {e.crop.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} >
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DatePicker
                                        label="Start Date"
                                        variant="outlined"
                                        value={startDate}
                                        minDate={startDate}
                                        onChange={handleStartDateChange}
                                        renderInput={(params) => <TextField variant="outlined" InputLabelProps={{ shrink: true }} {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} >
                            <FormControl fullWidth>
                                <TextField
                                    label={'Units'}
                                    InputLabelProps={{ shrink: true }}
                                    value={units}
                                    onChange={handleUnitsChange}
                                    variant="outlined" />
                            </FormControl>
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <CustomButton isLight={true} handleButtonClick={handleClose} title='Cancel' />
                    <CustomButton handleButtonClick={handleSaveCrop} title='Save' />
                </DialogActions>
            </Dialog>
        </div>
    );
}
