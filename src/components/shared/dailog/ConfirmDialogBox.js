import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
} from "@mui/material/";
import ButtonCustom from "../button";
import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";
export default function ConfirmDialogBox({
  dialogState,
  buttonArray,
  subHeading,
}) {
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
        <form className="delete-box">
          <DialogTitle
            sx={{
              textAlign: "center",
              fontWeight: "400",
              fontSize: "36",
              color: "#D02800",
            }}
          >
            <ReportGmailerrorredRoundedIcon sx={{ verticalAlign: "sub" }} />
            Delete
          </DialogTitle>
          {/* <hr className="delete-box-horizontalline"/> */}
          <Divider />
          <DialogContent>
            <DialogContentText
              sx={{
                color: "#000000",
                textAlign: "center",
                fontWeight: "500",
                fontSize: "24",
              }}
            >
              {subHeading}
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{justifyContent:"center"}}>{renderButtons()}</DialogActions>
        </form>
      </Dialog>
    </>
  );
}
