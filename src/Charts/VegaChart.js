import React from 'react';
import { VegaLite } from 'react-vega';

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
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

// Function to generate multiple data series
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

const VegaLineChart = ({ dataPoints , lines }) => {
  const dynamicData = generateSeriesData(dataPoints, lines);

  const values = Object.keys(dynamicData).flatMap((key, seriesIndex) =>
    dynamicData[key].dates.map((date, idx) => ({
      date,
      price: dynamicData[key].prices[idx],
      series: `Series ${seriesIndex + 1}`,
    }))
  );

  const spec = {
    width: 900,
    height: 700,
    mark: 'line',
    encoding: {
      x: { field: 'date', type: 'temporal', title: 'Date' },
      y: { field: 'price', type: 'quantitative', title: 'Price' },
      color: { field: 'series', type: 'nominal' },
    },
    data: { values },
  };

  return <VegaLite spec={spec} />;
};

export default VegaLineChart;
