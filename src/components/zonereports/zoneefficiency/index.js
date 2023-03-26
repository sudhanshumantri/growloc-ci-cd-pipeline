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
  fecthFarmReportsZoneAverageMortality,
  farmReportsZoneAverageMortalityList,
}) {
  let { zoneId } = useParams();
  const [averageMobiltyData, SetAverageMobiltyData] = useState({
    labels: [],
    datasets: [],
  });

  const [duration, setDuration] = useState(4);
  const timeframes = [ "4hr", "12hr", "24hr", "56hr", "1w"];

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
          }
        },
      },
      x: {
        ticks: {
          font: {
            size: 11,
          },
          callback: function(value, index, values) {
            if (farmReportsZoneAverageMortalityList && farmReportsZoneAverageMortalityList.length > 0) {
              const stages = farmReportsZoneAverageMortalityList.map((item) => item.stage);
              if (stages && stages.length > 0) {
                if (index === 0) {
                  return stages[0];
                } else if (index === values.length - 1) {
                  return stages[stages.length - 1];
                } else {
                  return '';
                }
              }
            }
          }          //
        },
      },
    },
  };
        
  useEffect(()=>{
    fecthFarmReportsZoneAverageMortality(zoneId)
  },[])
  
  useEffect(() => {
    if (farmReportsZoneAverageMortalityList && farmReportsZoneAverageMortalityList.length > 0) {
      const labels = [];
      const mortalityValues = [];
      farmReportsZoneAverageMortalityList.forEach((report) => {
        const { stage, avgMortalityRate } = report;
        labels.push(stage);
        mortalityValues.push(avgMortalityRate);
      });
  
      const mortalityChartData = {
        labels,
        datasets: [
          {
            data: mortalityValues,
            fill: false,
            borderColor: "rgba(75,192,192,1)",
            tension: 0.1,
          },
        ],
      };
      SetAverageMobiltyData(mortalityChartData);
    }
  }, [farmReportsZoneAverageMortalityList]);

  const handleTimeFrameChange = (event, value) => {
    setDuration(value);
  }
  return (
    <>
      <PageHeader title="Zone Efficiency" />
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
              onChange={(event, value) => handleTimeFrameChange(event, value)}
              >
              {timeframes.map((timeframe) => (
                <ToggleButton
                  key={timeframe}
                  value={timeframe}
                  size="small"
                  aria-label="right"
                >
                  {timeframe}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card >
              <CardContent>
                <span className="input-label">Average Mortality Rate</span>
                <Line data={averageMobiltyData} options={phChartOptions} width={"100%"}/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
