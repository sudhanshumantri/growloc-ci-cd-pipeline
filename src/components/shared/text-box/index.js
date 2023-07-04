import React from 'react'
import TextField from '@mui/material/TextField'
const TextBox = ({
  disabled,
  value,
  onChange,
  name,
  error,
  helperText,
  isWhite,
  defaultValue,
  fullWidth,
  multiline,
  rows,
  onInput,
  multiple,
  inputProps,
  ...params
}) => {
  const formRef = React.useRef()
  return (
    <>
      <TextField
        size='small'
        {...params}
        ref={formRef}
        className={isWhite ? 'input-custom-white input-custom' : 'input-custom'}
        disabled={disabled}
        name={name}
        value={value || ''}
        onChange={onChange}
        error={error}
        helperText={helperText}
        fullWidth={fullWidth}
        multiline={multiline}
        rows={rows}
        onInput={onInput}
        multiple={multiple}
        inputProps={inputProps}
      />
    </>
  )
}
export default TextBox
