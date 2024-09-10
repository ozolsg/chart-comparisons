import React, { useEffect, useState, useRef } from 'react';
import ReactECharts from 'echarts-for-react';

function EChartsComponent({ dataPoints, lines }) {
  const [option, setOption] = useState({});
  const intervalRef = useRef(null); // To store interval ID for live updates

  const generateInitialData = () => {
    const series = [];
    for (let i = 0; i < lines; i++) {
      const data = [];
      for (let j = 0; j < dataPoints; j++) {
        data.push(Math.random() * 100);
      }
      series.push({
        name: `Line ${i + 1}`,
        type: 'line',
        data,
      });
    }
    return series;
  };

  const updateLiveData = () => {
    setOption((prevOption) => {
      const newSeries = prevOption.series.map((series) => ({
        ...series,
        data: [...series.data, Math.random() * 100].slice(-dataPoints), // Add new data point and remove old ones
      }));

      const newXAxis = {
        ...prevOption.xAxis,
        data: [
          ...prevOption.xAxis.data,
          prevOption.xAxis.data.length + 1,
        ].slice(-dataPoints), // Update x-axis
      };

      return { ...prevOption, series: newSeries, xAxis: newXAxis };
    });
  };

  useEffect(() => {
    // Generate the initial chart data
    const initialSeries = generateInitialData();
    setOption({
      xAxis: {
        type: 'category',
        data: Array.from({ length: dataPoints }, (_, i) => i + 1),
      },
      yAxis: {
        type: 'value',
      },
      series: initialSeries,
    });

    // Set an interval to update the data points live every 1 second
    intervalRef.current = setInterval(updateLiveData, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalRef.current);
  }, [dataPoints, lines]);

  return (
    <div style={{ width: '900px', height: '600px' }}>
      <ReactECharts option={option} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default EChartsComponent;
