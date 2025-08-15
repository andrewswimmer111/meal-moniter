import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import type { HeatmapData } from "../../types/stats";

interface Props {
  data: HeatmapData[];
  maxCount: number
}

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const DayOfWeekHeatmap: React.FC<Props> = ({ data, maxCount }) => {
  const colorScale = (count: number) => {

    const intensity = Math.round((count / maxCount) * 255);
    return `rgb(255, ${255 - intensity}, ${255 - intensity})`; // shades of red
  };
  const formatHour = (hour: number) => {
    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12} ${suffix}`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;

    const point = payload[0].payload; // actual hovered data
    return (
      <div style={{ background: "#fff", padding: "5px", border: "1px solid #ccc" }}>
        <div>Frequency: {point.count}</div>
        <div> ({dayLabels[point.day]}, {formatHour(point.hour)})</div>
      </div>
    );
  };

  return (
    <div className="graph-container" style={{ width: "50%" }}>
      <h3> Meal Habits by Day of the Week </h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="hour" name="Hour" domain={[0, 23]} ticks={[2, 6, 10, 14, 18, 22]} tickFormatter={formatHour} />
          <YAxis type="number" dataKey="day" name="Day" domain={[0, 6]} ticks={[0, 1, 2, 3, 4, 5, 6]} tickFormatter={(d) => dayLabels[d]} reversed />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={data}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colorScale(entry.count)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </ div>
  );
};
