import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Grid, Card, CardContent } from '@mui/material'
import { useParams } from 'react-router-dom'
import Loader from '../../shared/loader'
// import { Time_Frames } from '../../../config'
import { TIME_FRAMES } from '../../../config'
import convertDurationToHours from '../../shared/convertdaytohours'
import ToggleButtonReports from '../../shared/togglebutton'
export default function FarmEfficiency ({
  fetchFarmReports,
  farmReportsList,
  isFarmReportsListLoading
}) {
  const { farmId } = useParams()
  const [phData, setPhData] = useState({ labels: [], datasets: [] })
  const [waterTempData, setWaterTempData] = useState({
    labels: [],
    datasets: []
  })
  const [lightIntensityData, setlightIntensityData] = useState({
    labels: [],
    datasets: []
  })
  const [humidityData, setHumidityData] = useState({
    labels: [],
    datasets: []
  })
  const [duration, setDuration] = useState('4hr')

  function getChartOptions (xAxisLabel, yAxisLabel) {
    return {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          ticks: {
            font: {
              size: 13
            }
          },
          title: {
            display: true,
            text: yAxisLabel,
            font: {
              size: 11
            },
            padding: {
              top: 5
            }
          }
        },
        x: {
          ticks: {
            font: {
              size: 11
            },
            padding: 10,
            maxRotation: 0,
            minRotation: 0,
            maxTicksLimit: 500
          },
          labels: function (ctx) {
            const labels = ctx.chart.data.labels
            if (labels.length === 2) {
              return labels
            }
            const remainingLabels = (labels || []).map((value, index) => {
              if (index === 0 || index === labels.length - 1) {
                return value
              }
              return ''
            })
            return remainingLabels
          },
          callback: function (value, index, values) {
            if (index === 0 || index === values.length - 1) {
              return value
            }
            return ''
          },
          title: {
            display: true,
            text: xAxisLabel,
            font: {
              size: 11
            },
            padding: {
              top: 5
            }
          }
        }
      }
    }
  }
  const phChartOptions = getChartOptions('Time (hours)', 'pH Value')
  const waterTempChartOptions = getChartOptions(
    'Time (hours)',
    'Water Temperature'
  )
  const lightIntensityChartOptions = getChartOptions(
    'Time (hours)',
    'Light Intensity'
  )
  const humidityChartOptions = getChartOptions('Time (hours)', 'Humidity')

  const handleTimeFrameChange = (event) => {
    const { value } = event.target
    setDuration(value)
    const durationInHours = convertDurationToHours(value)
    fetchFarmReports({ id: farmId, duration: durationInHours })
  }
  useEffect(() => {
    fetchFarmReports({ farmId, duration: parseInt(duration) })
  }, [])

  useEffect(() => {
    const generateChartData = (field) => {
      const labels = []
      const values = [];
      (farmReportsList || []).forEach((report) => {
        const { data, CREATED_ON } = report
        const value = data[0].payload[field]
        const createdOn = new Date(CREATED_ON).toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
        })

        values.push(value)
        labels.push(createdOn)
      })

      return {
        labels,
        datasets: [
          {
            data: values,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1
          }
        ]
      }
    }
    const phChartData = generateChartData('pH')
    setPhData(phChartData)
    const waterTempChartData = generateChartData('waterTemperature')
    setWaterTempData(waterTempChartData)
    const lightIntensityData = generateChartData('lightIntensity')
    setlightIntensityData(lightIntensityData)
    const humidityData = generateChartData('humidity')
    setHumidityData(humidityData)
  }, [farmReportsList])

  const durationStyles = { backgroundColor: 'green', color: 'white' }

  return (
    <>
      <div className='page-container'>
        {isFarmReportsListLoading && (
          <Loader title='Fetching farm reports details' />
        )}
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <ToggleButtonReports
              value={duration}
              options={TIME_FRAMES.map((timeframe) => ({
                value: timeframe,
                label: timeframe
              }))}
              styles={durationStyles}
              onChange={handleTimeFrameChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card>
              <CardContent>
                <span className='input-label'>PH</span>
                <Line
                  className='chart-container'
                  data={phData}
                  options={phChartOptions}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card>
              <CardContent>
                <span className='input-label'>Water temp</span>
                <Line data={waterTempData} options={waterTempChartOptions} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card>
              <CardContent>
                <span className='input-label'>Light intensity</span>
                <Line
                  data={lightIntensityData}
                  options={lightIntensityChartOptions}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card>
              <CardContent>
                <span className='input-label'>Humidity</span>
                <Line data={humidityData} options={humidityChartOptions} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
