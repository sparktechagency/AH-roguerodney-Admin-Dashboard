import DashboardStats from './DashboardStats';
import EarningChart from './EarningChart';
import PopularChart from './PopularChart';
import UserChart from './UserChart';

const Dashboard = () => {
    return (
        <div className="">
            <DashboardStats /> 
            <div className=' bg-white mt-3 py-2 px-3 rounded-2xl'> 
            <EarningChart />
            </div>
            <div className="grid grid-cols-12  gap-2 items-center mt-3">
                <div className="col-span-6 bg-white drop-shadow-md  p-4 mx-2 rounded-2xl">
                    {/* total services */}
                    <UserChart />
                 
                </div>
                <div className="col-span-6 bg-white drop-shadow-md p-4 mx-2 rounded-2xl">
                 <PopularChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
