import React, { useState, useEffect } from "react";
import PageHeader from "../../shared/page-header";
import { Line } from "react-chartjs-2";
import {
  Grid,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Loader from "../../shared/loader";

export default function FarmEfficiency({
  fetchFarmReports,
  farmReportsList,
  isFarmReportsListLoading,
}) {

  let { farmId } = useParams();
  const [phData, setPhData] = useState({ labels: [], datasets: [] });
  const [waterTempData, setWaterTempData] = useState({
    labels: [],
    datasets: [],
  });
  const [lightIntensityData, setlightIntensityData] = useState({
    labels: [],
    datasets: [],
  });
  const [humidityData, setHumidityData] = useState({
    labels: [],
    datasets: [],
  });
  const [duration, setDuration] = useState("4hr");
  const timeframes = ["4hr", "12hr", "24hr", "3d", "1w"];



  const phChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          font: {
            size: 13,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 11,
          },
          callback: function (value, index, values) {
            if (index === 0) {
              return [values[0], values.pop()];
            } else if (index === values.length - 1) {
              return [];
            } else {
              return value;
            }
          },
        },
      },
    },
  };

  const convertDurationToHours = (duration) => {
    switch (duration) {
      case "4hr":
        return 4;
      case "12hr":
        return 12;
      case "24hr":
        return 24;
      case "3d":
        return 24 * 3; 
      case "1w":
        return 24 * 7; 
      default:
        return 0;
    }
  };
  

  const handleTimeFrameChange = (event) => {
    const { value } = event.target;
    setDuration(value);
    const durationInHours = convertDurationToHours(value);
    fetchFarmReports({ id: farmId, duration: durationInHours });
  };
    useEffect(() => {
    fetchFarmReports({ farmId, duration });
  }, []);
  useEffect(() => {
    const labels = [];
    const phValues = [];
    const waterTempValues = [];
    const lightIntensitValues = [];
    const humidityValues = [];
    (farmReportsList || []).forEach((report) => {
      const { data, created_on } = report;
      const phValue = data[0].payload.pH;
      const waterTempValue = data[0].payload.waterTemperature;
      const lightIntensitValue = data[0].payload.lightIntensity;
      const humidityValue = data[0].payload.humidity;
      const createdOn = new Date(created_on).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
      phValues.push(phValue);
      waterTempValues.push(waterTempValue);
      lightIntensitValues.push(lightIntensitValue);
      humidityValues.push(humidityValue);
      labels.push(createdOn);
    });

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
    setHumidityData(humidityData);
  }, [farmReportsList]);


  return (
    <>
      <div className="page-container">
        {isFarmReportsListLoading && (
          <Loader title="Fetching farm reports details" />
        )}

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
                <ToggleButton
                  key={timeframe}
                  value={timeframe}
                  size="small"
                  aria-label="right"
                  style={
                    duration === timeframe
                      ? { backgroundColor: "green", color: "white" }
                      : duration === 4 && timeframe === "4hr"
                      ? { backgroundColor: "green", color: "white" }
                      : {}
                  }
                >
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
