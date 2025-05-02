import { Table, Dropdown, Input, Select } from 'antd';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import CustomModal from '../../components/shared/CustomModal';
import BrandDetails from '../../components/ui/BrandDetails';
const { Option } = Select;
// Sample data

const Brands = () => {
    const [showBrand, setShowBrand] = useState(false);

    const data = [
        {
            key: '00001',
            name: 'Christine Brooks',
            email: 'alma.lawson@example.com',
            status: 'Approved',
        },
        {
            key: '00002',
            name: 'Rosie Pearson',
            email: 'tim.jennings@example.com',
            status: 'Pending',
        },
        {
            key: '00003',
            name: 'Darrell Caldwell',
            email: 'debra.holt@example.com',
            status: 'Rejected',
        },
        {
            key: '00004',
            name: 'Gilbert Johnston',
            email: 'kenzi.lawson@example.com',
            status: 'Approved',
        },
        {
            key: '00005',
            name: 'Alan Cain',
            email: 'willie.jennings@example.com',
            status: 'Pending',
        },
        {
            key: '00006',
            name: 'Alfred Murray',
            email: 'georgia.young@example.com',
            status: 'Pending',
        },
        {
            key: '00007',
            name: 'Maggie Sullivan',
            email: 'michelle.rivera@example.com',
            status: 'Approved',
        },
        {
            key: '00008',
            name: 'Rosie Todd',
            email: 'bill.sanders@example.com',
            status: 'Rejected',
        },
        {
            key: '00009',
            name: 'Dollie Hines',
            email: 'deanna.curtis@example.com',
            status: 'Approved',
        },
    ];

    // Column definitions
    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: "Brand's Name",
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Application Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <span
                    className={`px-3 py-1 rounded-full  font-semibold ${
                        status === 'Approved'
                            ? 'bg-[#ccf0eb] text-[#00B69B]'
                            : status === 'Pending'
                            ? 'bg-[#e0d4fc] text-[#6226EF]'
                            : 'bg-[#fcd7d4] text-[#EF3826]'
                    }`}
                >
                    {status}
                </span>
            ),
        },

        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: 'view',
                                label: <span onClick={() => setShowBrand(true)}>View</span>,
                            },
                            {
                                key: 'recommend',
                                label: <span onClick={() => handleAction('recommend', record)}>Recommend Creator</span>,
                            },
                            {
                                key: 'disable',
                                label: <span onClick={() => handleAction('disable', record)}>Disable User</span>,
                            },
                            {
                                key: 'enable',
                                label: <span onClick={() => handleAction('enable', record)}>Enable User</span>,
                            },
                            {
                                key: 'remove',
                                label: <span onClick={() => handleAction('remove', record)}>Remove</span>,
                            },
                        ],
                    }}
                    trigger={['click']}
                >
                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        <BsThreeDotsVertical />
                    </a>
                </Dropdown>
            ),
        },
    ];

    const handleAction = (action: any, record: any) => {
        console.log(action, record);
        // Implement action handling logic here
    };
    return (
        <div className="">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl text-primary font-semibold">Manage Brands</h1>
                </div>
                <div className="flex items-center gap-5 justify-end mb-5">
                    <Input
                        style={{
                            maxWidth: 300,
                            height: 42,
                        }}
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                    />

                    {/* Dropdown Filter */}
                    <Select defaultValue="All" className="w-40 h-[42px]">
                        <Option value="All">All</Option>
                        <Option value="Active">Active</Option>
                        <Option value="Inactive">Inactive</Option>
                        <Option value="Pending">Pending</Option>
                    </Select>
                </div>
            </div>
            <Table columns={columns} dataSource={data} rowClassName="hover:bg-gray-100" />

            <CustomModal open={showBrand} setOpen={setShowBrand} body={<BrandDetails />} key={'brand'} width={900} />
        </div>
    );
};

export default Brands;
