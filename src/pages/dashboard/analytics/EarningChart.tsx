import { Select } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useGetYearlyEarningsQuery } from '../../../redux/features/analytics/analyticsApi';
import { useState } from 'react';
const { Option } = Select;

const EarningChart = () => {
    // get last 7 years dynamically
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    const recentYears = years.map((year) => ({ year: year.toString() }));

    const [year, setYear] = useState(recentYears[0]?.year || '');
    const { data } = useGetYearlyEarningsQuery({ query: `?year=${year}` }, { refetchOnMountOrArgChange: true });
    const earnings = data?.data;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
            }}
        >
            <div className="px-3 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Yearly Earning</h1>
                <Select
                    onSelect={(value) => setYear(value)}
                    value={year || recentYears[0]?.year}
                    className="w-32 h-[35px]"
                >
                    {recentYears.map((year) => (
                        <Option key={year.year} value={year.year}>
                            {year.year}
                        </Option>
                    ))}
                </Select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={earnings} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 10000]} />
                    <Tooltip />
                    {/* Subscription Line (Orange) */}
                    <Line
                        type="monotone"
                        dataKey="subscription"
                        name="Subscription"
                        stroke="#F97316" // Orange
                        strokeWidth={2}
                        dot={{ fill: '#F97316', stroke: '#F97316', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#F97316', stroke: 'white', strokeWidth: 2 }}
                    />

                    {/* Earning Line (Purple) */}
                    <Line
                        type="monotone"
                        dataKey="earnings"
                        name="Earning"
                        stroke="#8B5CF6" // Purple
                        strokeWidth={2}
                        dot={{ fill: '#8B5CF6', stroke: '#8B5CF6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#8B5CF6', stroke: 'white', strokeWidth: 2 }}
                    />

                    {/* Profit Line (Green) */}
                    <Line
                        type="monotone"
                        dataKey="profit"
                        name="Profit"
                        stroke="#22C55E" // Green
                        strokeWidth={2}
                        dot={{ fill: '#22C55E', stroke: '#22C55E', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#22C55E', stroke: 'white', strokeWidth: 2 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EarningChart;
