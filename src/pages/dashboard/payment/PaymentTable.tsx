import { ConfigProvider, Table } from 'antd';
import { useGetAllPaymentsQuery } from '../../../redux/features/payment/paymentApi';
import { IMAGE_URL } from '../../../redux/api/baseApi';

const columns = [
    {
        title: 'ID',
        key: 'id',
        render: (_: any, __: any, index: number) => <p key={index}># {index + 1}</p>,
    },
    {
        title: 'Client',
        dataIndex: 'client',
        key: 'client',
        render: (_: any, record: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
                <img src={`${IMAGE_URL}${record?.userId?.profile}`} alt="user img" className="size-10" />
                <div>
                    <h1 className="font-medium">{record?.userId?.name}</h1>
                    <h3 className="text-sm">{record?.userId?.email}</h3>
                </div>
            </div>
        ),
    },
    {
        title: 'Artist',
        dataIndex: 'artist',
        key: 'artist',
        render: (_: any, record: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
                <img src={`${IMAGE_URL}${record?.artiestId?.profile}`} alt="artist img" className="size-10" />
                <div>
                    <h1 className="font-medium">{record?.artiestId?.name}</h1>
                    <h3 className="text-sm">{record?.artiestId?.email}</h3>
                </div>
            </div>
        ),
    },
    {
        title: 'Price',
        key: 'price',
        render: (_: any, record: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
                <h1>$ {record?.price}</h1>
            </div>
        ),
    },
    {
        title: 'Category',
        key: 'category',
        render: (_: any, record: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
                <h1>{record?.serviceId?.category?.name}</h1>
            </div>
        ),
    },
    {
        title: 'Service Name',
        key: 'serviceName',
        render: (_: any, record: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
                <h1>{record?.serviceId?.name}</h1>
            </div>
        ),
    },
    {
        title: 'Booking Date',
        key: 'bookingDate',
        render: (_: any, record: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
                <h1>{record?.createdAt?.split('T')[0]}</h1>
            </div>
        ),
    },
];

const PaymentTable = () => {
    const { data } = useGetAllPaymentsQuery(undefined);
    const payments = data?.data || [];

    return (
        <div className="p-4">
            <ConfigProvider>
                <Table columns={columns} dataSource={payments} />
            </ConfigProvider>
        </div>
    );
};

export default PaymentTable;
