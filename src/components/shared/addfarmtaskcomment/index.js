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
  Button,
} from "@mui/material/";
import TextBox from "../text-box";
import CustomButton from "../button";

export default function AddFarmTaskComment({ open, handleSave, handleClose }) {
  const [taskComment, setTaskComments] = useState("");
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setTaskComments(e.target.value);
  };
  const handleFileChange = (event) => {
    event.preventDefault();
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  }
    

  const handleSaveComment = () => {
    let payload = {
      comment: taskComment,
      images: images,
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
                <TextBox
                  id="upload-images"
                  type="file"
                  onChange={handleFileChange}
                  inputProps={{ multiple: true }}
                />
              </FormControl>
            </Grid>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Uploaded Image"
                style={{ width: "200px", height: "200px", margin: "10px" }}
              />
            ))}
          </Grid>
        </DialogContent>
        {renderActionButton()}
      </Dialog>
    </div>  
  );
}

