import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import ButtonCustom from "../button";
export default function ConfirmDialogBox({ dialogState, buttonArray, subHeading}) {
  const renderButtons = () => {
    return buttonArray.map((item, index) => {
      return (
        <ButtonCustom
          key={index}
          isLight={item.isLight ? item.isLight : false}
          title={item.label}
          handleButtonClick={item.handler}
        />
      );
    });
  };
  return (
    <>
      <Dialog open={dialogState}>
        <form>
          <DialogTitle>Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>{subHeading}</DialogContentText>
          </DialogContent>
          <DialogActions>{renderButtons()}</DialogActions>
        </form>
      </Dialog>
    </>
  );
}

