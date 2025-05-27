import { Select } from 'antd';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart } from 'recharts';
import { useGetMonthlyEarningsQuery } from '../../../redux/features/analytics/analyticsApi';
import { useState } from 'react';
const { Option } = Select;

const UserChart = () => {
    // get last 7 years dynamically
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    const recentYears = years.map((year) => ({ year: year.toString() }));

    const [year, setYear] = useState(recentYears[0]?.year || '');
    const { data } = useGetMonthlyEarningsQuery({ query: `?year=${year}` });
    const users = data?.data?.users || [];

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
            }}
        >
            <div className="px-2 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Users Statistics</h1>
                <Select
                    onSelect={(value) => setYear(value)}
                    defaultValue={recentYears[0]?.year}
                    className="w-32 h-[35px]"
                >
                    {recentYears.map((item) => (
                        <Option key={item.year} value={item.year}>
                            {item.year}
                        </Option>
                    ))}
                </Select>
            </div>

            <ResponsiveContainer width="100%" height={245}>
                <LineChart data={users} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[100, 1000]} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#9558B7"
                        strokeWidth={2}
                        dot={{ fill: '#9558B7', stroke: '#9558B7', strokeWidth: 2, r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserChart;
