import { ConfigProvider, Table } from 'antd';
import { Info } from 'lucide-react';
import { dummyBookingData } from '../../../dummyData/Booking';
import { Link } from 'react-router-dom';

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
        title: 'Service Location',
        dataIndex: 'serviceLocation',
        key: 'serviceLocation',
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
        title: 'Appt. Time',
        dataIndex: 'apptTime',
        key: 'apptTime',
    },

    {
        title: 'Action',
        key: 'action',
        render: (_: any, record: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
                <Link to={`/bookings/${record?.id}`}>
                    <Info className="text-xl text-primary" />
                </Link>
            </div>
        ),
    },
];

const BookingTable = () => {
    return (
        <div>
            <ConfigProvider>
                <Table columns={columns} dataSource={dummyBookingData} />
            </ConfigProvider>
        </div>
    );
};

export default BookingTable;
