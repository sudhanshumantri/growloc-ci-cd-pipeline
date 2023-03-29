import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarController,
    BarElement,
    Filler
} from 'chart.js';
ChartJS.register(ArcElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarController,
    BarElement,
    Tooltip,
    Filler,
    Legend);
export default function PieChart({chartData, labelKey, valueKey}) {

    const data = useMemo(() => {
        const labels = [];
        const values = [];
        const datasets = [];
        for (let item of chartData) {
          labels.push(item[labelKey]);
          values.push(item[valueKey]);
    
        }
        if (values.length) {
          datasets.push({
            data: values,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          });
        }
        return { labels, datasets };
      }, [chartData,labelKey, valueKey]);
    return <Bar options={{
        responsive: true,
        maintainAspectRatio: false,
    }} data={data} />;

}
