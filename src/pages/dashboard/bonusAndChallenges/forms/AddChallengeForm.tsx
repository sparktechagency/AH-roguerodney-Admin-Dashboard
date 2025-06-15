import { Button, DatePicker, Form, Input, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { useCreateChallengeMutation } from '../../../../redux/features/challenge/challengeApi';
import toast from 'react-hot-toast';

const AddChallengeForm = ({ setModalOpen }: any) => {
    const [form] = Form.useForm();

    // handle update challenge form
    const [addChallenge] = useCreateChallengeMutation();
    const handleAddChallenge = async (values: any) => {
        toast.loading('Adding challenge...', { id: 'add-challenge' });
        try {
            const res = await addChallenge({ payload: values }).unwrap();
            if (res.success) {
                toast.success('Challenge updated successfully', { id: 'add-challenge' });
                setModalOpen(false);
                form.resetFields();
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || 'Failed to add challenge', { id: 'add-challenge' });
        }
    };

    return (
        <div>
            <h1 className="text-xl font-semibold mb-6">Add Challenge</h1>
            <Form
                form={form}
                style={{
                    color: '#767676',
                }}
                layout="vertical"
                onFinish={handleAddChallenge}
            >
                <Form.Item label={<label>Name</label>} name="name">
                    <Input
                        style={{
                            height: 42,
                        }}
                        placeholder="Enter name"
                        className="rounded-md"
                    />
                </Form.Item>

                <Form.Item label={<label>Description</label>} name="description">
                    <Input.TextArea
                        style={{
                            height: 80,
                        }}
                        placeholder="Enter description"
                        className="rounded-md"
                    />
                </Form.Item>

                <div className="grid grid-cols-2 gap-2 w-full">
                    <Form.Item label={<label>Start Date</label>} name="startDate">
                        <DatePicker
                            style={{
                                height: 40,
                            }}
                            placeholder="Enter start date"
                            className="rounded-md w-full"
                        />
                    </Form.Item>

                    <Form.Item label={<label>End Date</label>} name="endDate">
                        <DatePicker
                            style={{
                                height: 40,
                            }}
                            placeholder="Enter end date"
                            className="rounded-md w-full"
                        />
                    </Form.Item>
                </div>

                <Form.Item label={<label>Required Number</label>} name="number">
                    <Input
                        type="number"
                        style={{
                            height: 42,
                        }}
                        placeholder="Enter required number"
                        className="rounded-md"
                    />
                </Form.Item>

                <Form.Item label={<label className="font-medium">Type</label>} name="type">
                    <Select placeholder="Select type" className="w-40 h-[42px]">
                        <Option value="subscription">Subscription</Option>
                        <Option value="booking">Booking</Option>
                        <Option value="referral">Referral</Option>
                    </Select>
                </Form.Item>

                <Form.Item label={<label className="font-medium">Role</label>} name="role">
                    <Select placeholder="Select role" className="w-40 h-[42px]">
                        <Option value="USER">Client</Option>
                        <Option value="ARTIST">Artist</Option>
                    </Select>
                </Form.Item>

                <Form.Item label={<label className="font-medium">Recipient</label>} name="recipint">
                    <Select placeholder="Select recipient" className="w-40 h-[42px]">
                        <Option value="ALL">All Users</Option>
                        <Option value="SUBSCRIBER">Subscribed Users</Option>
                        <Option value="UNSUBSCRIBER">Unsubscribed Users</Option>
                    </Select>
                </Form.Item>

                <Form.Item label={<label>Bonus Amount</label>} name="amount">
                    <Input
                        type="number"
                        style={{
                            height: 42,
                        }}
                        placeholder="Enter bonus amount"
                        className="rounded-md"
                    />
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
                            Submit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddChallengeForm;
