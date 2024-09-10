import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

function PlotlyChart({ dataPoints, lines }) {
  const [plotData, setPlotData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [layout, setLayout] = useState({});

  // Generate initial price and volume data
  const generateInitialData = () => {
    const data = [];
    const volumes = [];
    for (let i = 0; i < lines; i++) {
      const x = [];
      const y = [];
      const volume = [];
      for (let j = 0; j < dataPoints; j++) {
        x.push(j);
        y.push(Math.random() * 100); // Simulate price data
        volume.push(Math.random() * 1000); // Simulate volume data
      }
      data.push({
        x,
        y,
        type: 'scatter',
        mode: 'lines',
        name: `Price Line ${i + 1}`,
      });
      volumes.push(volume);
    }
    return { data, volumes };
  };

  // Update live data by appending new price and volume data points
  const updateLiveData = () => {
    setPlotData((prevData) =>
      prevData.map((line) => ({
        ...line,
        x: [...line.x, line.x.length], // Add new x value (next index)
        y: [...line.y, Math.random() * 100].slice(-dataPoints), // Simulate new price data
      }))
    );
    setVolumeData(
      (prevVolume) =>
        prevVolume.map((vol) =>
          [...vol, Math.random() * 1000].slice(-dataPoints)
        ) // Simulate new volume data
    );
  };

  useEffect(() => {
    // Generate initial chart data
    const { data, volumes } = generateInitialData();
    setPlotData(data);
    setVolumeData(volumes);

    // Define layout with a secondary y-axis for volume
    setLayout({
      height: 600,
      width: 900,
      dragmode: 'zoom',
      uirevision: 'true',
      showlegend: true,
      hovermode: 'closest',
      xaxis: {
        rangeslider: {},
        showspikes: true,
        spikemode: 'across',
        spikethickness: 1,
        spikedash: 'dashdot',
        spikecolor: '#333333',
      },
      yaxis: {
        title: 'Price',
        autorange: true,
        showspikes: true,
        spikemode: 'across',
        spikethickness: 1,
        spikedash: 'dashdot',
        spikecolor: '#333333',
      },
      yaxis2: {
        title: 'Volume',
        overlaying: 'y',
        side: 'right',
        showgrid: false,
      },
    });

    // Set interval to simulate live data feed every second
    const interval = setInterval(updateLiveData, 1000);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, [dataPoints, lines]);

  // Prepare the volume traces for Plotly
  const volumeTraces = volumeData.map((volume, i) => ({
    x: Array.from({ length: volume.length }, (_, idx) => idx),
    y: volume,
    type: 'bar',
    name: `Volume ${i + 1}`,
    yaxis: 'y2', // Plot on the secondary y-axis (volume)
    opacity: 0.4,
    marker: { color: 'blue' },
  }));

  return (
    <Plot
      data={[...plotData, ...volumeTraces]} // Combine price and volume traces
      layout={layout}
      config={{ responsive: true }}
    />
  );
}

export default PlotlyChart;
