import { Button, ConfigProvider, Form, Input, Select, Table, UploadFile } from 'antd';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoTrashOutline } from 'react-icons/io5';
import CustomModal from '../../../components/shared/CustomModal';
import UploadImage from '../../../components/shared/UploadImage';
import { Option } from 'antd/es/mentions';
import {
    useCreateSubCategoryMutation,
    useGetAllSubCategoryQuery,
    useUpdateSubCategoryMutation,
} from '../../../redux/features/subCategory/subCategoryApi';
import { IMAGE_URL } from '../../../redux/api/baseApi';
import { useGetAllCategoriesQuery } from '../../../redux/features/category/categoryApi';
import toast from 'react-hot-toast';

const SubCategoryTable = () => {
    const [categoryModal, setCategoryModal] = useState(false);
    const [editCategoryModal, setEditCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const [editCategoryData, setEditCategoryData] = useState<any>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const { data } = useGetAllSubCategoryQuery({ query: location.search });
    const subCategories = data?.data || [];

    const { data: categoriesData } = useGetAllCategoriesQuery(undefined);
    const categories = categoriesData?.data || [];

    const columns = [
        {
            title: 'ID',
            key: 'id',
            render: (_: any, __: any, index: number) => <span># {index + 1}</span>,
        },
        {
            title: 'Category',
            key: 'category',
            render: (_: any, record: any) => <span>{record?.category?.name}</span>,
        },
        {
            title: 'Sub-category',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Sub-category Image',
            dataIndex: 'image',
            key: 'image',
            render: (_: any, record: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <img src={`${IMAGE_URL}${record?.image}`} className="size-9 rounded-sm" />
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
                            setFileList([
                                {
                                    uid: item?.image,
                                    name: item?.image,
                                    status: 'done',
                                    url: `${IMAGE_URL}${item?.image}`,
                                    thumbUrl: `${IMAGE_URL}${item?.image}`,
                                },
                            ]);
                        }}
                    >
                        <AiOutlineEdit className="text-xl text-primary" />
                    </button>
                    <button
                        onClick={() => {
                            setDeleteCategoryModal(true);
                            setEditCategoryData(item);
                        }}
                    >
                        <IoTrashOutline className="text-xl text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

    // handle add category form
    const [createSubCategory] = useCreateSubCategoryMutation();
    const handleAddCategory = async (values: any) => {
        toast.loading('Adding sub-category...', { id: 'add-sub-category' });
        const formData = new FormData();
        formData.append('category', values.category);
        formData.append('name', values.name);
        if (fileList.length > 0) {
            formData.append('image', fileList[0].originFileObj as Blob);
        }

        try {
            const res = await createSubCategory({ payload: formData }).unwrap();
            console.log(res);
            if (res?.success) {
                setCategoryModal(false);
                setFileList([]);
                toast.success('Sub-category added successfully', { id: 'add-sub-category' });
            }
        } catch (error) {
            console.error('Failed to add sub-category:', error);
            toast.error('Failed to add sub-category', { id: 'add-sub-category' });
        }
    };

    const addCategoryForm = (
        <Form
            style={{
                color: '#767676',
            }}
            layout="vertical"
            onFinish={handleAddCategory}
        >
            <Form.Item
                label={<label className="font-medium">Category</label>}
                name="category"
                rules={[{ required: true, message: 'Please select a category' }]}
            >
                <Select defaultValue="Select category" className="w-40 h-[42px]">
                    {categories.map((item: any) => (
                        <Option key={item._id} value={item._id}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Sub Category Name"
                name="name"
                rules={[{ required: true, message: 'Please enter sub-category name' }]}
            >
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter sub-category name"
                />
            </Form.Item>

            <Form.Item label="Sub Category Image" name="image">
                <UploadImage fileList={fileList} setFileList={setFileList} />
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
                        Add Sub-category
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );

    // handle edit category form
    const [editSubCategory] = useUpdateSubCategoryMutation();
    const handleEditCategory = async (values: any) => {
        toast.loading('Updating sub-category...', { id: 'edit-sub-category' });
        const formData = new FormData();
        formData.append('category', values.category);
        formData.append('name', values.name);
        if (fileList[0].originFileObj && fileList.length > 0) {
            formData.append('image', fileList[0].originFileObj as Blob);
        }

        try {
            const res = await editSubCategory({
                id: editCategoryData?._id,
                payload: formData,
            }).unwrap();
            console.log(res);
            if (res?.success) {
                setEditCategoryModal(false);
                setFileList([]);
                toast.success(res?.message || 'Sub-category updated successfully', { id: 'edit-sub-category' });
            }
        } catch (error: any) {
            console.error('Failed to update sub-category:', error);
            toast.error(error?.data?.message || 'Failed to update sub-category', { id: 'edit-sub-category' });
        }
    };

    const editServiceForm = (
        <Form
            style={{
                color: '#767676',
            }}
            layout="vertical"
            onFinish={handleEditCategory}
        >
            <Form.Item
                label={<label className="font-medium">Category</label>}
                name="category"
                initialValue={editCategoryData?.category?._id}
            >
                <Select className="w-40 h-[42px]">
                    {categories.map((item: any) => (
                        <Option key={item._id} value={item._id}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="Sub-category Name" name="name" initialValue={editCategoryData?.name}>
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter sub-category name"
                />
            </Form.Item>

            <Form.Item label="Sub-category Image" name="image">
                <UploadImage fileList={fileList} setFileList={setFileList} maxCount={1} />
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
                        Add Sub-category
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );

    // handle delete category
    // const [deleteSubCategory] = useDeleteSubCategoryMutation();
    const handleDeleteCategory = async () => {
        //
    };

    return (
        <div className="grid gap-4 mt-2">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-2xl text-primary font-semibold">Sub-categories</h1>
                <Button type="primary" className="p-5 text-base" onClick={() => setCategoryModal(true)}>
                    <Plus size={20} /> Add Sub-category
                </Button>
            </div>
            <ConfigProvider>
                <Table columns={columns} dataSource={subCategories} />
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
            <CustomModal
                open={deleteCategoryModal}
                setOpen={setDeleteCategoryModal}
                title="Delete category"
                width={500}
                body={
                    <div className="flex flex-col justify-center">
                        <h1 className="text-lg font-semibold">Are you sure you want to delete this sub-category?</h1>
                        <div className="flex justify-end gap-2">
                            <Button onClick={() => setDeleteCategoryModal(false)}>Cancel</Button>
                            <Button onClick={handleDeleteCategory} className="bg-red-500 text-white">
                                Continue
                            </Button>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default SubCategoryTable;
