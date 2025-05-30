import { Button, Form, Input, UploadFile } from 'antd';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useCreateCategoryMutation } from '../../../../../redux/features/category/categoryApi';
import UploadImage from '../../../../../components/shared/UploadImage';

const AddCategoryForm = ({ setModal }: { setModal: any }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [addCategory] = useCreateCategoryMutation();
    const [form] = Form.useForm();

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
                setModal(false);
                form.resetFields();
            }
        } catch (error: any) {
            console.error('Error adding category:', error);
            toast.error(error?.data?.message || 'Failed to add category', { id: 'add-category' });
        }
    };

    return (
        <div>
            <h1 className="text-xl font-semibold mb-6">Add Category</h1>
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
        </div>
    );
};

export default AddCategoryForm;
