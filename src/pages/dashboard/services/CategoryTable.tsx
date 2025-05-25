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
    useEditCategoryMutation,
    useGetAllCategoriesQuery,
} from '../../../redux/features/category/categoryApi';
import { IMAGE_URL } from '../../../redux/api/baseApi';
import toast from 'react-hot-toast';

const CategoryTable = () => {
    const [categoryModal, setCategoryModal] = useState(false);
    const [editCategoryModal, setEditCategoryModal] = useState(false);
    const [editCategoryData, setEditCategoryData] = useState();
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const [currentCategoryId, setCurrentCategoryId] = useState(null);

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [addCategory] = useCreateCategoryMutation();
    const [editCategory] = useEditCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();

    const { data } = useGetAllCategoriesQuery(undefined);
    const categoryData = data?.data;
    console.log(categoryData);

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
            render: (_: any, item: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            setEditCategoryModal(true);
                            setEditCategoryData(item);
                            setCurrentCategoryId(item._id);
                            setFileList(
                                item?.image?.map((img: string, idx: number) => ({
                                    uid: img + idx,
                                    name: img,
                                    status: 'done',
                                    url: `${IMAGE_URL}${img}`,
                                    thumbUrl: `${IMAGE_URL}${img}`,
                                })),
                            );
                        }}
                    >
                        <AiOutlineEdit className="text-xl text-primary" />
                    </button>
                    <button
                        onClick={() => {
                            setDeleteCategoryModal(true);
                            setCurrentCategoryId(item._id);
                        }}
                    >
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

    // handle edit category form
    const handleEditCategory = async (values: any) => {
        toast.loading('Editing category...', { id: 'edit-category' });
        const formData = new FormData();
        formData.append('name', values.name);
        if (fileList && fileList.length > 0) {
            fileList.forEach((file) => {
                if (file.originFileObj) {
                    formData.append('image', file.originFileObj);
                } else {
                    formData.append('existImage', file?.name);
                }
            });
        }

        try {
            const res = await editCategory({
                id: currentCategoryId,
                payload: formData,
            }).unwrap();
            if (res?.success) {
                toast.success('Category updated successfully', { id: 'edit-category' });
                setEditCategoryModal(false);
            }
        } catch (error) {
            console.error('Error editing category:', error);
            toast.error('Failed to edit category', { id: 'edit-category' });
        }
    };

    const editServiceForm = (
        <Form
            style={{
                color: '#767676',
            }}
            layout="vertical"
            form={editForm}
            onFinish={handleEditCategory}
            initialValues={editCategoryData}
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
                        Edit category
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );

    // handle delete category
    const handleDeleteCategory = async () => {
        toast.loading('Deleting category...', { id: 'delete-category' });
        try {
            const res = await deleteCategory({ id: currentCategoryId }).unwrap();
            if (res?.success) {
                toast.success('Category deleted successfully', { id: 'delete-category' });
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('Failed to delete category', { id: 'delete-category' });
        }
    };

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

            {/* add modal */}
            <CustomModal
                open={categoryModal}
                setOpen={setCategoryModal}
                title="Add category"
                width={500}
                body={addCategoryForm}
            />

            {/* edit modal */}
            <CustomModal
                open={editCategoryModal}
                setOpen={setEditCategoryModal}
                title="Edit category"
                width={500}
                body={editServiceForm}
            />

            {/* delete alert modal */}
            <CustomModal
                open={deleteCategoryModal}
                setOpen={setDeleteCategoryModal}
                title="Delete Category"
                width={500}
                body={
                    <div>
                        <h1 className="text-lg font-semibold">Are you sure you want to delete this category?</h1>
                        <p>This action will be remove the data from our server permanently.</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                onClick={() => setDeleteCategoryModal(false)}
                                style={{
                                    height: 40,
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                danger
                                style={{
                                    height: 40,
                                }}
                                onClick={() => {
                                    handleDeleteCategory();
                                    setDeleteCategoryModal(false);
                                }}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default CategoryTable;
