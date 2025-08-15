import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, LabelList } from 'recharts';
import type { LocationPieData } from '../../types/stats';

interface Props {
  data: LocationPieData;
  title: string
}

export const LocationDoublePie = ({ data, title }: Props) => {
  const COLORS = [
    "#8884d8", // soft purple
    "#82ca9d", // mint green
    "#ffc658", // pastel yellow
    "#ff7f50", // coral
    "#a4de6c", // light green
    "#d0ed57", // lime
    "#8dd1e1", // sky blue
    "#ffbb28", // golden yellow
    "#ff8042", // orange
    "#c49cde", // lavender
    "#7ddfb0", // teal
    "#ffe599", // light gold
    "#ff9c85", // peach
    "#b4e48c", // soft green
    "#e5f577", // pale lime
    "#a3d9e2", // pale cyan
    "#ffd67d", // soft amber
    "#ff8c66", // light red-orange
    "#c0b3e0", // muted purple
    "#9fd6b9", // soft mint
  ];

  const sortedData = [...data].sort((a, b) => a.value - b.value);
  console.log(sortedData)

  return (
    <div className="graph-container" style={{ width: "20%" }}>
      <h3> {title} </h3>
      <ResponsiveContainer width={"100%"} height={300}>
        <PieChart width={400} height={400}>
          <Pie
            data={sortedData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label // simple text labels outside slices
          >
            {sortedData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            {/* Adds numeric labels inside slices */}
            <LabelList dataKey="value" fill="#fff" />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LocationDoublePie;