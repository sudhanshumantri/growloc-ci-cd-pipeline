import React from "react";
import Button from "../button";
import { Grid, Divider, Icon, IconButton, Select,MenuItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./style.css";
import AuthOutlet from "../authoutlet";
function renderButtonArray(buttonArray) {
  return buttonArray.map((item, index) => {
    return (
      <AuthOutlet
        key={index}
        isAuthRequired={item.isAuthRequired}
        from={item.from}
        action={item.action}
      >
        <Button
          ICON={item.ICON}
          isLight={item.isLight ? item.isLight : false}
          title={item.label}
          handleButtonClick={item.handler}
        />
      </AuthOutlet>
    );
  });
}
function renderSelectBox(){
  return(
    <Select />
  )
 
}
function renderBackButtonArray(showBackButton) {
  return showBackButton.map((back, index) => {
    return (
      <IconButton
        aria-label="go back"
        key={index}
        size="small"
        onClick={back.handler}
      >
        <ArrowBackIcon
          sx={{ color: "rgba(0, 0, 0, 0.54)", marginRight: "5px" }}
        />
      </IconButton>
    );
  });
}

export default function PageHeader({
  title,
  subtitle,
  buttonArray,
  info,
  showBackButton,
  headerDropwdown,
  options,
  labelkey,
  valuekey,
  value,
  // onChange,
  handleChange,
}) {
  return (
    <>
      <Grid container spacing={2} className="page-header-container ">
        <div className="page-header-top-row">
          {showBackButton &&
            showBackButton.length > 0 &&
            renderBackButtonArray(showBackButton)}
        </div>
        <Grid item xs={5} sm={5} md={5}>
          <p className="page-section-title">
            {title}
            {subtitle && <span className="label-light">{subtitle}</span>}
          </p>
        </Grid>
        <Grid item xs={1} sm={2} md={2} >
          {headerDropwdown && (
            <Select
            value={value}
            onChange={handleChange}
             >
               {(options || []).map((option, index) => {
          return (
            <MenuItem
              value={valuekey ? option[valuekey] || index : option}
              key={index}
              className="menu-item-dropdown-item"
            >
              {labelkey ? option[labelkey] : option}
            </MenuItem>
          );
        })}
             </Select>
          )
}
        </Grid>

        <Grid item xs={6} sm={5} md={5} className="button-container">
          {buttonArray &&
            buttonArray.length > 0 &&
            renderButtonArray(buttonArray)}
        </Grid>
        {info && (
          <Grid item xs={12} sm={12} md={12}>
            {info.map((data, index) => (
              <span className="label-light" key={index}>
                {data.title && (
                  <>
                    <b>{data.title}</b>:
                  </>
                )}
                {data.value}
                {info.length - 1 != index && <>, </>}
              </span>
            ))}
          </Grid>
        )}
      </Grid>
      <Divider />
    </>
  );
}
