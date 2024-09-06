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
        height: '600',
        width: '900',
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
          autorange: true,
          showspikes: true,
          spikemode: 'across',
          spikethickness: 1,
          spikedash: 'dashdot',
          spikecolor: '#333333',
        },
        annotations: [
          {
            x: '25',
            y: 0.9,
            xref: 'x',
            yref: 'paper',
            text: 'example',
            font: { color: 'magenta' },
            showarrow: true,
            xanchor: 'right',
            ax: -5,
            ay: 0,
          },
        ],
        shapes: [
          {
            type: 'rect',
            xref: 'x',
            yref: 'paper',
            x0: '25',
            y0: 0,
            x1: '30',
            y1: 1,
            fillcolor: '#d3d3d3',
            opacity: 0.2,
            line: {
              width: 0,
            },
          },
        ],
      }}
    />
  );
}

export default PlotlyChart;
