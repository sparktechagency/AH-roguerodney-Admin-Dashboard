import PaymentStatistics from './PaymentStatistics';
import PaymentTable from './PaymentTable';

const PaymentPage = () => {
    return (
        <div>
            <div className="p-4">
                <h1 className="text-3xl text-primary font-semibold">Manage Payments</h1>
            </div>
            <PaymentStatistics />
            <PaymentTable />
        </div>
    );
};

export default PaymentPage;
