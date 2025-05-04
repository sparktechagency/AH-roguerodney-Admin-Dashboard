import { ConfigProvider, Table } from 'antd';
import { Trash2 } from 'lucide-react';
import { dummyAdminData } from '../../../dummyData/admins';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Full Name',
        dataIndex: 'name',
        key: 'name',
        render: (_: any, record: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
                <h1 className="font-medium">{record?.name}</h1>
            </div>
        ),
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_: any, _record: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
                <Trash2 className="text-xl text-red-500" />
            </div>
        ),
    },
];

const AdminTable = () => {
    return (
        <div>
            <ConfigProvider>
                <Table columns={columns} dataSource={dummyAdminData} />
            </ConfigProvider>
        </div>
    );
};

export default AdminTable;
