import { ConfigProvider, Form, Table } from 'antd';
import { Trash2 } from 'lucide-react';
import { useDeleteAdminMutation, useGetAllAdminsQuery } from '../../../redux/features/admin/adminApi';
import DeleteModal from '../../../components/shared/DeleteAlertModal';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useUpdateSearchParams } from '../../../utils/updateSearchParams';

const AdminTable = () => {
    const updateSearchParams = useUpdateSearchParams();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
    const [deleteAdmin] = useDeleteAdminMutation();
    const { data, isLoading } = useGetAllAdminsQuery({ query: location.search });
    const admins = data?.data || [];
    const pagination = data?.pagination || {};

    const [form] = Form.useForm();

    // handle delete admin
    const handleDeleteAdmin = async () => {
        toast.loading('Deleting admin...', { id: 'delete-admin' });
        try {
            const res = await deleteAdmin({ id: selectedAdminId }).unwrap();
            if (res?.success) {
                toast.success('Admin deleted successfully', { id: 'delete-admin' });
                setDeleteModalOpen(false);
                setSelectedAdminId(null);
                form.resetFields();
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete admin', { id: 'delete-admin' });
        }
    };

    const columns = [
        {
            title: 'ID',
            key: 'id',
            render: (_: any, __: any, index: number) => <h1># {index + 1}</h1>,
        },
        {
            title: 'Full Name',
            dataIndex: 'name',
            key: 'name',
            render: (_: any, record: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <h1>{record?.name}</h1>
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
            dataIndex: 'badge',
            key: 'badge',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, item: any, index: number) => (
                <button
                    onClick={() => {
                        setDeleteModalOpen(true);
                        setSelectedAdminId(item?._id);
                    }}
                    key={index}
                >
                    <Trash2 className="text-xl text-red-500" />
                </button>
            ),
        },
    ];

    return (
        <div>
            <ConfigProvider>
                <Table
                    columns={columns}
                    dataSource={admins}
                    loading={isLoading}
                    pagination={{
                        pageSize: pagination?.limit,
                        total: pagination?.total,
                        current: pagination?.page,
                        onChange: (page) => updateSearchParams({ page }),
                    }}
                />
            </ConfigProvider>

            <DeleteModal open={deleteModalOpen} setOpen={setDeleteModalOpen} action={handleDeleteAdmin} />
        </div>
    );
};

export default AdminTable;
