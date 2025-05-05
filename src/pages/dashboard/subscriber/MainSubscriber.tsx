import { PackageSearch } from "lucide-react";
import SubscriberTable from "./SubscriberTable";


const subscriptionPlans = [
    {
        title: 'Ah Casual',
        icon: <PackageSearch className="h-6 w-6" />, // Replace with an actual icon or component
        totalSubscribers: 120,
        todaySubscribers: 220,
        totalEarnings: '$420',
    },
    {
        title: 'Ah Glow',
        icon: <PackageSearch className="h-6 w-6" />,
        totalSubscribers: 120,
        todaySubscribers: 220,
        totalEarnings: '$420',
    },
    {
        title: 'Ah Luxe',
        icon: <PackageSearch className="h-6 w-6" />,
        totalSubscribers: 120,
        todaySubscribers: 220,
        totalEarnings: '$420',
    },
];

const MainSubscriber = () => {

    return (
        <section className="grid gap-4 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subscriptionPlans.map((plan, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl p-4 shadow-sm flex gap-4 items-start font-medium  w-full "
                    >
                        <div className="w-full ">
                            <div className="flex items-center gap-2">
                                <div className="w-11 h-11 rounded-full bg-[#decbe9] flex items-center justify-center text-xl text-primary ">
                                    {plan.icon}
                                </div>
                                <h3 className="font-semibold text-lg">{plan.title}</h3>
                            </div>

                            <div className="text-[16px]  space-y-1 pt-3 ">
                                <div className="flex justify-between w-full ">
                                    <span className="font-medium">Total Subscriber</span>
                                    <span>{plan.totalSubscribers}</span>
                                </div>
                                <div className="flex justify-between w-full">
                                    <span className="font-medium">Today Subscriber</span>
                                    <span>{plan.todaySubscribers}</span>
                                </div>
                                <div className="flex justify-between w-full">
                                    <span className="font-medium">Total Earning</span>
                                    <span>{plan.totalEarnings}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <SubscriberTable />
        </section>
    );
};

export default MainSubscriber;