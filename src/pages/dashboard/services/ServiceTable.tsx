import { Button, ConfigProvider, Select, Table } from 'antd';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoTrashOutline } from 'react-icons/io5';
import { Option } from 'antd/es/mentions';
import {
    useDeleteServiceMutation,
    useGetAllServiceQuery,
    useUpdateServiceMutation,
} from '../../../redux/features/service/serviceApi';
import { IMAGE_URL } from '../../../redux/api/baseApi';
import DeleteModal from '../../../components/shared/DeleteAlertModal';
import toast from 'react-hot-toast';
import MyModal from '../../../components/shared/MyModal';
import AddServiceForm from './forms/service/AddServiceForm';
import EditServiceForm from './forms/service/EditServiceForm';

const ServiceTable = () => {
    const [page, setPage] = useState(1);
    const [serviceModal, setServiceModal] = useState(false);
    const [editServiceModal, setEditServiceModal] = useState(false);
    const [deleteServiceModal, setDeleteServiceModal] = useState(false);
    const [selectedService, setSelectedService] = useState<any>(null);

    const { data, isLoading } = useGetAllServiceQuery({ query: `?page=${page}` });
    const services = data?.data || [];
    const pagination = data?.meta;

    // update service status
    const [editService] = useUpdateServiceMutation();
    const updateServiceStatus = async (values: any, id: string) => {
        toast.loading('Loading...', {
            id: 'updateStatus',
        });

        try {
            const res = await editService({ payload: values, id }).unwrap();
            if (res?.success) {
                toast.success('Status updated successfully', {
                    id: 'updateStatus',
                });
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error?.data?.message || 'Something went wrong', {
                id: 'updateStatus',
            });
        }
    };

    const columns = [
        {
            title: 'ID',
            key: 'id',
            render: (_: any, __: any, index: number) => <span># {index + 1}</span>,
        },
        {
            title: 'Category',
            key: 'category',
            render: (_: any, item: any) => {
                return <span>{item?.category?.name}</span>;
            },
        },
        {
            title: 'Sub-category',
            key: 'subCategory',
            render: (_: any, item: any) => {
                return <span>{item?.subCategory?.name}</span>;
            },
        },
        {
            title: 'Service',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Base Price',
            dataIndex: 'basePrice',
            key: 'basePrice',
            render: (price: number) => <span>${price}</span>,
        },
        {
            title: 'Service Image',
            dataIndex: 'image',
            key: 'image',
            render: (_: any, item: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <img src={`${IMAGE_URL}${item?.image}`} className="size-9 rounded-sm" />
                </div>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            render: (_: any, item: any) => {
                return (
                    <Select
                        onSelect={(value) => updateServiceStatus({ status: value }, item._id)}
                        defaultValue={item?.status}
                        placeholder="Status"
                        className="w-24 h-[42px]"
                    >
                        <Option value={'active'}>Active</Option>
                        <Option value={'paused'}>Paused</Option>
                    </Select>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, item: any, index: number) => (
                <div key={index} className="flex items-center gap-4">
                    <button
                        onClick={() => {
                            setEditServiceModal(true);
                            setSelectedService(item);
                        }}
                    >
                        <AiOutlineEdit className="text-xl text-primary" />
                    </button>
                    <button
                        onClick={() => {
                            setDeleteServiceModal(true);
                            setSelectedService(item);
                        }}
                    >
                        <IoTrashOutline className="text-xl text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

    // handle delete service
    const [deleteService] = useDeleteServiceMutation();
    const handleDeleteService = async () => {
        toast.loading('Deleting service...', { id: 'deleteService' });
        try {
            const res = await deleteService({ id: selectedService?._id }).unwrap();
            if (res.success) {
                toast.success('Service deleted successfully', { id: 'deleteService' });
                setSelectedService(null);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete service', { id: 'deleteService' });
        }
        setDeleteServiceModal(false);
    };

    return (
        <div className="grid gap-4 mt-2">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-2xl text-primary font-semibold">Services</h1>
                <Button type="primary" className="p-5 text-base" onClick={() => setServiceModal(true)}>
                    <Plus size={20} /> Add Service
                </Button>
            </div>
            <ConfigProvider>
                <Table
                    columns={columns}
                    dataSource={services}
                    pagination={{
                        pageSize: pagination?.limit,
                        total: pagination?.total,
                        current: pagination?.page,
                        onChange: (page) => setPage(page),
                    }}
                    loading={isLoading}
                />
            </ConfigProvider>

            <MyModal open={serviceModal} setOpen={setServiceModal} width={500}>
                <AddServiceForm setModalOpen={setServiceModal} />
            </MyModal>

            {/* edit service modal */}
            <MyModal open={editServiceModal} setOpen={setEditServiceModal} width={500}>
                <EditServiceForm defaultData={selectedService} setModalOpen={setEditServiceModal} />
            </MyModal>

            <DeleteModal open={deleteServiceModal} setOpen={setDeleteServiceModal} action={handleDeleteService} />
        </div>
    );
};

export default ServiceTable;
