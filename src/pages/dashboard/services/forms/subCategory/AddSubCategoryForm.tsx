import { Button, Form, Input, Select, UploadFile } from 'antd';
import UploadImage from '../../../../../components/shared/UploadImage';
import { useCreateSubCategoryMutation } from '../../../../../redux/features/subCategory/subCategoryApi';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useGetAllCategoriesQuery } from '../../../../../redux/features/category/categoryApi';
import { Option } from 'antd/es/mentions';

const AddSubCategoryForm = ({ setSubCategoryModal }: { setSubCategoryModal: any }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();

    const { data: categoriesData } = useGetAllCategoriesQuery(undefined);
    const categories = categoriesData?.data || [];

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
            if (res?.success) {
                setSubCategoryModal(false);
                setFileList([]);
                form.resetFields();
                toast.success('Sub-category added successfully', { id: 'add-sub-category' });
            }
        } catch (error: any) {
            console.error('Failed to add sub-category:', error);
            toast.error(error?.data?.message || 'Failed to add sub-category', { id: 'add-sub-category' });
        }
    };

    return (
        <div>
            <h1 className="text-xl font-semibold mb-6">Add Sub-category</h1>
            <Form
                form={form}
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
        </div>
    );
};

export default AddSubCategoryForm;
