import { Avatar, Select, Table } from 'antd';

const tableData = [
    {
        key: '1',
        no: '#2472',
        client: { name: 'Candice', email: 'candice@gmail.com' },
        role: 'Client',
        plan: 'Ah Casual',
        price: '$130',
        startDate: '2/11/12',
        expiredDate: '8/11/12',
    },
    {
        key: '2',
        no: '#2450',
        client: { name: 'Candice', email: 'candice@gmail.com' },
        role: 'Artist',
        plan: 'Ah Basic',
        price: '$130',
        startDate: '2/11/12',
        expiredDate: '8/11/12',
    },
    {
        key: '3',
        no: '#2450',
        client: { name: 'Candice', email: 'candice@gmail.com' },
        role: 'Client',
        plan: 'Ah Casual',
        price: '$130',
        startDate: '2/11/12',
        expiredDate: '8/11/12',
    },
    {
        key: '4',
        no: '#2450',
        client: { name: 'Candice', email: 'candice@gmail.com' },
        role: 'Artist',
        plan: 'Ah Basic',
        price: '$130',
        startDate: '2/11/12',
        expiredDate: '8/11/12',
    },
    {
        key: '5',
        no: '#2450',
        client: { name: 'Candice', email: 'candice@gmail.com' },
        role: 'Client',
        plan: 'Ah Pro',
        price: '$130',
        startDate: '2/11/12',
        expiredDate: '8/11/12',
    },
    {
        key: '6',
        no: '#2465',
        client: { name: 'Candice', email: 'candice@gmail.com' },
        role: 'Artist',
        plan: 'Ah Casual',
        price: '$130',
        startDate: '2/11/12',
        expiredDate: '8/11/12',
    },
];
const SubscriberTable = () => {
    const renderClient = ({ name, email }: { name: string; email: string }) => (
        <div className="flex items-center gap-2">
            <Avatar size="large" src="/user.svg" />
            <div>
                <div className="text-sm font-medium">{name}</div>
                <div className="text-xs text-gray-500">{email}</div>
            </div>
        </div>
    );

    const tableColumns = [
        {
            title: 'S. no.',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
            render: renderClient,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Subscription Plan',
            dataIndex: 'plan',
            key: 'plan',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Expired Date',
            dataIndex: 'expiredDate',
            key: 'expiredDate',
        },
    ];

    const subscriptionPlansOption = [
        { value: 'Ah Casual ', label: 'Ah Casual ' },
        { value: 'Ah Basic', label: 'Ah Basic' },
        { value: 'Ah Pro', label: 'Ah Pro' },
    ];

    const activeStatusOption = [
        { value: 'Active', label: 'Active' },
        { value: 'Expired', label: 'Expired' },
        { value: 'Deactivate', label: 'Deactivate' },
    ];

    const roleOption = [
        { value: 'Client', label: 'Client' },
        { value: 'Artist', label: 'Artist' },
    ];
    return (
        <>
            <div className="flex justify-between items-center">
                <p className="text-2xl  font-semibold text-[#222222]"> Subscriber</p>
                <div className="flex items-center gap-5 justify-end ">
                    <Select
                        defaultValue="Subscription Plan"
                        className="w-auto h-[30px]"
                        options={subscriptionPlansOption}
                    />
                    <Select defaultValue="Active" className="w-auto h-[30px]" options={activeStatusOption} />
                    <Select defaultValue="Role" className="w-auto h-[30px]" options={roleOption} />
                </div>
            </div>

            <div>
                <Table columns={tableColumns} dataSource={tableData} />
            </div>
        </>
    );
};

export default SubscriberTable;
