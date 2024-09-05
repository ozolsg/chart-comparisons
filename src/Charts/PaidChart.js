import React from 'react';

const PaidChart = () => {
  return (
    <div
      style={{
        gap: 20,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>
        <a href="https://devexperts.com/dxcharts-demo/">1. Devexperts</a>
      </div>
      <div>
        <a href="https://www.scichart.com/example/">2. SciChart</a>
      </div>
      <div>
        <a href="https://www.tradingview.com/features/">3. TradingView</a>
      </div>
      <div>
        <a href="https://www.highcharts.com/demo">4. Highcharts</a>
      </div>
    </div>
  );
};

export default PaidChart;
