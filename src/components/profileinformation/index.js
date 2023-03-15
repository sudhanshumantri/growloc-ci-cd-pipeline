import React, { useState } from "react";
import {
  Grid,
  DialogContent,
  FormControl,
  TextField,
  DialogActions,
} from "@mui/material";
import PageHeader from "../shared/page-header";
import { useNavigate } from "react-router-dom";
import CustomButton from "../shared/button";
import TextBox from "../shared/text-box";
import Loader from "../shared/loader";
// export  const ProfileInformation = (updateUserProfile) => {
export default function ProfileInformation({
  updateUserProfile,
  logout,
  updateUserPhone,
  isLoading,
  isSuccess,
  updateNewPassword,
}) {
  const navigate = useNavigate();
  let loginObject = JSON.parse(localStorage.getItem("AUTH_OBJECT"));
  const { profile } = loginObject || "";
  const [profileData, setProfileData] = useState(profile);
  const [password, setPassword] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState(false);
  const [updatePassword, setUpdatePassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [validation, setValidation] = useState({
    name: false,
    email: false,
    address: false,
  });
  const [passwordValidations, setPasswordValidations] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [phoneValidations, setPhoneValidations] = useState({
    phone: false,
    password: false,
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setProfileData({ ...profileData, [name]: value });
    validation[name] && setValidation({ ...validation, [name]: false });
  };
  const handleNewPasswordChange = (e) => {
    const { value, name } = e.target;
    setUpdatePassword({ ...updatePassword, [name]: value });
    passwordValidations[name] &&
      setPasswordValidations({ ...passwordValidations, [name]: false });
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPhoneValidations(false);
  };
  const handleBackButton = () => {
    navigate(-1);
  };
  let showBackButton = [
    {
      handler: handleBackButton,
    },
  ];
  const handleProfileValidations = () => {
    let errors = { ...validation };
    let isValid = true;
    if (!profileData.name) {
      errors.name = true;
      isValid = false;
    }
    if (!profileData.email) {
      errors.email = true;
      isValid = false;
    }
    if (!profileData.address) {
      errors.address = true;
      isValid = false;
    }
    setValidation(errors);
    return isValid;
  };

  const handleUpdatePassword = () => {
    let errors = { ...passwordValidations };
    let isValid = true;
    if (!updatePassword.newPassword) {
      errors.newPassword = true;
      isValid = false;
    }
    if (!updatePassword.confirmPassword) {
      errors.confirmPassword = true;
      isValid = false;
      setconfirmPasswordError("Please Provide Password ");
    }
    if (updatePassword.newPassword !== updatePassword.confirmPassword) {
      errors.confirmPassword = true;
      isValid = false;
      setconfirmPasswordError("Confirm Password does not match");
    }
    setPasswordValidations(errors);
    return isValid;
  };
  const handleProfileDataSave = () => {
    let payload = {
      name: profileData.name,
      email: profileData.email,
      address: profileData.address
    };
    if (handleProfileValidations()) {
      updateUserProfile(payload);
    }
  };
  const handlePhoneValidations = () => {
    let errors = { ...phoneValidations };
    let isValid = true;
    if (!profileData.phone) {
      errors.phone = true;
      isValid = false;
    }
    if (!password) {
      errors.password = true;
      isValid = false;
    }
    setPhoneValidations(errors);
    return isValid;
  };

  const handlePhoneNumberChange = () => {
    const payload = {
      phone: profileData.phone,
      password: password,
    };
    if (handlePhoneValidations()) {
      updateUserPhone(payload);
    }
  };

  const handleUpdatePasswordChange = () => {
    const payload = {
      password: updatePassword.newPassword,
    };
    if (handleUpdatePassword()) {
      console.log(payload);
      updateNewPassword(payload);
    }
  };
  const renderPersonalInfo = () => {
    return (
      <>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <h3>Personal</h3>
          </Grid>
          <Grid item xs={12}>
            Your Phone Number is currently <b>{profile?.phone}</b>{" "}
          </Grid>
          <Grid item xs={12}>
            <h3>Profile</h3>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <span className="custom-input-label">Name</span>
            <TextBox
              isWhite={true}
              fullWidth
              name="name"
              value={profileData?.name}
              onChange={handleChange}
              error={validation.name}
              helperText={validation.name ? "Please provide name" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <span className="custom-input-label">Email</span>
            <TextBox
              size="small"
              fullWidth
              isWhite={true}
              name="email"
              value={profileData?.email}
              onChange={handleChange}
              error={validation.email}
              helperText={validation.email ? "Please provide Email" : ""}
            />
          </Grid>
          <Grid item xs={8}>
            <span className="custom-input-label">Address </span>
            <TextBox
              isWhite={true}
              multiline={true}
              value={profileData?.address}
              rows={2}
              name="address"
              fullWidth
              onChange={handleChange}
              error={validation.address}
              helperText={validation.address ? "Please provide address" : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomButton
              title="Update"
              handleButtonClick={handleProfileDataSave}
            />
          </Grid>
          <Grid item xs={12}>
            <hr />
          </Grid>
        </Grid>
      </>
    );
  };

  const renderPhoneInfo = () => {
    return (
      <>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <h3>Phone Number</h3>
          </Grid>
          <Grid item xs={12}>
            <span className="label-light">
              To make changes to your phone number, please verify your current
              password
            </span>
          </Grid>
          <Grid item xs={6}>
            <span className="custom-input-label">Phone Number</span>
            <TextBox
              fullWidth
              value={profileData?.phone}
              name="phone"
              onChange={handleChange}
              error={phoneValidations.phone}
              helperText={
                phoneValidations.phone ? "Please provide phone Number" : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <span className="custom-input-label">Current Password</span>
            <TextBox
              fullWidth
              name="password"
              value={password}
              onChange={handlePasswordChange}
              error={phoneValidations.password}
              helperText={
                phoneValidations.password
                  ? "Please provide current password"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <CustomButton
              title="Update"
              handleButtonClick={handlePhoneNumberChange}
            />
          </Grid>
          <Grid item xs={12}>
            <hr />
          </Grid>
        </Grid>
      </>
    );
  };

  const renderPasswordSection = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Password</h3>
        </Grid>
        <Grid item xs={12}>
          <span className="label-light">
            To make changes to your password, please verify your current
            password
          </span>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <span className="custom-input-label">New Password</span>
          <span className="label-light">*</span>
          <TextBox
            fullWidth
            isWhite={true}
            value={updatePassword.newPassword}
            name="newPassword"
            onChange={handleNewPasswordChange}
            error={passwordValidations.newPassword}
            helperText={
              passwordValidations.newPassword
                ? "Please provide current password"
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <span className="custom-input-label">New Password Again</span>
          <span className="label-light">*</span>
          <TextBox
            fullWidth
            isWhite={true}
            value={updatePassword.confirmPassword}
            name="confirmPassword"
            onChange={handleNewPasswordChange}
            error={passwordValidations.confirmPassword}
            helperText={
              passwordValidations.confirmPassword ? confirmPasswordError : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton
            title="Change Password"
            handleButtonClick={handleUpdatePasswordChange}
          />
        </Grid>
      </Grid>
    );
  };
  return (
    <div>
      <PageHeader title="Profile Information" showBackButton={showBackButton} />
      <div className="page-container">
         {isLoading && <Loader title="Updating Profile" />}
      {/* {isSuccess && <Loader title="Updating Phone Number" />} */} 
        <DialogContent sx={{ paddingTop: "10px" }}>
          {renderPersonalInfo()}
          {renderPhoneInfo()}
          {renderPasswordSection()}
        </DialogContent>
      </div>
    </div>
  );
}
