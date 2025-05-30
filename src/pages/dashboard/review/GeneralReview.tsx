import { Plus, Trash2 } from 'lucide-react';
import { useGetGeneralReviewQuery, useUpdateGeneralReviewMutation } from '../../../redux/features/review/reviewApi';
import { Button } from 'antd';
import { useState } from 'react';
import MyModal from '../../../components/shared/MyModal';
import AddReviewForm from './forms/AddReviewForm';
import toast from 'react-hot-toast';
import DeleteModal from '../../../components/shared/DeleteAlertModal';

const GeneralReview = () => {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [activeReview, setActiveReview] = useState('');
    const [deleteGeneralReview] = useUpdateGeneralReviewMutation();

    const { data } = useGetGeneralReviewQuery(undefined);
    const reviews = data?.data?.review || [];

    // handle delete general review
    const handleDeleteGeneralReview = async () => {
        toast.loading('Updating general review...', { id: 'update-general-review' });

        try {
            const res = await deleteGeneralReview({
                payload: { review: reviews?.filter((item: string) => item !== activeReview) },
            }).unwrap();
            if (res?.success) {
                toast.success('General review updated successfully', { id: 'update-general-review' });
                setDeleteModalOpen(false);
                setActiveReview('');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update general review', { id: 'update-general-review' });
        }
    };

    return (
        <div className="py-4 h-full">
            {/* section header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-primary">General Reviews</h1>
                <Button onClick={() => setAddModalOpen(true)} type="primary" size="large" className="h-12">
                    <Plus />
                    Add
                </Button>
                <MyModal open={addModalOpen} setOpen={setAddModalOpen}>
                    <AddReviewForm existingReviews={reviews} setOpen={setAddModalOpen} />
                </MyModal>
            </div>

            <div className="space-y-4">
                {reviews?.map((item: any, index: number) => (
                    <div
                        key={index}
                        className="flex justify-between items-center gap-4 bg-gray-100 p-4 px-6 rounded-lg"
                    >
                        <h1 className="text-base font-medium">{item}</h1>
                        <button
                            onClick={() => {
                                setDeleteModalOpen(true);
                                setActiveReview(item);
                            }}
                        >
                            <Trash2 size={20} className="text-red-500" />
                        </button>
                    </div>
                ))}
            </div>

            <DeleteModal open={deleteModalOpen} setOpen={setDeleteModalOpen} action={handleDeleteGeneralReview} />
        </div>
    );
};

export default GeneralReview;
