import * as React from 'react';
import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/system';

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
export default function AddCrop() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button  sx={{m: 1}} variant="outlined" onClick={handleClickOpen}>
          Add Corp
      </Button>
      <Dialog open={open} onClose={handleClose}>
      <Box
      sx={{
        display: 'flex-box',
        alignItems: 'center',
        '& > :not(style)': { m: 3 },
      }}
    >
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="demo-multiple-name-label" htmlFor="name"> Name</InputLabel>
        <Select
            labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
            <MenuItem value="hai">Hai</MenuItem>
            <MenuItem value="olivier">Olivier</MenuItem>
            <MenuItem value="kevin">Kevin</MenuItem>

        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
<DatePicker
  label="Date"
  onChange={(newValue) => {
    setValue(newValue);
  }}
  renderInput={(params) => (
    <TextField {...params}/>
  )}
/>
</LocalizationProvider>
<TextField
    id="outlined-required"
    label="Corp"
    variant="outlined"
  />
    </Box>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}







