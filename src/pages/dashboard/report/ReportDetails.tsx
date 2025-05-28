import { useParams } from 'react-router-dom';
import { IMAGE_URL } from '../../../redux/api/baseApi';
import { useGetSingleReportQuery, useUpdateReportMutation } from '../../../redux/features/report/reportApi';
import { Button, Form, Input } from 'antd';
import toast from 'react-hot-toast';
import { CircleCheckBig } from 'lucide-react';

const ReportDetailsPage = () => {
    const { id } = useParams();
    const { data } = useGetSingleReportQuery({ id });
    const report = data?.data;
    console.log(report);

    const [form] = Form.useForm();

    // handle refund
    const [updateReport] = useUpdateReportMutation();
    const handleRefund = async (values: any) => {
        toast.loading('Loading...', { id: 'refund' });
        try {
            const res = await updateReport({ id, payload: { ...values, refund: Number(values?.refund) } }).unwrap();
            if (res?.success) {
                toast.success('Refund successful', { id: 'refund' });
                form.resetFields();
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || 'Something went wrong', { id: 'refund' });
        }
    };

    return (
        <div className="grid gap-4 p-4">
            <div>
                <h1 className="text-3xl text-primary font-semibold">Report Details</h1>
            </div>
            <section className="p-8 bg-white rounded-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    <div>
                        <h1 className="text-xl font-semibold mb-4">Client Information</h1>
                        <div className="grid gap-4">
                            <p className="grid grid-cols-3 gap-2">
                                <span>Client name</span>
                                <span>:</span>
                                <span>{report?.reservation?.userId?.name}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Email</span>
                                <span>:</span>
                                <span>{report?.reservation?.userId?.email}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Booking Date</span>
                                <span>:</span>
                                <span>{report?.reservation?.createdAt?.split('T')[0]}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Subscription plan</span>
                                <span>:</span>
                                <span>{report?.reservation?.userId?.subscription?.package?.name}</span>
                            </p>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold mb-4">Artist Information</h1>
                        <div className="grid gap-4">
                            <p className="grid grid-cols-3 gap-2">
                                <span>Artist name</span>
                                <span>:</span>
                                <span>{report?.reservation?.artiestId?.name}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Email</span>
                                <span>:</span>
                                <span>{report?.reservation?.artiestId?.email}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Booking Date</span>
                                <span>:</span>
                                <span>{report?.reservation?.artist_book_date?.split('T')[0]}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Subscription plan</span>
                                <span>:</span>
                                <span>{report?.reservation?.artiestId?.subscription?.package?.name}</span>
                            </p>
                        </div>
                    </div>
                    {/* service info */}
                    <div className="py-6">
                        <h1 className="text-xl font-semibold mb-4">Booking Information</h1>
                        <div className="grid gap-4">
                            <p className="grid grid-cols-3 gap-2">
                                <span>Category</span>
                                <span>:</span>
                                <span>{report?.reservation?.serviceId?.category?.name}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Sub-category</span>
                                <span>:</span>
                                <span>{report?.reservation?.serviceId?.subCategory?.name}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Service name</span>
                                <span>:</span>
                                <span>{report?.reservation?.serviceId?.name}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Service image</span>
                                <span>:</span>
                                <img
                                    src={`${IMAGE_URL}${report?.reservation?.serviceId?.image}`}
                                    alt="service-image"
                                    className="size-8 rounded"
                                />
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Base Price</span>
                                <span>:</span>
                                <span>${report?.reservation?.price}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Add-Ons</span>
                                <span>:</span>
                                <div>
                                    {report?.reservation?.addOns?.length > 0 ? (
                                        report?.reservation?.addOns.map((item: any, index: number) => (
                                            <span key={index} className="block">
                                                {item.name} (${item.price})
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-500">No Add-Ons</span>
                                    )}
                                </div>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Booking Date</span>
                                <span>:</span>
                                <span className="flex items-center gap-2">
                                    {report?.reservation?.createdAt?.split('T')[0]}
                                </span>
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                                <span>Booking Status</span>
                                <span>:</span>
                                <span className="capitalize">{report?.reservation?.status || 'N/A'}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <span>Cancelled By</span>
                                <span>:</span>
                                <span className="capitalize">{report?.reservation?.cancelled_by || 'N/A'}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <span>Cancel Reason</span>
                                <span>:</span>
                                <span className="capitalize">{report?.reservation?.cancelled_reason || 'N/A'}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <span>Refund</span>
                                <span>:</span>
                                <span>
                                    {report?.reservation?.refund_amount > 0
                                        ? `$${report?.reservation?.refund_amount}`
                                        : 'Not Refunded'}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Report Details */}
                    <div>
                        <h1 className="text-xl font-semibold mb-4">Report Information</h1>
                        <div className="grid gap-4">
                            <p className="grid grid-cols-3 gap-2">
                                <span>Reporter name</span>
                                <span>:</span>
                                <span>{report?.user?.name}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Reporter email</span>
                                <span>:</span>
                                <span>{report?.user?.email}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Date</span>
                                <span>:</span>
                                <span>{report?.createdAt?.split('T')[0]}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Status</span>
                                <span>:</span>
                                <span className="capitalize flex items-center gap-2">
                                    {report?.status}{' '}
                                    {report?.status === 'resolved' && (
                                        <CircleCheckBig size={16} className="text-green-500" />
                                    )}
                                </span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Reason</span>
                                <span>:</span>
                                <span>{report?.reason}</span>
                            </p>
                            <p className="grid grid-cols-3 gap-2">
                                <span>Note</span>
                                <span>:</span>
                                <span>{report?.note || 'N/A'}</span>
                            </p>
                        </div>

                        {!report?.reservation?.refund && (
                            <div className="p-4 my-8 bg-gray-100 rounded-md">
                                <h1 className="text-base font-semibold mb-4">Refund Price</h1>
                                <div>
                                    <Form layout="vertical" onFinish={handleRefund} form={form}>
                                        <Form.Item
                                            name="refund"
                                            label="Refund Amount"
                                            rules={[{ required: true, message: 'Please input refund amount!' }]}
                                        >
                                            <Input
                                                type="number"
                                                style={{ height: '44px', fontSize: 16, borderRadius: 8 }}
                                                placeholder="Enter price"
                                            />
                                        </Form.Item>
                                        <Form.Item name="note" label="Note">
                                            <Input.TextArea
                                                style={{ height: '100px', fontSize: 16, borderRadius: 8 }}
                                                placeholder="Write something..."
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" className="h-12 px-8 text-base">
                                                Refund
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReportDetailsPage;
