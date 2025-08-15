import './AllStats.css'

interface BasicStatsCardProps {
    sentence: string;
}

const BasicStatsCard: React.FC<BasicStatsCardProps> = ({ sentence }) => {
    return (
        <div className='basic-stats-card'>
            <p className='basic-stats-text'>{sentence}</p>
        </div>
    );
};

export default BasicStatsCard;