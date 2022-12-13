import * as React from "react";
import { useState } from "react";
import {
  FormControl,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material/";
import TextBox from "../../shared/text-box";
import CustomButton from "../../shared/button";

export default function AddFarmTaskComment({
   open,
  handleSave,
  handleClose,
}) {

    const [taskComment,setTaskComments] = useState("")
  
    const handleChange = (e) => {
        setTaskComments(e.target.value)
    }
    //   const taskCommentsValidations = () => {
    //     let isError = false;
    //     if (!taskComment.comment) {
    //         setTaskCommentError(true);
    //         isError = true;
    //       }
    //   return isError;
    //   }
      const handleSaveComment = () => {
        let payload = {
            comment:taskComment
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
        <DialogTitle className="dialog-title-container">Add a Comment</DialogTitle>
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
          </Grid>
        </DialogContent>
        {renderActionButton()}
      </Dialog>
    </div>
  );
}
