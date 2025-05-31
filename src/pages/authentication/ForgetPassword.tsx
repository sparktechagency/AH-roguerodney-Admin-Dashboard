import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import login from '../../assets/login.png';
import toast from 'react-hot-toast';
import { useForgotPasswordMutation } from '../../redux/features/auth/authApi';
import { Loader2 } from 'lucide-react';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const onFinish: FormProps<any>['onFinish'] = async (values) => {
        toast.loading('Loading...', {
            id: 'forgot-password',
        });
        try {
            const res = await forgotPassword(values).unwrap();
            if (res?.success) {
                toast.success(res?.message || 'OTP sent successfully', {
                    id: 'forgot-password',
                });
                navigate(`/verify-otp?email=${values?.email}`);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to send OTP', {
                id: 'forgot-password',
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

                <div className=" flex items-center justify-center bg-[#F1F1F1] min-h-screen">
                    <div className="min-w-96">
                        <div className="text-primaryText space-y-3 text-center pb-6">
                            <h1 className="text-2xl text-[#111111] font-semibold text-center mt-2 ">
                                Forgot password?
                            </h1>
                            <p className="text-sm text-[#929292]">Please enter your email for verification</p>
                        </div>

                        <Form name="normal_login" className="" layout="vertical" onFinish={onFinish}>
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

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        height: 45,
                                        width: '100%',
                                        fontWeight: 500,
                                    }}
                                    className="bg-primary hover:bg-opacity-80 rounded-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Loader2 className="animate-spin" /> : 'Send OTP'}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ForgetPassword;
