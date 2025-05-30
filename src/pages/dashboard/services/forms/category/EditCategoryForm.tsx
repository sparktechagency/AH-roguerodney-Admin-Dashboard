import { Button, Form, Input, UploadFile } from 'antd';
import UploadImage from '../../../../../components/shared/UploadImage';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useEditCategoryMutation } from '../../../../../redux/features/category/categoryApi';
import { IMAGE_URL } from '../../../../../redux/api/baseApi';
import { Loader2 } from 'lucide-react';

const EditCategoryForm = ({ setEditCategoryModal, itemData }: { setEditCategoryModal: any; itemData: any }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [editCategory, { isLoading }] = useEditCategoryMutation();
    const [editForm] = Form.useForm();

    useEffect(() => {
        if (itemData) {
            editForm.setFieldsValue(itemData);
            setFileList(
                itemData?.image?.map((img: string, idx: number) => ({
                    uid: img + idx,
                    name: img,
                    status: 'done',
                    url: `${IMAGE_URL}${img}`,
                    thumbUrl: `${IMAGE_URL}${img}`,
                })),
            );
        }
    }, [itemData]);

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
                id: itemData?._id,
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

    return (
        <div>
            <h1 className="text-xl font-semibold mb-6">Edit Category</h1>
            <Form
                style={{
                    color: '#767676',
                }}
                layout="vertical"
                form={editForm}
                onFinish={handleEditCategory}
                initialValues={itemData}
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

export default EditCategoryForm;
