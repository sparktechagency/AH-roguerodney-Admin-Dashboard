import { PencilLine } from 'lucide-react';
import { useState } from 'react';
import MyModal from '../../../components/shared/MyModal';
import EditCategoryReviewForm from './forms/EditCategoryReviewForm';
import { useGetAllCategoriesQuery } from '../../../redux/features/category/categoryApi';
import { IMAGE_URL } from '../../../redux/api/baseApi';
import Loader from '../../../components/ui/Loader';

const CategoryReview = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('');

    const { data, isLoading } = useGetAllCategoriesQuery(undefined);
    const categories = data?.data || [];

    return (
        <div className="py-4 h-full">
            {/* section header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-primary">Category Reviews</h1>
            </div>

            <div className="space-y-4">
                {isLoading && (
                    <div className="flex justify-center items-center h-24">
                        <Loader />
                    </div>
                )}
                {categories?.map((item: any, index: number) => (
                    <div
                        key={index}
                        className="flex justify-between items-center gap-4 bg-gray-100 p-4 px-6 rounded-lg"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={`${IMAGE_URL}${item?.image[0]}`}
                                alt="category-image"
                                className="size-12 rounded"
                            />
                            <h1 className="text-base font-medium">{item?.name}</h1>
                        </div>
                        <button
                            onClick={() => {
                                setModalOpen(true);
                                setActiveCategory(item);
                            }}
                        >
                            <PencilLine size={20} className="text-primary" />
                        </button>
                    </div>
                ))}
                {!isLoading && !(categories?.length > 0) && (
                    <div className="flex justify-center items-center h-full">
                        <h1 className="text-lg font-semibold text-stone-400">No reviews found</h1>
                    </div>
                )}
            </div>

            {/* Modal */}
            <MyModal open={modalOpen} setOpen={setModalOpen}>
                <EditCategoryReviewForm setOpen={setModalOpen} category={activeCategory} />
            </MyModal>
        </div>
    );
};

export default CategoryReview;
