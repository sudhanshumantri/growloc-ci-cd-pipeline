import React from "react";
import { Select, MenuItem, FormHelperText } from "@mui/material/";
import "./style.css";

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
  isWhite,
}) => {
  return (
    <>
      <Select
        className={isWhite ? "input-custom-white input-custom" : "input-custom"}
        name={name}
        value={value ?? ""}
        onChange={handleChange}
        disabled={disabled}
      >
        {(options || []).map((option, index) => {
          return (
            <MenuItem
              value={valueKey ? option[valueKey] || index : option}
              key={index}
              className="menu-item-dropdown-item"
            >
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
