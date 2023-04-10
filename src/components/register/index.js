import React, { useState, useEffect } from "react";
import "./styles.css";
import Avatar from "@mui/material/Avatar";
import {
  Paper,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  FormHelperText,
} from "@mui/material/";
import ButtonCustom from "../shared/button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import logo from "../../../public/assets/logo.png";
import loginpage from "../../../public/assets/loginpage.png";
import Loader from "../shared/loader";

export default function Resgister({ registerRequest, isLoading }) {
  const [registrationData, setRegistrationData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    address: "",
    password: "",
  });

  const [validations, setValidation] = useState({
    name: false,
    phone: false,
    email: false,
    company: false,
    address: false,
    password: false,
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
    validations[name] && setValidation({ ...validations, [name]: false });
  };

  const registrationValidations = () => {
    let errors = { ...validations };
    let isValid = true;
    if (!registrationData.name) {
      errors.name = true;
      isValid = false;
    }
    if (!registrationData.phone || registrationData.phone.length < 10) {
      errors.phone = true;
      isValid = false;
    }
    if (
      !registrationData.email ||
      !registrationData.email.includes("@gmail.com")
    ) {
      errors.email = true;
      isValid = false;
    }
    if (!registrationData.address) {
      errors.address = true;
      isValid = false;
    }
    if (!registrationData.password || registrationData.password.length < 6) {
      errors.password = true;
      isValid = false;
    }
    setValidation(errors);
    return isValid;
  };

  const handleRegistrationSave = () => {
    let payload = {
      name: registrationData.name,
      phone: registrationData.phone,
      email: registrationData.email,
      company: registrationData.company,
      address: registrationData.address,
      password: registrationData.password,
    };
    if (registrationValidations()) {
      registerRequest(payload);
    }
  };
  return (
    <>
      {isLoading && <Loader title="Registering user" />}
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          backgroundImage: `url(${loginpage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "100% 100vh",
        }}
      >
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
        >
          <img src={logo} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={4}
          component={Paper}
          elevation={6}
          square
          sx={{
            backgroundColor: "#E5E4D7",
            height: "75%",
            marginTop: "80px",
            borderRadius: "10px",
            overflowY: "scroll",
          }}
        >
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
              Sign Up To Your Growloc Account
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <span className="custom-input-label">Name</span>
                <span className="label-light">*</span>
                <TextField
                  className="custom-input-box"
                  size="small"
                  fullWidth
                  name="name"
                  value={registrationData.name}
                  onChange={handleChange}
                  error={validations.name}
                />
                {validations.name && (
                  <FormHelperText
                    sx={{ color: "red", backgroundColor: "#E5E4D7" }}
                  >
                    Please provide valid name
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <span className="custom-input-label">Phone</span>
                <span className="label-light">*</span>
                <TextField
                  className="custom-input-box"
                  size="small"
                  fullWidth
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/[^0-9\s-]/g)
                      .slice(0, 10);
                  }}
                  name="phone"
                  value={registrationData.phone}
                  onChange={handleChange}
                  error={validations.phone}
                  // helperText={
                  //   validations.phone ? "Please provide valid phone number" : ""
                  // }
                />
                {validations.phone && (
                  <FormHelperText
                    sx={{ color: "red", backgroundColor: "#E5E4D7" }}
                  >
                    Please provide valid phone number
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <span className="custom-input-label">Email</span>
                <span className="label-light">*</span>
                <TextField
                  className="custom-input-box"
                  size="small"
                  fullWidth
                  isWhite={true}
                  name="email"
                  value={registrationData.email}
                  onChange={handleChange}
                  error={validations.email}
                  // helperText={
                  //   validations.email ? "Please provide valid email " : ""
                  // }
                />
                {validations.email && (
                  <FormHelperText
                    sx={{ color: "red", backgroundColor: "#E5E4D7" }}
                  >
                    Please provide valid email
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <span className="custom-input-label">Company name</span>
                <TextField
                  className="custom-input-box"
                  size="small"
                  fullWidth
                  isWhite={true}
                  name="company"
                  value={registrationData.company}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <span className="custom-input-label">Location</span>
                <span className="label-light">*</span>
                <TextField
                  className="custom-input-box"
                  size="small"
                  fullWidth
                  name="address"
                  value={registrationData.address}
                  onChange={handleChange}
                  error={validations.address}
                  // helperText={
                  //   validations.address ? "Please provide valid email " : ""
                  // }
                />
                {validations.address && (
                  <FormHelperText
                    sx={{ color: "red", backgroundColor: "#E5E4D7" }}
                  >
                    Please provide valid address
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <span className="custom-input-label">Password</span>
                <span className="label-light">*</span>
                <TextField
                  size="small"
                  className="custom-input-box"
                  fullWidth
                  name="password"
                  value={registrationData.password}
                  onChange={handleChange}
                  error={validations.password}
                  // helperText={
                  //   validations.password
                  //     ? "please provide password atleast 6 characters "
                  //     : ""
                  // }
                />
                {validations.password && (
                  <FormHelperText
                    sx={{ color: "red", backgroundColor: "#E5E4D7" }}
                  >
                    please provide password atleast 6 characters
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <ButtonCustom
                  isFullWidth={true}
                  handleButtonClick={handleRegistrationSave}
                  title="Create Account"
                  variant="contained"
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} textAlign="center">
                <Link
                  className="custom-anchor-tag"
                  href="#/login"
                  variant="body2"
                >
                  <p className="label-light">
                    {"Already have an account? Login"}{" "}
                  </p>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
