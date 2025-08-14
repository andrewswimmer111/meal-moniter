import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { LocationCumulativeData } from "../../types/stats";

interface Props {
  data: LocationCumulativeData[];
  locations: string[]; // list of locations to plot
}

export const LocationCumulativeLineChart: React.FC<Props> = ({ data, locations }) => {
  const colors = ["#8884d8", "#82ca9d", "#ff7300", "#ff0000"]; // extend as needed

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend verticalAlign="top" align="center" height={36} />
        {locations.map((loc, i) => (
          <Line
            key={loc}
            type="linear"
            dataKey={loc}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
