import React, { useState, useEffect } from "react";
import PageHeader from "../../shared/page-header";
import { Line } from "react-chartjs-2";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { LogarithmicScale } from "chart.js";
import Loader from "../../shared/loader";

export default function FarmEfficiency({fetchFarmReports,farmReportsList,isFarmReportsListLoading}) {
  let { farmId } = useParams();
  console.log(farmId,"farmId");
  const [phData, setPhData] = useState({labels: [], datasets: []});
  const [waterTempData, setWaterTempData,] = useState({labels: [], datasets: []});
  const [lightIntensityData, setlightIntensityData] = useState({labels: [], datasets: []});
  const [humidityData, setHumidityData] = useState({labels: [], datasets: []});
  const [duration, setDuration] = useState(12);
  const timeframes = [ "4hr", "12hr", "24hr", "56hr", "1w"];
  const phChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const handleTimeFrameChange = (event) => {
    const { value } = event.target;
    setDuration(value)
    fetchFarmReports({ id:farmId, duration: parseInt(value) });
  };
  useEffect(()=>{
    fetchFarmReports({farmId, duration});
  },[])
  useEffect(() => {
    const labels = [];
    const phValues = [];
    const waterTempValues =[];
    const lightIntensitValues =[];
    const humidityValues =[];
    (farmReportsList||[]).forEach((report) => {
      const { data, created_on } = report;
      const phValue = data[0].payload.pH;
      const waterTempValue = data[0].payload.waterTemperature;
      const lightIntensitValue = data[0].payload.lightIntensity;
      const humidityValue= data[0].payload.humidity;
      const createdOn = new Date(created_on).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
  
      });
      phValues.push(phValue);
      waterTempValues.push(waterTempValue);
      lightIntensitValues.push(lightIntensitValue)
      humidityValues.push(humidityValue)
      labels.push(createdOn);
    });

    console.log(phValues, "phValues", farmReportsList);
    console.log(waterTempValues, "waterTempValues");
    console.log(lightIntensitValues, "lightIntensitValues");
    console.log(humidityValues, "humidityValues");

    const phChartData = {
      labels,
      datasets: [
        {
          data: phValues,
          fill: false,
          borderColor: "rgba(75,192,192,1)",
          tension: 0.1,
        },
      ],
    };
    setPhData(phChartData);
    const waterTempChartData = {
      labels,
      datasets: [
        {
          data: waterTempValues,
          fill: false,
          borderColor: "rgba(75,192,192,1)",
          tension: 0.1,
        },
      ],
    };
    setWaterTempData(waterTempChartData);
    const lightIntensityData = {
      labels,
      datasets: [
        {
          data: lightIntensitValues,
          fill: false,
          borderColor: "rgba(75,192,192,1)",
          tension: 0.1,
        },
      ],
    };
    setlightIntensityData(lightIntensityData);

    const humidityData = {
      labels,
      datasets: [
        {
          data: humidityValues,
          fill: false,
          borderColor: "rgba(75,192,192,1)",
          tension: 0.1,
        },
      ],
    };
    setHumidityData(humidityData)

  }, [farmReportsList]);

  return (
    <>
      <PageHeader title="Farm Efficiency" />
      <div className="page-container">
      {isFarmReportsListLoading && <Loader title="Fetching farm reports details"/>}

        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <ToggleButtonGroup
              value={duration}
              exclusive
              onChange={handleTimeFrameChange}
            >
              {timeframes.map((timeframe) => (
                <ToggleButton   key={timeframe} value={timeframe} size="small" aria-label="right">
                  {timeframe}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <span className="input-label">PH</span>
                <Line data={phData} options={phChartOptions} />
              </CardContent>
            </Card>
          </Grid>
           <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <span className="input-label">Water temp</span>
                <Line data={waterTempData} options={phChartOptions} />
              </CardContent>
            </Card>
          </Grid> 
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <span className="input-label">Light intensity</span>
                <Line data={lightIntensityData} options={phChartOptions} />
              </CardContent>
            </Card>
          </Grid> 
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <span className="input-label">Humidity</span>
                <Line data={humidityData} options={phChartOptions} />
              </CardContent>
            </Card>
          </Grid> 
      </Grid>
      </div>
    </>
  );
}

