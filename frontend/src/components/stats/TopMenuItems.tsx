import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import type { MenuItemFrequency } from "../../types/stats";

interface Props {
  data: MenuItemFrequency[];
  topN?: number; // optional, default top 10
}

export const TopMenuItemsBarChart: React.FC<Props> = ({ data, topN = 10 }) => {
  const sortedData = [...data]
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={sortedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="category" 
          dataKey="name" 
          angle={-45} 
          textAnchor="end" 
          interval={0} 
        />
        <YAxis type="number" allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};


