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
  const [selectImage,setSelectImage] = useState("");

  const handleChange = (e) => {
    setTaskComments(e.target.value);
  };


  const uploadImage =  async (e) => {
    const file = e.target.files[0];
    const baseImage =  await convertBaseImage(file)
    console.log(baseImage, "baseUrl");
    setSelectImage(baseImage)
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
      image:selectImage,
      
    };
    console.log(payload);
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
                isWhite={true}
                type="file"
                defaultValue={selectImage}               
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


// import React, { useState } from 'react';

// function ImageConverter() {
//   const [base64Image, setBase64Image] = useState('');

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       setBase64Image(reader.result);
//     };
//   };

//   return (
//     <>
//       <input type='file' onChange={handleFileChange} />
//       {base64Image && <img src={base64Image} alt='base64 image' />}
//     </>
//   );
// }

// export default ImageConverter;
// In this example, the component has a state variable called base64Image that is used to store the base64 string of the image. The handleFileChange function is used to handle the onChange event of the file input. Inside the function, a FileReader object is created and the readAsDataURL method is used to read the image file.

// The onload event is then used to update the base64Image state variable with the base64 string of the image. Finally, the component renders an input element of type file to select the image, and if there is a base64Image present, it will render an image tag with the src as the base64Image

// You can also use libraries like react-base64-image-upload or base64-img to convert the image to base64 string.




