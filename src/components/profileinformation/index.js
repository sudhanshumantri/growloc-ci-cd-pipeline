import React from "react";
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
export const ProfileInformation = () => {
  const navigate = useNavigate();
  let loginObject = JSON.parse(localStorage.getItem("AUTH_OBJECT"));
  const { profile } = loginObject;

  const handleBackButton = () => {
    navigate(-1);
  };

  let showBackButton = [
    {
      handler: handleBackButton,
    },
  ];

  const renderPersonalInfo = () => {
    return (
      <>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <h3>Personal</h3>
          </Grid>
          <Grid item xs={12}>
              Your Phone Number is currently <b>{profile.phone}</b>{" "}
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
              value={profile?.name}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <span className="custom-input-label">Email</span>
            <TextBox
              size="small"
              fullWidth
              isWhite={true}
              name="phone"
              value={profile?.email}
            />
          </Grid>
          <Grid item xs={8}>
            <span className="custom-input-label">Address </span>
            <TextBox
              isWhite={true}
              multiline={true}
              value={profile?.address}
              variant="outlined"
              rows={2}
              name="address"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <CustomButton title="Update" />
          </Grid>
          <Grid item xs={12}>
            <hr />
          </Grid>
        </Grid>
      </>
    );
  };

  const renderEmailInfo = () => {
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
              value={profile?.phone}
              name="email"
            />
          </Grid>
          <Grid item xs={6}>
             <span className='custom-input-label'>Current Password</span>
                    <TextBox
                         fullWidth                         
                         name="password"
                    />
                </Grid>
          <Grid item xs={12}>
            <CustomButton title="Update" />
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
          {/* <Grid container sx={{ margin: "1px", width: 500 }} spacing={2}> */}
          {/* <Grid item xs={12} sm={6} md={6}>
              <span className="input-label">Name</span>
              <FormControl fullWidth>
                <TextBox isWhite={true} value={profile?.name} />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label">Email</span>
              <FormControl fullWidth>
                <TextBox isWhite={true} value={profile?.email} />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <span className="input-label">Phone Number</span>
              <FormControl fullWidth>
                <TextBox isWhite={true} value={profile?.phone} />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <span className="input-label">Role</span>
              <FormControl fullWidth>
                <TextBox isWhite={true} value={profile?.role} />
              </FormControl>
            </Grid> */}
          {/* {renderEmailInfo()} */}
          {renderPersonalInfo()}
          {renderEmailInfo()}
          {renderPasswordSection()}
          {/* </Grid> */}
        </DialogContent>
      </div>
    </div>
  );
};
