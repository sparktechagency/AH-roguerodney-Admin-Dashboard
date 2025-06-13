import { Button, DatePicker, Form, Input, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import toast from 'react-hot-toast';
import { useUpdateChallengeMutation } from '../../../../redux/features/challenge/challengeApi';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const EditChallengeForm = ({ setModalOpen, itemData }: { setModalOpen: any; itemData: any }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (itemData) {
            form.setFieldsValue({
                name: itemData?.name,
                description: itemData?.description,
                startDate: dayjs.utc(new Date(itemData?.startDate)),
                endDate: dayjs.utc(new Date(itemData?.endDate)),
                number: itemData?.number,
                amount: itemData?.amount,
                role: itemData?.role,
                recipint: itemData?.recipint,
            });
        }
    }, [itemData]);

    // handle update challenge form
    const [updateChallenge] = useUpdateChallengeMutation();
    const onFinish = async (values: any) => {
        toast.loading('Updating challenge...', { id: 'update-challenge' });
        try {
            const res = await updateChallenge({ payload: values, id: itemData?._id }).unwrap();
            if (res.success) {
                toast.success('Challenge updated successfully', { id: 'update-challenge' });
                setModalOpen(false);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update challenge', { id: 'update-challenge' });
        }
    };

    return (
        <div>
            <Form
                form={form}
                style={{
                    color: '#767676',
                }}
                layout="vertical"
                onFinish={onFinish}
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

                <Form.Item label={<label className="font-medium">Role</label>} name="role">
                    <Select placeholder="Select role" className="w-40 h-[42px]">
                        <Option value="USER">Client</Option>
                        <Option value="ARTIST">Artist</Option>
                    </Select>
                </Form.Item>

                <Form.Item label={<label className="font-medium">Recipient</label>} name="recipient">
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
                            Save Changes
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditChallengeForm;
