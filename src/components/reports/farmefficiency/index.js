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

export default function FarmEfficiency() {
  const [phData, setPhData] = useState({});
  const [ecData, setEcData] = useState({});
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("1 hr");
  const timeframes = ["1hr", "3hr", "12hr", "1d", "3d", "1w"];
  
  const phChart = {
    labels: phData.labels,
    datasets: [
      {
        label: "ph",
        data: phData.data,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const ecChart = {
    labels: ecData.labels,
    datasets: [
      {
        label: "ec",
        data: ecData.data,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const phChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const handleTimeFrameChange = (event, newTimeFrame) => {
    setSelectedTimeFrame(newTimeFrame);
  };

  useEffect(() => {
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const data = [7.0, 6.8, 6.9, 7.2, 7.1, 6.9];
    setPhData({ labels, data });
    setEcData({ labels, data });
  }, []);

  return (
    <>
      <PageHeader title="Farm Efficiency" />
      <div className="page-container">
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <ToggleButtonGroup
              value={selectedTimeFrame}
              exclusive
              onChange={handleTimeFrameChange}
            >
              {timeframes.map((timeframe) => (
                <ToggleButton key={timeframe} value={timeframe}>
                  {timeframe}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <span className="input-label">PH</span>
                <Line data={phChart} options={phChartOptions} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <span className="input-label">EC</span>
                <Line data={ecChart} options={phChartOptions} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <span className="input-label">Air temp</span>
                <Line data={ecChart} options={phChartOptions} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <span className="input-label">Water temp</span>
                <Line data={ecChart} options={phChartOptions} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <span className="input-label">Humidity</span>
                <Line data={ecChart} options={phChartOptions} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <span className="input-label">light intensity</span>
                <Line data={ecChart} options={phChartOptions} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

// import React, { useState, useEffect } from "react";
// import { Line } from 'react-chartjs-2';
// import { Grid, Card, CardContent, Typography, Box, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";

// const ChartData = ({ title, chartData, timeframes }) => {
//   const [selectedTimeFrame, setSelectedTimeFrame] = useState(timeframes[0]);

//   const handleTimeFrameChange = (event, newTimeFrame) => {
//     setSelectedTimeFrame(newTimeFrame);
//   };

//   return (
//     <Grid item xs={12} md={6} lg={4}>
//       <Card>
//         <CardContent>
//           <Typography variant="h5" component="h2">
//             {title}
//           </Typography>
//           <Line data={chartData} />
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//             <ToggleButtonGroup value={selectedTimeFrame} exclusive onChange={handleTimeFrameChange}>
//               {timeframes.map((timeframe) => (
//                 <ToggleButton key={timeframe} value={timeframe}>{timeframe}</ToggleButton>
//               ))}
//             </ToggleButtonGroup>
//           </Box>
//         </CardContent>
//       </Card>
//     </Grid>
//   );
// };
