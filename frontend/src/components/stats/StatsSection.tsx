const StatsSection = ({ title, children }: {
    title: string;
    children: React.ReactNode;
}) => (
    <div className="stats-section">
        <h2>{title}</h2>
        <div className="section-graphs">
            {children}
        </div>
    </div>
);

export default StatsSection;