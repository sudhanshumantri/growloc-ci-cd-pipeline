import "./styles.css";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import {
  Backdrop,
  CircularProgress,
  FormControl,
  Paper,
  Button,
} from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonCustom from "../shared/button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import growlocCover from "../../../public/assets/growlocCover.webp";
import logo from "../../../public/assets/logo.png";
import TextBox from "../shared/text-box";
//import bottomImage from '../../assets/login-bottom-image.png';

export const ForgotPassword = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password,setPassword] = useState("")

  const [otp, setOtp] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const re = /^[0-10\b]{0,10}$/;
    let isError = false;
    if (mobileNumber.length !== 10 || re.test(mobileNumber)) {
      isError = true;
      setPhoneError(true);
    }
  };

  const handleMobileNumberChnage = (event) => {
    const { value } = event.target;
    setMobileNumber(value);
    setPhoneError(false);

  }

  const handleOtpChange = (e) => {
   setOtp(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent="center"
          sx={{
            backgroundColor: "F9F9F9",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#517223",
            backgroundPosition: "bottom",
            backgroundSize: "contain",
          }}
        >
          <img src={logo} />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 2,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "#517223" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h3" variant="h5">
              Forget Password
            </Typography>
            <Box component="form" sx={{ mt: 1 }}  onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <span className="custom-input-label">Mobile Number</span>
                  <span className="label-light">*</span>
                  <TextBox
                    isWhite={true}
                    fullWidth
                    value={mobileNumber}
                    name="mobileNumber"
                    type="number"
                    error={phoneError}
                    maxLength={10}
                    helperText={
                      phoneError ? "Please provide Vaild Phone Number" : ""
                    }
                    onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                      }}
      
                    onChange={handleMobileNumberChnage}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <ButtonCustom
                    isFullWidth={true}
                    title="Request Otp"
                    variant="contained"
                  />
                </Grid>
              </Grid>
            </Box>
            {otp && (
              <Box component="form" sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <span className="custom-input-label">Enter OTP</span>
                    <span className="label-light">*</span>
                    <TextBox
                    isWhite={true}
                      fullWidth
                      value={otp}
                      onChange={handleOtpChange}
                      name="otp"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ButtonCustom
                      isFullWidth={true}
                      title="Validate OTP Number"
                      variant="contained"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

{ password && (
              <Box component="form" sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <span className="custom-input-label">Enter New Password</span>
                    <span className="label-light">*</span>
                    <TextBox
                    isWhite={true}
                      size="small"
                      fullWidth
                      value={otp}
                      onChange ={handlePasswordChange}
                      id="otp"
                      name="otp"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <span className="custom-input-label">Re Enter New Password</span>
                    <span className="label-light">*</span>
                    <TextField
                      required
                      className="custom-input-box"
                      size="small"
                      fullWidth
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      id="otp"
                      name="otp"
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ButtonCustom
                      isFullWidth={true}
                      title="Validate OTP Number"
                      variant="contained"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
