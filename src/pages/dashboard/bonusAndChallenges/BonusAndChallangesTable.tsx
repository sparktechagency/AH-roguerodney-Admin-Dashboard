import { Button, ConfigProvider, DatePicker, Form, Input, Select, Table } from 'antd';
import { dummyBonusAndChallengeData } from '../../../dummyData/bonusAndChallenges';
import { useState } from 'react';
import { Option } from 'antd/es/mentions';
import CustomModal from '../../../components/shared/CustomModal';
import { PencilLine, Trash2 } from 'lucide-react';

const BonusAndChallangesTable = () => {
    const [editChallengeModal, setEditChallengeModal] = useState(false);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_: any, record: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <h1 className="font-medium">{record?.name}</h1>
                </div>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Required Number',
            dataIndex: 'requiredNumber',
            key: 'requiredNumber',
        },
        {
            title: 'Bonus Amount',
            dataIndex: 'bonusAmount',
            key: 'bonusAmount',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, _record: any, index: number) => (
                <div key={index} className="flex items-center gap-4">
                    <PencilLine
                        onClick={() => setEditChallengeModal(true)}
                        size={20}
                        className="text-xl cursor-pointer"
                    />
                    <Trash2 size={20} className="text-xl cursor-pointer text-red-500" />
                </div>
            ),
        },
    ];

    const editChallengeForm = (
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
        <div>
            <ConfigProvider>
                <Table columns={columns} dataSource={dummyBonusAndChallengeData} />
            </ConfigProvider>

            <CustomModal
                open={editChallengeModal}
                setOpen={setEditChallengeModal}
                title="Edit Challenge"
                width={500}
                body={editChallengeForm}
            />
        </div>
    );
};

export default BonusAndChallangesTable;
