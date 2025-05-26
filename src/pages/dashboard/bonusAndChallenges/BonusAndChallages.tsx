import { Button, DatePicker, Form, Input, Select } from 'antd';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import CustomModal from '../../../components/shared/CustomModal';
import { Option } from 'antd/es/mentions';
import BonusAndChallangesTable from './BonusAndChallangesTable';
import { useCreateChallengeMutation } from '../../../redux/features/challenge/challengeApi';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

const BonusAndChallanges = () => {
    const [addChallengeModal, setAddChallengeModal] = useState(false);
    const [activeChallenge, setActiveChallenge] = useState<any>(undefined);

    // handle update challenge form
    const [addChallenge] = useCreateChallengeMutation();
    const onFinish = async (values: any) => {
        toast.loading('Updating challenge...', { id: 'update-challenge' });
        try {
            const res = await addChallenge({ payload: values }).unwrap();
            if (res.success) {
                toast.success('Challenge updated successfully', { id: 'update-challenge' });
                setAddChallengeModal(false);
                setActiveChallenge(undefined);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update challenge', { id: 'update-challenge' });
        }
    };

    const addChallengeForm = (
        <Form
            style={{
                color: '#767676',
            }}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
                name: activeChallenge?.name,
                description: activeChallenge?.description,
                startDate: activeChallenge?.startDate ? dayjs(activeChallenge.startDate) : undefined,
                endDate: activeChallenge?.endDate ? dayjs(activeChallenge.endDate) : undefined,
                number: activeChallenge?.number,
                role: activeChallenge?.role,
                amount: activeChallenge?.amount,
                recipint: activeChallenge?.recipint,
            }}
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

            <Form.Item label={<label className="font-medium">Recipint</label>} name="recipint">
                <Select placeholder="Select recipint" className="w-40 h-[42px]">
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
    );

    return (
        <div className="grid gap-6 p-4">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-3xl text-primary font-semibold">Ah-tist Bonus & Challenge System</h1>
                <Button type="primary" className="p-5 text-base" onClick={() => setAddChallengeModal(true)}>
                    <Plus size={20} /> Add Challenge
                </Button>
            </div>
            <BonusAndChallangesTable />

            <CustomModal
                open={addChallengeModal}
                setOpen={setAddChallengeModal}
                title="Add Challenge"
                width={500}
                body={addChallengeForm}
            />
        </div>
    );
};

export default BonusAndChallanges;
