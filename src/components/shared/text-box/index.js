import React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

const TextBox = ({disabled, InputLabelProps, label, value, onChange,variant}) => {
  return (
    <>
      <FormControl fullWidth >
        <TextField
          disabled={disabled}
          InputLabelProps={InputLabelProps}
          label={label}
          value={value}
          onChange={onChange}
          variant ={variant}
        />
      </FormControl>
    </>
  );
};
export default TextBox;
