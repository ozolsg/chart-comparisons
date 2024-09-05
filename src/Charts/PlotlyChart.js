import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

function PlotlyChart({ dataPoints, lines }) {
  const [plotData, setPlotData] = useState([]);

  const generateData = () => {
    const data = [];
    for (let i = 0; i < lines; i++) {
      const x = [];
      const y = [];
      for (let j = 0; j < dataPoints; j++) {
        x.push(j);
        y.push(Math.random() * 100);
      }
      data.push({
        x,
        y,
        type: 'scatter',
        mode: 'lines',
        name: `Line ${i + 1}`,
      });
    }
    return data;
  };

  useEffect(() => {
    const data = generateData();
    setPlotData(data);
  }, [dataPoints, lines]);

  return (
    <Plot
      data={plotData}
      layout={{
        title: 'Line Chart',
        showlegend: true,
        xaxis: {
          rangeslider: {},
        },
      }}
    />
  );
}

export default PlotlyChart;
