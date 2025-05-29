import { Avatar, Select, Table } from 'antd';
import { useUpdateSearchParams } from '../../../utils/updateSearchParams';
import { useGetAllSubscribersQuery } from '../../../redux/features/subscription/subscriptionApi';
import { useGetAllPlansQuery } from '../../../redux/features/plan/planApi';
import { Option } from 'antd/es/mentions';
import { getSearchParams } from '../../../utils/getSearchParams';

const ClientSubscriberTable = () => {
    const { data: subscriberData, isLoading } = useGetAllSubscribersQuery({
        query: `${location.search}${location.search ? '&user=USER' : '?user=USER'}`,
    });
    const pagination = subscriberData?.pagination;

    const { data: packageTypesData } = useGetAllPlansQuery({
        query: `for=USER`,
    });

    const { package: packageName = '', status = '' } = getSearchParams();
    const udpateSearchParams = useUpdateSearchParams();
    const formatedData = subscriberData?.data?.map((item: any, index: number) => ({ ...item, key: index + 1 })) || [];

    const packageTypes =
        packageTypesData?.data?.map((item: any) => ({
            value: item.name,
            label: item.name,
        })) || [];

    const tableColumns = [
        {
            title: 'S. no.',
            key: 'key',
            render: (_: any, record: any) => <span># {record?.key}</span>,
        },
        {
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
            render: (_: any, item: any) => {
                return (
                    <div className="flex items-center gap-2">
                        <Avatar size="large" src="/user.svg" />
                        <div>
                            <div className="text-sm font-medium">{item?.user?.name}</div>
                            <div className="text-xs text-gray-500">{item?.user?.email}</div>
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Subscription Plan',
            key: 'plan',
            render: (_: any, record: any) => <span>{record?.package?.name}</span>,
        },
        {
            title: 'Price',
            key: 'price',
            render: (_: any, record: any) => <span>${record?.price}</span>,
        },
        {
            title: 'Start Date',
            key: 'startDate',
            render: (_: any, record: any) => <span>{record?.currentPeriodStart?.split('T')[0]}</span>,
        },
        {
            title: 'Expired Date',
            key: 'expiredDate',
            render: (_: any, record: any) => <span>{record?.currentPeriodEnd.split('T')[0]}</span>,
        },
    ];

    const activeStatusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
    ];

    return (
        <>
            <div className="flex items-center gap-5 justify-end ">
                <Select
                    onSelect={(value) => udpateSearchParams({ package: value })}
                    defaultValue={packageName}
                    className="w-32 h-[40px]"
                >
                    <Option value="">All Package</Option>
                    {packageTypes.map((item: any) => (
                        <Option key={item.value} value={item.value}>
                            {item.label}
                        </Option>
                    ))}
                </Select>
                <Select
                    onSelect={(value) => udpateSearchParams({ status: value })}
                    defaultValue={status}
                    className="w-32 h-[40px]"
                >
                    <Option value="">All Status</Option>
                    {activeStatusOptions.map((item: any) => (
                        <Option key={item.value} value={item.value}>
                            {item.label}
                        </Option>
                    ))}
                </Select>
            </div>

            <div>
                <Table
                    columns={tableColumns}
                    dataSource={formatedData}
                    pagination={{
                        pageSize: pagination?.limit,
                        total: pagination?.total,
                        current: pagination?.page,
                        onChange: (page: number) => udpateSearchParams({ page }),
                    }}
                    loading={isLoading}
                />
            </div>
        </>
    );
};

export default ClientSubscriberTable;
