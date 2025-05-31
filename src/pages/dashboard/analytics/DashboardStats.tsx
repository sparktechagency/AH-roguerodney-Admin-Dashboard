
import { DollarSign, Package, Tag, User } from 'lucide-react';
import { useGetSummuryQuery } from '../../../redux/features/analytics/analyticsApi';
import Loader from '../../../components/ui/Loader';

const DashboardStats = () => {
    const { data, isLoading } = useGetSummuryQuery(undefined);
    const summaryData = data?.data;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-4 gap-4 items-center ">
                {/* user */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 h-[152px] relative ">
                    <div className="flex items-center mb-2">
                        <div className="h-11 w-11 bg-[#DECBE9] rounded-full flex items-center justify-center mr-3">
                            <div className="text-[#6A3E82]">
                                <User className="h-5 w-5" />
                            </div>
                        </div>
                        <span className="text-[#2B2F29] text-lg font-medium">Total User</span>
                    </div>

                    <div className="flex justify-between items-end absolute bottom-2 gap-28 ">
                        <div>
                            <p className="text-[14px] text-gray-600">
                                Total: <span className="font-semibold text-gray-800">{summaryData?.users?.total}</span>
                            </p>
                        </div>
                        <div>
                            <p className="text-[14px] text-gray-600">
                                Daily:{' '}
                                <span className={'font-semibold text-blue-500'}>{summaryData?.users?.daily}</span>
                            </p>
                        </div>
                    </div>
                </div>
                {/* booking */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 h-[152px] relative ">
                    <div className="flex items-center mb-2">
                        <div className="h-11 w-11 bg-[#DECBE9] rounded-full flex items-center justify-center mr-3">
                            <div className="text-[#6A3E82]">
                                <Tag className="h-5 w-5" />
                            </div>
                        </div>
                        <span className="text-[#2B2F29] text-lg font-medium">Total Booking</span>
                    </div>

                    <div className="flex justify-between items-end absolute bottom-2 gap-28 ">
                        <div>
                            <p className="text-[14px] text-gray-600">
                                Total:{' '}
                                <span className="font-semibold text-gray-800">{summaryData?.bookings?.total}</span>
                            </p>
                        </div>
                        <div>
                            <p className="text-[14px] text-gray-600">
                                Daily:{' '}
                                <span className={'font-semibold text-blue-500'}>{summaryData?.bookings?.daily}</span>
                            </p>
                        </div>
                    </div>
                </div>
                {/* earning */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 h-[152px] relative ">
                    <div className="flex items-center mb-2">
                        <div className="h-11 w-11 bg-[#DECBE9] rounded-full flex items-center justify-center mr-3">
                            <div className="text-[#6A3E82]">
                                <DollarSign className="h-5 w-5" />
                            </div>
                        </div>
                        <span className="text-[#2B2F29] text-lg font-medium">Total Earning</span>
                    </div>

                    <div className="flex justify-between items-end absolute bottom-2 gap-28 ">
                        <div>
                            <p className="text-[14px] text-gray-600">
                                Total:{' '}
                                <span className="font-semibold text-gray-800">${summaryData?.earnings?.total}</span>
                            </p>
                        </div>
                        <div>
                            <p className="text-[14px] text-gray-600">
                                Daily:{' '}
                                <span className={'font-semibold text-blue-500'}>${summaryData?.earnings?.daily}</span>
                            </p>
                        </div>
                    </div>
                </div>
                {/* subscription */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 h-[152px] relative ">
                    <div className="flex items-center mb-2">
                        <div className="h-11 w-11 bg-[#DECBE9] rounded-full flex items-center justify-center mr-3">
                            <div className="text-[#6A3E82]">
                                <Package className="h-5 w-5" />
                            </div>
                        </div>
                        <span className="text-[#2B2F29] text-lg font-medium">Total Subscription</span>
                    </div>

                    <div className="flex justify-between items-end absolute bottom-2 gap-28 ">
                        <div>
                            <p className="text-[14px] text-gray-600">
                                Total:{' '}
                                <span className="font-semibold text-gray-800">
                                    {summaryData?.subscription?.totalCount}
                                </span>
                            </p>
                        </div>
                        <div>
                            <p className="text-[14px] text-gray-600">
                                Daily:{' '}
                                <span className={'font-semibold text-blue-500'}>
                                    {summaryData?.subscription?.dailyCount}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
