import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { subDays } from "date-fns";

export type TotalPointsSpentDataPoint = {
  date: string; // "YYYY-MM-DD"
  cumulativePoints: number;
};

interface Props {
  data: TotalPointsSpentDataPoint[];
}

export const TotalPointsSpentLine: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) return <div>No data</div>;

  // Create a zero point one day before the first data point
  const firstDate = new Date(data[0].date);
  const dayBefore = subDays(firstDate, 1);
  const dayBeforeStr = dayBefore.toISOString().split("T")[0];

  const zeroPoint: TotalPointsSpentDataPoint = {
    date: dayBeforeStr,
    cumulativePoints: 0,
  };

  const chartData = [zeroPoint, ...data];

  return (
    <div className="graph-container" style={{ width: "60%" }}>
      <h3> Total Food Points Spent Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 50, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" textAnchor="start" interval={5}
            tickFormatter={(dateStr) => {
              const date = new Date(dateStr);
              const month = (date.getMonth() + 1).toString().padStart(2, "0");
              const day = date.getDate().toString().padStart(2, "0");
              return `${month}-${day}`;
            }} 
          />
          <YAxis
            allowDecimals={false}
          />
          <Tooltip />
          <Legend />
          <Line
            type="linear"
            dataKey="cumulativePoints"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 3 }}
            name="Total Points Spent"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalPointsSpentLine;

