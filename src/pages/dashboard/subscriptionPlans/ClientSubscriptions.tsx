import { Button, Form, Input } from 'antd';
import { CircleCheck, CircleMinus, PencilLineIcon, Plus } from 'lucide-react';
import { useState } from 'react';
import CustomModal from '../../../components/shared/CustomModal';
import { useGetAllPlansQuery } from '../../../redux/features/plan/planApi';

const ClientSubscriptions = () => {
    const [addPlanModal, setAddPlanModal] = useState(false);
    const [editPlanModal, setEditPlanModal] = useState(false);
    const [editModalData, setEditModalData] = useState(null);
    const [packageOffers, setPackageOffers] = useState([
        ' Top priority in client matching (get booked first)',
        'No service fees – Keep 100% of your earnings',
        'Exclusive Ah-Luxe Challenges (earn extra even without bookings)',
        'Stock up and Glow rewards and bonus cash prize opportunities',
        'Profile featured on the Ooh Ah homepage',
    ]);

    const { data } = useGetAllPlansQuery({ query: `for=USER` });
    const package1 = data?.data[0];
    const package2 = data?.data[1];
    const package3 = data?.data[2];

    const addPlanForm = (
        <Form layout="vertical">
            <Form.Item label={<label className="font-medium">Package Name</label>} name="name">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter package name"
                    className="text-base font-medium rounded-md"
                />
            </Form.Item>

            <Form.Item label={<label className="font-medium">Package Price</label>} name="price">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="$19.99/month"
                    className="text-base font-medium rounded-md"
                />
            </Form.Item>

            <Form.Item label={<label className="font-medium">Package Price offer</label>} name="price_offer">
                <Input
                    type="number"
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
                                document.querySelector('input[placeholder="Enter package offers"]') as HTMLInputElement
                            )?.value;
                            if (newOffer) {
                                setPackageOffers([...packageOffers, newOffer]);
                            }
                        }}
                    >
                        <Plus />
                    </Button>
                </div>

                <ul className="grid gap-2 p-4 border rounded-lg mt-4">
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
            </Form.Item>

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
    );

    const editPlanForm = (
        <Form layout="vertical">
            <Form.Item label={<label className="font-medium">Package Name</label>} name="name">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter package name"
                    className="text-base font-medium rounded-md"
                />
            </Form.Item>

            <Form.Item label={<label className="font-medium">Package Price</label>} name="price">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="$19.99/month"
                    className="text-base font-medium rounded-md"
                />
            </Form.Item>

            <Form.Item label={<label className="font-medium">Package Price offer</label>} name="price_offer">
                <Input
                    type="number"
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
                                document.querySelector('input[placeholder="Enter package offers"]') as HTMLInputElement
                            )?.value;
                            if (newOffer) {
                                setPackageOffers([...packageOffers, newOffer]);
                            }
                        }}
                    >
                        <Plus />
                    </Button>
                </div>

                <ul className="grid gap-2 p-4 border rounded-lg mt-4">
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
            </Form.Item>

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
    );

    return (
        <section className="">
            <div className="flex justify-end">
                <Button
                    onClick={() => setAddPlanModal(true)}
                    type="primary"
                    style={{ height: 42 }}
                    className="rounded-xl text-base"
                >
                    Add Package
                </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-4">
                {/* Ah Casual  */}
                {package1 && (
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between gap-2 p-5 pb-9 bg-teal-400 text-white rounded-2xl">
                            <h3 className="text-2xl font-medium">{package1?.name}</h3>
                            <button onClick={() => setEditPlanModal(true)}>
                                <PencilLineIcon />
                            </button>
                        </div>
                        <div className="flex-1 p-10 bg-[#f4f4f4] rounded-2xl grid gap-2 relative -top-6">
                            <h4 className="text-lg text-teal-400 font-semibold">
                                {package1?.price < 1 ? 'Free Plan' : package1?.price}
                            </h4>
                            <ul className="list-disc pl-6 grid gap-2 text-base">
                                {package1?.offers?.map((item: any, idx: number) => (
                                    <li key={idx} className="font-medium">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Ah Glow  */}
                {package2 && (
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between gap-2 p-5 pb-9 bg-[#6A3E82] text-white rounded-2xl">
                            <h3 className="text-2xl font-medium">{package2?.name}</h3>
                            <button onClick={() => setEditPlanModal(true)}>
                                <PencilLineIcon />
                            </button>
                        </div>
                        <div className="flex-1 p-10 bg-[#f4f4f4] rounded-2xl grid gap-2 relative -top-6">
                            <h4 className="text-lg text-[#6A3E82] font-semibold">
                                {package2?.price < 1 ? 'Free Plan' : `$${package2?.price}/month`}
                            </h4>
                            <ul className="list-disc pl-6 grid gap-2 text-base">
                                {package2?.offers?.map((item: any, idx: number) => (
                                    <li key={idx} className="font-medium">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Ah Luxe  */}
                {package3 && (
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between gap-2 p-5 pb-9 bg-[#2190F2] text-white rounded-2xl">
                            <h3 className="text-2xl font-medium">{package3?.name}</h3>
                            <button onClick={() => setEditPlanModal(true)}>
                                <PencilLineIcon />
                            </button>
                        </div>
                        <div className="flex-1 p-10 bg-[#f4f4f4] rounded-2xl grid gap-2 relative -top-6">
                            <h4 className="text-lg text-[#2190F2] font-semibold">
                                {package3?.price < 1 ? (
                                    'Free Plan'
                                ) : (
                                    <span className="font-semibold">
                                        $19.99/month <span className="text-sm font-medium">(The VIP Experience!)</span>
                                    </span>
                                )}
                            </h4>
                            <ul className="list-disc pl-6 grid gap-2 text-base">
                                {package3?.offers?.map((item: any, idx: number) => (
                                    <li key={idx} className="font-medium">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <CustomModal
                    open={addPlanModal}
                    setOpen={setAddPlanModal}
                    title="Add Package"
                    width={500}
                    body={addPlanForm}
                />
                <CustomModal
                    open={editPlanModal}
                    setOpen={setEditPlanModal}
                    title="Edit Package"
                    width={500}
                    body={editPlanForm}
                />
            </div>
        </section>
    );
};

export default ClientSubscriptions;
