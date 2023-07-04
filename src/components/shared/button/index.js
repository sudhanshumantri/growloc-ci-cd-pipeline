import React from 'react'
import './style.css'
import Button from '@mui/material/Button'
export default function ButtonCustom ({
  title,
  ICON,
  handleButtonClick,
  isLight,
  disabled,
  isFullWidth,
  ENDICON,
  variant,
  type
}) {
  let className = 'button-custom'
  if (isLight) {
    className = 'button-custom-light'
  }
  return (
    <Button
      disabled={disabled || false}
      className={disabled ? 'button-custom-light' : className}
      type={type || ''}
      fullWidth={isFullWidth || false}
      variant={variant || 'outlined'}
      startIcon={ICON || null}
      endIcon={ENDICON || null}
      onClick={() => (handleButtonClick ? handleButtonClick() : () => {})}
    >
      {title}
    </Button>
  )
}
