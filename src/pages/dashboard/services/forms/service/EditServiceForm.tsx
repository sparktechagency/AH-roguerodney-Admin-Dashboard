import { Button, Form, Input, Select, Tag, UploadFile } from 'antd';
import { Option } from 'antd/es/mentions';
import { Loader2, Plus } from 'lucide-react';
import { useGetStatesQuery, useUpdateServiceMutation } from '../../../../../redux/features/service/serviceApi';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useGetAllCategoriesQuery } from '../../../../../redux/features/category/categoryApi';
import { useGetAllSubCategoryQuery } from '../../../../../redux/features/subCategory/subCategoryApi';
import { IMAGE_URL } from '../../../../../redux/api/baseApi';
import UploadImage from '../../../../../components/shared/UploadImage';

interface AddOn {
    title: string;
    price: number;
}
interface State {
    state: string;
    price: number;
}

const EditServiceForm = ({ defaultData, setModalOpen }: { defaultData: any; setModalOpen: any }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [addOns, setAddOns] = useState<AddOn[]>([]);
    const [addOnName, setAddOnName] = useState('');
    const [addOnPrice, setAddOnPrice] = useState<number | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<any>('');
    const [selectedStates, setSelectedStates] = useState<State[]>([]);
    const [stateName, setStateName] = useState('');
    const [statePrice, setStatePrice] = useState<number | null>(null);
    console.log(selectedStates);

    const [editForm] = Form.useForm();

    const { data: categoryData } = useGetAllCategoriesQuery({ query: '' });
    const categories = categoryData?.data || [];

    const { data: subCategoryData } = useGetAllSubCategoryQuery({ query: `?id=${selectedCategoryId}` });
    const subCategories = subCategoryData?.data || [];

    const { data: statesData } = useGetStatesQuery(undefined);
    const states = statesData?.data || [];

    // update states on mount
    useEffect(() => {
        if (defaultData) {
            setAddOns(defaultData.addOns || []);
            setSelectedStates(defaultData.statePrices || []);
            editForm.setFieldsValue({
                category: defaultData.category?._id,
                subCategory: defaultData.subCategory?._id,
                name: defaultData.name,
                location: defaultData.location,
                basePrice: defaultData.basePrice,
            });
            setFileList([
                {
                    uid: defaultData._id,
                    name: defaultData.name,
                    url: `${IMAGE_URL}${defaultData.image}`,
                },
            ]);
        }
    }, [defaultData]);

    // Add edit add-on
    const handleAddAddon = () => {
        if (addOnName.trim() && addOnPrice !== null && addOnPrice > 0) {
            const newAddOn: AddOn = {
                title: addOnName.trim(),
                price: addOnPrice,
            };
            if (!addOns.some((item) => item.title === addOnName.trim())) {
                setAddOns([...addOns, newAddOn]);
            } else {
                toast.error('Add-On already added');
            }
            setAddOnName('');
            setAddOnPrice(null);
        }
    };

    // Remove edit add-on
    const handleRemoveAddon = (item: AddOn) => {
        const remainingAddOns = addOns.filter((addOn) => addOn.title !== item.title);
        setAddOns(remainingAddOns);
    };

    // Add state
    const handleAddState = () => {
        if (stateName.trim() && statePrice !== null && statePrice > 0) {
            const newState: State = {
                state: stateName.trim(),
                price: statePrice,
            };
            if (!selectedStates.some((state) => state.state === stateName.trim())) {
                setSelectedStates([...selectedStates, newState]);
            } else {
                toast.error('State already added');
            }
            setStateName('');
            setStatePrice(null);
        }
    };

    // Remove edit state
    const handleRemoveState = (item: State) => {
        setSelectedStates(selectedStates.filter((state) => state?.state !== item.state));
    };

    const resetEditModal = () => {
        setModalOpen(false);
        setAddOns([]);
        setSelectedStates([]);
        setAddOnName('');
        setAddOnPrice(null);
        setStateName('');
        setStatePrice(null);
        editForm.resetFields();
    };

    // handle edit service
    const [editService, { isLoading: editLoading }] = useUpdateServiceMutation();
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
        if (addOns.length >= 0) {
            formData.append('addOns', JSON.stringify(addOns));
        }
        // append states to formData
        if (selectedStates.length >= 0) {
            formData.append('statePrices', JSON.stringify(selectedStates));
        }
        // append fileList to formData
        if (fileList.length > 0) {
            formData.append('image', fileList[0]?.originFileObj as any);
        }

        try {
            const res = await editService({ payload: formData, id: defaultData?._id }).unwrap();
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

    return (
        <div>
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
                                value={stateName || undefined}
                                onSelect={(value) => setStateName(value)}
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
                                value={statePrice || ''}
                                onChange={(e) => setStatePrice(Number(e.target.value))}
                            />
                            <Button
                                style={{ height: 42 }}
                                className="text-primary border-primary"
                                onClick={handleAddState}
                                disabled={!stateName.trim() || !statePrice}
                            >
                                <Plus size={20} /> Add
                            </Button>
                        </div>

                        {selectedStates.length > 0 && (
                            <div className="space-y-2">
                                <label className="font-medium text-sm">Selected States:</label>
                                <div className="flex flex-wrap gap-2">
                                    {selectedStates.map((state, idx) => (
                                        <Tag
                                            key={idx}
                                            closable
                                            onClose={() => handleRemoveState(state)}
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
                                value={addOnName}
                                onChange={(e) => setAddOnName(e.target.value)}
                            />
                            <Input
                                type="number"
                                style={{ height: 42 }}
                                placeholder="Price"
                                value={addOnPrice || ''}
                                onChange={(e) => setAddOnPrice(Number(e.target.value))}
                            />
                            <Button
                                style={{ height: 42 }}
                                className="text-primary border-primary"
                                onClick={handleAddAddon}
                                disabled={!addOnName.trim() || !addOnPrice}
                            >
                                <Plus size={20} /> Add
                            </Button>
                        </div>

                        {addOns.length > 0 && (
                            <div className="space-y-2">
                                <label className="font-medium text-sm">Added Add-ons:</label>
                                <div className="flex flex-wrap gap-2">
                                    {addOns.map((addon, idx) => (
                                        <Tag
                                            key={idx}
                                            closable
                                            onClose={() => handleRemoveAddon(addon)}
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
                            disabled={editLoading}
                        >
                            {editLoading ? <Loader2 className="animate-spin" /> : 'Save Changes'}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditServiceForm;
