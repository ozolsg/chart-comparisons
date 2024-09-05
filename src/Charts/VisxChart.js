import React, { useState, useMemo, useEffect } from 'react';
import { LinePath } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { curveMonotoneX } from '@visx/curve';
import { Group } from '@visx/group';
import useMeasure from 'react-use-measure';
import { localPoint } from '@visx/event';
import { useTooltip, TooltipWithBounds } from '@visx/tooltip';

function VisxChart({ dataPoints, lines }) {
  const [data, setData] = useState([]);
  const [ref, bounds] = useMeasure(); // To make the chart responsive

  const width = bounds.width || 600; // Default chart width
  const height = 400; // Fixed chart height
  const margin = { top: 40, bottom: 40, left: 40, right: 20 };

  // Function to generate the chart data
  const generateData = () => {
    const newData = [];
    for (let i = 0; i < lines; i++) {
      const lineData = [];
      for (let j = 0; j < dataPoints; j++) {
        lineData.push({ x: j, y: Math.random() * 100 });
      }
      newData.push(lineData);
    }
    return newData;
  };

  // Create scales for x and y axes
  const xScale = useMemo(
    () =>
      scaleLinear({
        domain: [0, dataPoints - 1],
        range: [margin.left, width - margin.right],
      }),
    [dataPoints, width, margin.left, margin.right]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        domain: [0, 100],
        range: [height - margin.bottom, margin.top],
      }),
    [height]
  );

  // Tooltip state
  const { showTooltip, hideTooltip, tooltipData, tooltipTop, tooltipLeft } =
    useTooltip();

  const handleTooltip = (event, lineData) => {
    const { x } = localPoint(event) || { x: 0 };
    const x0 = Math.round(xScale.invert(x - margin.left));
    const d = lineData[x0]; // Get the closest data point
    showTooltip({
      tooltipData: d,
      tooltipLeft: xScale(d.x),
      tooltipTop: yScale(d.y),
    });
  };

  useEffect(() => {
    setData(generateData()); // Generate the data on load
  }, [dataPoints, lines]);

  return (
    <div ref={ref} style={{ width: '100%', height }}>
      <svg width={width} height={height}>
        <Group>
          {data.map((lineData, i) => (
            <LinePath
              key={`line-${i}`}
              data={lineData}
              x={(d) => xScale(d.x)}
              y={(d) => yScale(d.y)}
              stroke={`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`}
              strokeWidth={2}
              curve={curveMonotoneX}
              onMouseMove={(event) => handleTooltip(event, lineData)}
              onMouseLeave={hideTooltip}
            />
          ))}
        </Group>
        <AxisBottom scale={xScale} top={height - margin.bottom} />
        <AxisLeft scale={yScale} left={margin.left} />
      </svg>
      {tooltipData && (
        <TooltipWithBounds left={tooltipLeft} top={tooltipTop}>
          <div>
            <strong>x: {tooltipData.x}</strong>
          </div>
          <div>
            <strong>y: {tooltipData.y}</strong>
          </div>
        </TooltipWithBounds>
      )}
    </div>
  );
}

export default VisxChart;
