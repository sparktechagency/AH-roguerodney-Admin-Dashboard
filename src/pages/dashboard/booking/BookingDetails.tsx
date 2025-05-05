import { PencilLine } from 'lucide-react';
import { dummySingleBookingData } from '../../../dummyData/singleBooking';
import { Input, Select } from 'antd';

const BookingDetailsPage = () => {
    const booking = dummySingleBookingData;

    return (
        <div className="grid gap-4 p-4">
            <div>
                <h1 className="text-3xl text-primary font-semibold">Booking Management</h1>
            </div>
            <section className="p-8 bg-white rounded-xl">
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
                                <span>Booking Date</span>
                                <span>:</span>
                                <span>{booking?.client?.bookingDate}</span>
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
                                <span>Booking Date</span>
                                <span>:</span>
                                <span>{booking?.artist?.bookingDate}</span>
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
                                <span>Base Price</span>
                                <span>:</span>
                                <span>{booking?.service?.price}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Add-Ons</span>
                                <span>:</span>
                                <div>
                                    <span>Mid-Back Length – + ${booking?.service?.addOns?.midBackLength}</span>
                                    <span>Waist-Length or Longer – + ${booking?.service?.addOns?.waistLength}</span>
                                    <span>
                                        Custom Design (e.g., spirals, double twists, pattern locs) – + $
                                        {booking?.service?.addOns?.customDesign}
                                    </span>
                                </div>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Booking Date</span>
                                <span>:</span>
                                <span className="flex items-center gap-2">
                                    {booking?.service?.bookingDate} <PencilLine size={16} className="text-primary" />
                                </span>
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                                <span>Cancelled</span>
                                <span>:</span>
                                <span>
                                    <Select
                                        showSearch
                                        placeholder="Select a option"
                                        style={{ width: '100%' }}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { value: 'Client', label: 'Client' },
                                            { value: 'Provider', label: 'Provider' },
                                            { value: 'Admin', label: 'Admin' },
                                        ]}
                                    />
                                </span>
                            </div>
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
                            <div className="grid grid-cols-3 gap-2">
                                <span>Refund</span>
                                <span>:</span>
                                <span>
                                    <Input placeholder="Enter amound" defaultValue={5} prefix={'$'} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BookingDetailsPage;
