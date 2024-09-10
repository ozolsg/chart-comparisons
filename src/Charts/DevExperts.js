import React, { useEffect, useRef, useState } from 'react';
import * as DXChart from '@devexperts/dxcharts-lite/dist/index';

const DXChartComponent = ({ dataPoints = 50 }) => {
  const chartContainerRef = useRef(null);
  const [chart, setChart] = useState(null);
  const [canMoveUp, setCanMoveUp] = useState(false);
  const [canMoveDown, setCanMoveDown] = useState(false);

  useEffect(() => {
    if (chartContainerRef.current && !chart) {
      const chartInstance = DXChart.createChart(chartContainerRef.current);

      const candles = DXChart.generateCandlesData({
        quantity: dataPoints,
        withVolume: true,
      });

      chartInstance.setData({ candles });
      setChart(chartInstance);
      updateMoveBtnState(chartInstance);
    }
  }, [chart, dataPoints]);

  const updateMoveBtnState = (chartInstance) => {
    const pane = chartInstance?.paneManager?.panes['CHART'];
    setCanMoveUp(pane?.canMoveUp() || false);
    setCanMoveDown(pane?.canMoveDown() || false);
  };

  const addPane = () => {
    chart.paneManager.createPane();
    updateMoveBtnState(chart);

    const paneUuid = chart.paneManager.panesOrder.at(-1);
    const pane = chart.paneManager.panes[paneUuid];
    const dataSeries = pane.createDataSeries();
    const data = DXChart.generateCandlesData({
      quantity: dataPoints,
      withVolume: true,
    });
    dataSeries.setDataPoints(data);
  };

  const addDataSeriesToLastPane = () => {
    const paneUuid = chart.paneManager.panesOrder.at(-1);
    const pane = chart.paneManager.panes[paneUuid];
    const dataSeries = pane.createDataSeries();
    const data = DXChart.generateCandlesData({
      quantity: dataPoints,
      withVolume: true,
    });
    dataSeries.setDataPoints(data);
  };

  const movePaneUp = () => {
    const pane = chart.paneManager.panes['CHART'];
    pane.moveUp();
    updateMoveBtnState(chart);
  };

  const movePaneDown = () => {
    const pane = chart.paneManager.panes['CHART'];
    pane.moveDown();
    updateMoveBtnState(chart);
  };

  return (
    <div>
      <div className="settings">
        <h1>DXCharts Lite Multiple Panes</h1>
        <button className="btn" type="button" onClick={addPane}>
          Add Pane
        </button>
        {/* <button className="btn" type="button" onClick={addDataSeriesToLastPane}>
          Add Data Series to Bottom Pane
        </button>
        <button
          className="btn"
          type="button"
          disabled={!canMoveUp}
          onClick={movePaneUp}
        >
          Move Main Chart Pane Up
        </button>
        <button
          className="btn"
          type="button"
          disabled={!canMoveDown}
          onClick={movePaneDown}
        >
          Move Main Chart Pane Down
        </button> */}
      </div>
      <div
        id="chart"
        className="chart"
        ref={chartContainerRef}
        style={{ height: '500px' }}
      ></div>
    </div>
  );
};

export default DXChartComponent;
