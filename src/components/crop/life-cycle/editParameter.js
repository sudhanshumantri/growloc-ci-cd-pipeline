import React, { useState } from 'react'
import {
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle
} from '@mui/material/'
import TextBox from '../../shared/text-box'
import CustomButton from '../../shared/button'
export default function EditParameters ({
  open,
  modalData,
  activeStep,
  handleSave,
  handleClose
}) {
  const { FarmCropLifecycleStages } = modalData.cropDetails
  const selectedStageInformation = FarmCropLifecycleStages[activeStep]
  const [stageData, setStagaData] = useState(selectedStageInformation)
  const handleChange = (e, index) => {
    const tempData = { ...stageData }
    tempData.parameters[index].value = e.target.value
    setStagaData(tempData)
  }

  const renderActionBuutons = () => {
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
              handleButtonClick={() => handleSave(stageData)}
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
          Edit Parameters
        </DialogTitle>
        <DialogContent sx={{ paddingTop: '10px' }}>
          <br />
          <Grid container spacing={2}>
            {stageData.parameters.map((parameter, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <span className='input-label'>{parameter.name}</span>
                <FormControl fullWidth>
                  <TextBox
                    value={parameter.value}
                    onChange={(e) => handleChange(e, index)}
                  />
                </FormControl>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        {renderActionBuutons()}
      </Dialog>
    </div>
  )
}
