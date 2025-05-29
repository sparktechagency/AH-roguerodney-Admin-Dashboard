import { ConfigProvider, Table } from 'antd';
import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../../../redux/api/baseApi';
import { useGetAllReportsQuery } from '../../../redux/features/report/reportApi';
import { useUpdateSearchParams } from '../../../utils/updateSearchParams';

const columns = [
    {
        title: 'ID',
        key: 'id',
        render: (_: any, __: any, index: number) => <p key={index}># {index + 1}</p>,
    },
    {
        title: 'Reporter',
        key: 'reporter',
        render: (_: any, item: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
                <img
                    src={
                        item?.user?.profile?.includes('http')
                            ? item?.user?.profile
                            : `${IMAGE_URL}${item?.user?.profile}`
                    }
                    alt="reporter img"
                    className="size-10 rounded-md"
                />
                <div>
                    <h1 className="font-medium">{item?.user?.name}</h1>
                    <h3 className="text-sm">{item?.user?.email}</h3>
                </div>
            </div>
        ),
    },
    {
        title: 'Service',
        key: 'service',
        render: (_: any, item: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
                <img
                    src={
                        item?.reservation?.serviceId?.image?.includes('http')
                            ? item?.reservation?.serviceId?.image
                            : `${IMAGE_URL}${item?.reservation?.serviceId?.image}`
                    }
                    alt="service"
                    className="size-10 rounded-md"
                />
                <div>
                    <h1 className="font-medium">{item?.reservation?.serviceId?.name}</h1>
                </div>
            </div>
        ),
    },
    {
        title: 'Price',
        key: 'price',
        render: (_: any, item: any, index: number) => <p key={index}>${item?.reservation?.price}</p>,
    },
    {
        title: 'Report Time',
        key: 'reportTime',
        render: (_: any, item: any, index: number) => <p key={index}>{new Date(item?.createdAt).toLocaleString()}</p>,
    },
    {
        title: 'Status',
        key: 'status',
        render: (_: any, item: any, index: number) => (
            <p key={index} className="capitalize">
                {item?.status}
            </p>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_: any, record: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
                <Link to={`/reports/${record?._id}`}>
                    <Info className="text-xl text-primary" />
                </Link>
            </div>
        ),
    },
];

const ReportTable = () => {
    const updateSearchParams = useUpdateSearchParams();
    const { data, isLoading } = useGetAllReportsQuery({ query: location.search });
    const reports = data?.data;
    const pagination = data?.pagination;

    return (
        <div>
            <ConfigProvider>
                <Table
                    columns={columns}
                    dataSource={reports}
                    loading={isLoading}
                    pagination={{
                        current: pagination?.page,
                        pageSize: pagination?.limit,
                        total: pagination?.total,
                        onChange: (page) => updateSearchParams({ page }),
                    }}
                />
            </ConfigProvider>
        </div>
    );
};

export default ReportTable;
