import { Button, DatePicker, Form, Input, Select } from 'antd';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import CustomModal from '../../../components/shared/CustomModal';
import { Option } from 'antd/es/mentions';
import BonusAndChallangesTable from './BonusAndChallangesTable';

const BonusAndChallanges = () => {
    const [addChallengeModal, setAddChallengeModal] = useState(false);

    const addChallengeForm = (
        <Form
            style={{
                color: '#767676',
            }}
            layout="vertical"
        >
            <Form.Item label={<label className="font-medium">Name</label>} name="name">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter name"
                    className="text-base font-medium rounded-md"
                />
            </Form.Item>

            <Form.Item label={<label className="font-medium">Description</label>} name="description">
                <Input.TextArea
                    style={{
                        height: 80,
                    }}
                    placeholder="Enter description"
                    className="text-base font-medium rounded-md"
                />
            </Form.Item>

            <div className="grid grid-cols-2 gap-2 w-full">
                <Form.Item label={<label className="font-medium">Start Date</label>} name="startDate">
                    <DatePicker
                        style={{
                            height: 40,
                        }}
                        placeholder="Enter start date"
                        className="text-base font-medium rounded-md w-full"
                    />
                </Form.Item>

                <Form.Item label={<label className="font-medium">End Date</label>} name="endDate">
                    <DatePicker
                        style={{
                            height: 40,
                        }}
                        placeholder="Enter end date"
                        className="text-base font-medium rounded-md w-full"
                    />
                </Form.Item>
            </div>

            <Form.Item label={<label className="font-medium">Required Number</label>} name="requiredNumber">
                <Input
                    type="number"
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter required number"
                    className="text-base font-medium rounded-md"
                />
            </Form.Item>

            <Form.Item label={<label className="font-medium">Role</label>} name="role">
                <Select defaultValue="Select role" className="w-40 h-[42px]">
                    <Option value="Client">Client</Option>
                    <Option value="Artist">Artist</Option>
                </Select>
            </Form.Item>

            <Form.Item label={<label className="font-medium">Recipint</label>} name="recipint">
                <Select defaultValue="Select recipint" className="w-40 h-[42px]">
                    <Option value="All Users">All Users</Option>
                    <Option value="Subscribed Artists">Subscribed Artists</Option>
                    <Option value="Unsubscribed Artists">Unsubscribed Artists</Option>
                </Select>
            </Form.Item>

            <Form.Item label={<label className="font-medium">Bonus Amount</label>} name="bonusAmount">
                <Input
                    type="number"
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter bonus amount"
                    className="text-base font-medium rounded-md"
                />
            </Form.Item>

            <Form.Item>
                <div className="flex justify-center w-full">
                    <Button
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
