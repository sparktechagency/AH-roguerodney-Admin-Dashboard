import { Button, Checkbox, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { Link, useNavigate } from 'react-router-dom';
import login from '../../assets/login.png';

const Login = () => {
    const navigate = useNavigate();
    const onFinish: FormProps<FieldNamesType>['onFinish'] = (values) => {
        console.log('Received values of form: ', values);
        navigate('/');
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
                    <div className=" ">
                        <div className="text-primaryText space-y-3 text-center pb-6">
                            <h1 className="text-2xl text-[#111111] font-semibold text-center mt-2 ">
                                Log in to your account
                            </h1>
                            <p className="text-sm text-[#929292]">Please enter your email and password to continue</p>
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

                            <div className="flex items-center justify-between mb-4">
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox className="text-primaryText font-medium">Remember me</Checkbox>
                                </Form.Item>
                                <Link
                                    to="/forget-password"
                                    className="text-primary text-md hover:text-primary hover:underline"
                                >
                                    Forget password
                                </Link>
                            </div>

                            <Form.Item>
                                <Button
                                    shape="round"
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        height: 45,
                                        width: '100%',
                                        fontWeight: 500,
                                    }}
                                    className="bg-primary hover:bg-opacity-80"
                                >
                                    Sign In
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default Login;
