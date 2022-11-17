import React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

const TextBox = ({
  disabled,
  label,
  value,
  onChange,
  name,
  error,
  helperText,
  isWhite,
  inputRef
  
  
}) => {
  return (
    <>
        <TextField
          className={
            isWhite ? "input-custom-white input-custom" : "input-custom"
          }
          disabled={disabled}
          name ={name}
          label={label}
          value={value}
          onChange={onChange}
          error ={error}
          helperText={helperText}
          inputRef ={inputRef}

        />
    </>
  );
};
export default TextBox;
