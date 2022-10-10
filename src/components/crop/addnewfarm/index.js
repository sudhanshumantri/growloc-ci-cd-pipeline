import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
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
export default function AddNewModel({ modelData, open, handleClick }) {

    const [personName, setPersonName] = React.useState('');
    const handleChange = (event) => {
        const selectedItem = modelData[event.target.value]
        setPersonName(event.target.value);
        // setSelectedData(selectedItem);
    };
    const handleGerminationChange = (event) => {
        // setGerminationMethod(event.target.value);
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClick}>
                <DialogTitle className='dialog-title-container'>Add a new </DialogTitle>
                <DialogContent sx={{ paddingTop: '10px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} >
                            <FormControl fullWidth>
                                <InputLabel id="demo-multiple-name-label" variant="outlined" >Crop</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="crop" />}
                                    MenuProps={MenuProps}
                                >
                                    {(modelData || []).map((e, keyIndex) => (
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
                        </Grid>

                        </DialogContent>
                <DialogActions>
                    <CustomButton handleButtonClick={handleClick} title='Save'/>
                </DialogActions>
            </Dialog>

        </div>
    );
}
