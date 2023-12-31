import * as React from 'react'
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Box
} from '@mui/material/'
import ButtonCustom from '../../shared/button'
import { WEEKDAYS } from '../../../config'
export default function MoveCropLifeCycleModal ({
  open,
  handleSave,
  handleClose,
  handleChange,
  data
}) {
  const renderActionButtons = () => {
    return (
      <>
        <div className='flex-row-justify-center-container'>
          <DialogActions>
            <ButtonCustom
              isLight
              title='Cancel'
              handleButtonClick={handleClose}
            />
            <ButtonCustom title='Schedule' handleButtonClick={handleSave} />
          </DialogActions>
        </div>
      </>
    )
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className='dialog-title-container'>
        Schedule Crop Harvesting
      </DialogTitle>
      <DialogContent>
        <p className='label-bold'>
          Harvesting cycle will repeat every week on?
        </p>
        <div className='repeat-days-container'>
          {WEEKDAYS.map((day, index) => {
            const isChecked = data.indexOf(day.value)
            return (
              <Box
                key={index}
                onClick={() => {
                  handleChange(day.value)
                }}
                sx={{
                  padding: '5px 13px',
                  backgroundColor: isChecked === -1 ? '#EBEEEF' : '#517223',
                  fontSize: '12px',
                  color: isChecked === -1 ? '#0E2C4B' : 'white',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7]
                  }
                }}
              >
                {day.label}
              </Box>
            )
          })}
        </div>
      </DialogContent>
      {renderActionButtons()}
    </Dialog>
  )
}
