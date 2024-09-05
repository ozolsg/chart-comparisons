import React from 'react';
import ReactApexChart from 'react-apexcharts';

// Helper function to generate random prices
const generateRandomPrices = (dataPoints, startPrice = 8000) => {
  const prices = [];
  let currentPrice = startPrice;

  for (let i = 0; i < dataPoints; i++) {
    const priceFluctuation = (Math.random() - 0.5) * 100; // Random fluctuation between -50 to +50
    currentPrice += priceFluctuation;
    prices.push(Number(currentPrice.toFixed(2)));
  }

  return prices;
};

// Helper function to generate dates starting from a specific date
const generateDates = (dataPoints) => {
  const dates = [];
  let currentDate = new Date('2022-01-01');

  for (let i = 0; i < dataPoints; i++) {
    dates.push(currentDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD
    currentDate.setDate(currentDate.getDate() + 1); // Increment the date by one day
  }

  return dates;
};

// Function to generate multiple data series (monthDataSeries1, monthDataSeries2, ...)
const generateSeriesData = (dataPoints, numberOfSeries) => {
  const seriesData = {};

  for (let i = 1; i <= numberOfSeries; i++) {
    seriesData[`monthDataSeries${i}`] = {
      prices: generateRandomPrices(dataPoints),
      dates: generateDates(dataPoints),
    };
  }

  return seriesData;
};

const ApexChart = ({ dataPoints, lines }) => {
  // Function to generate the data points dynamically
  const dynamicData = generateSeriesData(dataPoints, lines);
  const series = Object.keys(dynamicData).map((key, index) => ({
    // name: `Series ${index + 1}`,
    data: dynamicData[key].dates.map((date, idx) => ({
      x: new Date(date),
      y: dynamicData[key].prices[idx],
      // type: 'candlestick',
    })),
  }));
  // Generate dynamic candlestick data

  // Function to generate EMA lines dynamically
  const generateLines = (data, lines) => {
    const lineSeries = [];

    for (let i = 1; i <= lines; i++) {
      const emaData = data.map((item, index) => ({
        x: new Date(item.x),
        y: item.y[3] + (Math.random() * 0.5 - 0.25) * i, // Random fluctuation around the closing price
      }));

      lineSeries.push({
        name: `EMA ${i}`,
        data: emaData,
        type: 'line',
      });
    }

    return lineSeries;
  };

  // ApexCharts options
  const options = {
    chart: {
      height: 600,
      animations: {
        enabled: false, // Disable animations to avoid any rendering delays
      },
    },
    xaxis: {
      type: 'datetime',
    },
    title: {
      text: 'Financial Chart with lines',
      align: 'left',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    stroke: {
      width: [1, ...new Array(lines).fill(2)], // Different stroke width for candlestick and lines
    },
    tooltip: {
      shared: true,
    },
    grid: {
      padding: {
        right: 30,
        left: 20,
      },
    },
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} height={600} />
    </div>
  );
};

export default ApexChart;
