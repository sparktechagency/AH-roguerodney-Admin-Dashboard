import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import login from '../../assets/login.png';
import { useResetPasswordMutation } from '../../redux/features/auth/authApi';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('auth') || '';
    const [resetPassword] = useResetPasswordMutation();

    const onFinish: FormProps<any>['onFinish'] = async (values) => {
        toast.loading('Loading...', {
            id: 'reset-password',
        });
        try {
            const res = await resetPassword({ payload: values, token }).unwrap();
            if (res?.success) {
                toast.success(res?.message || 'Password updated successfully', {
                    id: 'reset-password',
                });
                navigate(`/login`);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to reset password', {
                id: 'reset-password',
            });
            console.error(error);
        }
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#9558b7',

                    // colorBgContainer: '#F1F4F9',
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
            <div className="grid grid-cols-2  items-center">
                <div>
                    <img src={login} alt="" className="w-full object-cover h-screen" />
                </div>

                <div className="flex items-center justify-center bg-[#F9F9F9] min-h-screen">
                    <div className="w-96">
                        <div className="text-primaryText space-y-3 text-center pb-6">
                            <h1 className="text-2xl text-[#111111] font-semibold text-center mt-2 ">Reset Password</h1>
                            <p className="text-sm text-[#929292]">Please enter your new password to continue</p>
                        </div>

                        <Form
                            name="normal_login"
                            className=""
                            layout="vertical"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label={
                                    <label htmlFor="newPassword" className="block text-primaryText mb-1 font-medium">
                                        New password
                                    </label>
                                }
                                name="newPassword"
                                rules={[
                                    { required: true, message: 'Please input your password!' },
                                    { min: 8, message: 'Password must be at least 8 characters' },
                                ]}
                            >
                                <Input.Password
                                    placeholder="Enter your new password"
                                    className=" h-12  px-6 rounded-lg text-base"
                                />
                            </Form.Item>

                            <Form.Item
                                label={
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block text-primaryText mb-1 font-medium"
                                    >
                                        Confirm password
                                    </label>
                                }
                                name="confirmPassword"
                                rules={[
                                    { required: true, message: 'Please confirm your new password!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Must be same both passwords'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    placeholder="Enter your confirm password"
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
                                    className="bg-primary hover:bg-opacity-80"
                                >
                                    Confirm
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ResetPassword;
