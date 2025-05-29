import { Button, ConfigProvider, Table } from 'antd';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoTrashOutline } from 'react-icons/io5';
import {
    useDeleteSubCategoryMutation,
    useGetAllSubCategoryQuery,
} from '../../../redux/features/subCategory/subCategoryApi';
import { IMAGE_URL } from '../../../redux/api/baseApi';
import toast from 'react-hot-toast';
import MyModal from '../../../components/shared/MyModal';
import AddSubCategoryForm from './forms/subCategory/AddSubCategoryForm';
import EditSubCategoryForm from './forms/subCategory/EditSubCategoryForm';
import DeleteModal from '../../../components/shared/DeleteAlertModal';

const SubCategoryTable = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [activeSubCategory, setActiveSubCategory] = useState<any>();

    const { data, isLoading } = useGetAllSubCategoryQuery({ query: location.search });
    const subCategories = data?.data || [];

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
                            setOpenEditModal(true);
                            setActiveSubCategory(item);
                        }}
                    >
                        <AiOutlineEdit className="text-xl text-primary" />
                    </button>
                    <button
                        onClick={() => {
                            setOpenDeleteModal(true);
                            setActiveSubCategory(item);
                        }}
                    >
                        <IoTrashOutline className="text-xl text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

    // handle delete category
    const [deleteSubCategory] = useDeleteSubCategoryMutation();
    const handleDeleteCategory = async () => {
        toast.loading('Deleting sub-category...', { id: 'delete-sub-category' });
        try {
            const res = await deleteSubCategory({
                id: activeSubCategory?._id,
            }).unwrap();
            if (res?.success) {
                setOpenDeleteModal(false);
                setActiveSubCategory(null);
                toast.success(res?.message || 'Sub-category deleted successfully', { id: 'delete-sub-category' });
            }
        } catch (error: any) {
            console.error('Failed to delete sub-category:', error);
            toast.error(error?.data?.message || 'Failed to delete sub-category', { id: 'delete-sub-category' });
        }
    };

    return (
        <div className="grid gap-4 mt-2">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-2xl text-primary font-semibold">Sub-categories</h1>
                <Button type="primary" className="p-5 text-base" onClick={() => setOpenAddModal(true)}>
                    <Plus size={20} /> Add Sub-category
                </Button>
                <MyModal open={openAddModal} setOpen={setOpenAddModal}>
                    <AddSubCategoryForm setSubCategoryModal={setOpenAddModal} />
                </MyModal>
            </div>

            <ConfigProvider>
                <Table columns={columns} dataSource={subCategories} loading={isLoading} />
            </ConfigProvider>

            {/* edit modal */}
            <MyModal open={openEditModal} setOpen={setOpenEditModal}>
                <EditSubCategoryForm itemData={activeSubCategory} setOpenModal={setOpenEditModal} />
            </MyModal>

            {/* delete modal */}
            <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} action={handleDeleteCategory} />
        </div>
    );
};

export default SubCategoryTable;
