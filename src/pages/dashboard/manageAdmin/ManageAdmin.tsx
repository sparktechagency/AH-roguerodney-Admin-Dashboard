import { Button } from 'antd';
import AdminTable from './AdminTable';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import MyModal from '../../../components/shared/MyModal';
import AddAdminForm from './forms/AddAdminForm';

const ManageAdmin = () => {
    const [addAdminModal, setAddAdminModal] = useState(false);

    return (
        <div className="grid gap-6 p-4">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-3xl text-primary font-semibold">Manage Admins</h1>
                <Button type="primary" className="p-5 text-base" onClick={() => setAddAdminModal(true)}>
                    <Plus size={20} /> Add Admin
                </Button>
            </div>
            <AdminTable />

            <MyModal open={addAdminModal} setOpen={setAddAdminModal}>
                <AddAdminForm setModalOpen={setAddAdminModal} />
            </MyModal>
        </div>
    );
};

export default ManageAdmin;
