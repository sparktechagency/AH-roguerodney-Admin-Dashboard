import { Button, Form, Input, Modal } from 'antd';
import { CircleCheck, CircleMinus, Plus } from 'lucide-react';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useUpdatePlanMutation } from '../../../../redux/features/plan/planApi';

const EditPlanForm = ({
    defaultData,
    open,
    setOpen,
    setEditModalData,
}: {
    defaultData: any;
    open: boolean;
    setOpen: (open: boolean) => void;
    setEditModalData: (data: any) => void;
}) => {
    const [packageOffers, setPackageOffers] = React.useState<string[]>(defaultData?.offers || []);
    const [form] = Form.useForm();
    const [updatePlan] = useUpdatePlanMutation();

    useEffect(() => {
        if (defaultData) {
            form.setFieldsValue({
                name: defaultData.name,
                title: defaultData.title,
                price: defaultData.price,
                price_offer: defaultData.price_offer,
                offers: packageOffers,
            });
            setPackageOffers(defaultData.offers || []);
        }
    }, [defaultData]);

    // handle form submission
    const handleSubmit = async (values: any) => {
        console.log(values);
        toast.loading('Updating package...', { id: 'update-package' });
        try {
            const res = await updatePlan({
                id: defaultData._id,
                payload: {
                    ...values,
                    price: Number(values.price),
                    price_offer: Number(values.price_offer),
                    offers: packageOffers,
                    price_id: defaultData.price_id,
                    productId: defaultData.productId,
                },
            }).unwrap();
            if (res.success) {
                toast.success('Package updated successfully', { id: 'update-package' });
                setOpen(false);
                setEditModalData(null);
            }
        } catch (error) {
            toast.error('Failed to update package', { id: 'update-package' });
            console.error(error);
        }
    };

    return (
        <Modal
            title="Edit Package"
            width={500}
            open={open}
            onCancel={() => {
                setOpen(false);
                setEditModalData(null);
            }}
            footer={false}
        >
            <Form layout="vertical" onFinish={handleSubmit} form={form}>
                <Form.Item label={<label className="font-medium">Package Name</label>} name="name">
                    <Input
                        style={{
                            height: 42,
                        }}
                        placeholder="Enter package name"
                        className="text-base font-medium rounded-md"
                    />
                </Form.Item>

                <Form.Item label={<label className="font-medium">Price Title</label>} name="title">
                    <Input
                        style={{
                            height: 42,
                        }}
                        placeholder="Free, $10/month etc."
                        className="text-base font-medium rounded-md"
                    />
                </Form.Item>

                <Form.Item label={<label className="font-medium">Package Price</label>} name="price">
                    <Input
                        style={{
                            height: 42,
                        }}
                        placeholder="Enter package price"
                        className="text-base font-medium rounded-md"
                    />
                </Form.Item>

                <Form.Item label={<label className="font-medium">App Fee (%)</label>} name="price_offer">
                    <Input
                        style={{
                            height: 42,
                        }}
                        placeholder="Enter package price offer"
                        className="text-base font-medium rounded-md"
                    />
                </Form.Item>

                <Form.Item label={<label className="font-medium flex">Package Offers</label>} name="offers">
                    <div className="flex items-center gap-2">
                        <Input
                            style={{
                                height: 42,
                            }}
                            placeholder="Enter package offers"
                            className="text-base font-medium rounded-md"
                        />
                        <Button
                            type="default"
                            style={{ height: 42 }}
                            className="rounded-md"
                            onClick={() => {
                                const newOffer = (
                                    document.querySelector(
                                        'input[placeholder="Enter package offers"]',
                                    ) as HTMLInputElement
                                )?.value;
                                if (newOffer) {
                                    setPackageOffers([...packageOffers, newOffer]);
                                }
                            }}
                        >
                            <Plus />
                        </Button>
                    </div>
                </Form.Item>
                <ul className="grid gap-2 p-4 border rounded-lg mb-4">
                    {packageOffers?.map((item, idx) => (
                        <li key={idx} className="flex items-center justify-between gap-4">
                            <p className="flex gap-2">
                                <CircleCheck className="size-5 min-w-5 text-green-600" />
                                {item}
                            </p>
                            <button
                                onClick={() => {
                                    const updatedOffers = packageOffers.filter((_, index) => index !== idx);
                                    setPackageOffers(updatedOffers);
                                }}
                            >
                                <CircleMinus className="text-stone-500" />
                            </button>
                        </li>
                    ))}
                </ul>

                <Form.Item>
                    <div className="flex justify-center w-full">
                        <Button
                            htmlType="submit"
                            type="primary"
                            style={{
                                height: 40,
                            }}
                            className="w-full text-base rounded-lg"
                        >
                            Submit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditPlanForm;
