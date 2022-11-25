import React from "react";
import Button from "../button";
import { Grid, Divider } from "@mui/material";
import "./style.css";
import AuthOutlet from "../authoutlet";
function renderButtonArray(buttonArray) {
  return buttonArray.map((item, index) => {
    return (
      <AuthOutlet  key={index} isAuthRequired={item.isAuthRequired} from={item.from} action={item.action}>
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

export default function PageHeader({
  title,
  subtitle,
  buttonTitle,
  buttonArray,
  info,
  customButton,
  key,

}) {
  //export default class PageHeader extends React.Component {
  return (
    <>
      <Grid container spacing={2} className="page-header-container ">
        <Grid item xs={6} sm={6} md={6}>
          <p className="page-section-title">
            {title}
            {subtitle && <span className="label-light">{subtitle}</span>}
          </p>
        </Grid>
        <Grid item xs={6} sm={6} md={6} className="button-container">
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
    </>
  );
}
