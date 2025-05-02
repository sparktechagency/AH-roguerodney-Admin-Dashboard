import { Select } from 'antd';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart } from 'recharts';
const { Option } = Select;
const UserChart = () => {
    interface UserData {
        month: string;
        totalUsers: number;
    }

    const data: UserData[] = [
        { month: 'February', totalUsers: 120 },
        { month: 'March', totalUsers: 200 },
        { month: 'April', totalUsers: 150 },
        { month: 'May', totalUsers: 220 },
        { month: 'June', totalUsers: 180 },
        { month: 'July', totalUsers: 300},
        { month: 'August', totalUsers: 250},
        { month: 'September', totalUsers: 270 },
        { month: 'October', totalUsers: 320 },
        { month: 'November', totalUsers: 280 },
        { month: 'December', totalUsers: 350 },
    ];

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
            }}
        >
            <div className="px-2 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Total Users Statistics</h1>
                <Select defaultValue="2024" className="w-32 h-[35px]">
                    <Option value="2024">2024</Option>
                    <Option value="2025">2025</Option>
                    <Option value="2026">2026</Option>
                    <Option value="2027">2027</Option>
                    <Option value="2028">2028</Option>
                    <Option value="2029">2029</Option>
                    <Option value="2030">2030</Option>
                </Select>
            </div> 

            <ResponsiveContainer width="100%" height={245}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[100, 1000]} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="totalUsers"
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
