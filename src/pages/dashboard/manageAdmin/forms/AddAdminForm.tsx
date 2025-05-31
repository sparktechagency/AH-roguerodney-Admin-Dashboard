import { Button, Form, Input, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import toast from 'react-hot-toast';
import { useCreateAdminMutation } from '../../../../redux/features/admin/adminApi';
import sidebarItems from '../../../../utils/sidebarItems';

const AddAdminForm = ({ setModalOpen }: { setModalOpen: (value: boolean) => void }) => {
    const [addAdmin] = useCreateAdminMutation();
    const [form] = Form.useForm();

    // handle add admin form
    const onFinish = async (values: any) => {
        toast.loading('Adding admin...', { id: 'add-admin' });
        try {
            const res = await addAdmin({ payload: values }).unwrap();
            if (res?.success) {
                toast.success('Admin added successfully', { id: 'add-admin' });
                form.resetFields();
                setModalOpen(false);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to add admin', { id: 'add-admin' });
        }
    };

    const permissions = sidebarItems.map((item) => item.label);

    return (
        <div>
            <h1 className="text-xl font-semibold mb-6">Add Admin</h1>
            <Form
                form={form}
                style={{
                    color: '#767676',
                }}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label={<label className="font-medium">Full Name</label>}
                    name="name"
                    rules={[{ required: true, message: 'Please enter your full name' }]}
                >
                    <Input
                        style={{
                            height: 42,
                        }}
                        placeholder="Enter full name"
                        className="text-base rounded-md"
                    />
                </Form.Item>

                <Form.Item
                    label={<label className="font-medium">Email</label>}
                    name="email"
                    rules={[{ required: true, message: 'Please enter your email' }]}
                >
                    <Input
                        style={{
                            height: 42,
                        }}
                        placeholder="email@example.com"
                        className="text-base rounded-md"
                    />
                </Form.Item>

                <Form.Item
                    label={<label className="font-medium">Password</label>}
                    name="password"
                    rules={[
                        { required: true, message: 'Please enter your password' },
                        { min: 8, message: 'Password must be at least 8 characters' },
                    ]}
                >
                    <Input.Password
                        style={{
                            height: 42,
                        }}
                        placeholder="Enter password"
                        className="text-base rounded-md"
                    />
                </Form.Item>

                <Form.Item
                    label={<label className="font-medium">Role</label>}
                    name="badge"
                    rules={[{ required: true, message: 'Please select a role' }]}
                >
                    <Select defaultValue="Select role" className="w-40 h-[42px]">
                        <Option value="AH Engagement Strategist">AH Engagement Strategist</Option>
                        <Option value="AH Care Agent">AH Care Agent</Option>
                        <Option value="AH Mail Handler"> AH Mail Handler</Option>
                        <Option value="AH Executive"> AH Executive</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className="font-medium">Permissions</label>}
                    name="permissions"
                    rules={[{ required: true, message: 'Please select a permission' }]}
                >
                    <Select
                        mode="multiple"
                        className="w-40 h-[42px]"
                        optionLabelProp={undefined}
                        maxTagCount={2}
                        allowClear
                        defaultValue={'Log Out'}
                        placeholder="Select permission"
                    >
                        {permissions.map((item) => (
                            <Option key={item} value={item}>
                                {item}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <div className="flex justify-center w-full">
                        <Button
                            htmlType="submit"
                            type="primary"
                            style={{
                                height: 40,
                            }}
                            className="w-full text-base"
                        >
                            Add Admin
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddAdminForm;
