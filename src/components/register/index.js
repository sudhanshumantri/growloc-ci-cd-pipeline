import './styles.css'
import React, { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import { Backdrop, CircularProgress, FormControl, Paper, Button } from '@mui/material/';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import TextBox from '../shared/text-box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonCustom from "../shared/button";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import growlocCover from '../../../public/assets/growlocCover.webp'
import logo from '../../../public/assets/logo.png';
import loginpage from '../../../public/assets/loginpage.png';
import Loader from '../shared/loader';
//import bottomImage from '../../assets/login-bottom-image.png';

  export default function Resgister({registerRequest,isLoading}) {
  const [registrationData,setRegistrationData] = useState({
    name:"",
    phone:"",
    email:"",
    company:"",
    address:"",
    password:"",
  })

  const [validations, setValidation] = useState({
    name:false,
    phone:false,
    email:false,
    company:false,
    address:false,
    password:false,
  })
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
      if (!registrationData.email || !registrationData.email.includes('@gmail.com')) {
        errors.email = true;
        isValid = false;
      }
          if (!registrationData.address) {
        errors.phone = true;
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
        address:registrationData.address,
        password:registrationData.password
      };
      if (registrationValidations()) {
        registerRequest(payload)
        // console.log(payload);
      }
    }
    return (
      <>
       {isLoading && <Loader title="Adding user" />}
        <Grid container component="main" 
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
            md={7}
            display='flex'
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent='center'
            // sx={{
            //   backgroundColor: "F9F9F9",
            //   //  backgroundImage: `url(${growlocCover})`,
            //   backgroundRepeat: 'no-repeat',
            //   backgroundColor: '#517223',
            //   backgroundPosition: 'bottom',
            //   backgroundSize: 'contain',
            // }}
          >
            <img src={logo} />
          </Grid>
          <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square
           sx={{
            backgroundColor: '#E5E4D7',
            height: '75%',
            marginTop: '80px',
            borderRadius: '10px',
            overflowY : 'scroll'

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
              <Avatar sx={{ bgcolor: '#517223' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h3" variant="h5">
                Sign Up To Your Growloc Account
              </Typography>
              {/* <Box component="form" onSubmit={handleRegistrationSave} sx={{ mt: 1 }}> */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} >
                    <span className='custom-input-label'>Name</span>
                    <span className="label-light">*</span>
                    <TextField
                      className='custom-input-box'
                      size="small"
                      fullWidth
                      // onChange={this.handleChange}
                      // id="name"
                      // name="name"
                      // autoFocus
                      name="name"
                      value={registrationData.name}
                      onChange={handleChange}
                      error={validations.name}
                      helperText={validations.name ? "Please provide name" : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} >
                    <span className='custom-input-label'>Phone</span>
                    <span className="label-light">*</span>
                    <TextField
                      className='custom-input-box'
                       size="small"
                      fullWidth
                      // onInput={(e) => {
                      //   e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                      // }}
                      // onChange={this.handleChange}
                      // id="phone"
                      // name="phone"
                      // type="number"
                      // autoFocus
                      name="phone"
                      value={registrationData.phone}
                      onChange={handleChange}
                      error={validations.phone}
                      helperText={validations.phone ? "Please provide valid phone number" : ""}

                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} >
                    <span className='custom-input-label'>Email</span>
                    <span className="label-light">*</span>
                    <TextField
                      className='custom-input-box'
                     size="small"
                     fullWidth
                      // onChange={this.handleChange}
                      // id="email"
                      // name="email"
                      // type="email"
                      // autoFocus
                      isWhite={true}
                      name="email"
                      value={registrationData.email}
                      onChange={handleChange}
                      error={validations.email}
                      helperText={validations.email ? "Please provide valid email " : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} >
                    <span className='custom-input-label'>Company name</span>
                    <TextField
                       className='custom-input-box'
                       size="small"
                       fullWidth
                      // onChange={this.handleChange}
                      // id="company"
                      // name="company"
                      // autoFocus
                      isWhite={true}
                      name="company"
                      value={registrationData.company}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} >
                    <span className='custom-input-label'>Location</span>
                    <span className="label-light">*</span>
                    <TextField
                      className='custom-input-box'
                       size="small"
                       fullWidth
                      // onChange={this.handleChange}
                      // id="address"
                      // name="address"
                      // autoFocus
                      name="address"
                      value={registrationData.address}
                      onChange={handleChange}
                      error={validations.address}
                      helperText={validations.address ? "Please provide valid email " : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} >
                    <span className='custom-input-label'>Password</span>
                    <span className="label-light">*</span>
                    <TextField
                   size="small"
                   className='custom-input-box'
                    fullWidth
                      // name="password"
                      // type="password"
                      // id="password"
                      // onChange={this.handleChange}
                      // autoComplete="current-password"
                      name="password"
                      value={registrationData.password}
                      onChange={handleChange}
                      error={validations.password}
                      helperText={validations.password ? "please provide password atleast 6 characters " : ""}

                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} >
                    <ButtonCustom isFullWidth={true}   handleButtonClick={handleRegistrationSave}
                      title='Create Account' variant="contained"
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12} textAlign="center">
                    <Link className='custom-anchor-tag' href="#/login" variant="body2">
                      <p className='label-light'>{"Already have an account? Login"} </p>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
              {/* </Box> */}
          </Grid>
        </Grid>
      </>
    )
  }

