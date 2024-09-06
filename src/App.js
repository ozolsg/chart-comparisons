import React, { useState } from 'react';
import ChartJSChart from './Charts/ChartJS';
import EChartsComponent from './Charts/ECharts';
import HighchartsComponent from './Charts/HighCharts';
import PlotlyChart from './Charts/PlotlyChart';
import VisxChart from './Charts/VisxChart';
import RechartsLineChart from './Charts/Rechart';
import FinancialChart from './Charts/FinancialChart';
import ApexChart from './Charts/ApexChart';
import VegaLineChart from './Charts/VegaChart';
import NivoLineChart from './Charts/NivoChart';
import PaidChart from './Charts/PaidChart';

function App() {
  const [dataPoints, setDataPoints] = useState(100);
  const [lines, setLines] = useState(2);
  const [library, setLibrary] = useState('echarts');

  // State to hold Pluses and Minuses for each chart
  const feedback = {
    plotly: [
      {
        plus: 'Interactive features (zoom in and out with mouse)',
        minus: '6mb unminified to 2mb minified bundle (finance 2mb -> 1mb)',
      },
      {
        plus: 'Wide choice of graphs - candle, maps, 2D/3D graphs',
        minus:
          'Data structure is in arrays (transformation could impact performance)',
      },
      {
        plus: 'Detailed documentation',
        minus: 'SVG format',
      },
      {
        plus: 'Renderer can be switched to canvas/svg',
        minus:
          'Not everything can be achieved in JS library',
      },
      {
        plus: 'Maintained (8 days ago released)',
        minus: '',
      },
    ],
    echarts: [
      {
        plus: 'Fast performance (renderer can be switched to canvas/svg), 1mb bundle size',
        minus: 'Have to create integration with React ourselves',
      },
      {
        plus: 'Date range slider below graph',
        minus: '',
      },
      {
        plus: 'Maintained library (4M/M downloads, Last release - 2months)',
        minus: '',
      },
      {
        plus: 'Zoom ins',
        minus: '',
      },
    ],
    chartjs: [
      {
        plus: 'Simple API',
        minus: 'Limited chart types compared to other',
      },
      {
        plus: '',
        minus: 'Bad performance for 10k+ data points',
      },
    ],
    financial: [
      {
        plus: 'Specifically designed for financial data visualization',
        minus: 'Not maintained for a year',
      },
      {
        plus: 'Most performant',
        minus: 'Not zooming on the exact bar',
      },
      {
        plus: 'Multiple graphs into one',
        minus: '',
      },
      {
        plus: 'Crosshairs and tooltips',
        minus: '',
      },
      {
        plus: 'Zooms in and out with mouse clicks and scrolls',
        minus: '',
      },
    ],
    rechart: [
      {
        plus: 'Tooltips',
        minus: 'Dont think we can combine multiple graphs',
      },
      {
        plus: '',
        minus: 'Bad performance for 10k+ data points',
      },
    ],
    highcharts: [
      {
        plus: 'Extremely versatile with a wide range of chart types',
        minus: 'License fees',
      },
    ],
    visx: [
      {
        plus: 'Low-level visualization library, allowing for great flexibility and customization',
        minus:
          'Requires more effort to create complex charts compared to higher-level libraries',
      },
    ],
    vega: [
      {
        plus: '',
        minus: 'Good performance',
      },
      {
        plus: '',
        minus: 'Not very intuitive data structure',
      },
    ],
    nivo: [
      {
        plus: 'Crosshairs/tooltips',
        minus: 'Bad performance for 10k+ data points',
      },
      {
        plus: '',
        minus: 'Not very intuitive data structure',
      },
    ],
    apex: [
      {
        plus: 'Zoom in and out features (button, mouse scroll and mouse click)',
        minus:
          'Less flexibility in customization compared to libraries like D3 or Visx',
      },
      {
        plus: 'Crosshair/tooltips looks good',
        minus: 'Not intuitive data structure (index mapping)',
      },
      {
        plus: 'Relatively fast (with 20k points over 2s)',
        minus: 'Cant find a way to map multiple graphs into one',
      },
    ],
    paid: [
      {
        plus: 'Highly tailored to financial markets',
        minus: 'Paid',
      },
      {
        plus: 'Performance',
        minus: '-',
      },
      {
        plus: 'Events on lines',
        minus: '-',
      },
      {
        plus: 'Bars and lines',
        minus: '-',
      },
      {
        plus: 'Support and quick bug fixes',
        minus: '-',
      },
    ],
  };

  // Set the feedback based on the selected library
  const currentFeedback = feedback[library] || [];

  const renderChart = () => {
    switch (library) {
      case 'plotly':
        return <PlotlyChart dataPoints={dataPoints} lines={lines} />;
      case 'chartjs':
        return <ChartJSChart dataPoints={dataPoints} lines={lines} />;
      case 'echarts':
        return <EChartsComponent dataPoints={dataPoints} lines={lines} />;
      case 'financial':
        return <FinancialChart dataPoints={dataPoints} lines={lines} />;
      case 'rechart':
        return <RechartsLineChart dataPoints={dataPoints} lines={lines} />;
      case 'highcharts':
        return <HighchartsComponent dataPoints={dataPoints} lines={lines} />;
      case 'visx':
        return <VisxChart dataPoints={dataPoints} lines={lines} />;
      case 'vega':
        return <VegaLineChart dataPoints={dataPoints} lines={lines} />;
      case 'nivo':
        return <NivoLineChart dataPoints={dataPoints} lines={lines} />;
      case 'apex':
        return <ApexChart dataPoints={dataPoints} lines={lines} />;
      case 'devexperts':
        return <ApexChart dataPoints={dataPoints} lines={lines} />;
      case 'paid':
        return <PaidChart dataPoints={dataPoints} lines={lines} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      <h1>Chart Performance Test</h1>
      <div
        style={{
          display: 'flex',
          marginBottom: '30px',
          gap: 5,
          flexWrap: 'wrap',
        }}
      >
        <button
          style={{
            backgroundColor: dataPoints === 100 ? 'lightgreen' : 'transparent',
          }}
          onClick={() => setDataPoints(100)}
        >
          100 Data Points
        </button>
        <button
          style={{
            backgroundColor: dataPoints === 500 ? 'lightgreen' : 'transparent',
          }}
          onClick={() => setDataPoints(500)}
        >
          500 Data Points
        </button>
        <button
          style={{
            backgroundColor: dataPoints === 1000 ? 'lightgreen' : 'transparent',
          }}
          onClick={() => setDataPoints(1000)}
        >
          1000 Data Points
        </button>
        <button
          style={{
            backgroundColor: dataPoints === 2000 ? 'lightgreen' : 'transparent',
          }}
          onClick={() => setDataPoints(2000)}
        >
          2000 Data Points
        </button>
        <button
          style={{
            backgroundColor: dataPoints === 5000 ? 'lightgreen' : 'transparent',
          }}
          onClick={() => setDataPoints(5000)}
        >
          5000 Data Points
        </button>
        <button
          style={{
            backgroundColor:
              dataPoints === 10000 ? 'lightgreen' : 'transparent',
          }}
          onClick={() => setDataPoints(10000)}
        >
          10000 Data Points
        </button>
        <button
          style={{
            backgroundColor:
              dataPoints === 20000 ? 'lightgreen' : 'transparent',
          }}
          onClick={() => setDataPoints(20000)}
        >
          20000 Data Points
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          marginBottom: '30px',
          gap: 5,
          flexWrap: 'wrap',
        }}
      >
        <button
          style={{
            backgroundColor: lines === 1 ? 'lightgreen' : 'transparent',
          }}
          onClick={() => setLines(1)}
        >
          1 Lines
        </button>
        <button
          style={{
            backgroundColor: lines === 2 ? 'lightgreen' : 'transparent',
          }}
          onClick={() => setLines(2)}
        >
          2 Lines
        </button>
        <button
          style={{
            backgroundColor: lines === 4 ? 'lightgreen' : 'transparent',
          }}
          onClick={() => setLines(4)}
        >
          4 Lines
        </button>
        <button
          style={{
            backgroundColor: lines === 5 ? 'lightgreen' : 'transparent',
          }}
          onClick={() => setLines(5)}
        >
          5 Lines
        </button>
        <button
          style={{
            backgroundColor: lines === 10 ? 'lightgreen' : 'transparent',
          }}
          onClick={() => setLines(10)}
        >
          10 Lines
        </button>
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            marginBottom: '30px',
            gap: 5,
            flexWrap: 'wrap',
          }}
        >
          <button
            style={{
              backgroundColor:
                library === 'echarts' ? 'lightgreen' : 'transparent',
            }}
            onClick={() => setLibrary('echarts')}
          >
            ECharts
          </button>
          <button
            style={{
              backgroundColor:
                library === 'plotly' ? 'lightgreen' : 'transparent',
            }}
            onClick={() => setLibrary('plotly')}
          >
            Plotly.js
          </button>
          <button
            style={{
              backgroundColor:
                library === 'apex' ? 'lightgreen' : 'transparent',
            }}
            onClick={() => setLibrary('apex')}
          >
            Apex
          </button>
          <button
            style={{
              backgroundColor:
                library === 'financial' ? 'lightgreen' : 'transparent',
            }}
            onClick={() => setLibrary('financial')}
          >
            Financial
          </button>
          <button
            style={{
              backgroundColor:
                library === 'visx' ? 'lightgreen' : 'transparent',
            }}
            onClick={() => setLibrary('visx')}
          >
            Visx
          </button>
          <button
            style={{
              backgroundColor:
                library === 'chartjs' ? 'lightgreen' : 'transparent',
            }}
            onClick={() => setLibrary('chartjs')}
          >
            Chart.js
          </button>
          <button
            style={{
              backgroundColor:
                library === 'rechart' ? 'lightgreen' : 'transparent',
            }}
            onClick={() => setLibrary('rechart')}
          >
            Rechart
          </button>
          <button
            style={{
              backgroundColor:
                library === 'nivo' ? 'lightgreen' : 'transparent',
            }}
            onClick={() => setLibrary('nivo')}
          >
            Nivo
          </button>
          <button
            style={{
              backgroundColor:
                library === 'vega' ? 'lightgreen' : 'transparent',
            }}
            onClick={() => setLibrary('vega')}
          >
            Vega
          </button>
          <button
            style={{
              backgroundColor:
                library === 'highcharts' ? 'lightgreen' : 'transparent',
            }}
            onClick={() => setLibrary('highcharts')}
          >
            Highcharts (paid)
          </button>
          <button
            style={{
              backgroundColor:
                library === 'paid' ? 'lightgreen' : 'transparent',
            }}
            onClick={() => setLibrary('paid')}
          >
            Paid
          </button>
        </div>
      </div>
      <div
        style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}
      >
        <h3>Feedback for {library.toUpperCase()}</h3>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
          }}
        >
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>
                Pluses
              </th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>
                Minuses
              </th>
            </tr>
          </thead>
          <tbody>
            {currentFeedback.length > 0 ? (
              currentFeedback.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    {item.plus}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    {item.minus}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  style={{
                    border: '1px solid #ccc',
                    padding: '8px',
                    textAlign: 'center',
                  }}
                >
                  No feedback available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div
        style={{
          marginBottom: '20px',
        }}
      >
        <h3>Chart - {library.toUpperCase()}</h3>
      </div>
      <div
        style={{
          width: '900px',
          height: '700px',
          marginBottom: '50px',
        }}
      >
        {renderChart()}
      </div>
    </div>
  );
}

export default App;
