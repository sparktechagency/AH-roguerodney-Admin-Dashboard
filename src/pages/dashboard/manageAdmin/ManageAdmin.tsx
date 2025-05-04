import { Button, Form, Input, Select } from 'antd';
import AdminTable from './AdminTable';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import CustomModal from '../../../components/shared/CustomModal';
import { Option } from 'antd/es/mentions';

const ManageAdmin = () => {
    const [addAdminModal, setAddAdminModal] = useState(false);

    const addAdminForm = (
        <Form
            style={{
                color: '#767676',
            }}
            layout="vertical"
        >
            <Form.Item label={<label className="font-medium">Full Name</label>} name="name">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter full name"
                    className="text-base font-medium rounded-md"
                />
            </Form.Item>

            <Form.Item label={<label className="font-medium">Email</label>} name="email">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="email@example.com"
                    className="text-base font-medium rounded-md"
                />
            </Form.Item>

            <Form.Item label={<label className="font-medium">Password</label>} name="password">
                <Input.Password
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter password"
                    className="text-base font-medium rounded-md"
                />
            </Form.Item>

            <Form.Item label={<label className="font-medium">Role</label>} name="role">
                <Select defaultValue="Select role" className="w-40 h-[42px]">
                    <Option value="AH Engagement Strategist">AH Engagement Strategist</Option>
                    <Option value="AH Care Agent">AH Care Agent</Option>
                    <Option value="AH Mail Handler"> AH Mail Handler</Option>
                    <Option value="AH Executive"> AH Executive</Option>
                </Select>
            </Form.Item>

            <Form.Item label={<label className="font-medium">Permissions</label>} name="permission">
                <Select defaultValue="Select permission" className="w-40 h-[42px]">
                    <Option value="Can access">Can access</Option>
                    <Option value="Can add admin">Can add admin</Option>
                    <Option value="Can remove admin">Can remove admin</Option>
                    <Option value="Can block admin">Can block admin</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <div className="flex justify-center w-full">
                    <Button
                        type="primary"
                        style={{
                            height: 40,
                        }}
                        className="w-full text-base"
                    >
                        Submit
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );

    return (
        <div className="grid gap-6 p-4">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-3xl text-primary font-semibold">Manage Admins</h1>
                <Button type="primary" className="p-5 text-base" onClick={() => setAddAdminModal(true)}>
                    <Plus size={20} /> Add Admin
                </Button>
            </div>
            <AdminTable />

            <CustomModal
                open={addAdminModal}
                setOpen={setAddAdminModal}
                title="Add Admin"
                width={500}
                body={addAdminForm}
            />
        </div>
    );
};

export default ManageAdmin;
