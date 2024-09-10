import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

// Helper function to generate random prices
const generateRandomPrices = (dataPoints, startPrice = 8000) => {
  const prices = [];
  let currentPrice = startPrice;

  for (let i = 0; i < dataPoints; i++) {
    const priceFluctuation = (Math.random() - 0.5) * 100;
    currentPrice += priceFluctuation;
    prices.push(Number(currentPrice.toFixed(2)));
  }

  return prices;
};

// Helper function to generate dates
const generateDates = (dataPoints) => {
  const dates = [];
  let currentDate = new Date('2022-01-01');

  for (let i = 0; i < dataPoints; i++) {
    dates.push(currentDate.getTime() / 1000); // Convert to timestamp in seconds
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

// Function to generate multiple data series
const generateSeriesData = (dataPoints, numberOfSeries) => {
  const seriesData = [];

  for (let i = 1; i <= numberOfSeries; i++) {
    const prices = generateRandomPrices(dataPoints);
    const dates = generateDates(dataPoints);

    const series = dates.map((date, idx) => ({
      time: date,
      value: prices[idx],
    }));

    seriesData.push({ id: `Series ${i}`, data: series });
  }

  return seriesData;
};

// Function to generate random volumes for the bar chart at the bottom
const generateRandomVolumes = (dataPoints) => {
  const volumes = [];
  for (let i = 0; i < dataPoints; i++) {
    volumes.push(Math.floor(Math.random() * 1000) + 100); // Random volume
  }
  return volumes;
};

const LightweightChartsComponent = ({ dataPoints, lines }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy the previous chart before creating a new one
      chartRef.current.remove();
    }

    // Create the chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 700,
    });

    chartRef.current = chart;

    // Generate data
    const seriesData = generateSeriesData(dataPoints, lines);

    // Add each line to the chart
    const lineSeries = [];
    seriesData.forEach((series) => {
      const line = chart.addLineSeries();
      line.setData(series.data);
      lineSeries.push(line);
    });

    // Add volume bars
    const volumes = generateRandomVolumes(dataPoints);
    const volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceLineVisible: false,
      priceFormat: {
        type: 'volume',
      },
      scaleMargins: {
        top: 0.8, // Ensures volume bars appear at the bottom
        bottom: 0.8,
      },
    });

    const dates = generateDates(dataPoints);
    const volumeData = dates.map((date, idx) => ({
      time: date,
      value: volumes[idx],
    }));

    volumeSeries.setData(volumeData);

    // Tooltip logic
    const tooltip = tooltipRef.current;
    chart.subscribeCrosshairMove((param) => {
      if (!param || !param.time || param.seriesData.size === 0) {
        tooltip.style.display = 'none';
        return;
      }

      tooltip.style.display = 'block';
      const { x, y } = param.point;
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';

      const price = param.seriesData.get(lineSeries[0])?.value;
      if (price) {
        tooltip.innerHTML = `Price: $${price.toFixed(2)}`;
      }
    });

    // Clean up on unmount or when dataPoints/lines change
    return () => {
      if (chartRef.current) {
        chartRef.current.remove(); // Properly remove chart
        chartRef.current = null; // Reset the ref
      }
    };
  }, [dataPoints, lines]);

  return (
    <div style={{ position: 'relative' }}>
      <div ref={chartContainerRef} style={{ width: '100%', height: '700px' }} />
      <div
        ref={tooltipRef}
        style={{
          display: 'none',
          position: 'absolute',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          padding: '5px',
          borderRadius: '3px',
          pointerEvents: 'none',
          zIndex: 1000,
        }}
      />
    </div>
  );
};

export default LightweightChartsComponent;
