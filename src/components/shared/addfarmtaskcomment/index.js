import React, { useEffect, useState } from 'react'
import {
  FormControl,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
  Select,
  MenuItem
} from '@mui/material/'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import FormHelperText from '@mui/material/FormHelperText'
import TextBox from '../text-box'
import CustomButton from '../button'
import CloseIcon from '@mui/icons-material/Close'
import './style.css'

export default function AddFarmTaskComment ({
  open,
  handleSave,
  handleClose,
  isTaskStatusChange,
  taskStatus
}) {
  const [taskComment, setTaskComments] = useState('')
  const [images, setImages] = useState([])
  const [commentError, setCommentError] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    setStatus(taskStatus)
  }, [])

  const handleChange = (e) => {
    setTaskComments(e.target.value)
    setCommentError(false)
  }
  const handleStatusChange = (e) => {
    setStatus(e.target.value)
  }
  const handleRemoveImage = (index) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const handleFileChange = (event) => {
    event.preventDefault()
    const files = event.target.files
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveComment = () => {
    if (!taskComment) {
      setCommentError(true)
      return
    }
    const payload = {
      comment: taskComment,
      images,
      prevStatus: taskStatus
    }
    if (isTaskStatusChange) {
      payload.status = status
    }
    handleSave(payload)
  }

  const renderImages = () => {
    return images.map((image, index) => (
      <div key={index} className='image-container'>
        <img
          src={image}
          alt='Uploaded Image'
          style={{ width: '200px', height: '200px', margin: '10px' }}
        />
        <div className='close-icon' onClick={() => handleRemoveImage(index)}>
          <CloseIcon />
        </div>
      </div>
    ))
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
            <CustomButton title='Save' handleButtonClick={handleSaveComment} />
          </DialogActions>
        </div>
      </>
    )
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className='dialog-title-container'>
          {isTaskStatusChange ? 'Task Statuse Change' : 'Add a Comment'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {isTaskStatusChange && (
              <Grid item xs={12} sm={12} md={12}>
                <span className='input-label'>Status</span>
                <FormControl fullWidth>
                  <Select value={status} onChange={handleStatusChange}>
                    <MenuItem value='Open'>Open</MenuItem>
                    <MenuItem value='In review'>In review</MenuItem>
                    <MenuItem value='Close'>Close</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={12}>
              <span className='input-label'>Comment</span>
              <br />
              <FormControl fullWidth>
                <TextareaAutosize
                  aria-label='minimum height'
                  minRows={3}
                  name='taskComment'
                  value={taskComment}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
                {commentError && (
                  <FormHelperText sx={{ color: 'red' }}>
                    Please provide comment
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <span className='input-label'>Add Image</span>
              <FormControl fullWidth>
                <TextBox
                  id='upload-images'
                  type='file'
                  onChange={handleFileChange}
                  inputProps={{ multiple: true }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              {renderImages()}
            </Grid>
          </Grid>
        </DialogContent>
        {renderActionButton()}
      </Dialog>
    </div>
  )
}
