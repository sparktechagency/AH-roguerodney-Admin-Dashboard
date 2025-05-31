import { Form, Button } from 'antd';
import toast from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';
import { useGetReviewQuery, useUpdateReviewMutation } from '../../../../redux/features/review/reviewApi';
import { Loader2, MinusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';

const EditCategoryReviewForm = ({ category, setOpen }: { category: any; setOpen: any }) => {
    const [reviews, setReviews] = useState<string[]>([]);
    const [form] = Form.useForm();

    const { data, isLoading } = useGetReviewQuery({ id: category?._id });
    const existingReviews = data?.data?.reviews;

    // reset state on mount
    useEffect(() => {
        if (existingReviews) {
            setReviews(existingReviews);
        }
    }, [existingReviews, category]);

    // handle add local review
    const handleAddReview = (values: any) => {
        const isDuplicate = reviews.includes(values.review);
        if (isDuplicate) {
            toast.error('Review already exists');
            return;
        }
        if (values?.review?.trim()?.length > 0) {
            setReviews([...reviews, values.review]);
            form.resetFields();
        }
    };

    // handle remove local review
    const handleRemoveReview = (index: number) => {
        const updatedReviews = [...reviews];
        updatedReviews.splice(index, 1);
        setReviews(updatedReviews);
    };

    // handle update review
    const [updateReview, { isLoading: isPending }] = useUpdateReviewMutation();
    const handleUpdateReview = async () => {
        toast.loading('Adding review...', { id: 'add-review' });
        try {
            const res = await updateReview({
                payload: {
                    category: category?._id,
                    reviews: reviews,
                },
            }).unwrap();
            if (res?.success) {
                setOpen(false);
                form.resetFields();
                toast.success('Review updated successfully', { id: 'add-review' });
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || 'Failed to add review', { id: 'add-review' });
        }
    };

    return (
        <div>
            <h1 className="text-xl font-semibold pb-6">Update Review</h1>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleAddReview}
                className="flex justify-between items-center gap-2"
            >
                <Form.Item name="review">
                    <TextArea
                        style={{
                            width: 250,
                            height: 42,
                            borderRadius: 8,
                            fontSize: 14,
                        }}
                        placeholder="Enter review"
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        className="flex-1"
                    />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <Button
                        icon={<AiOutlinePlus />}
                        htmlType="submit"
                        style={{
                            height: 55,
                            borderRadius: 8,
                        }}
                    >
                        Add
                    </Button>
                </Form.Item>
            </Form>

            {/* Existing Reviews */}
            {isLoading ? (
                <div className="flex justify-center items-center h-24">
                    <Loader2 className="animate-spin" />
                </div>
            ) : (
                <div className="grid gap-2 mb-6">
                    <p className="font-semibold">Reviews</p>
                    {reviews.map((review, index) => (
                        <div key={index} className="flex justify-between items-center gap-4 p-2 border rounded">
                            <p className="text-sm font-medium">{review}</p>
                            <button onClick={() => handleRemoveReview(index)}>
                                <MinusCircle size={20} className="text-red-500" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <Button
                onClick={handleUpdateReview}
                style={{
                    height: 40,
                    width: '100%',
                }}
                type="primary"
                disabled={isPending}
            >
                {isPending ? <Loader2 className="animate-spin" /> : 'Save Changes'}
            </Button>
        </div>
    );
};

export default EditCategoryReviewForm;
