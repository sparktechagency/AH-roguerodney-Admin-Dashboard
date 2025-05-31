import DailyEarnings from './DailyEarning';
import DashboardStats from './DashboardStats';
import EarningChart from './EarningChart';
import UserChart from './UserChart';

const Dashboard = () => {
    return (
        <div className="space-y-4 p-4 w-full">
            <DashboardStats />
            <div className=" bg-white p-4 rounded-2xl">
                <EarningChart />
            </div>
            <div className="grid grid-cols-12  gap-4 items-center">
                <div className="col-span-6 bg-white p-4 rounded-2xl">
                    <UserChart />
                </div>
                <div className="col-span-6 bg-white p-4 rounded-2xl">
                    <DailyEarnings />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
