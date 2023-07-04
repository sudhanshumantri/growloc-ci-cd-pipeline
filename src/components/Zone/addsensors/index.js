import React, { useState } from 'react'
import {
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid
} from '@mui/material/'
import CustomButton from '../../shared/button'
import TextBox from '../../shared/text-box'

export default function AddZoneSensorsModal ({ open, handleSave, handleClose }) {
  const [sensorsData, setSensorsData] = useState({
    sensorId: ''
  })
  const handleChange = (e) => {
    const { value, name } = e.target
    setSensorsData({ ...sensorsData, [name]: value })
  }

  const handleZoneSensorsSave = () => {
    const requestFarmDashBoardZoneData = {
      sensorId: sensorsData.sensorId
    }
    handleSave(requestFarmDashBoardZoneData)
  }

  const renderActionButton = () => {
    return (
      <>
        <div className='flex-row-justify-center-container'>
          <DialogActions>
            <CustomButton
              isLight
              handleButtonClick={handleClose}
              title='Cancel'
            />
            <CustomButton
              handleButtonClick={handleZoneSensorsSave}
              title='Save'
            />
          </DialogActions>
        </div>
      </>
    )
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className='dialog-title-container'>
          Add a new Sensor
        </DialogTitle>
        <br />
        <DialogContent sx={{ paddingTop: '10px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <span className='input-label'>Sensor Id</span>
              <span className='label-light'>*</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite
                  name='sensorId'
                  value={sensorsData.sensorId}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        {renderActionButton()}
      </Dialog>
    </div>
  )
}
