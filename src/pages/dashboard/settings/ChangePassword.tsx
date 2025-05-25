import { Button, Form, Input } from 'antd';
import { useChangePasswordMutation } from '../../../redux/features/auth/authApi';
import toast from 'react-hot-toast';

const ChangePassword = () => {
    const [changePassword] = useChangePasswordMutation();

    const onFinish = async (values: any) => {
        toast.loading('Changing password...', { id: 'change-password' });

        try {
            const res = await changePassword({ payload: values }).unwrap();
            console.log(res);
            if (res?.success) {
                toast.success('Password changed successfully', { id: 'change-password' });
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || 'Failed to change password', { id: 'change-password' });
        }
    };
    return (
        <section className="grid gap-4 p-4">
            <div className="">
                <h1 className="text-3xl text-primary font-semibold">Change Password</h1>
            </div>
            <div className="bg-white p-6 rounded-lg">
                <Form layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
                    <Form.Item
                        label={
                            <label htmlFor="password" className="block text-primaryText mb-1 text-lg font-semibold">
                                Current Password
                            </label>
                        }
                        name="currentPassword"
                        rules={[{ required: true, message: 'Please input new password!' }]}
                    >
                        <Input.Password
                            placeholder="Enter your password"
                            className=" h-12 px-6 text-base bg-stone-50 rounded-lg border-none placeholder:font-semibold"
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <label htmlFor="password" className="block text-primaryText mb-1 text-lg font-semibold">
                                New Password
                            </label>
                        }
                        name="newPassword"
                        rules={[
                            { required: true, message: 'Please enter new password' },
                            { min: 6, message: 'Password must be at least 6 characters' },
                        ]}
                    >
                        <Input.Password
                            placeholder="Enter new password"
                            className="h-12 px-6 text-base bg-stone-50 rounded-lg border-none placeholder:font-semibold"
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <label htmlFor="password" className="block text-primaryText mb-1 text-lg font-semibold">
                                Confirm Password
                            </label>
                        }
                        name="confirmPassword"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Please confirm your password' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Confirm new password"
                            className="h-12 px-6 text-base bg-stone-50 rounded-lg border-none placeholder:font-semibold"
                        />
                    </Form.Item>

                    <Form.Item className="flex">
                        <Button
                            shape="round"
                            type="primary"
                            htmlType="submit"
                            style={{
                                height: 45,
                                width: '100%',
                                fontSize: '16px',
                                fontWeight: 500,
                                padding: '4px 32px',
                            }}
                        >
                            Change Password
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
};

export default ChangePassword;
