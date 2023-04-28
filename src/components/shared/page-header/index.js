import React from "react";
import Button from "../button";
import {
  Grid,
  Divider,
  Icon,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
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
function renderSelectBox() {
  return <Select />;
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
  const { length } = options || "";

  return (
    <>
      
      {/* <Grid container spacing={2} className="page-header-container ">
        {showBackButton && showBackButton.length > 0 ? (
          <>
            <Grid item xs={1} sm={1} md={1}>
              {renderBackButtonArray(showBackButton)}
            </Grid>
            <Grid item xs={5} sm={5} md={3}>
              <p className="page-section-title">
                {title}
                {subtitle && <span className="label-light">{subtitle}</span>}
              </p>
            </Grid>
            <Grid item xs={6} sm={6} md={8} className="button-container">
              {headerDropwdown && (
                <Select
                  value={length ? value || "" : ""}
                  size="small"
                  onChange={handleChange}
                >
                  {(options || []).map((option, index) => (
                    <MenuItem
                      value={valuekey ? option[valuekey] || index : option}
                      key={index}
                      className="menu-item-dropdown-item"
                    >
                      {labelkey ? option[labelkey] : option}
                    </MenuItem>
                  ))}
                </Select>
              )}
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
                    {info.length - 1 !== index && <>, </>}
                  </span>
                ))}
              </Grid>
            )}
            <Divider />
          </>
        ) : (
          <Grid container spacing={2} className="page-header-container ">
            <Grid item xs={6} sm={6} md={3}>
              <p className="page-section-title">
                {title}
                {subtitle && <span className="label-light">{subtitle}</span>}
              </p>
            </Grid>
            <Grid item xs={6} sm={5} md={9} className="button-container">
              {headerDropwdown && (
                <Select
                  // value={value}
                  value={length ? value || "" : ""}
                  size="small"
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
              )}
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
        )}
      </Grid>
      <Divider /> */}
      {showBackButton && showBackButton.length > 0 ? (
    <Grid container spacing={2} className="page-header-container ">
      <Grid item xs={1} sm={1} md={1}>
        {renderBackButtonArray(showBackButton)}
      </Grid>
      <Grid item xs={5} sm={5} md={3}>
        <p className="page-section-title">
          {title}
          {subtitle && <span className="label-light">{subtitle}</span>}
        </p>
      </Grid>
      <Grid item xs={6} sm={6} md={8} className="button-container">
        {headerDropwdown && (
          <Select
            value={length ? value || "" : ""}
            size="small"
            onChange={handleChange}
          >
            {(options || []).map((option, index) => (
              <MenuItem
                value={valuekey ? option[valuekey] || index : option}
                key={index}
                className="menu-item-dropdown-item"
              >
                {labelkey ? option[labelkey] : option}
              </MenuItem>
            ))}
          </Select>
        )}
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
              {info.length - 1 !== index && <>, </>}
            </span>
          ))}
        </Grid>
      )}
    </Grid>
  ) : (
    <Grid container spacing={2} className="page-header-container ">
      <Grid item xs={6} sm={6} md={3}>
        <p className="page-section-title">
          {title}
          {subtitle && <span className="label-light">{subtitle}</span>}
        </p>
      </Grid>
      <Grid item xs={6} sm={5} md={9} className="button-container">
        {headerDropwdown && (
          <Select
            value={length ? value || "" : ""}
            size="small"
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
        )}
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
  )}
  <Divider />
    </>
  );
}
