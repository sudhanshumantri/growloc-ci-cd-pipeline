import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';



export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button sx={{ m: 1 }} variant="outlined" onClick={handleClickOpen}>
        Add Seed
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{
            display: 'flex-box',
            alignItems: 'center',
            '& > :not(style)': { m: 1 },
          }}
        >
          <TextField
            id="name"
            label="Name"
          />
          <TextField
            id="quantity"
            label="Quantity"
          />
          <TextField
            helperText=" "
            id="type"
            label="type"
          />
          <TextField
            id="weight"
            label="Weight"
          />
          <TextField
            helperText=" "
            id="quality"
            label="Quality"

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
