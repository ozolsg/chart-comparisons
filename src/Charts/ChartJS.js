import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ChartJSChart({ dataPoints, lines }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const generateData = () => {
    const datasets = [];
    for (let i = 0; i < lines; i++) {
      const data = [];
      for (let j = 0; j < dataPoints; j++) {
        data.push(Math.random() * 100);
      }
      datasets.push({
        label: `Line ${i + 1}`,
        data,
        fill: false,
        borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
      });
    }
    return {
      labels: Array.from({ length: dataPoints }, (_, i) => i + 1),
      datasets,
    };
  };

  useEffect(() => {
    const data = generateData();
    setChartData(data);
  }, [dataPoints, lines]); // Only re-run effect when dataPoints or lines change

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        title: { display: true, text: 'Chart.js Line Chart' },
      }}
    />
  );
}

export default ChartJSChart;
