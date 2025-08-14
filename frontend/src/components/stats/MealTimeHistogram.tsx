
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import type { MealTimeData } from "../../types/stats";


interface Props {
    data: MealTimeData[];
}

export const MealTimeHistogram: React.FC<Props> = ({ data }) => {
    // Optional: Format hour as 12-hour clock
    const formatHour = (hour: number) => {
        const suffix = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        return `${hour12} ${suffix}`;
    };

    return (
        <ResponsiveContainer width={500} height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="hour" type="number" domain={[0, 23]} tickFormatter={formatHour} ticks={[0, 4, 8, 12, 16, 20]} />
                <YAxis allowDecimals={false} />
                <Tooltip labelFormatter={(h) => formatHour(Number(h))} />
                <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};
