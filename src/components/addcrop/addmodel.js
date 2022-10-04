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
export default function AddCorpModel({modelData}) {

  const [open, setOpen] = useState(false);
  const [personName, setPersonName] = useState('');
  const [germinationMethod, setGerminationMethod] = useState('');
  const [selectedData, setSelectedData] = useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    const selectedItem = modelData[event.target.value]
    setPersonName(event.target.value);
    setSelectedData(selectedItem);
  };
  const handleGerminationChange = (event) => {
    setGerminationMethod(event.target.value)
  }
  console.log(selectedData, germinationMethod);

  return (
    <div>

      <Button sx={{ m: 1 }} variant="outlined" onClick={handleClickOpen}>
        Add New
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{
            display: 'flex-box',
            alignItems: 'center',
            '& > :not(style)': { m: 3 },
          }}
        >
          <FormControl sx={{ m: 2, width: 450 }}>
            <InputLabel id="demo-multiple-name-label" variant="outlined" >Corp</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="corp" />}
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
          <FormControl sx={{ m: 2, width: 450 }}>
            <InputLabel id="demo-multiple-name-label"  variant="outlined" >Germination Method</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              onChange={handleGerminationChange}
              value={germinationMethod}
              input={<OutlinedInput label="corp" />}
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
        </Box>
        <h3>Stages</h3>
        <Grid container spacing={2}> 
          <Grid item xs={5} >
            {(selectedData.germinationMethod && selectedData.germinationMethod[germinationMethod]) ? 
            (selectedData.germinationMethod[germinationMethod].stages||[]).map(item=> (
              <TextField  sx={{ marginTop: 2,display:"flex-box", marginRight: 'auto',            

            }}
              key={item.duration} label={item.name} value ={item.duration} variant="outlined" />
            )): ''}
          </Grid>
        </Grid>
        <h3>Parameters</h3>
        <Grid container >
          <Grid  item xs={5}>
            {(selectedData.parameters || []).map((item)=> 
            <TextField  sx={{ marginTop: 2 , display:"flex-box",}}
            item key={item.name}label={item.name} value={item.value} variant="outlined" />
            )}
          </Grid>
        </Grid>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}







