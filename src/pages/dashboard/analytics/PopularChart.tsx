
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
const data = [
    { name: 'Sun', earnings: 800 },
    { name: 'Mon', earnings: 120 },
    { name: 'Tue', earnings: 100 },
    { name: 'Wed', earnings: 214 },
    { name: 'Thu', earnings: 160 },
    { name: 'Fri', earnings: 150 },
    { name: 'Sat', earnings: 100 },
];

const PopularChart = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
            }}
        >
            <div className="px-2 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Monthly Earning</h1>
            </div>
            <ResponsiveContainer width="100%" height={245}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
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

export default PopularChart;
