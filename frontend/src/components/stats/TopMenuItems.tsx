import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import type { MenuItemFrequency } from "../../types/stats";

interface Props {
  data: MenuItemFrequency[];
  topN?: number; // optional, default top 10
}

export const TopMenuItemsBarChart: React.FC<Props> = ({ data, topN = 20 }) => {
  const sortedData = [...data]
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);

  return (
    <div className="graph-container" style={{width: "95%"}}>
      <h3> Frequency of Top 20 Menu Items Ordered</h3>
    <ResponsiveContainer width="100%" height={550}>
      <BarChart
        data={sortedData}
        margin={{ top: 20, right: 70, left: 70, bottom: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="category" 
          dataKey="name" 
          angle={-45} 
          textAnchor="end" 
          interval={0} 
          height={150}
        />
        <YAxis type="number" allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};


