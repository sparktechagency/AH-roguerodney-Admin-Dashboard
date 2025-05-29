import { Button, ConfigProvider, Form, Table } from 'antd';
import { MessageSquareReply } from 'lucide-react';
import { IMAGE_URL } from '../../../redux/api/baseApi';
import { useUpdateSearchParams } from '../../../utils/updateSearchParams';
import { useGetAllSupportsQuery, useUdpateSupportMutation } from '../../../redux/features/support/supportApi';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import toast from 'react-hot-toast';
import MyModal from '../../../components/shared/MyModal';

const SupportTable = () => {
    const updateSearchParams = useUpdateSearchParams();
    const [reply] = useUdpateSupportMutation();
    const { data, isLoading } = useGetAllSupportsQuery({ query: location.search });
    const supports = data?.data;
    const pagination = data?.pagination;

    const [modalOpen, setModalOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<any>(null);
    const [form] = Form.useForm();

    // handle reply message
    const handleReplyMessage = async (values: any) => {
        toast.loading('Sending...', { id: 'reply' });
        try {
            const res = await reply({ id: activeItem?._id, payload: values }).unwrap();
            if (res?.success) {
                toast.success(res?.message || 'Message sent successfully', { id: 'reply' });
                setModalOpen(false);
                form.resetFields();
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || 'Something went wrong', { id: 'reply' });
        }
    };

    const columns = [
        {
            title: 'ID',
            key: 'id',
            render: (_: any, __: any, index: number) => <p key={index}># {index + 1}</p>,
        },
        {
            title: 'Sender',
            key: 'sender',
            render: (_: any, item: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <img
                        src={
                            item?.customer?.profile?.includes('http')
                                ? item?.customer?.profile
                                : `${IMAGE_URL}${item?.customer?.profile}`
                        }
                        alt="reporter img"
                        className="size-10 rounded-md"
                    />
                    <div>
                        <h1 className="font-medium">{item?.customer?.name}</h1>
                        <h3 className="text-sm">{item?.customer?.email}</h3>
                    </div>
                </div>
            ),
        },
        {
            title: 'Message',
            key: 'message',
            render: (_: any, item: any, index: number) => <p key={index}>{item?.message}</p>,
        },
        {
            title: 'Report Time',
            key: 'reportTime',
            render: (_: any, item: any, index: number) => (
                <p key={index}>{new Date(item?.createdAt).toLocaleString()}</p>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            render: (_: any, item: any, index: number) => (
                <p key={index} className="capitalize">
                    {item?.status}
                </p>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, item: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            setModalOpen(true);
                            setActiveItem(item);
                        }}
                    >
                        <MessageSquareReply className="text-xl text-primary" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <ConfigProvider>
                <Table
                    columns={columns}
                    dataSource={supports}
                    loading={isLoading}
                    pagination={{
                        current: pagination?.page,
                        pageSize: pagination?.limit,
                        total: pagination?.total,
                        onChange: (page) => updateSearchParams({ page }),
                    }}
                />
            </ConfigProvider>

            {/* Modal */}
            <MyModal open={modalOpen} setOpen={setModalOpen}>
                <div>
                    <h1 className="text-xl font-semibold mb-6">Reply Message</h1>
                    <Form onFinish={handleReplyMessage} form={form} layout="vertical">
                        <Form.Item
                            name="reply"
                            label={'Message'}
                            rules={[{ required: true, message: 'Reply is required' }]}
                        >
                            <TextArea rows={4} placeholder="Write your reply here" style={{ borderRadius: '8px' }} />
                        </Form.Item>
                        <Form.Item className="flex justify-end">
                            <Button type="primary" className="h-10" htmlType="submit">
                                Send
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </MyModal>
        </div>
    );
};

export default SupportTable;
