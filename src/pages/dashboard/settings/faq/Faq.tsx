import toast from 'react-hot-toast';
import {
    useCreateFaqMutation,
    useDeleteFaqMutation,
    useGetAllFaqsQuery,
    useUpdateFaqMutation,
} from '../../../../redux/features/faq/faqApi';
import { Button, Collapse, Form, Input } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';
import DeleteModal from '../../../../components/shared/DeleteAlertModal';
import CustomModal from '../../../../components/shared/CustomModal';
import TextArea from 'antd/es/input/TextArea';

const Faq = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [activeItem, setActiveItem] = useState<any>(null);
    const [addFaq] = useCreateFaqMutation();
    const [updateFaq] = useUpdateFaqMutation();
    const [deleteFaq] = useDeleteFaqMutation();
    const [form] = Form.useForm();

    const { data } = useGetAllFaqsQuery({ query: '' });
    const faqs = data?.data;

    // handle add
    const handleAdd = async (values: any) => {
        toast.loading('Adding...', { id: 'add-faq' });
        try {
            const res = await addFaq({ payload: values }).unwrap();
            if (res?.success) {
                toast.success('FAQ added successfully!', { id: 'add-faq' });
                form.resetFields();
                setOpenAdd(false);
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || 'Something went wrong!', { id: 'add-faq' });
        }
    };

    // handle update
    const handleUpdate = async (values: any) => {
        toast.loading('Updating...', { id: 'update-faq' });
        try {
            const res = await updateFaq({ id: activeItem?._id, payload: values }).unwrap();
            if (res?.success) {
                toast.success('FAQ updated successfully!', { id: 'update-faq' });
                setOpenEdit(false);
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || 'Something went wrong!', { id: 'update-faq' });
        }
    };

    // handle delete
    const handleDelete = async () => {
        toast.loading('Deleting...', { id: 'delete-faq' });
        try {
            const res = await deleteFaq({ id: activeItem?._id }).unwrap();
            if (res?.success) {
                toast.success('FAQ deleted successfully!', { id: 'delete-faq' });
                setOpenDelete(false);
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || 'Something went wrong!', { id: 'delete-faq' });
        }
    };

    const { Panel } = Collapse;

    return (
        <section className="p-4 grid gap-4">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-3xl text-primary font-semibold">FAQ</h1>
                <Button onClick={() => setOpenAdd(true)} type="primary" style={{ height: 40, fontSize: 16 }}>
                    <Plus size={20} />
                    Add Faq
                </Button>
            </div>
            <div>
                <Collapse
                    expandIconPosition="end"
                    expandIcon={({ isActive }) => <ChevronRight rotate={isActive ? 90 : 0} style={{ fontSize: 18 }} />}
                    accordion
                    ghost
                    className="space-y-4"
                >
                    {faqs?.map((item: any) => (
                        <Panel
                            header={
                                <div className="flex justify-between items-center text-[#333] font-medium text-base">
                                    {item.question}
                                </div>
                            }
                            key={item._id}
                            className="bg-white !rounded-xl px-4 py-1"
                        >
                            <div className="flex justify-between gap-4">
                                <p className="text-[#555] leading-[24px]">{item.answer}</p>
                                <div className="flex flex-col items-center gap-4">
                                    <CiEdit
                                        onClick={() => {
                                            setOpenEdit(true);
                                            setActiveItem(item);
                                        }}
                                        className="text-2xl cursor-pointer text-[#F78F08]"
                                    />
                                    <RiDeleteBin6Line
                                        onClick={() => {
                                            setOpenDelete(true);
                                            setActiveItem(item);
                                        }}
                                        className="text-2xl cursor-pointer text-[#D93D04]"
                                    />
                                </div>
                            </div>
                        </Panel>
                    ))}
                </Collapse>
            </div>

            {/* Add Modal */}
            <CustomModal
                open={openAdd}
                setOpen={setOpenAdd}
                title="Add FAQ"
                width={500}
                body={
                    <Form form={form} onFinish={handleAdd} layout="vertical" className="space-y-4">
                        <Form.Item
                            label="Question"
                            name="question"
                            rules={[{ required: true, message: 'Please enter a question' }]}
                        >
                            <Input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="Enter question"
                                style={{ height: 44, fontSize: 16 }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Answer"
                            name="answer"
                            rules={[{ required: true, message: 'Please enter an answer' }]}
                        >
                            <TextArea
                                className="w-full p-2 border rounded"
                                placeholder="Enter answer"
                                style={{ fontSize: 16 }}
                            ></TextArea>
                        </Form.Item>
                        <Button htmlType="submit" type="primary" style={{ width: '100%', height: 44, fontSize: 16 }}>
                            Submit
                        </Button>
                    </Form>
                }
            />

            {/* Edit Modal */}
            <CustomModal
                open={openEdit}
                setOpen={setOpenEdit}
                title="Edit FAQ"
                width={500}
                body={
                    <Form onFinish={handleUpdate} layout="vertical" className="space-y-4" initialValues={activeItem}>
                        <Form.Item
                            label="Question"
                            name="question"
                            rules={[{ required: true, message: 'Please enter a question' }]}
                        >
                            <Input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="Enter question"
                                style={{ height: 44, fontSize: 16 }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Answer"
                            name="answer"
                            rules={[{ required: true, message: 'Please enter an answer' }]}
                        >
                            <TextArea
                                className="w-full p-2 border rounded"
                                placeholder="Enter answer"
                                style={{ fontSize: 16 }}
                            ></TextArea>
                        </Form.Item>
                        <Button htmlType="submit" type="primary" style={{ width: '100%', height: 44, fontSize: 16 }}>
                            Submit
                        </Button>
                    </Form>
                }
            />

            {/* Delete Modal */}
            <DeleteModal open={openDelete} setOpen={setOpenDelete} title="Delete FAQ" action={handleDelete} />
        </section>
    );
};

export default Faq;
