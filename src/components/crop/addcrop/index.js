import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CustomButton from '../../shared/button'
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
    // const [open, setOpen] = useState(false);
    const [cropList, setCropList] = useState('');
    const [germinationMethod, setGerminationMethod] = useState('');
    const [selectedData, setSelectedData] = useState({});
    const [units, setUnits] = useState(1);
    const handleChange = (event) => {
        const selectedItem = modalData[event.target.value]
        setCropList(event.target.value);
        setSelectedData(selectedItem);
    };
    const handleGerminationChange = (event) => {
        setGerminationMethod(event.target.value)
    }
    const handleUnitsChange = (event) => {
        setUnits(event.target.value)
    }
    const handleSaveCrop = () => {
        // console.log(germinationMethod,selectedData);
        let cropData = {
            name: selectedData.name,
            scientificName: selectedData.scientificName,
            variety: selectedData.variety,
            parameters: selectedData.parameters,
            germinationMethod: selectedData.germinationMethod[germinationMethod],
        };
        let data = {
            farmId: parseInt(farmId),
            crop:cropData,
            qty: parseInt(units)
        }
        if(cropList && cropData && cropData.germinationMethod) {
            handleSave(data)
        } else {
        console.log(data);

        }
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className='dialog-title-container'>Add a new crop</DialogTitle>
                <DialogContent sx={{ paddingTop: '10px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} >
                            <FormControl fullWidth>
                                <InputLabel id="demo-multiple-name-label" variant="outlined" >Crop</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    value={cropList}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="crop" />}
                                    MenuProps={MenuProps}
                                >
                                    {(modalData || []).map((e, keyIndex) => (
                                        <MenuItem
                                            key={keyIndex}
                                            value={keyIndex}
                                        >
                                            {e.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} >
                            <FormControl fullWidth>
                                <TextField
                                    disabled={true}
                                    label={'Variety'}
                                    InputLabelProps={{ shrink: true }}
                                    value={selectedData.variety}
                                    variant="outlined" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} >
                            <FormControl fullWidth>
                                <TextField
                                    disabled={true}
                                    InputLabelProps={{ shrink: true }}
                                    label={'Scientific Name'}
                                    value={selectedData.scientificName}
                                    variant="outlined" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} >
                            <FormControl fullWidth>
                                <InputLabel id="demo-multiple-name-label" variant="outlined" >Germination Method</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    onChange={handleGerminationChange}
                                    value={germinationMethod}
                                    input={<OutlinedInput label="Germination Method" />}
                                    MenuProps={MenuProps}
                                >
                                    {(selectedData.germinationMethod || []).map((e, keyIndex) => (
                                        <MenuItem
                                            key={keyIndex}
                                            value={keyIndex}
                                        >
                                            {e.type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} >
                            <FormControl fullWidth>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    label={'Units'}
                                    value={units}
                                    onChange={handleUnitsChange}
                                    variant="outlined" />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <p className='header-title'>Stages</p>
                    <Grid container spacing={2}>
                        {(selectedData.germinationMethod && selectedData.germinationMethod[germinationMethod]) ?
                            (selectedData.germinationMethod[germinationMethod].stages || []).map(item => (
                                <Grid item xs={4} >
                                    <TextField
                                        disabled={true}
                                        key={item.duration} label={item.name} value={item.duration} variant="outlined" />
                                </Grid>
                            )) : ''}

                    </Grid>
                    <p className='header-title'>Parameters</p>
                    <Grid container spacing={2}>
                        {(selectedData.parameters || []).map((item) =>
                            <Grid item xs={4} >
                                <TextField
                                    disabled={true}
                                    item key={item.name} label={item.name} value={item.value} variant="outlined" />
                            </Grid>
                        )}
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
