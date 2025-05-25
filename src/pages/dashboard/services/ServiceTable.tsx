import { Button, ConfigProvider, Form, Input, Select, Table, UploadFile, Tag } from 'antd';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoTrashOutline } from 'react-icons/io5';
import CustomModal from '../../../components/shared/CustomModal';
import UploadImage from '../../../components/shared/UploadImage';
import { Option } from 'antd/es/mentions';
import {
    useCreateServiceMutation,
    useDeleteServiceMutation,
    useGetAllServiceQuery,
    useUpdateServiceMutation,
} from '../../../redux/features/service/serviceApi';
import { useGetAllCategoriesQuery } from '../../../redux/features/category/categoryApi';
import { useGetAllSubCategoryQuery } from '../../../redux/features/subCategory/subCategoryApi';
import { IMAGE_URL } from '../../../redux/api/baseApi';
import DeleteModal from '../../../components/shared/DeleteAlertModal';
import toast from 'react-hot-toast';

interface AddOn {
    id: string;
    title: string;
    price: number;
}

const ServiceTable = () => {
    const [serviceModal, setServiceModal] = useState(false);
    const [editServiceModal, setEditServiceModal] = useState(false);
    const [deleteServiceModal, setDeleteServiceModal] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [addOns, setAddOns] = useState<AddOn[]>([]);
    const [editAddOns, setEditAddOns] = useState<AddOn[]>([]);
    const [addOnName, setAddOnName] = useState('');
    const [addOnPrice, setAddOnPrice] = useState<number | null>(null);
    const [editAddOnName, setEditAddOnName] = useState('');
    const [editAddOnPrice, setEditAddOnPrice] = useState<number | null>(null);
    const [selectedService, setSelectedService] = useState<any>(null);

    const [addForm] = Form.useForm();
    const [editForm] = Form.useForm();

    const { data } = useGetAllServiceQuery({ query: '' });
    const services = data?.data || [];

    const { data: categoryData } = useGetAllCategoriesQuery({ query: '' });
    const categories = categoryData?.data || [];

    const { data: subCategoryData } = useGetAllSubCategoryQuery({ query: '' });
    const subCategories = subCategoryData?.data || [];

    // Add new add-on
    const handleAddAddOn = () => {
        if (addOnName.trim() && addOnPrice !== null && addOnPrice > 0) {
            const newAddOn: AddOn = {
                id: Date.now().toString(),
                title: addOnName.trim(),
                price: addOnPrice,
            };
            setAddOns([...addOns, newAddOn]);
            setAddOnName('');
            setAddOnPrice(null);
        }
    };

    // Remove add-on
    const handleRemoveAddOn = (id: string) => {
        setAddOns(addOns.filter((addon) => addon.id !== id));
    };

    // Add edit add-on
    const handleAddEditAddOn = () => {
        if (editAddOnName.trim() && editAddOnPrice !== null && editAddOnPrice > 0) {
            const newAddOn: AddOn = {
                id: Date.now().toString(),
                title: editAddOnName.trim(),
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

    // Handle edit service click
    const handleEditClick = (record: any) => {
        setSelectedService(record);
        setEditAddOns(record.addOns || []);
        editForm.setFieldsValue({
            category: record.category?._id,
            subCategory: record.subCategory?._id,
            name: record.name,
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

    // Reset modals
    const resetAddModal = () => {
        setServiceModal(false);
        setAddOns([]);
        setAddOnName('');
        setAddOnPrice(null);
        addForm.resetFields();
        setFileList([]);
    };

    const resetEditModal = () => {
        setEditServiceModal(false);
        setEditAddOns([]);
        setEditAddOnName('');
        setEditAddOnPrice(null);
        setSelectedService(null);
        editForm.resetFields();
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

    // handle add service
    const [addService] = useCreateServiceMutation();
    const handleAddService = async (values: any) => {
        toast.loading('Adding Service...', {
            id: 'addService',
        });
        const formData = new FormData();
        // transform the values to formData
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value as any);
        });
        // append addOns to formData
        if (addOns.length > 0) {
            formData.append('addOns', JSON.stringify(addOns));
        }
        // append fileList to formData
        if (fileList.length > 0) {
            formData.append('image', fileList[0]?.originFileObj as any);
        }

        try {
            const res = await addService({ payload: formData }).unwrap();
            console.log(res);
            if (res?.success) {
                toast.success(res?.message || 'Service added successfully', {
                    id: 'addService',
                });
                resetAddModal();
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error?.data?.message || 'Something went wrong', {
                id: 'addService',
            });
        }
    };

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
        // append fileList to formData
        if (fileList.length > 0) {
            formData.append('image', fileList[0]?.originFileObj as any);
        }

        try {
            const res = await editService({ payload: formData, id: selectedService?._id }).unwrap();
            console.log(res);
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

    const addCategoryForm = (
        <Form
            form={addForm}
            style={{
                color: '#767676',
            }}
            layout="vertical"
            onFinish={handleAddService}
        >
            <Form.Item
                label={<label className="font-medium">Category</label>}
                name="category"
                rules={[{ required: true, message: 'Please select a category' }]}
            >
                <Select placeholder="Select category" className="w-full h-[42px]">
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
                            value={addOnName}
                            onChange={(e) => setAddOnName(e.target.value)}
                        />
                        <Input
                            type="number"
                            style={{ height: 42, width: 160 }}
                            placeholder="Price"
                            value={addOnPrice || ''}
                            onChange={(e) => setAddOnPrice(Number(e.target.value))}
                        />
                        <Button
                            style={{ height: 42 }}
                            className="text-primary border-primary"
                            onClick={handleAddAddOn}
                            disabled={!addOnName.trim() || !addOnPrice}
                        >
                            <Plus size={20} /> Add
                        </Button>
                    </div>

                    {addOns.length > 0 && (
                        <div className="space-y-2">
                            <label className="font-medium text-sm">Added Add-ons:</label>
                            <div className="flex flex-wrap gap-2">
                                {addOns.map((addon) => (
                                    <Tag
                                        key={addon.id}
                                        closable
                                        onClose={() => handleRemoveAddOn(addon.id)}
                                        color="blue"
                                        className="flex items-center gap-1 p-2 py-1 text-sm"
                                    >
                                        {addon.title} (${addon.price})
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
                    <Button htmlType="submit" type="primary" style={{ height: 40 }} className="w-full">
                        Add Service
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );

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
                <Select placeholder="Select category" className="w-full h-[42px]">
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
                                        {addon.title} (+${addon.price})
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
            console.log(res);
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
                <Table columns={columns} dataSource={services} />
            </ConfigProvider>

            <CustomModal
                open={serviceModal}
                setOpen={setServiceModal}
                title="Add Service"
                width={500}
                body={addCategoryForm}
            />
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
