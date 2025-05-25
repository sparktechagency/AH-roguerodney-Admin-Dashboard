import { ConfigProvider, Table } from 'antd';
import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetAllBookingsQuery } from '../../../redux/features/booking/bookingApi';
import { IMAGE_URL } from '../../../redux/api/baseApi';

const columns = [
    {
        title: 'ID',
        key: 'id',
        render: (_: any, __: any, index: number) => <p key={index}># {index + 1}</p>,
    },
    {
        title: 'Client',
        key: 'client',
        render: (_: any, item: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
                <img src={`${IMAGE_URL}${item?.userId?.profile}`} alt="client img" className="size-10" />
                <div>
                    <h1 className="font-medium">{item?.userId?.name}</h1>
                    <h3 className="text-sm">{item?.userId?.email}</h3>
                </div>
            </div>
        ),
    },
    {
        title: 'Artist',
        key: 'artist',
        render: (_: any, item: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
                <img
                    src={
                        item?.artiestId?.profile?.includes('http')
                            ? item?.artiestId?.profile
                            : `${IMAGE_URL}${item?.artiestId?.profile}`
                    }
                    alt="provider img"
                    className="size-10"
                />
                <div>
                    <h1 className="font-medium">{item?.artiestId?.name}</h1>
                    <h3 className="text-sm">{item?.artiestId?.email}</h3>
                </div>
            </div>
        ),
    },
    {
        title: 'Service Location',
        key: 'serviceLocation',
        render: (_: any, item: any, index: number) => <p key={index}>{item?.address}</p>,
    },
    {
        title: 'Price',
        key: 'price',
        render: (_: any, item: any, index: number) => <p key={index}>${item?.price}</p>,
    },
    {
        title: 'Category',
        key: 'category',
        render: (_: any, item: any, index: number) => <p key={index}>{item?.serviceId?.category?.name}</p>,
    },
    {
        title: 'Appt. Time',
        key: 'apptTime',
        render: (_: any, item: any, index: number) => <p key={index}>{new Date(item?.createdAt).toLocaleString()}</p>,
    },

    {
        title: 'Action',
        key: 'action',
        render: (_: any, record: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
                <Link to={`/bookings/${record?._id}`}>
                    <Info className="text-xl text-primary" />
                </Link>
            </div>
        ),
    },
];

const BookingTable = () => {
    const { data } = useGetAllBookingsQuery(undefined);
    const bookings = data?.data;

    return (
        <div>
            <ConfigProvider>
                <Table columns={columns} dataSource={bookings} />
            </ConfigProvider>
        </div>
    );
};

export default BookingTable;
