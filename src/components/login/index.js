import React from 'react'
import './styles.css'
import {
  Backdrop,
  CircularProgress,
  TextField,
  Box,
  Grid,
  Paper,
  Avatar,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
  CssBaseline,
  FormHelperText
} from '@mui/material/'
import ButtonCustom from '../shared/button'
import loginpage from '../../../public/assets/loginpage.png'
import logo from '../../../public/assets/logo.png'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function Login ({ loginRequest, isLoginRequested, isLoginError, token }) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const handleButtonClick = (data) => {
    const loginData = {
      phone: parseInt(data.phone),
      password: data.password
    }
    loginRequest({
      loginData,
      navigate
    })
  }
  const renderLoader = () => {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  }
  const renderErrorMessage = () => {
    return <p className='error-message'>{isLoginError}</p>
  }
  return (
    <Grid
      container
      component='main'
      sx={{
        height: '100vh',
        backgroundImage: `url(${loginpage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100% 100vh',
        '@media (max-width: 960px)': {
          backgroundImage: 'none',
          backgroundColor: '#E5E4D7'
        }
      }}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        display={{ xs: 'none', sm: 'none', md: 'flex' }}
        alignItems='center'
        justifyContent='center'
      >
        <img src={logo} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={5}
        component={Paper}
        elevation={0}
        square
        justifyContent='center'
        alignItems='center'
        sx={{
          backgroundColor: '#E5E4D7',
          height: '75%',
          marginTop: '80px',
          borderRadius: '10px',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            my: 2,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '@media (max-width: 960px)': {
              maxWidth: '100% !important'
            }
          }}
        >
          <Avatar sx={{ bgcolor: '#517223' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h3' variant='h5'>
            Log In To Your Growloc Account
          </Typography>
          {isLoginError && renderErrorMessage()}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <span className='input-label'>Phone number</span>
              <span className='label-light'>*</span>
              <TextField
                className='custom-input-box'
                fullWidth
                type='tel'
                {...register('phone', {
                  required: true,
                  maxLength: 10,
                  pattern: /^\d{10}$/
                })}
                error={!!errors.phone}
                inputProps={{
                  maxLength: 10,
                  onKeyPress: (event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault()
                    }
                  }
                }}
              />
              {errors.phone && (
                <FormHelperText
                  sx={{ color: 'red', backgroundColor: '#E5E4D7' }}
                >
                  Please provide a valid phone number
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <span className='input-label'>Password</span>
              <span className='label-light'>*</span>
              <TextField
                type='password'
                className='custom-input-box'
                fullWidth
                {...register('password', { required: true })}
                error={!!errors.password}
              />
              {errors.password && (
                <FormHelperText
                  sx={{ color: 'red', backgroundColor: '#E5E4D7' }}
                >
                  Please provide password
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControlLabel label='Remember me' control={<Checkbox />} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <ButtonCustom
                isFullWidth
                handleButtonClick={handleSubmit(handleButtonClick)}
                title='SIGN IN'
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Link
                className='custom-anchor-tag'
                href='#/forgotpassword'
                variant='body2'
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                className='custom-anchor-tag'
                href='#/register'
                variant='body2'
              >
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
          {isLoginRequested && renderLoader(token)}
        </Box>
      </Grid>
    </Grid>
  )
}
export default Login
