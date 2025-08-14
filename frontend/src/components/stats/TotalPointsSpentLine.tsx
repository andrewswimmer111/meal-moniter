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

export type TotalPointsSpentDataPoint = {
  date: string; // "YYYY-MM-DD"
  cumulativePoints: number;
};

interface Props {
  data: TotalPointsSpentDataPoint[];
}

export const TotalPointsSpentLine: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) return <div>No data</div>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          allowDecimals={false}
          label={{ value: "Points Spent", angle: -90, position: "insideLeft" }}
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
  );
};

export default TotalPointsSpentLine;
