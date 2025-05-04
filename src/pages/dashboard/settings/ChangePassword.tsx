import { Button, Form, Input } from 'antd';

const ChangePassword = () => {
    const onFinish = (values: any) => {
        console.log(values, 'from u');
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
                        name="current_password"
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
                        name="new_password"
                        rules={[{ required: true, message: 'Please input confirm password!' }]}
                    >
                        <Input.Password
                            placeholder="Enter your password"
                            className="h-12 px-6 text-base bg-stone-50 rounded-lg border-none placeholder:font-semibold"
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <label htmlFor="password" className="block text-primaryText mb-1 text-lg font-semibold">
                                Confirm Password
                            </label>
                        }
                        name="confirm_password"
                        rules={[{ required: true, message: 'Please input confirm password!' }]}
                    >
                        <Input.Password
                            placeholder="Re-enter your password"
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
