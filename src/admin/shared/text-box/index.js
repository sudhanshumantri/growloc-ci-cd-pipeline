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
  fullWidth,
  multiline,
  rows,
  ...params
}) => {

  const formRef = React.useRef();

  return (
    <>
        <TextField
          size="small"
          {...params}
          ref ={formRef}
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
          fullWidth={fullWidth}
          multiline={multiline}
          rows={rows}
        />

    </>
  );
};
export default TextBox;
