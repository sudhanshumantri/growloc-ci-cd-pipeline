import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CustomButton from "../../shared/button";
import { Grid } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

export default function AddUsersModal({
  open,
  handleClose,
  handleSave,
  userDetails = {
    name: "",
    password: "",
    phone: "",
    role: "farmmanager",
    isEditMode: false,
  },
}) {
  const { farmId } = useParams();
  const [userData, setUserData] = useState(userDetails);
  const [isNameError, setIsNameError] = useState(false);
  const [isPhoneError,setIsPhoneError] = useState(false)
  const [isPasswordError,setIsPasswordError] = useState(false)
  const handleChange = (e) => {
    
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleUserValidation = (data) => {
    const re = /^[0-10\b]{0,10}$/;
    let isError = false;
    if (!userData.name) {
      setIsNameError(true);
      isError = true;
    }
    if (!userData.phone) {
      setIsPhoneError(true);
      isError = true;
      
    }
    if(userData.password !==userData.confirmpassword) {
      setIsPasswordError(true);
      isError = true;   
    }
    return isError;
  }
  const handleSaveUser = () => {
    let payload = {
      farmId: parseInt(farmId),
      name: userData.name,
      password: userData.password,
      phone: parseInt(userData.phone),
      role: userData.role,
    };
    let isError = handleUserValidation(payload)
    if (!isError) {
      handleSave(payload)
  };
}
  const isButtonSelected = (value) => {
    if (userData.role === value) {
      return true;
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialog-title-container">{userDetails.userId? "Update user": "Add a user"}</DialogTitle>
        <DialogContent sx={{ paddingTop: "10px" }}>
          <Grid container sx={{ margin: "1px", width: 500 }} spacing={2}>
            <Grid item xs={12} sm={6} md={12}>
              <br />
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label={"Name"}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  id="name"
                  name="name"
                  value={userData.name}
                  error={isNameError}
                  helperText={isNameError ? 'Please provide name' : ""}
                  onChange={(e) => {isNameError && setIsNameError(false)
                    handleChange(e)}}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label={"Phone Number"}
                  id="phone"
                  name="phone"
                  disabled={userData.isEditMode}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  InputProps={{ inputProps: { maxLength: 10 } }}
                  value={userData.phone}
                  error={isPhoneError}
                  helperText={isPhoneError ? 'Please provide phone number' : ""}
                  onChange={(e) => {isPhoneError && setIsPhoneError(false)
                    handleChange(e)}}
                />
              </FormControl>
              </Grid>
            <Grid item xs={12} sm={6} md={12} hidden={userData.isEditMode}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label={"Password"}
                  id="password"
                  name="password"
                  disabled={userData.isEditMode}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  value={userData.password}
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={12} hidden={userData.isEditMode}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label={"Confirm Password"}
                  id="confirmpassword"
                  name="confirmpassword"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  value={userData.confirmpassword}
                  error={isPasswordError}
                  helperText={isPasswordError ? 'Password does not match' : ""}              
                  onChange={(e) =>{isPasswordError && setIsPasswordError(false)
                     handleChange(e)}}
                />
              </FormControl>
            </Grid>
              <br/>
              {" "}
              <FormControl>
                <br/>
                {" "}
              <FormLabel id="demo-row-radio-buttons-group-label" >
                    Select Role
                  </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  // name="row-radio-buttons-group"
                  value={userData.role}
                  name="role"
                  id="role"
                >
                  <FormControlLabel
                    value="farmmanager"
                    control={<Radio />}
                    label="FarManager"
                    checked={isButtonSelected("farmmanager")}
                    onChange={(e) => handleChange(e)}
                  />
                  <FormControlLabel
                    value="ergonomists"
                    control={<Radio />}
                    label="Ergonomists"
                    checked={isButtonSelected("ergonomists")}
                    onChange={(e) => handleChange(e)}
                  />
                  <FormControlLabel
                    value="supervisor"
                    control={<Radio />}
                    label="Supervisor"
                    checked={isButtonSelected("supervisor")}
                    onChange={(e) => handleChange(e)}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
        </DialogContent>
        <DialogActions>
          <CustomButton
            isLight={true}
            handleButtonClick={handleClose}
            title="Cancel"
          />
          <CustomButton handleButtonClick={handleSaveUser} title="Save" />
        </DialogActions>
      </Dialog>
    </div>
  );
}
