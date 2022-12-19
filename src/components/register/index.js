import './styles.css'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Backdrop, CircularProgress, FormControl, Paper, Button } from '@mui/material/';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonCustom from "../shared/button";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import growlocCover from '../../../public/assets/growlocCover.webp'
import logo from '../../../public/assets/logo.png';
//import bottomImage from '../../assets/login-bottom-image.png';
export default class Resgister extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      registrationData: {

      },
      disabled: true
    }

  }
  handleChange = (event) => {
    let { registrationData } = this.state;
    let errorStatus = event.target.name + 'Error';
    registrationData[event.target.name] = event.target.value;
    this.setState({
      registrationData
    })
  }
  handleDropdownChanges = (value, props) => {
    let { registrationData } = this.state;
    let { name } = props;
    registrationData[name] = value;
    this.setState({
      registrationData: registrationData
    })

  }

  handleSubmit = (event) => {
    event.preventDefault();
    let { registrationData } = this.state;
    // let client_id = registrationData.storeurl.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
    // client_id = client_id.replace(/\./g, "_");
    // registrationData.clientid = client_id;
    // registrationData.totalcustomer = parseInt(registrationData.totalcustomer);
    // registrationData.user = registrationData.email;
    // console.log(registrationData);
    this.props.registerRequest(registrationData);
  }
  handleCapthaValidation = (value) => {
    this.setState({
      disabled: false
    })
  }
  renderLoader = () => {
    return (
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        className='login-loader'
      // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }


  render() {
    let { emailError, passwordError, email, password, disabled } = this.state;
    let { isLoading, isSuccess } = this.props;
    return (
      <>
        {isLoading && (
          this.renderLoader()
        )}

        <Grid container component="main" sx={{ height: '100vh' }}>
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
            sx={{
              backgroundColor: "F9F9F9",
              //  backgroundImage: `url(${growlocCover})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#517223',
              backgroundPosition: 'bottom',
              backgroundSize: 'contain',
            }}
          >
            <img src={logo} />
          </Grid>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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

              <Box component="form" onSubmit={this.handleSubmit} sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} >
                    <span className='custom-input-label'>Name</span>
                    <span className="label-light">*</span>

                    <TextField
                      required
                      className='custom-input-box'
                      size="small"
                      fullWidth
                      onChange={this.handleChange}
                      id="name"
                      name="name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} >
                    <span className='custom-input-label'>Phone</span>
                    <span className="label-light">*</span>
                    <TextField
                      required
                      className='custom-input-box'
                      size="small"
                      fullWidth
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                      }}
                      onChange={this.handleChange}
                      id="phone"
                      name="phone"
                      type="number"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} >
                    <span className='custom-input-label'>Email</span>
                    <span className="label-light">*</span>
                    <TextField
                      required
                      className='custom-input-box'
                      size="small"
                      fullWidth
                      onChange={this.handleChange}
                      id="email"
                      name="email"
                      type="email"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} >
                    <span className='custom-input-label'>Company Name</span>
                    <TextField
                      required
                      className='custom-input-box'
                      size="small"
                      fullWidth
                      onChange={this.handleChange}
                      id="company"
                      name="company"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} >
                    <span className='custom-input-label'>Location</span>
                    <span className="label-light">*</span>
                    <TextField
                      required
                      className='custom-input-box'
                      size="small"
                      fullWidth
                      onChange={this.handleChange}
                      id="address"
                      name="address"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} >
                    <span className='custom-input-label'>Password</span>
                    <span className="label-light">*</span>
                    <TextField
                      required
                      size="small"
                      className='custom-input-box'
                      fullWidth
                      name="password"
                      type="password"
                      id="password"
                      onChange={this.handleChange}
                      autoComplete="current-password"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12} >
                    <ButtonCustom isFullWidth={true} title='Create Account' variant="contained"
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
            </Box>
          </Grid>
        </Grid>
      </>
    )
  }
}