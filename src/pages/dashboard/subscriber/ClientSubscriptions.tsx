import { PackageSearch } from "lucide-react";
import { useGetSubcriptionOverviewQuery } from '../../../redux/features/subscription/subscriptionApi';
import ClientSubscriberTable from './ClientSubscriberTable';
import Loader from '../../../components/ui/Loader';

const ClientSubscriptions = () => {
    const { data, isLoading } = useGetSubcriptionOverviewQuery({ query: `?user=USER` });
    const overviewData = data?.data;

    return (
        <section className="grid gap-6">
            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {overviewData?.map((item: any, index: number) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-4 shadow-sm flex gap-4 items-start font-medium  w-full "
                        >
                            <div className="w-full ">
                                <div className="flex items-center gap-2">
                                    <div className="w-11 h-11 rounded-full bg-[#decbe9] flex items-center justify-center text-xl text-primary ">
                                        <PackageSearch className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                </div>

                                <div className="text-[16px]  space-y-1 pt-3 ">
                                    <div className="flex justify-between w-full ">
                                        <span className="font-medium">Total Subscriber</span>
                                        <span>{item.subscriber}</span>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <span className="font-medium">Today Subscriber</span>
                                        <span>{item.todays_subscriber}</span>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <span className="font-medium">Total Earning</span>
                                        <span>${item.totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <ClientSubscriberTable />
        </section>
    );
};

export default ClientSubscriptions;
