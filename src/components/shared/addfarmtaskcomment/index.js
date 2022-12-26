import * as React from "react";
import { useState } from "react";
import {
  FormControl,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
} from "@mui/material/";
import TextBox from "../text-box";
import CustomButton from "../button";

export default function AddFarmTaskComment({ open, handleSave, handleClose }) {
  const [taskComment, setTaskComments] = useState("");
  // const [selectImage,setSelectImage] = useState("");

  const handleChange = (e) => {
    setTaskComments(e.target.value);
  };


  const uploadImage =  async (e) => {
    const file = e.target.files[0];
    const baseImage =  await convertBaseImage(file)
    console.log(baseImage, "baseUrl");
    // setSelectImage(baseImage)
  }


const convertBaseImage = (file) => {
  return new Promise ((resolve,reject)=>{
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);

    }
    fileReader.onerror = (error) => {
      reject(error)
    }

  })

}
  const handleSaveComment = () => {
    let payload = {
      comment: taskComment,

    };
      handleSave(payload);
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
            <CustomButton title="Save" handleButtonClick={handleSaveComment} />
          </DialogActions>
        </div>
      </>
    );
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialog-title-container">
          Add a Comment
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <span className="input-label">Comment</span>
              <br />
              <FormControl fullWidth>
                <TextBox
                  isWhite={true}
                  name="taskComment"
                  value={taskComment}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <span className="input-label">Add Image</span>
              <FormControl fullWidth>
                <TextField
                name="image"
                type="file"
                onChange={uploadImage}
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
