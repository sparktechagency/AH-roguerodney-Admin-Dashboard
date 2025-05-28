import toast from 'react-hot-toast';
import { useDeleteCategoryMutation } from '../../../../../redux/features/category/categoryApi';

const DeleteCategoryForm = ({ setOpen, itemId }: { open: boolean; setOpen: any; itemId: string }) => {
    const [deleteCategory] = useDeleteCategoryMutation();

    // handle delete category
    const handleDeleteCategory = async () => {
        toast.loading('Deleting category...', { id: 'delete-category' });
        try {
            const res = await deleteCategory({ id: itemId }).unwrap();
            if (res?.success) {
                toast.success('Category deleted successfully', { id: 'delete-category' });
                setOpen(false);
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('Failed to delete category', { id: 'delete-category' });
        }
    };

    return (
        <div className="flex flex-col justify-center gap-4">
            <h1 className="text-xl font-semibold">Are you sure to delete?</h1>
            <p>This action will parmanently delete the data from our server.</p>
            <div className="flex justify-end gap-2">
                <button className="bg-primary text-white px-6 py-2 rounded-full" onClick={() => setOpen(false)}>
                    Cancel
                </button>
                <button onClick={handleDeleteCategory} className="bg-red-500 text-white px-6 py-2 rounded-full">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteCategoryForm;
