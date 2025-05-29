import { Button, ConfigProvider, Form, Input, Select, Table, UploadFile, Tag } from 'antd';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoTrashOutline } from 'react-icons/io5';
import CustomModal from '../../../components/shared/CustomModal';
import UploadImage from '../../../components/shared/UploadImage';
import { Option } from 'antd/es/mentions';
import {
    useDeleteServiceMutation,
    useGetAllServiceQuery,
    useGetStatesQuery,
    useUpdateServiceMutation,
} from '../../../redux/features/service/serviceApi';
import { useGetAllCategoriesQuery } from '../../../redux/features/category/categoryApi';
import { useGetAllSubCategoryQuery } from '../../../redux/features/subCategory/subCategoryApi';
import { IMAGE_URL } from '../../../redux/api/baseApi';
import DeleteModal from '../../../components/shared/DeleteAlertModal';
import toast from 'react-hot-toast';
import MyModal from '../../../components/shared/MyModal';
import AddServiceForm from './forms/service/AddServiceForm';

interface AddOn {
    id: string;
    state: string;
    price: number;
}

const ServiceTable = () => {
    const [page, setPage] = useState(1);
    const [serviceModal, setServiceModal] = useState(false);
    const [editServiceModal, setEditServiceModal] = useState(false);
    const [deleteServiceModal, setDeleteServiceModal] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [editAddOns, setEditAddOns] = useState<AddOn[]>([]);
    const [editAddOnName, setEditAddOnName] = useState('');
    const [editAddOnPrice, setEditAddOnPrice] = useState<number | null>(null);
    const [selectedService, setSelectedService] = useState<any>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<any>(null);
    const [editSelectedStates, setEditSelectedStates] = useState<AddOn[]>([]);
    const [editStateName, setEditStateName] = useState('');
    const [editStatePrice, setEditStatePrice] = useState<number | null>(null);

    const [editForm] = Form.useForm();

    const { data } = useGetAllServiceQuery({ query: `?page=${page}` });
    const services = data?.data || [];
    const pagination = data?.meta;

    const { data: categoryData } = useGetAllCategoriesQuery({ query: '' });
    const categories = categoryData?.data || [];

    const { data: subCategoryData } = useGetAllSubCategoryQuery({ query: `?id=${selectedCategoryId}` });
    const subCategories = subCategoryData?.data || [];

    const { data: statesData } = useGetStatesQuery(undefined);
    const states = statesData?.data || [];

    // Add edit add-on
    const handleAddEditAddOn = () => {
        if (editAddOnName.trim() && editAddOnPrice !== null && editAddOnPrice > 0) {
            const newAddOn: AddOn = {
                id: Date.now().toString(),
                state: editAddOnName.trim(),
                price: editAddOnPrice,
            };
            setEditAddOns([...editAddOns, newAddOn]);
            setEditAddOnName('');
            setEditAddOnPrice(null);
        }
    };

    // Remove edit add-on
    const handleRemoveEditAddOn = (id: string) => {
        setEditAddOns(editAddOns.filter((addon) => addon.id !== id));
    };

    // Add edit state
    const handleAddEditState = () => {
        if (editStateName.trim() && editStatePrice !== null && editStatePrice > 0) {
            const newState: AddOn = {
                id: Date.now().toString(),
                state: editStateName.trim(),
                price: editStatePrice,
            };
            setEditSelectedStates([...editSelectedStates, newState]);
            setEditStateName('');
            setEditStatePrice(null);
        }
    };

    // Remove edit state
    const handleRemoveEditState = (id: string) => {
        setEditSelectedStates(editSelectedStates.filter((state) => state.id !== id));
    };

    // Handle edit service click
    const handleEditClick = (record: any) => {
        setSelectedService(record);
        setEditAddOns(record.addOns || []);
        setEditSelectedStates(record.statePrices || []);
        editForm.setFieldsValue({
            category: record.category?._id,
            subCategory: record.subCategory?._id,
            name: record.name,
            location: record.location,
            basePrice: record.basePrice,
        });
        setEditServiceModal(true);
        setFileList([
            {
                uid: record._id,
                name: record.name,
                url: `${IMAGE_URL}${record.image}`,
            },
        ]);
    };

    const resetEditModal = () => {
        setEditServiceModal(false);
        setEditAddOns([]);
        setEditSelectedStates([]);
        setEditAddOnName('');
        setEditAddOnPrice(null);
        setEditStateName('');
        setEditStatePrice(null);
        setSelectedService(null);
        editForm.resetFields();
    };

    // update service status
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
                resetEditModal();
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
            render: (_: any, record: any, index: number) => (
                <div key={index} className="flex items-center gap-4">
                    <button onClick={() => handleEditClick(record)}>
                        <AiOutlineEdit className="text-xl text-primary" />
                    </button>
                    <button
                        onClick={() => {
                            setDeleteServiceModal(true);
                            setSelectedService(record);
                        }}
                    >
                        <IoTrashOutline className="text-xl text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

    // handle edit service
    const [editService] = useUpdateServiceMutation();
    const handleEditService = async (values: any) => {
        toast.loading('Editing Service...', {
            id: 'editService',
        });
        const formData = new FormData();
        // transform the values to formData
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value as any);
        });
        // append addOns to formData
        if (editAddOns.length > 0) {
            formData.append('addOns', JSON.stringify(editAddOns));
        }
        // append states to formData
        if (editSelectedStates.length > 0) {
            formData.append('statePrices', JSON.stringify(editSelectedStates));
        }
        // append fileList to formData
        if (fileList.length > 0) {
            formData.append('image', fileList[0]?.originFileObj as any);
        }

        try {
            const res = await editService({ payload: formData, id: selectedService?._id }).unwrap();
            if (res?.success) {
                toast.success(res?.message || 'Service edited successfully', {
                    id: 'editService',
                });
                resetEditModal();
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error?.data?.message || 'Something went wrong', {
                id: 'editService',
            });
        }
    };

    const editServiceForm = (
        <Form
            form={editForm}
            style={{
                color: '#767676',
            }}
            layout="vertical"
            onFinish={handleEditService}
        >
            <Form.Item
                label={<label className="font-medium">Category</label>}
                name="category"
                rules={[{ required: true, message: 'Please select a category' }]}
            >
                <Select
                    onSelect={(value) => setSelectedCategoryId(value)}
                    placeholder="Select category"
                    className="w-full h-[42px]"
                >
                    {categories.map((item: any) => (
                        <Option key={item._id} value={item._id}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label={<label className="font-medium">Sub-category</label>}
                name="subCategory"
                rules={[{ required: true, message: 'Please select a sub-category' }]}
            >
                <Select placeholder="Select sub-category" className="w-full h-[42px]">
                    {subCategories.map((item: any) => (
                        <Option key={item._id} value={item._id}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Service Name"
                name="name"
                rules={[{ required: true, message: 'Please enter service name' }]}
            >
                <Input style={{ height: 42 }} placeholder="Enter service name" />
            </Form.Item>

            <Form.Item label="States">
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Select
                            showSearch
                            placeholder="Select a state"
                            value={editStateName || undefined}
                            onSelect={(value) => setEditStateName(value)}
                            filterOption={(input, option) => {
                                const label = option?.label;
                                return typeof label === 'string'
                                    ? label.toLowerCase().includes(input.toLowerCase())
                                    : false;
                            }}
                            options={states.map((state: any) => ({
                                value: state,
                                label: state,
                            }))}
                            className="w-full h-[42px]"
                        />
                        <Input
                            type="number"
                            style={{ height: 42, width: 160 }}
                            placeholder="Price"
                            value={editStatePrice || ''}
                            onChange={(e) => setEditStatePrice(Number(e.target.value))}
                        />
                        <Button
                            style={{ height: 42 }}
                            className="text-primary border-primary"
                            onClick={handleAddEditState}
                            disabled={!editStateName.trim() || !editStatePrice}
                        >
                            <Plus size={20} /> Add
                        </Button>
                    </div>

                    {editSelectedStates.length > 0 && (
                        <div className="space-y-2">
                            <label className="font-medium text-sm">Selected States:</label>
                            <div className="flex flex-wrap gap-2">
                                {editSelectedStates.map((state) => (
                                    <Tag
                                        key={state.id}
                                        closable
                                        onClose={() => handleRemoveEditState(state.id)}
                                        color="green"
                                        className="flex items-center gap-1 p-2 py-1 text-sm"
                                    >
                                        {state.state} (${state.price})
                                    </Tag>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Form.Item>

            <Form.Item
                label="Base Price"
                name="basePrice"
                rules={[{ required: true, message: 'Please enter base price' }]}
            >
                <Input type="number" style={{ height: 42 }} placeholder="Enter base price" />
            </Form.Item>

            <Form.Item label="Add-Ons">
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Input
                            style={{ height: 42 }}
                            placeholder="Enter add-on name"
                            value={editAddOnName}
                            onChange={(e) => setEditAddOnName(e.target.value)}
                        />
                        <Input
                            type="number"
                            style={{ height: 42 }}
                            placeholder="Price"
                            value={editAddOnPrice || ''}
                            onChange={(e) => setEditAddOnPrice(Number(e.target.value))}
                        />
                        <Button
                            style={{ height: 42 }}
                            className="text-primary border-primary"
                            onClick={handleAddEditAddOn}
                            disabled={!editAddOnName.trim() || !editAddOnPrice}
                        >
                            <Plus size={20} /> Add
                        </Button>
                    </div>

                    {editAddOns.length > 0 && (
                        <div className="space-y-2">
                            <label className="font-medium text-sm">Added Add-ons:</label>
                            <div className="flex flex-wrap gap-2">
                                {editAddOns.map((addon) => (
                                    <Tag
                                        key={addon.id}
                                        closable
                                        onClose={() => handleRemoveEditAddOn(addon.id)}
                                        color="blue"
                                        className="flex items-center gap-1"
                                    >
                                        {addon.state} (+${addon.price})
                                    </Tag>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Form.Item>

            <Form.Item label="Service Image" name="image">
                <UploadImage fileList={fileList} setFileList={setFileList} maxCount={1} />
            </Form.Item>

            <Form.Item>
                <div className="flex justify-center w-full">
                    <Button
                        htmlType="submit"
                        type="primary"
                        style={{
                            height: 40,
                        }}
                    >
                        Edit Service
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );

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
                />
            </ConfigProvider>

            <MyModal open={serviceModal} setOpen={setServiceModal} width={500}>
                <AddServiceForm setModalOpen={setServiceModal} />
            </MyModal>

            <CustomModal
                open={editServiceModal}
                setOpen={setEditServiceModal}
                title="Edit Service"
                width={500}
                body={editServiceForm}
            />
            <DeleteModal open={deleteServiceModal} setOpen={setDeleteServiceModal} action={handleDeleteService} />
        </div>
    );
};

export default ServiceTable;
