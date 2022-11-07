import React from "react";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

const SingleCustomSelect = ({
  inputLable,
  lable,
  value,
  valueKey,
  labelKey,
  name,
  options,
  handleChange,
  isError,
  errorMessage,
  disabled,
  ref,
}) => {
  return (
    <>
    {/* // <FormControl fullWidth>
    //   <InputLabel id="test-select-label" variant="outlined">
    //     {inputLable}
    //   </InputLabel> */}
      <Select
        labelId={lable + "multiple-name-label"}
        id={lable + "test-select-label"}
        name={name}
        value={value}
        label={lable}
        onChange={handleChange}
        disabled={disabled}
        >
        {(options || []).map((option, index) => {
          return (
            <MenuItem value={valueKey ? (option[valueKey] || index) : option} key={index}>
              {labelKey ? option[labelKey] : option}
            </MenuItem>
          );
        })}
      </Select>
      {isError && (
        <FormHelperText style={{ color: "red" }}>{errorMessage}</FormHelperText>
      )}
    {/* // </FormControl> */}
    </>
  );
};

export default SingleCustomSelect;
