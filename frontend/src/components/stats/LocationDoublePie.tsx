import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, LabelList } from 'recharts';
import type { LocationPieData } from '../../types/stats';

interface Props {
    data: LocationPieData
}

export const LocationDoublePie = ({data}: Props) => {
    const COLORS = [
        '#8884d8',
        '#82ca9d',
        '#ffc658',
        '#ff7f50',
        '#a4de6c',
        '#d0ed57',
        '#8dd1e1',
        '#ffbb28',
        '#ff8042',
    ];

    return (
        <ResponsiveContainer width={400} height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label // simple text labels outside slices
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          {/* Adds numeric labels inside slices */}
          <LabelList dataKey="value" fill="#fff" />
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    )
}

export default LocationDoublePie;