import { Button, ConfigProvider, DatePicker, Form, Input, Select, Table } from 'antd';
import { useState } from 'react';
import { Option } from 'antd/es/mentions';
import CustomModal from '../../../components/shared/CustomModal';
import { PencilLine, Trash2 } from 'lucide-react';
import { useGetAllChallengesQuery, useUpdateChallengeMutation } from '../../../redux/features/challenge/challengeApi';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

type Challenge = {
    _id?: string;
    name?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    number?: number;
    amount?: number;
    role?: string;
    recipint?: string;
};

const BonusAndChallangesTable = () => {
    const [editChallengeModal, setEditChallengeModal] = useState(false);
    const [activeChallenge, setActiveChallenge] = useState<Challenge | undefined>(undefined);

    const { data } = useGetAllChallengesQuery({ query: '' });
    const challengesData = data?.data;

    const columns = [
        {
            title: 'ID',
            key: 'id',
            render: (_: any, __: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <h1># {index + 1}</h1>
                </div>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_: any, record: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <h1>{record?.name}</h1>
                </div>
            ),
        },
        {
            title: 'Description',
            key: 'description',
            render: (_: any, record: any) => (
                <h1 className="">
                    {record?.description
                        ? record.description.split(' ').slice(0, 5).join(' ') +
                          (record.description.split(' ').length > 5 ? ' ...' : '')
                        : ''}
                </h1>
            ),
        },
        {
            title: 'Start Date',
            key: 'startDate',
            render: (_: any, record: any, index: number) => <h1 key={index}>{record?.startDate?.split('T')[0]}</h1>,
        },
        {
            title: 'End Date',
            key: 'endDate',
            render: (_: any, record: any, index: number) => <h1 key={index}>{record?.endDate?.split('T')[0]}</h1>,
        },
        {
            title: 'Required Number',
            key: 'requiredNumber',
            render: (_: any, record: any, index: number) => <h1 key={index}>{record?.number}</h1>,
        },
        {
            title: 'Bonus Amount',
            key: 'bonusAmount',
            render: (_: any, record: any, index: number) => <h1 key={index}>${record?.amount}</h1>,
        },
        {
            title: 'Role',
            key: 'role',
            render: (_: any, record: any, index: number) => (
                <h1 key={index}>{record?.role?.toLowerCase().replace(/^\w/, (c: any) => c.toUpperCase())}</h1>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, item: any, index: number) => (
                <div key={index} className="flex items-center gap-4">
                    <PencilLine
                        onClick={() => {
                            setEditChallengeModal(true);
                            setActiveChallenge(item);
                        }}
                        size={20}
                        className="text-xl cursor-pointer"
                    />
                    <Trash2 size={20} className="text-xl cursor-pointer text-red-500" />
                </div>
            ),
        },
    ];

    // handle update challenge form
    const [updateChallenge] = useUpdateChallengeMutation();
    const onFinish = async (values: any) => {
        toast.loading('Updating challenge...', { id: 'update-challenge' });
        try {
            const res = await updateChallenge({ payload: values, id: activeChallenge?._id }).unwrap();
            console.log(res);
            if (res.success) {
                toast.success('Challenge updated successfully', { id: 'update-challenge' });
                setEditChallengeModal(false);
                setActiveChallenge(undefined);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update challenge', { id: 'update-challenge' });
        }
    };

    const editChallengeForm = (
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
        <div>
            <ConfigProvider>
                <Table columns={columns} dataSource={challengesData} />
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
