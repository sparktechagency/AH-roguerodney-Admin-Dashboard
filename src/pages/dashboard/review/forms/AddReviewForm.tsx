import { Form, Input, Button } from 'antd';
import toast from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';
import { useUpdateGeneralReviewMutation } from '../../../../redux/features/review/reviewApi';

const AddReviewForm = ({ existingReviews, setOpen }: { existingReviews: string[]; setOpen: any }) => {
    const [addReview] = useUpdateGeneralReviewMutation();
    const [form] = Form.useForm();

    // handle add local review
    const handleAddLocalReview = async (values: any) => {
        toast.loading('Adding review...', { id: 'add-review' });
        // prepare payload
        const newReview = values.review;
        const isDuplicate = existingReviews.includes(newReview);
        if (isDuplicate) {
            toast.error('Review already exists', { id: 'add-review' });
            return;
        }
        const updatedReviews = [...existingReviews, newReview];

        try {
            const res = await addReview({ payload: { review: updatedReviews } }).unwrap();
            if (res?.success) {
                toast.success('Review added successfully', { id: 'add-review' });
                form.resetFields();
                setOpen(false);
            }
            toast.success('Review added successfully', { id: 'add-review' });
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || 'Failed to add review', { id: 'add-review' });
        }
    };

    return (
        <div>
            <h1 className="text-xl font-semibold pb-6">Add Review</h1>
            <Form form={form} layout="vertical" onFinish={handleAddLocalReview}>
                <Form.Item label="Review" name="review" rules={[{ required: true, message: 'Please enter a review' }]}>
                    <Input
                        style={{
                            height: 42,
                            borderRadius: 8,
                        }}
                        placeholder="Enter review"
                    />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item className="flex justify-center">
                    <Button
                        icon={<AiOutlinePlus />}
                        htmlType="submit"
                        style={{
                            height: 40,
                        }}
                        type="primary"
                    >
                        Add Review
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddReviewForm;
