import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function RechartsLineChart({ dataPoints, lines }) {
  const generateData = () => {
    const data = [];
    for (let i = 0; i < dataPoints; i++) {
      const point = { x: i };
      for (let j = 1; j <= lines; j++) {
        point[`Line ${j}`] = Math.random() * 100;
      }
      data.push(point);
    }
    return data;
  };

  const data = generateData();
  const colors = Array.from(
    { length: lines },
    () =>
      `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip />
        <Legend />
        {Array.from({ length: lines }, (_, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={`Line ${index + 1}`}
            stroke={colors[index]}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default RechartsLineChart;
