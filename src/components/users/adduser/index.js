import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  FormControl,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
  FormControlLabel,
  Checkbox,
  FormGroup
} from '@mui/material/'
import CustomButton from '../../shared/button'
import TextBox from '../../shared/text-box'
import './style.css'
export default function AddUsersModal ({
  open,
  handleClose,
  handleSave,
  userDetails = {
    name: '',
    password: '',
    phone: '',
    email: '',
    confirmpassword: '',
    role: 'farmmanager',
    isEditMode: false
  }
}) {
  const { farmId } = useParams()
  const [userData, setUserData] = useState(userDetails)
  const [validations, setValidation] = useState({
    name: false,
    password: false,
    phone: false,
    confirmpassword: false,
    email: false
  })
  const handleChange = (e) => {
    const { value, name } = e.target
    setUserData({ ...userData, [name]: value })
    validations[name] && setValidation({ ...validations, [name]: false })
  }
  const handleUserValidation = () => {
    const errors = { ...validations }
    let isValid = true
    if (!userData.name) {
      errors.name = true
      isValid = false
    }
    if (!userData.phone || userData.phone.length < 10) {
      errors.phone = true
      isValid = false
    }
    if (!userData.password || userData.password.length < 6) {
      errors.password = true
      isValid = false
    }
    if (userData.password !== userData.confirmpassword) {
      errors.confirmpassword = true
      isValid = false
    }
    if (
      userData.email &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userData.email)
    ) {
      errors.email = true
      isValid = false
    }
    setValidation(errors)
    return isValid
  }

  const handleSaveUser = () => {
    if (userData.isEditMode) {
      const payload = {
        name: userData.name,
        role: userData.role
      }
      if (payload.name && payload.role) {
        handleSave(payload)
      }
    } else {
      const payload = {
        farmId,
        name: userData.name,
        password: userData.password,
        email: userData.email,
        phone: parseInt(userData.phone),
        role: userData.role ? userData.role : 'farmmanager'
      }
      if (handleUserValidation()) {
        handleSave(payload)
      }
    }
  }
  const isButtonSelected = (value) => {
    return (
      userData.role === value ||
      ((userData.role === undefined || userData.role === null) &&
        value === 'farmmanager')
    )
  }
  const renderActionButtons = () => {
    return (
      <>
        <div className='flex-row-justify-center-container'>
          <DialogActions>
            <CustomButton
              isLight
              handleButtonClick={handleClose}
              title='Cancel'
            />
            <CustomButton handleButtonClick={handleSaveUser} title='Save' />
          </DialogActions>
        </div>
      </>
    )
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className='dialog-title-container'>
          {userDetails.userId ? 'Update user' : 'Add a user'}
        </DialogTitle>
        <DialogContent sx={{ paddingTop: '10px' }}>
          <Grid container sx={{ margin: '1px', width: 500 }} spacing={2}>
            <Grid item xs={12} sm={6} md={12}>
              <br />
              <span className='input-label'>Name</span>
              <span className='label-light'>*</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite
                  name='name'
                  value={userData.name}
                  onChange={handleChange}
                  error={validations.name}
                  helperText={validations.name ? 'Please provide name' : ''}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <span className='input-label'>Phone Number</span>
              <span className='label-light'>*</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite
                  name='phone'
                  disabled={userData.isEditMode}
                  value={userData.phone}
                  onChange={handleChange}
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/[^\d]/g, '')
                      .slice(0, 10)
                  }}
                  inputProps={{
                    step: 1,
                    style: { appearance: 'none', '-moz-appearance': 'TextBox' }
                  }}
                  error={validations.phone}
                  helperText={
                    validations.phone ? 'Please provide valid phone number' : ''
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={12} hidden={userData.isEditMode}>
              <span className='input-label'>Email</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite
                  name='email'
                  disabled={userData.isEditMode}
                  value={userData.email}
                  onChange={handleChange}
                  error={validations.email}
                  helperText={
                    validations.email ? 'Please provide valid email' : ''
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={12} hidden={userData.isEditMode}>
              <span className='input-label'> Password</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite
                  name='password'
                  type='password'
                  disabled={userData.isEditMode}
                  variant='outlined'
                  value={userData.password}
                  onChange={handleChange}
                  error={validations.password}
                  helperText={
                    validations.password
                      ? 'please provide password atleast 6 characters '
                      : ''
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={12} hidden={userData.isEditMode}>
              <span className='input-label'>Confirm Password</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite
                  name='confirmpassword'
                  type='password'
                  value={userData.confirmpassword}
                  onChange={handleChange}
                  error={validations.confirmpassword}
                  helperText={
                    validations.confirmpassword ? 'password did not match ' : ''
                  }
                />
              </FormControl>
            </Grid>
            <br />
            <FormControl sx={{ width: '100px', margin: '15px' }}>
              <br />
              <span className='input-label'>Select Role</span>
              <FormGroup row name='role'>
                <FormControlLabel
                  control={
                    <Checkbox
                      value='farmmanager'
                      name='role'
                      checked={isButtonSelected('farmmanager')}
                      onChange={(e) => handleChange(e)}
                    />
                  }
                  label={<p className='input-label'>Farmmanager</p>}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value='agronomist'
                      name='role'
                      checked={isButtonSelected('agronomist')}
                      onChange={handleChange}
                    />
                  }
                  label={<p className='input-label'>Agronomist</p>}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value='supervisor'
                      name='role'
                      checked={isButtonSelected('supervisor')}
                      onChange={handleChange}
                    />
                  }
                  label={<p className='input-label'>Supervisor</p>}
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </DialogContent>
        {renderActionButtons()}
      </Dialog>
    </div>
  )
}
