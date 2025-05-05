import { Button, Form, Input } from 'antd';
import { CircleCheck, CircleMinus, PencilLineIcon, Plus } from 'lucide-react';
import { useState } from 'react';
import CustomModal from '../../../components/shared/CustomModal';

const AhTistSubscriptions = () => {
    const [editChallengeModal, setEditChallengeModal] = useState(false);
    const [packageOffers, setPackageOffers] = useState([
        ' Top priority in client matching (get booked first)',
        'No service fees – Keep 100% of your earnings',
        'Exclusive Ah-Luxe Challenges (earn extra even without bookings)',
        'Stock up and Glow rewards and bonus cash prize opportunities',
        'Profile featured on the Ooh Ah homepage',
    ]);

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-4">
            {/* Ah Basic  */}
            <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2 p-5 pb-9 bg-teal-400 text-white rounded-2xl">
                    <h3 className="text-2xl font-medium">Ah Basic</h3>
                    <button onClick={() => setEditChallengeModal(true)}>
                        <PencilLineIcon />
                    </button>
                </div>
                <div className="flex-1 p-10 bg-[#f4f4f4] rounded-2xl flex flex-col gap-2 relative -top-6">
                    <h4 className="text-lg text-teal-400 font-semibold">(FREE – 8% Service Fee Per Booking)</h4>
                    <ul className="list-disc pl-6 grid gap-2 text-base">
                        <li className="font-medium">Instant access to bookings when available</li>
                        <li className="font-medium">8% service fee deducted from each completed job</li>
                        <li className="font-medium">Can earn referral bonuses</li>
                        <li className="font-medium">No monthly fee, just pay per job!</li>
                    </ul>
                </div>
            </div>

            {/* Ah Pro  */}
            <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2 p-5 pb-9 bg-[#6A3E82] text-white rounded-2xl">
                    <h3 className="text-2xl font-medium">Ah Pro</h3>
                    <button onClick={() => setEditChallengeModal(true)}>
                        <PencilLineIcon />
                    </button>
                </div>
                <div className="flex-1 p-10 bg-[#f4f4f4] rounded-2xl flex flex-col gap-2 relative -top-6">
                    <h4 className="text-lg text-[#6A3E82] font-semibold">
                        $9.99/month <span className="text-sm font-medium"> - 3% Service Fee Per Booking</span>
                    </h4>
                    <ul className="list-disc pl-6 grid gap-2 text-base">
                        <li className="font-medium">Get matched with clients before free users</li>
                        <li className="font-medium">3% service fee deducted (keep more of your earnings)</li>
                        <li className="font-medium">Boosted profile visibility (shown to more clients)</li>
                        <li className="font-medium">Earn milestone bonuses faster</li>
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
                <div className="flex-1 p-10 bg-[#f4f4f4] rounded-2xl flex flex-col gap-2 relative -top-6">
                    <h4 className="text-lg text-[#2190F2] font-semibold">
                        $19.99/month{' '}
                        <span className="text-sm font-medium"> - 0% Service Fee, Keep 100% of Your Money</span>
                    </h4>
                    <ul className="list-disc pl-6 grid gap-2 text-base">
                        <li className="font-medium">Top priority in client matching (get booked first)</li>
                        <li className="font-medium">No service fees – Keep 100% of your earnings</li>
                        <li className="font-medium">Exclusive Ah-Luxe Challenges (earn extra even without bookings)</li>
                        <li className="font-medium">Stock up and Glow rewards and bonus cash prize opportunities</li>
                        <li className="font-medium">Profile featured on the Ooh Ah homepage</li>
                    </ul>
                </div>
            </div>

            <CustomModal
                open={editChallengeModal}
                setOpen={setEditChallengeModal}
                title="Edit Package"
                width={500}
                body={editChallengeForm}
            />
        </div>
    );
};

export default AhTistSubscriptions;
