import React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
const ToggleButtonReports = ({
  value,
  exclusive = true,
  options,
  styles,
  onChange,
  sx
}) => {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive={exclusive}
      onChange={onChange}
      sx={sx}
    >
      {options.map((option) => (
        <ToggleButton
          key={option.value}
          value={option.value}
          size='small'
          aria-label='right'
          style={
            value === option.value
              ? { backgroundColor: styles.backgroundColor, color: styles.color }
              : {}
          }
          sx={sx}
        >
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
export default ToggleButtonReports
