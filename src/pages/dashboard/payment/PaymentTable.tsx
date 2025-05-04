import { ConfigProvider, Table } from 'antd';
import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dummyPaymentData } from '../../../dummyData/payments';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Client',
        dataIndex: 'client',
        key: 'client',
        render: (_: any, record: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
                <img src={record?.client?.image} alt="client img" className="size-10" />
                <div>
                    <h1 className="font-medium">{record?.client?.name}</h1>
                    <h3 className="text-sm">{record?.client?.email}</h3>
                </div>
            </div>
        ),
    },
    {
        title: 'Provider',
        dataIndex: 'provider',
        key: 'provider',
        render: (_: any, record: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
                <img src={record?.provider?.image} alt="provider img" className="size-10" />
                <div>
                    <h1 className="font-medium">{record?.provider?.name}</h1>
                    <h3 className="text-sm">{record?.provider?.email}</h3>
                </div>
            </div>
        ),
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Service Name',
        dataIndex: 'serviceName',
        key: 'serviceName',
    },
    {
        title: 'Booking Date',
        dataIndex: 'bookingDate',
        key: 'bookingDate',
    },

    {
        title: 'Action',
        key: 'action',
        render: (_: any, record: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
                <Link to={`/payments/${record?.id}`}>
                    <Info className="text-xl text-primary" />
                </Link>
                <button className="bg-primary/10 text-primary p-3 py-1 rounded-lg">Payout</button>
            </div>
        ),
    },
];

const PaymentTable = () => {
    return (
        <div className='p-4'>
            <ConfigProvider>
                <Table columns={columns} dataSource={dummyPaymentData} />
            </ConfigProvider>
        </div>
    );
};

export default PaymentTable;
