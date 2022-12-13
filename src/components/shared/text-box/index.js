import React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { parsePath } from "history";
const TextBox = ({
  disabled,
  value,
  onChange,
  name,
  error,
  helperText,
  isWhite,
  inputRef,
  defaultValue,
  ...params
}) => {
  return (
    <>
        <TextField
          size="small"
          {...params}
          className={
            isWhite ? "input-custom-white input-custom" : "input-custom"
          }
          disabled={disabled}
          name ={name}
          value={value || "" }
          onChange={onChange}
          error ={error}
          helperText={helperText}
          inputRef ={inputRef}
        />
    </>
  );
};
export default TextBox;
