import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import loginImg from '../../assets/login.png';
import { useDeleteAccountMutation } from '../../redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const DeleteAccount = () => {
    const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
    const [form] = Form.useForm();

    const onFinish: FormProps<any>['onFinish'] = async (values) => {
        toast.loading('Deleting...', {
            id: 'delete-account',
        });

        try {
            // perform deleteAccount api call
            const res = await deleteAccount({ payload: values }).unwrap();
            if (res?.success) {
                toast.success(res?.message || 'Account deleted successfully', { id: 'delete-account' });
                form.resetFields();
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || 'Failed to delete account', {
                id: 'delete-account',
            });
        }
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#9558b7',
                },
                components: {
                    Input: {
                        borderRadius: 40,
                        colorBorder: 'transparent',
                        colorPrimaryBorder: 'transparent',
                        hoverBorderColor: 'transparent',
                        controlOutline: 'none',
                        activeBorderColor: 'transparent',
                    },
                },
            }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                <div className="hidden lg:block">
                    <img src={loginImg} alt="" className="w-full object-cover h-screen" />
                </div>

                <div className=" flex items-center justify-center bg-[#F1F1F1] min-h-screen px-4 lg:px-6">
                    <div className=" ">
                        <div className="text-primaryText space-y-3 text-center pb-6">
                            <h1 className="text-2xl text-[#111111] font-semibold text-center mt-2 ">
                                Delete your account
                            </h1>
                            <p className="text-sm text-[#929292]">Please enter your email and password to continue</p>
                        </div>

                        <Form form={form} name="normal_login" className="" layout="vertical" onFinish={onFinish}>
                            <Form.Item
                                label={
                                    <label htmlFor="email" className="block text-primaryText mb-1 font-medium">
                                        Email
                                    </label>
                                }
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input
                                    placeholder="Enter your email address"
                                    type="email"
                                    className=" h-12  px-6 rounded-lg text-base"
                                />
                            </Form.Item>

                            <Form.Item
                                label={
                                    <label htmlFor="password" className="block text-primaryText mb-1 font-medium">
                                        Password
                                    </label>
                                }
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input.Password
                                    placeholder="Enter your password"
                                    className=" h-12  px-6 rounded-lg text-base"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        height: 45,
                                        width: '100%',
                                        fontWeight: 500,
                                    }}
                                    className="bg-red-500 hover:bg-red-800"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Loader2 className="animate-spin" /> : 'Delete Account'}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default DeleteAccount;
