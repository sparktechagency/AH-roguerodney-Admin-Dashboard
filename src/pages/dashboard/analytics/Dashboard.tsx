import DashboardStats from './DashboardStats';
import EarningChart from './EarningChart';
import PopularChart from './PopularChart';
import UserChart from './UserChart';

const Dashboard = () => {
    return (
        <div className="grid gap-4 p-4">
            <DashboardStats />
            <div className=" bg-white p-4 rounded-2xl">
                <EarningChart />
            </div>
            <div className="grid grid-cols-12  gap-4 items-center">
                <div className="col-span-6 bg-white p-4 rounded-2xl">
                    {/* total services */}
                    <UserChart />
                </div>
                <div className="col-span-6 bg-white p-4 rounded-2xl">
                    <PopularChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
