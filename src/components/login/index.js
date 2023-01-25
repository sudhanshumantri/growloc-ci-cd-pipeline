import "./styles.css";
import * as React from "react";
import { useState } from "react";
import { Backdrop, CircularProgress, TextField, Box, Grid, Paper, Avatar, Typography, Link, Checkbox,FormControlLabel } from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";
import ButtonCustom from "../shared/button";
import growlocCover from '../../../public/assets/growlocCover.webp'
import loginpage from '../../../public/assets/loginpage.png'
import logo from '../../../public/assets/logo.png';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Login({ loginRequest, isLoginRequested, isLoginError, token }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleButtonClick = () => {
    const re = /^[0-10\b]{0,10}$/;
    let isError = false;
    if (phone.length !== 10 || re.test(phone)) {
      isError = true;
      setPhoneError(true);
    }
    if (password == "") {
      setPasswordError(true);
      isError = true;
    }

    if (!isError) {
      loginRequest({ phone: parseInt(phone), password });
    }
  };
  const renderLoader = () => {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };
  const renderErrorMessage = () => {
    return <p className="error-message">{isLoginError}</p>;
  };
  return (
    <Grid
      container
      component="main"
      sx={{
        height: '100vh',
        backgroundImage: `url(${loginpage})`,
        backgroundRepeat: 'no-repeat',
        //backgroundColor: '#517223',
        backgroundPosition: 'center',
        backgroundSize: '100% 100vh',
      }}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        display='flex'
        alignItems={'center'}
        justifyContent='center'
      // sx={{
      //   backgroundColor: "F9F9F9",
      //  // backgroundImage: `url(${growlocCover})`,
      //   backgroundRepeat: 'no-repeat',
      //   backgroundColor: '#517223',
      //   backgroundPosition: 'bottom',
      //   backgroundSize: 'contain',
      // }}

      >
        <img src={logo} />
      </Grid>
      <Grid
        item xs={12}
        sm={8} md={5}
        component={Paper}
        elevation={0} square
        // justifyContent='center'
        sx={{
          backgroundColor: '#E5E4D7',
          //   display : 'flex',
          //  alignItems:'center',
          height: '75%',
          marginTop: '80px',
          borderRadius: '10px'
        }}
      >
        <Box
          sx={{
            my: 2,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{ bgcolor: '#517223' }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h3" variant="h5">
            Log In To Your Growloc Account
          </Typography>
          {/* <h1>Login to your Glowloc Account</h1> */}
          {isLoginError && renderErrorMessage()}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} >
              <span className='input-label'>Phone number</span>
              <span className="label-light">*</span>
              <TextField
                required
                fullWidth
                id="phone"
                size="small"
                className='custom-input-box'
                // label="Phone number"
                type="number"
                name="phone"
                value={phone}
                helperText={phoneError ? "Please provide Vaild Phone Number" : ""}
                error={phoneError}
                maxLength={10}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                }}
                onChange={(event) => {
                  const { value } = event.target;
                  setPhone(value);
                  setPhoneError(false);
                }}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} >
              <span className='input-label'>Password</span>
              <span className="label-light">*</span>
              <TextField
                required
                fullWidth
                size="small"
                className='custom-input-box'
                name="password"
                type="password"
                id="password"
                error={passwordError}
                helperText={passwordError ? "Please provide password" : ""}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} >
              <FormControlLabel
                label="Remember me"
                control={
                  <Checkbox/>
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} >
              <ButtonCustom
                isFullWidth={true}
                handleButtonClick={handleButtonClick}
                title="SIGN IN"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Link className='custom-anchor-tag' href="#/forgotpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link className='custom-anchor-tag' href="#/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          {isLoginRequested && renderLoader(token)}
        </Box>
        {/* </Box> */}
      </Grid>

    </Grid>
  );
}

export default Login;
