import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { useNavigate } from 'react-router-dom';
import login from '../../assets/login.png';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const onFinish: FormProps<FieldNamesType>['onFinish'] = (values) => {
        console.log('Received values of form: ', values);
        navigate('/reset-password');
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
                    <div className="max-w-sm">
                        <div className=" space-y-3 text-center">
                            <h1 className="text-2xl text-[#111111] font-semibold text-center mt-2">
                                Verification code
                            </h1>
                            <p className="text-primaryText">
                                We sent a reset link to contact@dscode...com enter 5 digit code that is mentioned in the
                                email
                            </p>
                        </div>

                        <Form
                            name="normal_VerifyOtp"
                            className="my-5"
                            layout="vertical"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                className="flex items-center justify-center mx-auto"
                                name="otp"
                                rules={[{ required: true, message: 'Please input otp code here!' }]}
                            >
                                <Input.OTP length={5} size="large" />
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
                                    className="rounded-lg"
                                >
                                    Confirm
                                </Button>
                            </Form.Item>
                            <div className="text-center flex items-center justify-center gap-2">
                                <p className="text-primaryText font-medium">Didn't receive the code?</p>
                                <p className="text-primary font-medium hover:underline">Resend code</p>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VerifyOtp;
