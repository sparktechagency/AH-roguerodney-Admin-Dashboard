import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useGetMonthlyEarningsQuery } from '../../../redux/features/analytics/analyticsApi';

const DailyEarnings = () => {
    const { data } = useGetMonthlyEarningsQuery({ query: '' });
    const earnings = data?.data?.earnings || [];

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
            }}
        >
            <div className="px-2 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Daily Earning</h1>
            </div>
            <ResponsiveContainer width="100%" height={245}>
                <LineChart data={earnings} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[100, 1000]} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="earnings"
                        stroke="#9558B7"
                        strokeWidth={2}
                        dot={{ fill: '#9558B7', stroke: '#9558B7', strokeWidth: 2, r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DailyEarnings;
