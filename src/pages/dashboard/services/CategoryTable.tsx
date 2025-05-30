import { Button, ConfigProvider, Table } from 'antd';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoTrashOutline } from 'react-icons/io5';
import { useGetAllCategoriesQuery } from '../../../redux/features/category/categoryApi';
import { IMAGE_URL } from '../../../redux/api/baseApi';
import MyModal from '../../../components/shared/MyModal';
import AddCategoryForm from './forms/category/AddCategoryForm';
import DeleteCategoryForm from './forms/category/DeleteCategoryForm';
import EditCategoryForm from './forms/category/EditCategoryForm';

const CategoryTable = () => {
    const [addCategoryModal, setAddCategoryModal] = useState(false);
    const [editCategoryModal, setEditCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const [activeCategory, setActiveCategory] = useState();
    const [currentCategoryId, setCurrentCategoryId] = useState(null);

    const { data, isLoading } = useGetAllCategoriesQuery(undefined);
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
            render: (_: any, item: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            setEditCategoryModal(true);
                            setActiveCategory(item);
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

    return (
        <div className="grid gap-4 mt-2">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-2xl text-primary font-semibold">Categories</h1>
                <Button type="primary" className="p-5 text-base" onClick={() => setAddCategoryModal(true)}>
                    <Plus size={20} /> Add Category
                </Button>
                <MyModal open={addCategoryModal} setOpen={setAddCategoryModal}>
                    <AddCategoryForm setModal={setAddCategoryModal} />
                </MyModal>
            </div>
            <ConfigProvider>
                <Table columns={columns} dataSource={categoryData} loading={isLoading} />
            </ConfigProvider>

            {/* edit modal */}
            <MyModal open={editCategoryModal} setOpen={setEditCategoryModal}>
                <EditCategoryForm itemData={activeCategory} setEditCategoryModal={setEditCategoryModal} />
            </MyModal>

            {/* delete modal */}
            <MyModal open={deleteCategoryModal} setOpen={setDeleteCategoryModal}>
                <DeleteCategoryForm
                    open={deleteCategoryModal}
                    setOpen={setDeleteCategoryModal}
                    itemId={currentCategoryId ?? ''}
                />
            </MyModal>
        </div>
    );
};

export default CategoryTable;
