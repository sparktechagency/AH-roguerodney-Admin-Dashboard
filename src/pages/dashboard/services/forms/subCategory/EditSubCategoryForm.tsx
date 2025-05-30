import { useEffect, useState } from 'react';
import { useGetAllCategoriesQuery } from '../../../../../redux/features/category/categoryApi';
import { Button, Form, Input, Select, UploadFile } from 'antd';
import { IMAGE_URL } from '../../../../../redux/api/baseApi';
import { useUpdateSubCategoryMutation } from '../../../../../redux/features/subCategory/subCategoryApi';
import toast from 'react-hot-toast';
import { Option } from 'antd/es/mentions';
import UploadImage from '../../../../../components/shared/UploadImage';
import { Loader2 } from 'lucide-react';

const EditSubCategoryForm = ({ setOpenModal, itemData }: { setOpenModal: any; itemData: any }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();

    const { data: categoriesData } = useGetAllCategoriesQuery(undefined);
    const categories = categoriesData?.data || [];

    useEffect(() => {
        if (itemData) {
            form.setFieldsValue({
                category: itemData?.category?._id,
                name: itemData?.name,
            });
            setFileList([
                {
                    uid: itemData?.image,
                    name: itemData?.image,
                    status: 'done',
                    url: `${IMAGE_URL}${itemData?.image}`,
                    thumbUrl: `${IMAGE_URL}${itemData?.image}`,
                },
            ]);
        }
    }, [itemData]);

    // handle edit category form
    const [editSubCategory, { isLoading }] = useUpdateSubCategoryMutation();
    const handleEditCategory = async (values: any) => {
        toast.loading('Updating sub-category...', { id: 'edit-sub-category' });
        const formData = new FormData();
        formData.append('category', values.category);
        formData.append('name', values.name);
        if (fileList[0]?.originFileObj && fileList?.length > 0) {
            formData.append('image', fileList[0]?.originFileObj as Blob);
        }

        try {
            const res = await editSubCategory({
                id: itemData?._id,
                payload: formData,
            }).unwrap();
            if (res?.success) {
                setOpenModal(false);
                setFileList([]);
                toast.success(res?.message || 'Sub-category updated successfully', { id: 'edit-sub-category' });
            }
        } catch (error: any) {
            console.error('Failed to update sub-category:', error);
            toast.error(error?.data?.message || 'Failed to update sub-category', { id: 'edit-sub-category' });
        }
    };

    return (
        <div>
            <h1 className="text-xl font-semibold mb-6">Edit Sub-category</h1>
            <Form
                form={form}
                style={{
                    color: '#767676',
                }}
                layout="vertical"
                onFinish={handleEditCategory}
            >
                <Form.Item label={<label className="font-medium">Category</label>} name="category">
                    <Select className="w-40 h-[42px]">
                        {categories.map((item: any) => (
                            <Option key={item._id} value={item._id}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Sub-category Name" name="name">
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
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Save Changes'}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditSubCategoryForm;
