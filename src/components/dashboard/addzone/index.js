import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {FormControl,Dialog,DialogTitle,DialogContent,DialogActions,Grid} from "@mui/material/";
import CustomButton from "../../shared/button";
import TextBox from "../../shared/text-box";


export default function AddZoneModal({
  open,
  handleSave,
  handleClose,
}) {
  
    const [zoneData,setZoneData] = useState({
        name:"",
        size:"",
    })



    const handleChange = (e) => {
        const { value, name } = e.target;
        setZoneData({ ...zoneData, [name]: value });
      };
    

  const renderActionButton = () => {
    return (
      <>
        <div className="flex-row-justify-center-container">
          <DialogActions>
            <CustomButton
              isLight={true}
              handleButtonClick={handleClose}
              title="Cancel"
            />
            <CustomButton  title="Save" />
            {/* handleButtonClick={handleSaveCrop} */}
          </DialogActions>
        </div>
      </>
    );
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialog-title-container">
        Create a new Zone       
         </DialogTitle>
         <br/>
        <DialogContent sx={{ paddingTop: "10px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label"> Name</span>
               <span className="label-light">*</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite={true}
                  name ="name"
                  value={zoneData.name}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label">Size</span>
              <span className="label-light">*</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite={true}
                  name="size"
                  value={zoneData.size}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            </Grid>
        </DialogContent>
        {renderActionButton()}
      </Dialog>
    </div>
  );
}
