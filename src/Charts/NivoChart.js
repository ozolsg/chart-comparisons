import React, { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';

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

const NivoLineChart = ({ dataPoints, lines }) => {
  // Memoize the generated data to avoid re-computation on every render
  const dynamicData = useMemo(
    () => generateSeriesData(dataPoints, lines),
    [dataPoints, lines]
  );

  const data = Object.keys(dynamicData).map((key, index) => ({
    id: `Series ${index + 1}`,
    data: dynamicData[key].dates.map((date, idx) => ({
      x: date,
      y: dynamicData[key].prices[idx],
    })),
  }));

  return (
    <div style={{ height: 700 }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Date',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Price',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
      />
    </div>
  );
};

export default NivoLineChart;
