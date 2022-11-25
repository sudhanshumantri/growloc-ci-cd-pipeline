import * as React from "react";
import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  Box,
} from "@mui/material/";

export default function PlantFormDialog() {
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
        Add Plant
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{
            display: "flex-box",
            alignItems: "center",
            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField id="name" label="Name" />
          <TextField id="type" label="type" />
          <TextField helperText=" " id="height" label="height" />
          <TextField id="rate" label="rate" />
          <TextField helperText=" " id="quantity" label="Quantity" />
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
