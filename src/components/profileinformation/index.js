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
// export  const ProfileInformation = (updateUserProfile) => {
  export default function ProfileInformation({updateUserProfile,logout,updateUserPhone}) {
  const navigate = useNavigate();
  let loginObject = JSON.parse(localStorage.getItem("AUTH_OBJECT"));
  const { profile } = loginObject;
  const [profileData, SetProfileData] = useState(profile)
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({
    name: false,
    email: false,
    address:false,

  });
  const [phoneValidations,setPhoneValidations] = useState({
    phone:false,
    password:false,
  })

  const handleChange = (e) => {
    const { value, name } = e.target;
    SetProfileData({ ...profileData, [name]: value });
    validation[name] && setValidation({ ...validation, [name]: false });
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

  const handleProfileDataSave = () => {
    let payload = {
      name: profileData.name,
      email: profileData.email,
      address: profileData.address,
      userId:profileData.userId
    };
    if(handleProfileValidations()) {
      updateUserProfile(payload);
    }
  };
const handlePhoneNumberChange = () => {
  const payload = {
    oldPhone: profile?.phone,
    newPhone: profileData.phone,
    password: password,
  };
  updateUserPhone(payload)
}
  const renderPersonalInfo = () => {
    return (
      <>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <h3>Personal</h3>
          </Grid>
          <Grid item xs={12}>
              Your Phone Number is currently <b>{profileData.phone}</b>{" "}
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
            <CustomButton title="Update"  handleButtonClick={handleProfileDataSave}/>
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
            />
          </Grid>
          <Grid item xs={6}>
             <span className='custom-input-label'>Current Password</span>
                    <TextBox
                         fullWidth                         
                         name="password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)} />
                </Grid>
          <Grid item xs={12}>
            <CustomButton title="Update" handleButtonClick={handlePhoneNumberChange}  />
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
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <span className="custom-input-label">New Password Again</span>
          <span className="label-light">*</span>
          <TextBox
             fullWidth
             isWhite={true}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton title="Change Password" />
        </Grid>
      </Grid>
    );
  };
  return (
    <div>
      <PageHeader title="Profile Information" showBackButton={showBackButton} />
      <div className="page-container">
        <DialogContent sx={{ paddingTop: "10px" }}>
          {renderPersonalInfo()}
          {renderPhoneInfo()}
          {renderPasswordSection()}
        </DialogContent>
      </div>
    </div>
  );
};
