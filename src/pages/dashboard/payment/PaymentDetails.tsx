import { PencilLine } from 'lucide-react';
import { dummySingleBookingData } from '../../../dummyData/singleBooking';
import { Select } from 'antd';

const PaymentDetailsPage = () => {
    const booking = dummySingleBookingData;

    return (
        <div className="p-4">
            <div className="py-4">
                <h1 className="text-3xl text-primary font-semibold">Payment & Payout Management</h1>
            </div>
            <section className="p-8 bg-white rounded h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    <div>
                        <h1 className="text-xl font-semibold mb-4">Client Information</h1>
                        <div className="grid gap-4">
                            <p className="grid grid-cols-3 gap-2">
                                <span>Client name</span>
                                <span>:</span>
                                <span>{booking?.client?.name}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Email</span>
                                <span>:</span>
                                <span>{booking?.client?.email}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Subscription plan</span>
                                <span>:</span>
                                <span>{booking?.client?.subscriptionPlan}</span>
                            </p>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold mb-4">Artist Information</h1>
                        <div className="grid gap-4">
                            <p className="grid grid-cols-3 gap-2">
                                <span>Provider name</span>
                                <span>:</span>
                                <span>{booking?.artist?.name}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Email</span>
                                <span>:</span>
                                <span>{booking?.artist?.email}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Subscription plan</span>
                                <span>:</span>
                                <span>{booking?.artist?.subscriptionPlan}</span>
                            </p>
                        </div>
                    </div>
                    {/* service info */}
                    <div className="py-6">
                        <h1 className="text-xl font-semibold mb-4">Service Information</h1>
                        <div className="grid gap-4">
                            <p className="grid grid-cols-3 gap-2">
                                <span>Category</span>
                                <span>:</span>
                                <span>{booking?.service?.category}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Sub-category</span>
                                <span>:</span>
                                <span>{booking?.service?.subCategory}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Service name</span>
                                <span>:</span>
                                <span>{booking?.service?.name}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Service image</span>
                                <span>:</span>
                                <img src={booking?.service?.image} alt="" className="size-8 rounded" />
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Booking Date</span>
                                <span>:</span>
                                <span className="flex items-center gap-2">
                                    {booking?.service?.bookingDate} <PencilLine size={16} className="text-primary" />
                                </span>
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                                <span>Status</span>
                                <span>:</span>
                                <span>
                                    <Select
                                        showSearch
                                        placeholder="Select a status"
                                        style={{ width: '100%' }}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { value: 'Ongoing', label: 'Ongoing' },
                                            { value: 'Pending', label: 'Pending' },
                                            { value: 'Confirmed', label: 'Confirmed' },
                                            { value: 'En route', label: 'En route' },
                                            { value: 'Started', label: 'Started' },
                                            { value: 'Completed', label: 'Completed' },
                                            { value: 'Cancelled by client', label: 'Cancelled by client' },
                                            { value: 'Cancelled by provider', label: 'Cancelled by provider' },
                                            { value: 'Cancelled by admin', label: 'Cancelled by admin' },
                                        ]}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PaymentDetailsPage;
