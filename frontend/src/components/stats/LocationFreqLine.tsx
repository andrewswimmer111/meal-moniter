import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { subDays } from "date-fns";
import type { LocationCumulativeData } from "../../types/stats";

interface Props {
  data: LocationCumulativeData[];
  locations: string[]; // list of locations to plot
}

export const LocationCumulativeLineChart: React.FC<Props> = ({ data, locations }) => {
  const colors = ["#8884d8", "#82ca9d", "#ff7300", "#ff0000", '#8dd1e1']; // extend as needed

  // Prepend 0 data point for the first date
  const firstDate = new Date(data[0].date);
  const dayBefore = subDays(firstDate, 1); // one day before
  const dayBeforeStr = dayBefore.toISOString().split("T")[0]; // format as "YYYY-MM-DD"
  const zeroPoint: LocationCumulativeData = {
    date: dayBeforeStr,
  } as LocationCumulativeData;
  locations.forEach(loc => {
    zeroPoint[loc] = 0;
  });
  const chartData = [zeroPoint, ...data];

  return (
    <div className="graph-container" style={{ width: "50%" }}>
      <h3>Frequency of Visits to Favorite 5 Restaurants Over Time </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" textAnchor="start" interval={5} />
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
    </div>
  );
};
