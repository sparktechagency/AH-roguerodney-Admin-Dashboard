import { Table, Input, Select } from 'antd';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
// Sample data

const Clients = () => {
    const navigate = useNavigate();

    const data = [
        {
            key: '2472-1',
            client: 'Candice',
            email: 'candice@gmail.com',
            contact: '01867412400',
            location: '01867412400',
            plan: 'Ah Casual',
            joiningDate: '2/11/12',
        },
        {
            key: '2450-1',
            client: 'Candice',
            email: 'candice@gmail.com',
            contact: '01867412400',
            location: '01867412400',
            plan: 'Ah Glow',
            joiningDate: '2/11/12',
        },
        {
            key: '2450-2',
            client: 'Candice',
            email: 'candice@gmail.com',
            contact: '01867412400',
            location: '01867412400',
            plan: 'Ah Casual',
            joiningDate: 'Nail',
        },
        {
            key: '2450-3',
            client: 'Candice',
            email: 'candice@gmail.com',
            contact: '01867412400',
            location: '01867412400',
            plan: 'Ah Basic',
            joiningDate: 'Hair',
        },
        {
            key: '2450-4',
            client: 'Candice',
            email: 'candice@gmail.com',
            contact: '01867412400',
            location: '01867412400',
            plan: 'Ah Pro',
            joiningDate: 'Makeup',
        },
        {
            key: '2465-1',
            client: 'Candice',
            email: 'candice@gmail.com',
            contact: '01867412400',
            location: '01867412400',
            plan: 'Ah Casual',
            joiningDate: 'Hair',
        },
        {
            key: '2472-2',
            client: 'Candice',
            email: 'candice@gmail.com',
            contact: '01867412400',
            location: '01867412400',
            plan: 'Ah Glow',
            joiningDate: 'Makeup',
        },
        {
            key: '2465-2',
            client: 'Candice',
            email: 'candice@gmail.com',
            contact: '01867412400',
            location: '01867412400',
            plan: 'Ah Luxe',
            joiningDate: 'Makeup',
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
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Subscription Plan',
            dataIndex: 'plan',
            key: 'plan',
        },
        {
            title: 'Joining Date',
            dataIndex: 'joiningDate',
            key: 'joiningDate',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any) => (
                <div className="flex items-center gap-2">
                    <button
                        className="text-primary font-semibold border  rounded-md w-24 h-[35px]"
                        onClick={() => navigate('/user-details')}
                    >
                        view
                    </button>
                    <Select defaultValue="Active" className="w-24 h-[35px]">
                        <Option value="All">All</Option>
                        <Option value="Active">Active</Option>
                        <Option value="Inactive">Inactive</Option>
                        <Option value="Pending">Pending</Option>
                    </Select>
                </div>
            ),
        },
    ];

    return (
        <div className="grid gap-4 p-4">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl text-[#2C2C2C] font-semibold">Clients</h1>
                </div>
                <div className="flex items-center gap-5 justify-end">
                    <Input
                        style={{
                            maxWidth: 300,
                            height: 40,
                        }}
                        placeholder="Search"
                        prefix={<Search size={20} color="#2C2C2C" />}
                    />

                    {/* Dropdown Filter */}
                    <Select defaultValue="Active" className="w-32 h-[40px]">
                        <Option value="All">All</Option>
                        <Option value="Active">Active</Option>
                        <Option value="Inactive">Inactive</Option>
                        <Option value="Pending">Pending</Option>
                    </Select>
                </div>
            </div>
            <Table columns={columns} dataSource={data} rowClassName="hover:bg-gray-100" />
        </div>
    );
};

export default Clients;
