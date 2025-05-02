import { Select } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
const { Option } = Select;
const data = [
    { name: 'Jan', earnings: 8000, subscription: 10000, profit: 7000 },
    { name: 'Feb', earnings: 12000, subscription: 14000, profit: 10500 },
    { name: 'Mar', earnings: 10000, subscription: 13000, profit: 9000 },
    { name: 'Apr', earnings: 22314, subscription: 26000, profit: 20000 },
    { name: 'May', earnings: 16000, subscription: 28000, profit: 14000 },
    { name: 'Jun', earnings: 15000, subscription: 31000, profit: 13000 },
    { name: 'Jul', earnings: 11000, subscription: 25000, profit: 9500 },
    { name: 'Aug', earnings: 17000, subscription: 23000, profit: 15000 },
    { name: 'Sep', earnings: 9000, subscription: 19000, profit: 7500 },
    { name: 'Oct', earnings: 15000, subscription: 24000, profit: 13500 },
    { name: 'Nov', earnings: 14000, subscription: 26000, profit: 12000 },
    { name: 'Dec', earnings: 17000, subscription: 27000, profit: 15000 },
];

const EarningChart = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
            }}
        >
            <div className="px-3 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Monthly Earning</h1>
                <Select defaultValue="2025" className="w-32 h-[35px]">
                    <Option value="2024">2024</Option>
                    <Option value="2025">2025</Option>
                    <Option value="2026">2026</Option>
                    <Option value="2027">2027</Option>
                    <Option value="2028">2028</Option>
                    <Option value="2029">2029</Option>
                    <Option value="2030">2030</Option>
                </Select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[5000, 25000]} />
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
