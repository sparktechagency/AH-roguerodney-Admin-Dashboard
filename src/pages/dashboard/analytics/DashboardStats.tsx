
import { PackageCheck, PackageSearch } from "lucide-react";

const DashboardStats = () => {
    const stats = [
        {
          title: "Total User",
          total: "20555",
          daily: "29",
          dailyLabel: "Daily:",
          icon: <PackageSearch className="h-5 w-5" />,
        },
        {
          title: "Total Booking",
          total: "109558",
          daily: "1392",
          dailyLabel: "Daily:",
          dailyPrefix: "$",
          icon: <PackageSearch className="h-5 w-5" />,
        },
        {
          title: "Total Earning",
          total: "1504897",
          daily: "1391",
          dailyLabel: "Daily:",
          totalPrefix: "$",
          dailyPrefix: "$",
          icon: <PackageSearch className="h-5 w-5" />,
        },
        {
          title: "Total Subscription",
          total: "1504897",
          daily: "1490",
          dailyLabel: "Daily:",
          totalPrefix: "$",
          dailyPrefix: "$",
          secondaryLabel: "Total Subscription",
          secondaryValue: "520",
          secondaryPrefix: "$",
          secondaryTitle: "Daily Subscription",
          icon: <PackageCheck className="h-5 w-5" />,
        },
      ];

    return (
        <div>
            <div className="grid grid-cols-4 gap-4 items-center ">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl border border-gray-100 p-5 h-[152px] relative ">
                        <div className="flex items-center mb-2">
                            <div className="h-11 w-11 bg-[#DECBE9] rounded-full flex items-center justify-center mr-3">
                                <div className="text-[#6A3E82]">{stat?.icon}</div>
                            </div>
                            <span className="text-[#2B2F29] text-lg font-medium">{stat?.title}</span>
                        </div>

                        <div>
                            {stat?.secondaryLabel && (
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-[10px] text-gray-500">{stat?.secondaryLabel}</p>
                                        <p className="text-[16px] font-bold text-[#6A3E82]">
                                            {stat?.secondaryPrefix}
                                            {stat?.secondaryValue}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">{stat?.secondaryTitle}</p>
                                        <p className="text-[16px] font-bold text-[#080072]">
                                            {stat?.secondaryPrefix}
                                            {stat?.secondaryValue}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-end absolute bottom-2 gap-28 ">
                            <div>
                                <p className="text-[14px] text-gray-600">
                                    Total: {stat?.totalPrefix}
                                    <span className="font-semibold text-gray-800">{stat?.total}</span>
                                </p>
                            </div>
                            <div>
                                <p className="text-[14px] text-gray-600">
                                    {stat?.dailyLabel}{' '}
                                    <span className={'font-semibold text-blue-500'}>
                                        {stat?.dailyPrefix}
                                        {stat?.daily}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardStats;
