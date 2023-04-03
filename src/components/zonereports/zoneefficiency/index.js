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

export default function ZoneEfficiency({
  zoneReportsList,
  fetchZoneReports,
  isZoneReportsListLoading,
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
        title: {
          display: true,
          text: "pH Value",
          font: {
            size: 11,
          },
          padding: {
            top: 5,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 11,
          },
          padding: 10,
          maxRotation: 0,
          minRotation: 0,
          maxTicksLimit:500,
        },
        labels: function(ctx) {
          const labels = ctx.chart.data.labels;
          if (labels.length === 2) {
            return labels;
          }
          const remainingLabels = (labels||[]).map((value, index)=> {
            if (index === 0 || index === labels.length - 1) {
              return value;
            }
            return '';
          })
          console.log(remainingLabels);
          return remainingLabels;
        },
        callback: function (value, index, values) {
          if (index === 0 || index === values.length - 1) {
            return value;
          }
          return '';
        },
        title: {
          display: true,
          text: "Time (hours)",
          font: {
            size: 11,
          },
          padding: {
            top: 5,
          },
        },
      },
    },
  };

  const waterTempChartOptions = {
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
        title: {
          display: true,
          text: "Water temparature",
          font: {
            size: 11,
          },
          padding: {
            top: 5,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 11,
          },
          padding: 10,
          maxRotation: 0,
          minRotation: 0,
          maxTicksLimit:500,
        },
        labels: function(ctx) {
          const labels = ctx.chart.data.labels;
          if (labels.length === 2) {
            return labels;
          }
          const remainingLabels = (labels||[]).map((value, index)=> {
            if (index === 0 || index === labels.length - 1) {
              return value;
            }
            return '';
          })
          console.log(remainingLabels);
          return remainingLabels;
        },
        callback: function (value, index, values) {
          if (index === 0 || index === values.length - 1) {
            return value;
          }
          return '';
        },
        title: {
          display: true,
          text: "Time (hours)",
          font: {
            size: 11,
          },
          padding: {
            top: 5,
          },
        },
      },
    },
  };

  const lightIntensityChartOptions = {
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
        title: {
          display: true,
          text: "Light intensity",
          font: {
            size: 11,
          },
          padding: {
            top: 5,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 11,
          },
          padding: 10,
          maxRotation: 0,
          minRotation: 0,
          maxTicksLimit:500,
        },
        labels: function(ctx) {
          const labels = ctx.chart.data.labels;
          if (labels.length === 2) {
            return labels;
          }
          const remainingLabels = (labels||[]).map((value, index)=> {
            if (index === 0 || index === labels.length - 1) {
              return value;
            }
            return '';
          })
          console.log(remainingLabels);
          return remainingLabels;
        },
        callback: function (value, index, values) {
          if (index === 0 || index === values.length - 1) {
            return value;
          }
          return '';
        },
        title: {
          display: true,
          text: "Time (hours)",
          font: {
            size: 11,
          },
          padding: {
            top: 5,
          },
        },
      },
    },

  };

  const humidityChartOptions = {
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
        title: {
          display: true,
          text: "Humidity",
          font: {
            size: 11,
          },
          padding: {
            top: 5,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 11,
          },
          padding: 10,
          maxRotation: 0,
          minRotation: 0,
          maxTicksLimit:500,
        },
        labels: function(ctx) {
          const labels = ctx.chart.data.labels;
          if (labels.length === 2) {
            return labels;
          }
          const remainingLabels = (labels||[]).map((value, index)=> {
            if (index === 0 || index === labels.length - 1) {
              return value;
            }
            return '';
          })
          console.log(remainingLabels);
          return remainingLabels;
        },
        callback: function (value, index, values) {
          if (index === 0 || index === values.length - 1) {
            return value;
          }
          return '';
        },
        title: {
          display: true,
          text: "Time (hours)",
          font: {
            size: 11,
          },
          padding: {
            top: 5,
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
    fetchZoneReports({ id: farmId, duration: durationInHours });
  };

  useEffect(() => {
    fetchZoneReports({ farmId, duration });
  }, []);
  useEffect(() => {
    const labels = [];
    const phValues = [];
    const waterTempValues = [];
    const lightIntensitValues = [];
    const humidityValues = [];
    (zoneReportsList || []).forEach((report) => {
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
  }, [zoneReportsList]);

  return (
    <>
      <div className="page-container">
        {isZoneReportsListLoading && (
          <Loader title="Fetching zone reports details" />
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
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card>
              <CardContent>
                <span className="input-label">PH</span>
                <Line data={phData} options={phChartOptions} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card>
              <CardContent>
                <span className="input-label">Water temp</span>
                <Line data={waterTempData} options={waterTempChartOptions} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card>
              <CardContent>
                <span className="input-label">Light intensity</span>
                <Line data={lightIntensityData} options={lightIntensityChartOptions} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card>
              <CardContent>
                <span className="input-label">Humidity</span>
                <Line data={humidityData} options={humidityChartOptions} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
