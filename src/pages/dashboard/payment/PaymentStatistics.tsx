import { PackageSearch } from 'lucide-react';
import { useGetPaymentOverviewQuery } from '../../../redux/features/payment/paymentApi';
import Loader from '../../../components/ui/Loader';

const PaymentStatistics = () => {
    const { data, isLoading } = useGetPaymentOverviewQuery(undefined);
    const overviewData = data?.data || {};

    if (isLoading)
        return (
            <div className="flex items-center justify-center py-16">
                <Loader />
            </div>
        );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <div className="bg-white rounded-xl p-4 shadow-sm flex gap-4 items-start font-medium  w-full ">
                <div className="w-full grid gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-11 h-11 rounded-full bg-[#decbe9] flex items-center justify-center text-xl text-primary ">
                            <PackageSearch className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg">Total Earnings</h3>
                    </div>

                    <div className="text-[16px] pt-3 flex gap-4 justify-between items-center">
                        <div className="flex gap-2">
                            <span className="font-medium">Total:</span>
                            <span className="font-bold">${overviewData?.earning?.total}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-medium">Daily:</span>
                            <span className="font-bold">${overviewData?.earning?.today}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm flex gap-4 items-start font-medium  w-full ">
                <div className="w-full grid gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-11 h-11 rounded-full bg-[#decbe9] flex items-center justify-center text-xl text-primary ">
                            <PackageSearch className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg">Total Commissions</h3>
                    </div>

                    <div className="text-[16px] pt-3 flex gap-4 justify-between items-center">
                        <div className="flex gap-2">
                            <span className="font-medium">Total:</span>
                            <span className="font-bold">${overviewData?.commission?.total}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-medium">Daily:</span>
                            <span className="font-bold">${overviewData?.commission?.today}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm flex gap-4 items-start font-medium  w-full ">
                <div className="w-full grid gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-11 h-11 rounded-full bg-[#decbe9] flex items-center justify-center text-xl text-primary ">
                            <PackageSearch className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg">Total Tips</h3>
                    </div>

                    <div className="text-[16px] pt-3 flex gap-4 justify-between items-center">
                        <div className="flex gap-2">
                            <span className="font-medium">Total:</span>
                            <span className="font-bold">${overviewData?.tips?.total}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-medium">Daily:</span>
                            <span className="font-bold">${overviewData?.tips?.today}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentStatistics;
