import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

function EChartsComponent({ dataPoints, lines }) {
  const [option, setOption] = useState({});

  const generateData = () => {
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
    return {
      xAxis: {
        type: 'category',
        data: Array.from({ length: dataPoints }, (_, i) => i + 1),
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'axis',
        showCross: true,
        axisPointer: { type: 'cross', label: {} },
        appendToBody: true,
        textStyle: { fontSize: 12 },
      },
      dataZoom: [
        { type: 'slider', orient: 'horizontal', filterMode: 'none' },
        { type: 'inside', orient: 'horizontal', filterMode: 'none' },
      ],
      series,
    };
  };

  useEffect(() => {
    // Generate the chart data
    const chartOption = generateData();
    setOption(chartOption);
  }, [dataPoints, lines]);

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <ReactECharts option={option} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default EChartsComponent;
