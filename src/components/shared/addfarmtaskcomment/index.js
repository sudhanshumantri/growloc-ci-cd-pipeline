import React, { useState } from "react";
import {
  FormControl,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material/";
import TextBox from "../text-box";
import CustomButton from "../button";
import CloseIcon from "@mui/icons-material/Close";
import "./style.css";

export default function AddFarmTaskComment({ open, handleSave, handleClose }) {
  const [taskComment, setTaskComments] = useState("");
  const [images, setImages] = useState([]);
  const [commentError, setCommentError] = useState(false)

  const handleChange = (e) => {
    setTaskComments(e.target.value);
    setCommentError(false)
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
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
  };

  const handleSaveComment = () => {

    if (!taskComment) {
      setCommentError(true);
      return;
    }
    let payload = {
      comment: taskComment,
      images: images,
    };
    handleSave(payload);
  };

  const renderImages = () => {
    return images.map((image, index) => (
      <div key={index} className="image-container">
        <img
          src={image}
          alt="Uploaded Image"
          style={{ width: "200px", height: "200px", margin: "10px" }}
        />
        <div className="close-icon" onClick={() => handleRemoveImage(index)}>
          <CloseIcon />
        </div>
      </div>
    ));
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
                  error={commentError}
                  helperText={commentError? "Please provide comment" : ""}

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

            <Grid item xs={12} sm={12} md={12}>
              {renderImages()}
            </Grid>
          </Grid>
        </DialogContent>
        {renderActionButton()}
      </Dialog>
    </div>
  );
}
