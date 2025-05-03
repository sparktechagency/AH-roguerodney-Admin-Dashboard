import { PackageSearch } from 'lucide-react';

const paymentStatistics = [
    {
        title: 'Total Earning',
        icon: <PackageSearch className="h-6 w-6" />, // Replace with an actual icon or component
        totalSubscribers: 555,
        todaySubscribers: 29,
        totalEarnings: '$555',
    },
    {
        title: 'Total Commissions',
        icon: <PackageSearch className="h-6 w-6" />,
        totalSubscribers: 120,
        todaySubscribers: 1392,
        totalEarnings: '$109558',
    },
    {
        title: 'Total Tips',
        icon: <PackageSearch className="h-6 w-6" />,
        totalSubscribers: 120,
        todaySubscribers: 28,
        totalEarnings: '$150',
    },
];

const PaymentStatistics = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {paymentStatistics.map((plan, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl p-4 shadow-sm flex gap-4 items-start font-medium  w-full "
                >
                    <div className="w-full grid gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-11 h-11 rounded-full bg-[#decbe9] flex items-center justify-center text-xl text-primary ">
                                {plan.icon}
                            </div>
                            <h3 className="font-semibold text-lg">{plan.title}</h3>
                        </div>

                        <div className="text-[16px] pt-3 flex gap-4 justify-between items-center">
                            <div className="flex gap-2">
                                <span className="font-medium">Total:</span>
                                <span className="font-bold">${plan.totalSubscribers}</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-medium">Daily:</span>
                                <span className="font-bold">${plan.todaySubscribers}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PaymentStatistics;
