import React from 'react'
import './styles.css'
import Avatar from '@mui/material/Avatar'
import {
  Paper,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  FormHelperText
} from '@mui/material/'
import ButtonCustom from '../shared/button'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import logo from '../../../public/assets/logo.png'
import loginpage from '../../../public/assets/loginpage.png'
import Loader from '../shared/loader'
import { useForm } from 'react-hook-form'

export default function Resgister ({ registerRequest, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm()
  const password = watch('password', '')
  const handleRegistrationSave = (data) => {
    registerRequest(data)
  }
  return (
    <>
      {isLoading && <Loader title='Registering user' />}
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
          md={7}
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          display={{ xs: 'none', sm: 'none', md: 'flex' }}
        >
          <img src={logo} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          component={Paper}
          elevation={6}
          square
          sx={{
            backgroundColor: '#E5E4D7',
            height: '75%',
            marginTop: '80px',
            borderRadius: '10px',
            overflowY: 'scroll',
            boxShadow: 'none'
          }}
        >
          <Box
            sx={{
              my: 2,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ bgcolor: '#517223' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h3' variant='h5'>
              Sign Up To Your Growloc Account
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <span className='custom-input-label'>Name</span>
                <span className='label-light'>*</span>
                <TextField
                  className='custom-input-box'
                  size='small'
                  fullWidth
                  {...register('name', { required: true })}
                  error={!!errors.name}
                />
                {errors.name && (
                  <FormHelperText
                    sx={{ color: 'red', backgroundColor: '#E5E4D7' }}
                  >
                    Please provide a valid name
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <span className='custom-input-label'>Phone</span>
                <span className='label-light'>*</span>
                <TextField
                  className='custom-input-box'
                  fullWidth
                  size='small'
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
                    Please provide a valid phone number (minimum 10 digits)
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <span className='custom-input-label'>Email</span>
                <span className='label-light'>*</span>
                <TextField
                  className='custom-input-box'
                  size='small'
                  fullWidth
                  {...register('email', {
                    required: true,
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                  })}
                  error={!!errors.email}
                />
                {errors.email && (
                  <FormHelperText
                    sx={{ color: 'red', backgroundColor: '#E5E4D7' }}
                  >
                    Please provide a valid email address
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <span className='custom-input-label'>Company name</span>
                <TextField
                  className='custom-input-box'
                  size='small'
                  fullWidth
                  name='company'
                  {...register('company')}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <span className='custom-input-label'>Location</span>
                <span className='label-light'>*</span>
                <TextField
                  className='custom-input-box'
                  size='small'
                  fullWidth
                  {...register('address', { required: true })}
                  error={!!errors.address}
                />
                {errors.address && (
                  <FormHelperText
                    sx={{ color: 'red', backgroundColor: '#E5E4D7' }}
                  >
                    Please provide valid address
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <span className='custom-input-label'>Password</span>
                <span className='label-light'>*</span>
                <TextField
                  size='small'
                  className='custom-input-box'
                  fullWidth
                  type='password'
                  {...register('password', {
                    required: true,
                    minLength: 6
                  })}
                  error={!!errors.password}
                />
                {errors.password && (
                  <FormHelperText
                    sx={{ color: 'red', backgroundColor: '#E5E4D7' }}
                  >
                    Please provide a password with at least 6 characters
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <span className='custom-input-label'>Confirm Password</span>
                <span className='label-light'>*</span>
                <TextField
                  size='small'
                  className='custom-input-box'
                  fullWidth
                  type='password'
                  {...register('confirmPassword', {
                    required: true,
                    validate: (value) => value === password
                  })}
                  error={!!errors.confirmPassword}
                />
                {errors.confirmPassword && (
                  <FormHelperText
                    sx={{ color: 'red', backgroundColor: '#E5E4D7' }}
                  >
                    Passwords do not match
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <ButtonCustom
                  isFullWidth
                  handleButtonClick={handleSubmit(handleRegistrationSave)}
                  title='Create Account'
                  variant='contained'
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} textAlign='center'>
                <Link
                  className='custom-anchor-tag'
                  href='#/login'
                  variant='body2'
                >
                  <p className='label-light'>
                    {'Already have an account? Login'}{' '}
                  </p>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
