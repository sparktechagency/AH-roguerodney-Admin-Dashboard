import { Form, Input, Button } from 'antd';
import { useEffect } from 'react';

const { TextArea } = Input;

const EditFaqForm = ({ onFinish, itemData }: { onFinish: (values: any) => void; itemData: any }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (itemData) {
            form.setFieldsValue(itemData);
        }
    }, [form, itemData]);

    return (
        <div>
            <h1 className="text-xl font-semibold mb-6">Edit FAQ</h1>
            <Form onFinish={onFinish} layout="vertical" className="space-y-4" form={form}>
                <Form.Item
                    label="Question"
                    name="question"
                    rules={[{ required: true, message: 'Please enter a question' }]}
                >
                    <Input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="Enter question"
                        style={{ height: 44, fontSize: 16 }}
                    />
                </Form.Item>
                <Form.Item label="Answer" name="answer" rules={[{ required: true, message: 'Please enter an answer' }]}>
                    <TextArea
                        className="w-full p-2 border rounded"
                        placeholder="Enter answer"
                        style={{ fontSize: 16 }}
                        rows={4}
                    ></TextArea>
                </Form.Item>
                <Button htmlType="submit" type="primary" style={{ width: '100%', height: 44, fontSize: 16 }}>
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default EditFaqForm;
