import { Form, Input, Button } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';

const { TextArea } = Input;

const AddFaqForm = ({ onFinish }: { onFinish: (values: any) => void }) => {
    const [form] = Form.useForm();

    return (
        <div>
            <h1 className="text-xl font-semibold pb-6">Add FAQ</h1>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                {/* Question */}
                <Form.Item
                    label="Question"
                    name="question"
                    rules={[{ required: true, message: 'Please enter a question' }]}
                >
                    <Input
                        style={{
                            height: 42,
                            borderRadius: 8,
                        }}
                        placeholder="Your faq question"
                    />
                </Form.Item>

                {/* Answer */}
                <Form.Item label="Answer" name="answer" rules={[{ required: true, message: 'Please enter a answer' }]}>
                    <TextArea
                        style={{
                            width: '100%',
                            resize: 'none',
                            borderRadius: 8,
                            backgroundColor: '#F9F9F9',
                        }}
                        rows={4}
                        placeholder="Your faq answer"
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
                        Add FAQ
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddFaqForm;
