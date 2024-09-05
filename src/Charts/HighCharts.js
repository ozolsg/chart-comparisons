import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function HighchartsComponent({ dataPoints, lines }) {
  const [option, setOption] = React.useState({});

  const generateData = () => {
    const series = [];
    for (let i = 0; i < lines; i++) {
      const data = [];
      for (let j = 0; j < dataPoints; j++) {
        data.push(Math.random() * 100);
      }
      series.push({
        name: `Line ${i + 1}`,
        data,
      });
    }
    return {
      title: {
        text: 'Highcharts Line Chart',
      },
      xAxis: {
        categories: Array.from({ length: dataPoints }, (_, i) => i + 1),
      },
      series,
    };
  };

  React.useEffect(() => {
    const data = generateData();
    setOption(data);
  }, [dataPoints, lines]); // Only re-run effect when dataPoints or lines change

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <HighchartsReact highcharts={Highcharts} options={option} />
    </div>
  );
}

export default HighchartsComponent;
