import { Button, ConfigProvider, Form, Input, Table, UploadFile } from 'antd';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoTrashOutline } from 'react-icons/io5';
import CustomModal from '../../../components/shared/CustomModal';
import UploadImage from '../../../components/shared/UploadImage';
import {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllCategoriesQuery,
} from '../../../redux/features/category/categoryApi';
import { IMAGE_URL } from '../../../redux/api/baseApi';
import toast from 'react-hot-toast';

const CategoryTable = () => {
    const [categoryModal, setCategoryModal] = useState(false);
    const [editCategoryModal, setEditCategoryModal] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [addCategory] = useCreateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [form] = Form.useForm();

    const { data } = useGetAllCategoriesQuery(undefined);

    const categoryData = data?.data;

    const columns = [
        {
            title: 'Sl. No',
            key: 'sl',
            render: (_: any, _record: any, index: number) => <span># {index + 1}</span>,
        },
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Category Images',
            key: 'image',
            render: (_: any, record: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    {record?.image?.map((item: any, idx: number) => (
                        <img key={idx} src={`${IMAGE_URL}${item}`} className="size-9 rounded-sm" />
                    ))}
                </div>
            ),
        },

        {
            title: 'Action',
            key: 'action',
            render: (_: any, _record: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <button onClick={() => setEditCategoryModal(true)}>
                        <AiOutlineEdit className="text-xl text-primary" />
                    </button>
                    <button>
                        <IoTrashOutline className="text-xl text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

    // handle add category form
    const handleAddCategory = async (values: any) => {
        toast.loading('Adding category...', { id: 'add-category' });
        const formData = new FormData();
        formData.append('name', values.name);
        if (fileList && fileList.length > 0) {
            fileList.forEach((file) => {
                if (file.originFileObj) {
                    formData.append('image', file.originFileObj);
                }
            });
        }

        try {
            const res = await addCategory({
                payload: formData,
            }).unwrap();
            if (res?.success) {
                toast.success('Category added successfully', { id: 'add-category' });
                setFileList([]);
                form.resetFields();
            }
        } catch (error) {
            console.error('Error adding category:', error);
            toast.error('Failed to add category', { id: 'add-category' });
        }
    };

    const addCategoryForm = (
        <Form
            style={{
                color: '#767676',
            }}
            layout="vertical"
            form={form}
            onFinish={handleAddCategory}
        >
            <Form.Item label="Category Name" name="name">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter category name"
                />
            </Form.Item>
            <Form.Item label="Category Images" name="image">
                <UploadImage fileList={fileList} setFileList={setFileList} maxCount={5} />
            </Form.Item>

            <Form.Item>
                <div className="flex justify-center w-full">
                    <Button
                        htmlType="submit"
                        type="primary"
                        style={{
                            height: 40,
                        }}
                    >
                        Add category
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );

    const editServiceForm = (
        <Form
            style={{
                color: '#767676',
            }}
            layout="vertical"
        >
            <Form.Item label="Category Name" name="name">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter category name"
                />
            </Form.Item>

            <Form.Item label="Category Images" name="images">
                <UploadImage fileList={fileList} setFileList={setFileList} />
            </Form.Item>

            <Form.Item>
                <div className="flex justify-center w-full">
                    <Button
                        type="primary"
                        style={{
                            height: 40,
                        }}
                    >
                        Edit category
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );

    return (
        <div className="grid gap-4 mt-2">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-2xl text-primary font-semibold">Categories</h1>
                <Button type="primary" className="p-5 text-base" onClick={() => setCategoryModal(true)}>
                    <Plus size={20} /> Add Category
                </Button>
            </div>
            <ConfigProvider>
                <Table columns={columns} dataSource={categoryData} />
            </ConfigProvider>

            <CustomModal
                open={categoryModal}
                setOpen={setCategoryModal}
                title="Add category"
                width={500}
                body={addCategoryForm}
            />
            <CustomModal
                open={editCategoryModal}
                setOpen={setEditCategoryModal}
                title="Edit category"
                width={500}
                body={editServiceForm}
            />
        </div>
    );
};

export default CategoryTable;
