import { Button, Form, Input } from 'antd';
import { CircleCheck, CircleMinus, PencilLineIcon, Plus } from 'lucide-react';
import { useState } from 'react';
import CustomModal from '../../../components/shared/CustomModal';

const ClientSubscriptions = () => {
    const [addChallengeModal, setAddChallengeModal] = useState(false);
    const [editChallengeModal, setEditChallengeModal] = useState(false);
    const [packageOffers, setPackageOffers] = useState([
        ' Top priority in client matching (get booked first)',
        'No service fees – Keep 100% of your earnings',
        'Exclusive Ah-Luxe Challenges (earn extra even without bookings)',
        'Stock up and Glow rewards and bonus cash prize opportunities',
        'Profile featured on the Ooh Ah homepage',
    ]);

    const addChallengeForm = (
        <Form layout="vertical">
            <Form.Item label={<label className="font-medium">Package Name</label>} name="packageName">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter package name"
                    className="text-base font-medium rounded-md"
                />
            </Form.Item>

            <Form.Item label={<label className="font-medium">Package Price</label>} name="bonusAmount">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="$19.99/month"
                    className="text-base font-medium rounded-md"
                />
            </Form.Item>

            <Form.Item label={<label className="font-medium">Package Price offer</label>} name="bonusAmount">
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

    const editChallengeForm = (
        <Form layout="vertical">
            <Form.Item label={<label className="font-medium">Package Name</label>} name="packageName">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Enter package name"
                    className="text-base font-medium rounded-md"
                />
            </Form.Item>

            <Form.Item label={<label className="font-medium">Package Price</label>} name="bonusAmount">
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="$19.99/month"
                    className="text-base font-medium rounded-md"
                />
            </Form.Item>

            <Form.Item label={<label className="font-medium">Package Price offer</label>} name="bonusAmount">
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
                    onClick={() => setAddChallengeModal(true)}
                    type="primary"
                    style={{ height: 42 }}
                    className="rounded-xl text-base"
                >
                    Add Package
                </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-4">
                {/* Ah Casual  */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-between gap-2 p-5 pb-9 bg-teal-400 text-white rounded-2xl">
                        <h3 className="text-2xl font-medium">Ah Casual</h3>
                        <button onClick={() => setEditChallengeModal(true)}>
                            <PencilLineIcon />
                        </button>
                    </div>
                    <div className="flex-1 p-10 bg-[#f4f4f4] rounded-2xl grid gap-2 relative -top-6">
                        <h4 className="text-lg text-teal-400 font-semibold">Free Plan</h4>
                        <ul className="list-disc pl-6 grid gap-2 text-base">
                            <li className="font-medium">No Monthly Fee</li>
                            <li className="font-medium">Standard Booking & Pricing</li>
                            <li className="font-medium">Standard Support Response Times</li>
                            <li className="font-medium">Includes Ooh Ah's standard service fee per booking</li>
                        </ul>
                    </div>
                </div>

                {/* Ah Glow  */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-between gap-2 p-5 pb-9 bg-[#6A3E82] text-white rounded-2xl">
                        <h3 className="text-2xl font-medium">Ah Glow</h3>
                        <button onClick={() => setEditChallengeModal(true)}>
                            <PencilLineIcon />
                        </button>
                    </div>
                    <div className="flex-1 p-10 bg-[#f4f4f4] rounded-2xl grid gap-2 relative -top-6">
                        <h4 className="text-lg text-[#6A3E82] font-semibold">$9.99/month</h4>
                        <ul className="list-disc pl-6 grid gap-2 text-base">
                            <li className="font-medium">Early Booking Access (Book before free users!)</li>
                            <li className="font-medium">Exclusive Discounts (Visible on select services.)</li>
                            <li className="font-medium">Priority Customer Support (Faster response times.)</li>
                            <li className="font-medium">Special Beauty Promotions & Bonuses</li>
                        </ul>
                    </div>
                </div>

                {/* Ah Luxe  */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-between gap-2 p-5 pb-9 bg-[#2190F2] text-white rounded-2xl">
                        <h3 className="text-2xl font-medium">Ah Luxe</h3>
                        <button onClick={() => setEditChallengeModal(true)}>
                            <PencilLineIcon />
                        </button>
                    </div>
                    <div className="flex-1 p-10 bg-[#f4f4f4] rounded-2xl grid gap-2 relative -top-6">
                        <h4 className="text-lg text-[#2190F2] font-semibold">
                            $19.99/month <span className="text-sm font-medium">(The VIP Experience!)</span>
                        </h4>
                        <ul className="list-disc pl-6 grid gap-2 text-base">
                            <li className="font-medium">Early Booking Access (Book before free users!)</li>
                            <li className="font-medium">Exclusive Discounts (Visible on select services.)</li>
                            <li className="font-medium">Priority Customer Support (Faster response times.)</li>
                            <li className="font-medium">Special Beauty Promotions & Bonuses</li>
                        </ul>
                    </div>
                </div>

                <CustomModal
                    open={addChallengeModal}
                    setOpen={setAddChallengeModal}
                    title="Add Package"
                    width={500}
                    body={addChallengeForm}
                />
                <CustomModal
                    open={editChallengeModal}
                    setOpen={setEditChallengeModal}
                    title="Edit Package"
                    width={500}
                    body={editChallengeForm}
                />
            </div>
        </section>
    );
};

export default ClientSubscriptions;
